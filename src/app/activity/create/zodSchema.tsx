import { z } from "~/utils/chineseZod";

export const activityStatusSchema = z.union([
  z.literal("NOT_START"),
  z.literal("ACTIVE"),
  z.literal("CANCEL"),
  z.literal("ENDED"),
]);
export type ActivityStatus = z.infer<typeof activityStatusSchema>;

export const activityNameSchema = z.string().min(1).max(256);
export const activityDescriptionSchema = z.string().min(1).max(4096);
