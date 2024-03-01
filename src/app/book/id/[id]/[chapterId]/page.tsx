import { notFound } from "next/navigation";
import { type Metadata } from "next";
import { ChapterTabs } from "./tabs";
import { getBookAndChapterNodes } from "../queryBook";

import { CheckValidChapterURL } from "./checkValidChapterURL";

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
  const data = await CheckValidChapterURL(params);
  const { node } = data;

  return (
    <div className="mt-4">
      <ChapterTabs node={node} />
    </div>
  );
}
