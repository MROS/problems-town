import { notFound, redirect } from "next/navigation";
import {
  type BookData,
  type ChapterNode,
  getBookAndChapterNodes,
} from "../queryBook";

type Params = { id: string; chapterId: string };

// node 是代表當前 chapter 的 ChapterNode
export type ChapterData = BookData & { node: ChapterNode };

export async function CheckValidChapterURL(
  params: Params,
): Promise<ChapterData> {
  const data = await getBookAndChapterNodes(params.id);
  if (data == null) {
    notFound();
  }
  const { nodes } = data;
  const node = nodes.get(params.chapterId);
  if (node == undefined) {
    notFound();
  }
  if (node.parentId == null) {
    redirect(`/book/id/${node.bookId}`);
  }
  return { node, ...data };
}
