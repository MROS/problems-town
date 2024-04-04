import { getServerAuthSession } from "~/server/auth";
import { notFound } from "next/navigation";
import { db } from "~/server/db";
import { DisplayactivityStatus } from "../translation";
import { Chip } from "@nextui-org/react";
import ActivityTabs from "./tabs";
import JoinButton from "./joinButton";
import { type ActivityRole } from "@prisma/client";

type Props = {
  params: { id: string };
};

export default async function ActivityById({ params }: Props) {
  const id: number = parseInt(params.id);
  if (isNaN(id)) {
    // TODO: 斷言不可能
    console.error(`活動 id 不是數字：${id}`);
    notFound();
  }

  const session = await getServerAuthSession();
  const activity = await db.activity.findUnique({
    where: {
      id,
    },
  });

  let role: ActivityRole | null = null;
  if (session) {
    const activityMember = await db.activityMembers.findFirst({
      where: {
        activityId: id,
        userId: session.user.id,
      },
    });
    if (activityMember) {
      role = activityMember.role;
    }
  }

  if (activity == null) {
    notFound();
  }
  return (
    <main className="flex w-screen grow flex-col items-center pt-10 ">
      <div className="flex w-full max-w-xl flex-col px-2">
        <div className="mb-3 flex flex-col justify-between">
          <div className="mb-1 flex w-full flex-row justify-between">
            <div className="mb-1 flex flex-row space-x-1">
              <h1 className="text-xl font-bold">{activity.name}</h1>
              <Chip variant="bordered">
                {DisplayactivityStatus(activity.status)}
              </Chip>
            </div>
            {session && (
              <JoinButton joined={role != null} activityId={activity.id} />
            )}
          </div>
        </div>
        <ActivityTabs activity={activity} />
      </div>
    </main>
  );
}
