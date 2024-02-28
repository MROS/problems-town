import { notFound, redirect } from "next/navigation";
import { db } from "~/server/db";

export default async function BookByISBN({
  params,
}: {
  params: { isbn: string };
}) {
  const book = await db.book.findUnique({
    where: { ISBN: params.isbn },
    select: { id: true },
  });

  if (book) {
    redirect(`/book/id/${book.id}`);
  }
  notFound();
}
