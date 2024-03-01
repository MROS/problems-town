import { db } from "~/server/db";
import { cache } from "react";
import { type Book, type Chapter } from "@prisma/client";

export type ChapterNode = Chapter & {
  children: ChapterNode[];
  parent: ChapterNode | null;
};

function rebuildChapterNodes(chapters: Chapter[]): {
  root: ChapterNode;
  nodes: Map<string, ChapterNode>;
} {
  const nodes = new Map<string, ChapterNode>();
  let root: ChapterNode | null = null;

  // 將所有節點丟近 map 裡
  chapters.forEach((chapter) => {
    if (chapter.parentId == null && root != null) {
      throw new Error("複數個根節點");
    } else if (chapter.parentId == null && root == null) {
      root = { ...chapter, children: [], parent: null };
      nodes.set(chapter.id, root);
    } else {
      nodes.set(chapter.id, { ...chapter, children: [], parent: null });
    }
  });
  if (root == null) {
    throw new Error("找不到目錄樹根節點");
  }

  // 建立親子關係
  nodes.forEach((node) => {
    if (node.parentId == null) {
      return;
    }
    const parent = nodes.get(node.parentId);
    if (parent == undefined) {
      throw new Error("節點宣稱的父節點不存在");
    }
    // NOTE: 親子互相引用，會導致 ChapterNode 無法輸出成 JSON
    parent.children.push(node);
    node.parent = parent;
  });

  // 根據 indexInSameLevel 排序子節點
  // TODO: 要是存在相同 indexInSameLevel ，拋出錯誤
  nodes.forEach((node) => {
    node.children.sort((a, b) => a.indexInSameLevel - b.indexInSameLevel);
  });

  return { root, nodes };
}

export const queryBookById = cache(async (id: string) => {
  return await db.book.findUnique({
    where: { id: parseInt(id) },
    include: { chapters: true },
  });
});

export type BookData = {
  book: Book;
  root: ChapterNode;
  nodes: Map<string, ChapterNode>;
} | null;

export const getBookAndChapterNodes = cache(
  async (id: string): Promise<BookData> => {
    const book = await queryBookById(id);
    if (book == null) {
      return null;
    }
    const { root, nodes } = rebuildChapterNodes(book.chapters);
    return { book, root, nodes };
  },
);
