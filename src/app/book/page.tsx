import { db } from "~/server/db";
import NewBookButton from "./newBookButton";
import BookList from "./bookList";

export default async function Book() {
  const bookList = await db.book.findMany({
    orderBy: {
      id: "desc",
    },
  });
  return (
    <main className="flex grow flex-col ">
      <div className="flex w-screen flex-col items-center pt-10">
        <div className="flex w-full max-w-xl flex-col px-2">
          <div className="mb-3 flex flex-row items-end justify-between">
            <div className="font-bold">藏書</div>
            <NewBookButton />
          </div>
          {/* <Divider className="my-1" /> */}
          <BookList bookList={bookList} />
        </div>
      </div>
    </main>
  );
}
