import getBookURL from "../bookURL";

export default function getChapterURL(bookId: number, chapterId: string) {
  return `${getBookURL(bookId)}/${chapterId}`;
}
