import { z } from "~/utils/chineseZod";
import { authenticatedProcedure, createTRPCRouter } from "~/server/api/trpc";

// TODO: 建立一個檔案，專門定義對應 prisma 類型
const TextFormatSchema = z.union([
  z.literal("MARKDOWN"),
  z.literal("IMAGE_URL"),
]);

export const answerRouter = createTRPCRouter({
  create: authenticatedProcedure
    .input(
      z.object({
        exerciseId: z.string(),
        text: z.string(),
        format: TextFormatSchema,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // 建立書本
      const createAnswerResult = await ctx.db.answer.create({
        data: {
          exerciseId: input.exerciseId,
          format: input.format,
          text: input.text,
          authorId: ctx.session.user.id,
        },
      });

      return createAnswerResult.id;
    }),
});
