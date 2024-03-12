import { newBookSchema } from "~/app/book/create/zodSchema";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { createBook } from "./crud";

export const bookRouter = createTRPCRouter({
  // TODO: 只有登入用戶才能新增書籍
  create: publicProcedure
    .input(newBookSchema)
    .mutation(async ({ ctx, input }) => {
      return createBook(ctx.db, input);
    }),
});
