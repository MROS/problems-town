import { lightFormat } from "date-fns";
import { notFound } from "next/navigation";
import { db } from "~/server/db";
import { cache } from "react";
import { type Metadata } from "next";

const getBook = cache(async (id: string) => {
  return await db.book.findUnique({
    where: { id: parseInt(id) },
  });
});

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const book = await getBook(params.id);

  return {
    title: book ? book.name : "找不到這本書",
  };
}

export default async function BookById({ params }: Props) {
  const book = await getBook(params.id);

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
