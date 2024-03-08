import { ChapterTreeChildren } from "../chapterTree";
import { Divider } from "@nextui-org/react";
import { PathToRoot } from "./breadcrumbs";
import Link from "next/link";
import getBookURL from "../bookURL";
import getChapterURL from "./chapterURL";
import { getChapterData } from "./chapterData";

type Params = { id: string; chapterId: string };

type Props = {
  params: Params;
  children: React.ReactNode;
};

// TODO: 桌面版側邊欄顯示所有章節
export default async function Layout({ params, children }: Props) {
  const data = await getChapterData(params.id, params.chapterId);
  const { node, nodes, book } = data;

  return (
    <main className="flex w-full grow flex-col items-center pt-4 ">
      <div className="flex w-full max-w-xl flex-col px-2">
        <div className="flex flex-col justify-between">
          <div>
            <h2 className="mb-2 text-lg font-bold hover:opacity-85">
              <Link href={getBookURL(book.id)}>{book.name}</Link>
            </h2>
            <PathToRoot node={node} nodes={nodes} />
          </div>
          <Divider className="my-4" />
          <div>
            <h1 className="mb-1 text-3xl font-bold hover:opacity-85">
              <Link href={getChapterURL(book.id, node.id)}>{node.name}</Link>
            </h1>
            <ChapterTreeChildren childrenNodes={node.children} />
          </div>
          {children}
        </div>
      </div>
    </main>
  );
}
