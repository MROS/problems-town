import { notFound } from "next/navigation";
import { Button } from "@nextui-org/react";
import getExerciseURL from "../exerciseURL";
import Link from "next/link";
import { cache } from "react";
import { Answer, Exercise, User } from "@prisma/client";
import { ChapterData, getChapterData } from "../../../chapterData";
import { db } from "~/server/db";
import AnswerCard from "./answerCard";

type Params = { id: string; chapterId: string; exerciseId: string };

type Props = {
  params: Params;
};

type ExerrciseData = ChapterData & {
  // TODO: prisma 是否生成 join 後的型別
  exercise: Exercise & {
    answers: (Answer & { author: User })[];
  };
};

export const getExerciseDataWithAnswer = cache(
  async (
    bookId: string,
    chapterId: string,
    exerciseId: string,
  ): Promise<ExerrciseData> => {
    const data = await getChapterData(bookId, chapterId);

    const exercise = await db.exercise.findUnique({
      where: { id: exerciseId },
      include: {
        answers: { include: { author: true }, orderBy: { createDate: "desc" } },
      },
    });
    if (exercise == null) {
      notFound();
    }
    return { ...data, exercise };
  },
);

export default async function Exercise({ params }: Props) {
  const { node, exercise } = await getExerciseDataWithAnswer(
    params.id,
    params.chapterId,
    params.exerciseId,
  );
  const exerciseURL = getExerciseURL(node.bookId, node.id, params.exerciseId);

  return (
    <div className="mt-2">
      <div className="flex flex-row justify-between">
        <h2 className="text-lg font-bold">
          <Link color="foreground" href={exerciseURL}>
            {exercise.name}
          </Link>
        </h2>
        {/* TODO: 顯示解答數量 */}
        <Button as={Link} href="./" size="sm">
          返回題目
        </Button>
      </div>
      <div className="mt-6 space-y-4">
        {exercise.answers.map((answer) => {
          return <AnswerCard key={answer.id} answer={answer} />;
        })}
      </div>
    </div>
  );
}
