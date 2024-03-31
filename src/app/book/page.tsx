import { db } from "~/server/db";
import NewBookButton from "./newBookButton";
import BookList from "./bookList";

export const metadata = {
  title: "藏書 | 做題小鎮",
};

export default async function Book() {
  const bookList = await db.book.findMany({
    orderBy: {
      id: "desc",
    },
  });
  return (
    <main className="flex w-screen grow flex-col items-center pt-10">
      <div className="flex w-full max-w-2xl flex-col px-2">
        <div className="mb-3 flex flex-row items-end justify-between">
          <div className="font-bold">藏書</div>
          <NewBookButton />
        </div>
        <BookList bookList={bookList} />
      </div>
    </main>
  );
}
