import {
  type Book,
  Prisma,
  type PrismaClient,
  type ExerciseOrigin,
} from "@prisma/client";
import { TRPCError } from "@trpc/server";
import assert from "assert";
import {
  type TOCTreeNode,
  type newBookSchema,
} from "~/app/book/create/zodSchema";

import { type z } from "~/utils/chineseZod";

type ExerciseData = {
  name: string;
  category: string;
  origin: ExerciseOrigin;
  builtInOrder: number;
};

type builtInExerciseMetaData = {
  name: string;
  count: number;
};

type ChapterData = {
  isRoot: boolean;
  indexInSameLevel: number;
  name: string;
  builtInMaterialMetas: { create: builtInExerciseMetaData[] };
  bookId: number;
  children: { create: ChapterData[] };
  exercises: { create: ExerciseData[] };
};

function generateBuiltInExercises(
  materials: Record<string, number>,
  names: string[],
): [builtInExerciseMetaData[], ExerciseData[]] {
  const exercises: ExerciseData[] = [];
  const exerciseMetas: builtInExerciseMetaData[] = [];
  for (const name of names) {
    const count = materials[name];
    if (count == undefined || count <= 0) {
      continue;
    }
    exerciseMetas.push({
      name,
      count,
    });
    for (let i = 1; i <= count; i += 1) {
      exercises.push({
        name: `${name} ${i}`,
        category: name,
        origin: "BUILT_IN",
        builtInOrder: i,
      });
    }
  }
  return [exerciseMetas, exercises];
}

async function storeTOC(
  toc: TOCTreeNode[],
  book: Book,
  materialNames: string[],
  db: PrismaClient,
) {
  // 1. 將 TreeNode[] 整理成 prisma nested write 所需的格式
  const nodes = new Map<number | string, ChapterData>();
  const root = {
    isRoot: true,
    indexInSameLevel: 0,
    name: book.name,
    builtInMaterialMetas: { create: [] },
    bookId: book.id,
    exercises: { create: [] },
    children: { create: [] },
  };
  nodes.set(0, root);
  // 初始化所有節點
  toc.forEach((node) => {
    const rawExerciseMetas = node.data?.chapterMaterials;
    const [exerciseMetas, exercises] =
      rawExerciseMetas == null
        ? [[], []]
        : generateBuiltInExercises(rawExerciseMetas, materialNames);
    nodes.set(node.id, {
      isRoot: false,
      indexInSameLevel: -1, // 此時還不知道自己在同階層的位置
      name: node.text,
      builtInMaterialMetas: {
        create: exerciseMetas,
      },
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

export type NewBook = z.infer<typeof newBookSchema>;

export async function createBook(
  db: PrismaClient,
  input: NewBook,
): Promise<number> {
  // 建立書本
  let createBookResult;
  try {
    createBookResult = await db.book.create({
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
    await storeTOC(input.TOCTree, createBookResult, input.materialNames, db);

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
}
