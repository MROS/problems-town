import { z } from "~/utils/chineseZod";
import { authenticatedProcedure, createTRPCRouter } from "~/server/api/trpc";
import {
  activityNameSchema,
  activityDescriptionSchema,
  activityStatusSchema,
} from "~/app/activity/create/zodSchema";

export const activityRouter = createTRPCRouter({
  create: authenticatedProcedure
    .input(
      z.object({
        name: activityNameSchema,
        description: activityDescriptionSchema,
        status: activityStatusSchema,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // 建立書本
      const createActivityResult = await ctx.db.activity.create({
        data: {
          name: input.name,
          status: input.status,
          description: input.description,
        },
      });

      return createActivityResult.id;
    }),
});
