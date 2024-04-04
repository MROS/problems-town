import { z } from "~/utils/chineseZod";
import { authenticatedProcedure, createTRPCRouter } from "~/server/api/trpc";
import {
  activityNameSchema,
  activityDescriptionSchema,
  activityStatusSchema,
} from "~/app/activity/create/zodSchema";
import { ActivityRole } from "@prisma/client";

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
      const userId = ctx.session.user.id;
      const createActivityResult = await ctx.db.activity.create({
        data: {
          name: input.name,
          status: input.status,
          description: input.description,
          members: { create: [{ userId, role: ActivityRole.OWNER }] },
        },
      });

      return createActivityResult.id;
    }),
  join: authenticatedProcedure
    .input(
      z.object({
        id: z.number(), // 活動 id
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // 建立書本
      const userId = ctx.session.user.id;
      await ctx.db.activityMembers.create({
        data: {
          userId,
          activityId: input.id,
          role: ActivityRole.BASE,
        },
      });

      return null;
    }),
});
