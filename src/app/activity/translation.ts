import { type ActivityStatus } from "@prisma/client";

export function DisplayactivityStatus(status: ActivityStatus) {
  switch (status) {
    case "NOT_START":
      return "尚未開始";
    case "ACTIVE":
      return "進行中";
    case "CANCEL":
      return "取消";
    case "ENDED":
      return "已結束";
  }
}
