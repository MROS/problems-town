import { z } from "~/utils/chineseZod";

const activityStatusSchema = z.union([
  z.literal("尚未開始"),
  z.literal("進行中"),
  z.literal("取消"),
  z.literal("已結束"),
]);
export type ActivityStatus = z.infer<typeof activityStatusSchema>;

export const activityNameSchema = z.string().min(1).max(256);
export const activityDescriptionSchema = z.string().min(1).max(4096);
