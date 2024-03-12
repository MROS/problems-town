import { PrismaClient } from "@prisma/client";
import { createBook } from "~/server/api/routers/book/crud";
import BOOKS from "./books";
const db = new PrismaClient();

async function main() {
  for (const book of BOOKS) {
    await createBook(db, book);
  }
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
