import { lightFormat } from "date-fns";
import { notFound } from "next/navigation";
import { type Metadata } from "next";
import { getBookAndChapterNodes, queryBookById } from "./queryBook";
import { ChapterTreeChildren } from "./chapterTree";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const book = await queryBookById(params.id);
  return {
    title: book ? book.name : "找不到這本書",
  };
}

export default async function BookById({ params }: Props) {
  const data = await getBookAndChapterNodes(params.id);
  if (data == null) {
    notFound();
  }
  const { book, root } = data;

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
              <>
                <div>
                  <span className="text-gray-500">譯者：</span>
                  {book.translators.join(" / ")}
                </div>
                <div>
                  <span className="text-gray-500">原作名：</span>
                  {book.originalName}
                </div>
              </>
            ) : (
              <></>
            )}
            <div>
              <span className="text-gray-500">出版時間：</span>
              {book.publishDate
                ? lightFormat(book.publishDate, "yyyy-MM-dd")
                : "無資料"}
            </div>
            {book.pageNumber ? (
              <div>
                <span className="text-gray-500">頁數：</span>
                {book.pageNumber}
              </div>
            ) : (
              <></>
            )}
            {book.ISBN ? (
              <div>
                <span className="text-gray-500">ISBN：</span>
                {book.ISBN}
              </div>
            ) : (
              <></>
            )}
          </div>
          <div className="mt-4">
            <h2 className="mb-1 text-lg font-bold text-primary-500">目錄</h2>
            <ChapterTreeChildren childrenNodes={root.children} />
          </div>
        </div>
      </div>
    </main>
  );
}
