import { db } from "~/server/db";
import { notFound, redirect } from "next/navigation";
import {
  type BookData,
  type ChapterNode,
  getBookAndChapterNodes,
} from "../queryBook";
import { type Exercise } from "@prisma/client";
import { cache } from "react";

export type ExerciseMeta = Pick<
  Exercise,
  "id" | "name" | "type" | "builtInOrder" | "builtInType"
>;

// node 是代表當前 chapter 的 ChapterNode
export type ChapterData = BookData & {
  node: ChapterNode;
  exercises: ExerciseMeta[];
};

export const getChapterData = cache(
  async (bookId: string, chapterId: string): Promise<ChapterData> => {
    const data = await getBookAndChapterNodes(bookId);
    if (data == null) {
      notFound();
    }
    const { nodes } = data;
    const node = nodes.get(chapterId);
    if (node == undefined) {
      notFound();
    }
    if (node.parentId == null) {
      redirect(`/book/id/${node.bookId}`);
    }
    const exercises = await db.exercise.findMany({
      where: { chapterId },
      select: {
        id: true,
        name: true,
        type: true,
        builtInOrder: true,
        builtInType: true,
      },
    });
    return { node, exercises, ...data };
  },
);
