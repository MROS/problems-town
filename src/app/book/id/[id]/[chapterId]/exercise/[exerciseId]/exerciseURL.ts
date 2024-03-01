import getChapterURL from "../../chapterURL";

export default function getExerciseURL(
  bookId: number,
  chapterId: string,
  exerciseId: string,
) {
  return `${getChapterURL(bookId, chapterId)}/exercise/${exerciseId}`;
}
