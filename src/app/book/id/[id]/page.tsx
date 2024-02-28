import { notFound } from "next/navigation";
import { db } from "~/server/db";

export default async function BookById({ params }: { params: { id: string } }) {
  const book = await db.book.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (book == null) {
    notFound();
  }

  return <div>{book.name}</div>;
}
