import { notFound } from "next/navigation";
import { type Metadata } from "next";
import { ChapterTabs } from "./tabs";
import { getBookAndChapterNodes } from "../queryBook";

import { getChapterData } from "./chapterData";

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
  const data = await getChapterData(params.id, params.chapterId);
  const { exercises, node } = data;

  return (
    <div className="mt-4">
      <ChapterTabs exercises={exercises} node={node} />
    </div>
  );
}
