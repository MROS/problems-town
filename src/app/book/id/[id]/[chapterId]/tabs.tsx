"use client";
import { Chip, Tab, Tabs } from "@nextui-org/react";
import { type ChapterNode } from "../queryBook";
import Link from "next/link";
import getExerciseURL from "./exercise/[exerciseId]/exerciseURL";
import { type ExerciseMeta } from "./chapterData";

function ExerciseCategory(props: {
  exercises: ExerciseMeta[];
  node: ChapterNode;
}) {
  const node = props.node;
  const exerciseComponents = [];
  for (const exercise of props.exercises) {
    const answerCount = exercise._count.answers;
    exerciseComponents.push(
      <Link href={`${getExerciseURL(node.bookId, node.id, exercise.id)}`}>
        <div className="h-12 rounded-md px-1 hover:cursor-pointer hover:bg-gray-100">
          <div className="flex h-full w-full items-center justify-between border-b px-1">
            <span>{exercise.name}</span>
            {answerCount > 0 && (
              <Chip variant="bordered" color="secondary">
                {answerCount} 解
              </Chip>
            )}
          </div>
        </div>
      </Link>,
    );
  }
  return <div className="grid grid-cols-3">{exerciseComponents}</div>;
}

// TODO: 用戶可以出題
function Exercises(props: { exercises: ExerciseMeta[]; node: ChapterNode }) {
  const node = props.node;
  if (props.exercises.length == 0) {
    return (
      <div className="flex w-full flex-row justify-center p-4 text-gray-400">
        本章無習題
      </div>
    );
  }
  // TODO: 支援原創習題、習題根據 category 分羣
  const builtInExercises = props.exercises.filter(
    (exercise) => exercise.origin == "BUILT_IN",
  );
  builtInExercises.sort(
    (a, b) => (a.builtInOrder ?? 0) - (b.builtInOrder ?? 0),
  );
  const exercisesNoCategory = [];
  const exerciseMap = new Map<string, ExerciseMeta[]>();
  for (const exercise of builtInExercises) {
    if (exercise.category == null) {
      exercisesNoCategory.push(exercise);
      continue;
    }

    const list = exerciseMap.get(exercise.category);
    if (list == undefined) {
      exerciseMap.set(exercise.category, [exercise]);
    } else {
      list.push(exercise);
    }
  }
  const categoryComponents: JSX.Element[] = [];
  exerciseMap.forEach((exercises, category) => {
    categoryComponents.push(
      <div key={category} className="mt-6">
        <h3 className="text-lg font-bold">{category}</h3>
        <ExerciseCategory exercises={exercises} node={node} />
      </div>,
    );
  });

  return (
    <div>
      {exercisesNoCategory.length > 0 ? (
        <div>
          <h3 className="text-lg font-bold text-gray-500">無分類</h3>
          <ExerciseCategory exercises={exercisesNoCategory} node={node} />
        </div>
      ) : (
        <></>
      )}
      {categoryComponents}
    </div>
  );
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
