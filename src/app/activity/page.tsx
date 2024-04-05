import { type Activity } from "@prisma/client";
import NewActivityButton from "./newActivityButton";
import { db } from "~/server/db";
import { getServerAuthSession } from "~/server/auth";
import { ActivityMeta } from "./[id]/page";
import Link from "next/link";
import { Divider } from "@nextui-org/react";

export const metadata = {
  title: "活動 | 做題小鎮",
};

export default async function Activity() {
  // TODO: 僅顯示近期的活動
  const session = await getServerAuthSession();
  const members = session ? { where: { userId: session.user.id } } : false;
  const activities = await db.activity.findMany({
    include: {
      _count: {
        select: { members: true },
      },
      members,
    },
  });
  return (
    <main className="flex w-screen grow flex-col items-center pt-10">
      <div className="flex w-full max-w-xl flex-col px-2">
        <div className="flex flex-row items-end justify-between">
          <div className="font-bold">活動</div>
          <NewActivityButton />
        </div>
        <Divider className="mb-4 mt-2" />
        <div className="flex flex-col space-y-2">
          {activities.map((activity) => (
            <Link key={activity.id} href={`/activity/${activity.id}`}>
              <div className="rounded-md bg-slate-50 p-2">
                <ActivityMeta
                  activity={activity}
                  role={activity.members[0]?.role}
                  isSignIn={session != null}
                  readOnly={true}
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
