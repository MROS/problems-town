import getBookURL from "../bookURL";
import { notFound, redirect } from "next/navigation";
import {
  type BookData,
  type ChapterNode,
  getBookAndChapterNodes,
} from "../queryBook";

// node 是代表當前 chapter 的 ChapterNode
export type ChapterData = BookData & { node: ChapterNode };

export default function getChapterURL(bookId: number, chapterId: string) {
  return `${getBookURL(bookId)}/${chapterId}`;
}
