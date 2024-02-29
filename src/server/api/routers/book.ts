import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { newBookSchema } from "~/app/book/create/zodSchema";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const bookRouter = createTRPCRouter({
  // TODO: 只有登入用戶才能新增書籍
  create: publicProcedure
    .input(newBookSchema)
    .mutation(async ({ ctx, input }) => {
      let createBookResult;
      try {
        createBookResult = await ctx.db.book.create({
          data: {
            name: input.name,
            ISBN: input.ISBN,
            authors: input.authors,
            isTranslated: input.translators != null,
            translators: input.translators ?? [],
            originalName: input.originalName,
            publishDate: input.date,
            pageNumber: input.pageNumber,
          },
        });
        return createBookResult.id;
      } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          if (e.code == "P2002") {
            throw new TRPCError({
              message: "此 ISBN 已經存在",
              code: "CONFLICT",
            });
          }
          throw e;
        }
      }
    }),
});
