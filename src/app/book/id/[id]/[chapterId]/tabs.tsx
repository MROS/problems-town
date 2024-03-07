"use client";
import { Tab, Tabs } from "@nextui-org/react";
import { type ChapterNode } from "../queryBook";
import Link from "next/link";
import getExerciseURL from "./exercise/[exerciseId]/exerciseURL";
import { ExerciseMeta } from "./chapterData";

// TODO: 用戶可以出題
function Exercises(props: { exercises: ExerciseMeta[]; node: ChapterNode }) {
  const node = props.node;
  if (node.builtInExerciseNumber == 0) {
    return (
      <div className="flex w-full flex-row justify-center p-4 text-gray-400">
        本章無習題
      </div>
    );
  }
  // TODO: 支援原創習題、習題根據 builtInType 分羣
  const builtInExercises = props.exercises.filter(
    (exercise) => exercise.type == "BUILT_IN",
  );
  builtInExercises.sort(
    (a, b) => (a.builtInOrder ?? 0) - (b.builtInOrder ?? 0),
  );
  const exerciseComponents = [];
  for (const exercise of props.exercises) {
    exerciseComponents.push(
      <Link href={`${getExerciseURL(node.bookId, node.id, exercise.id)}`}>
        <div className="h-12 rounded-md px-1 hover:cursor-pointer hover:bg-gray-100">
          <div className="flex h-full w-full items-center border-b px-1">
            {exercise.name}
          </div>
        </div>
      </Link>,
    );
  }
  return <div className="grid grid-cols-3">{exerciseComponents}</div>;
}

export function ChapterTabs(props: {
  exercises: ExerciseMeta[];
  node: ChapterNode;
}) {
  const { exercises, node } = props;
  return (
    <Tabs>
      <Tab title="習題">
        <Exercises exercises={exercises} node={node} />
      </Tab>
      <Tab title="討論">
        <div className="flex w-full flex-row justify-center p-4 text-gray-400">
          此功能建設中
        </div>
      </Tab>
    </Tabs>
  );
}
