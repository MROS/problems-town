import { lightFormat } from "date-fns";
import { notFound } from "next/navigation";
import { db } from "~/server/db";

export default async function BookById({ params }: { params: { id: string } }) {
  const book = await db.book.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (book == null) {
    notFound();
  }

  return (
    <main className="flex w-screen grow flex-col items-center pt-10 ">
      <div className="flex w-full max-w-xl flex-col px-2">
        <div className="mb-3 flex flex-col justify-between">
          <h1 className="text-xl font-bold">{book.name}</h1>
          <div>
            <div>
              <span className="text-gray-500">作者：</span>
              {book.authors.join(" / ")}
            </div>
            {book.isTranslated ? (
              <div>
                <span className="text-gray-500">譯者：</span>
                {book.translators.join(" / ")}
              </div>
            ) : (
              <></>
            )}
            <div>
              <span className="text-gray-500">出版時間：</span>
              {book.publishDate
                ? lightFormat(book.publishDate, "yyyy-MM-dd")
                : "無資料"}
            </div>
            {book.ISBN ? (
              <div>
                <span className="text-gray-500">ISBN：</span>
                {book.ISBN}
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
