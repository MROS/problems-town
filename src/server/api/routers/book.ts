import { newBookSchema } from "~/app/book/create/zodSchema";

import { createTRPCRouter, authenticatedProcedure } from "~/server/api/trpc";

export const bookRouter = createTRPCRouter({
  create: authenticatedProcedure
    .input(newBookSchema)
    .mutation(async ({ ctx, input }) => {
      console.log(JSON.stringify(input, null, 2));
      return;
    }),
});
