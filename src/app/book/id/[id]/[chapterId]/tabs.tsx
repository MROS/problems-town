"use client";
import { Tab, Tabs } from "@nextui-org/react";
import { type ChapterNode } from "../queryBook";
import Link from "next/link";
import getExerciseURL from "./exercise/[exerciseId]/exerciseURL";

// TODO: 用戶可以出題
function Exercises(props: { node: ChapterNode }) {
  const node = props.node;
  if (node.exerciseNumber == 0) {
    return (
      <div className="flex w-full flex-row justify-center p-4 text-gray-400">
        本章無習題
      </div>
    );
  }
  const exercises = [];
  for (let i = 1; i <= node.exerciseNumber; i += 1) {
    exercises.push(
      <Link href={`${getExerciseURL(node.bookId, node.id, i.toString())}`}>
        <div className="h-12 rounded-md px-1 hover:cursor-pointer hover:bg-gray-100">
          <div className="flex h-full w-full items-center border-b px-1">
            習題 {i}
          </div>
        </div>
      </Link>,
    );
  }
  return <div className="grid grid-cols-3">{exercises}</div>;
}

export function ChapterTabs(props: { node: ChapterNode }) {
  const node = props.node;
  return (
    <Tabs>
      <Tab title="習題">
        <Exercises node={node} />
      </Tab>
      <Tab title="討論">
        <div className="flex w-full flex-row justify-center p-4 text-gray-400">
          此功能建設中
        </div>
      </Tab>
    </Tabs>
  );
}
