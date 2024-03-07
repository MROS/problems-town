import getBookURL from "../bookURL";
import { type BookData, type ChapterNode } from "../queryBook";

// node 是代表當前 chapter 的 ChapterNode
// TODO: 移除本檔案的 ChapterData ，一律採用 chapterData.ts 裡定義的 ChapterData
export type ChapterData = BookData & { node: ChapterNode };

export default function getChapterURL(bookId: number, chapterId: string) {
  return `${getBookURL(bookId)}/${chapterId}`;
}
