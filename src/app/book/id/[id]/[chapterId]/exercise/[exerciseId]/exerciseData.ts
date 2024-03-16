import { notFound } from "next/navigation";
import { getChapterData } from "~/app/book/id/[id]/[chapterId]/chapterData";
import { type ChapterData } from "~/app/book/id/[id]/[chapterId]/chapterURL";
import { type Exercise } from "@prisma/client";
import { db } from "~/server/db";
import { cache } from "react";

type ExerrciseData = ChapterData & {
  exercise: Exercise & {
    _count: { answers: number };
  };
};

export const getExerciseData = cache(
  async (
    bookId: string,
    chapterId: string,
    exerciseId: string,
  ): Promise<ExerrciseData> => {
    const data = await getChapterData(bookId, chapterId);

    const exercise = await db.exercise.findUnique({
      where: { id: exerciseId },
      include: {
        _count: {
          select: { answers: true },
        },
      },
    });
    if (exercise == null) {
      notFound();
    }
    return { ...data, exercise };
  },
);
