import {
  type Book,
  Prisma,
  type PrismaClient,
  type ExerciseType,
} from "@prisma/client";
import { TRPCError } from "@trpc/server";
import assert from "assert";
import { type TOCTreeNode, newBookSchema } from "~/app/book/create/zodSchema";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

type ExerciseData = {
  name: string;
  type: ExerciseType;
  builtInOrder: number;
};

type ChapterData = {
  isRoot: boolean;
  indexInSameLevel: number;
  name: string;
  builtInExerciseNumber?: number;
  bookId: number;
  children: { create: ChapterData[] };
  exercises: { create: ExerciseData[] };
};

function generateBuiltInExercises(exerciseNumber: number): ExerciseData[] {
  const exercises: ExerciseData[] = [];
  for (let i = 1; i <= exerciseNumber; i += 1) {
    exercises.push({
      name: `習題 ${i}`, // TODO: 根據 Exercise.builtInType 來調整習題名字
      type: "BUILT_IN",
      builtInOrder: i,
    });
  }
  return exercises;
}

async function storeTOC(toc: TOCTreeNode[], book: Book, db: PrismaClient) {
  // 1. 將 TreeNode[] 整理成 prisma nested write 所需的格式
  const nodes = new Map<number | string, ChapterData>();
  const root = {
    isRoot: true,
    indexInSameLevel: 0,
    name: book.name,
    builtInExerciseNumber: 0,
    bookId: book.id,
    exercises: { create: [] },
    children: { create: [] },
  };
  nodes.set(0, root);
  // 初始化所有節點
  toc.forEach((node) => {
    const builtInExerciseNumber = node.data?.builtInExerciseNumber;
    const exercises =
      builtInExerciseNumber == null
        ? []
        : generateBuiltInExercises(builtInExerciseNumber);
    nodes.set(node.id, {
      isRoot: false,
      indexInSameLevel: -1, // 此時還不知道自己在同階層的位置
      name: node.text,
      builtInExerciseNumber,
      bookId: book.id,
      exercises: {
        create: exercises,
      },
      children: { create: [] },
    });
  });
  // 設定親子關係
  toc.forEach((node) => {
    const current = nodes.get(node.id);
    assert(current != undefined, "當前節點比已被創建");

    const parent = nodes.get(node.parent);
    if (parent == undefined) {
      throw new Error("節點宣稱的父節點不存在");
    }

    parent.children.create.push(current);
    current.indexInSameLevel = parent.children.create.length - 1;
  });

  await db.chapter.create({
    data: root,
  });
}

export const bookRouter = createTRPCRouter({
  // TODO: 只有登入用戶才能新增書籍
  create: publicProcedure
    .input(newBookSchema)
    .mutation(async ({ ctx, input }) => {
      // 建立書本
      let createBookResult;
      try {
        createBookResult = await ctx.db.book.create({
          data: {
            name: input.name,
            ISBN: input.ISBN,
            authors: input.authors,
            isTranslated: input.translators != null,
            translators: input.translators ?? [],
            originalName: input.originalName,
            publishDate: input.date,
            pageNumber: input.pageNumber,
          },
        });
        await storeTOC(input.TOCTree, createBookResult, ctx.db);

        return createBookResult.id;
      } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          if (e.code == "P2002") {
            throw new TRPCError({
              message: "此 ISBN 已經存在",
              code: "CONFLICT",
            });
          }
        }
        throw e;
      }
    }),
});
