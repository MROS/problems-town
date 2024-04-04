import { type Activity } from "@prisma/client";
import NewActivityButton from "./newActivityButton";
import { db } from "~/server/db";
import { Link } from "@nextui-org/react";

export const metadata = {
  title: "活動 | 做題小鎮",
};

function ShowActivities({ activities }: { activities: Activity[] }) {
  // TODO: 顯示活動的更多資訊
  return (
    <div>
      {activities.map((activity) => {
        return (
          <div key={activity.id}>
            <Link href={`/activity/${activity.id}`}>{activity.name}</Link>
          </div>
        );
      })}
    </div>
  );
}

export default async function Activity() {
  // TODO: 僅顯示近期的活動
  const activities = await db.activity.findMany({});
  return (
    <main className="flex w-screen grow flex-col items-center pt-10">
      <div className="flex w-full max-w-xl flex-col px-2">
        <div className="mb-3 flex flex-row items-end justify-between">
          <div className="font-bold">活動</div>
          <NewActivityButton />
        </div>
        <ShowActivities activities={activities} />
      </div>
    </main>
  );
}
