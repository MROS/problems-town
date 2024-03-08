import { z } from "~/utils/chineseZod";

import { authenticatedProcedure, createTRPCRouter } from "~/server/api/trpc";
export const answerRouter = createTRPCRouter({
  create: authenticatedProcedure
    .input(z.object({ exerciseId: z.string(), text: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // 建立書本
      const createAnswerResult = await ctx.db.answer.create({
        data: {
          exerciseId: input.exerciseId,
          text: input.text,
          authorId: ctx.session.user.id,
        },
      });

      return createAnswerResult.id;
    }),
});
