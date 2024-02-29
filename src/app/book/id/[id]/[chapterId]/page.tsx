import { notFound } from "next/navigation";
import { type Metadata } from "next";
import { getBookAndChapterNodes } from "../queryBook";
import { ChapterTreeChildren } from "../chapterTree";

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

export default async function Chapter({ params }: Props) {
  const data = await getBookAndChapterNodes(params.id);
  if (data == null) {
    notFound();
  }
  const { book, nodes } = data;
  const node = nodes.get(params.chapterId);
  if (node == undefined) {
    notFound();
  }

  return (
    <main className="flex w-screen grow flex-col items-center pt-10 ">
      <div className="flex w-full max-w-xl flex-col px-2">
        <div className="mb-3 flex flex-col justify-between">
          <div className="mt-4">
            <h1 className="mb-1 text-xl font-bold ">{book.name}</h1>

            <ChapterTreeChildren childrenNodes={node.children} />
          </div>
        </div>
      </div>
    </main>
  );
}
