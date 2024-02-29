import { notFound, redirect } from "next/navigation";
import { type Metadata } from "next";
import { getBookAndChapterNodes } from "../queryBook";
import { ChapterTreeChildren } from "../chapterTree";
import { Divider } from "@nextui-org/react";
import { PathToRoot } from "./breadcrumbs";
import Link from "next/link";
import bookURL from "../bookURL";

type Props = {
  params: { id: string; chapterId: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await getBookAndChapterNodes(params.id);
  if (data == null) {
    notFound();
  }
  const { nodes } = data;
  const node = nodes.get(params.chapterId);
  return {
    title: node ? node.name : "找不到這個章節",
  };
}

// TODO: 桌面版側邊欄顯示所有章節
export default async function Chapter({ params }: Props) {
  const data = await getBookAndChapterNodes(params.id);
  if (data == null) {
    notFound();
  }
  const { nodes, book } = data;
  const node = nodes.get(params.chapterId);
  if (node == undefined) {
    notFound();
  }
  if (node.parentId == null) {
    redirect(`/book/id/${node.bookId}`);
  }

  return (
    <main className="flex w-screen grow flex-col items-center pt-6 ">
      <div className="flex w-full max-w-xl flex-col px-2">
        <div className="flex flex-col justify-between">
          <div>
            <h2 className="mb-2 text-lg font-bold">
              <Link href={bookURL(book.id)}>{book.name}</Link>
            </h2>
            <PathToRoot node={node} nodes={nodes} />
            <Divider className="my-6" />
            <h1 className="mb-1 text-3xl font-bold ">{node.name}</h1>
            <ChapterTreeChildren childrenNodes={node.children} />
          </div>
        </div>
      </div>
    </main>
  );
}
