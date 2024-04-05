import { getServerAuthSession } from "~/server/auth";
import { notFound } from "next/navigation";
import { db } from "~/server/db";
import { DisplayactivityStatus } from "../translation";
import { Chip } from "@nextui-org/react";
import ActivityTabs from "./tabs";
import JoinButton from "./joinButton";
import { type Activity, type ActivityRole } from "@prisma/client";
import { relativeDate } from "~/utils/date";
import { cache } from "react";
import { type Metadata } from "next";
import Link from "next/link";

type Props = {
  params: { id: string };
};

export type ActivityWithCount = Activity & { _count: { members: number } };

export const queryActivityById = cache(async (id: number) => {
  const session = await getServerAuthSession();
  const members = session ? { where: { userId: session.user.id } } : false;

  return db.activity.findUnique({
    where: {
      id,
    },
    include: {
      _count: {
        select: { members: true },
      },
      members,
    },
  });
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id: number = parseInt(params.id);
  if (isNaN(id)) {
    // TODO: 斷言不可能
    console.error(`活動 id 不是數字：${id}`);
    notFound();
  }
  const activity = await queryActivityById(id);
  if (!activity) {
    notFound();
  }
  return {
    title: activity.name,
  };
}

export function ActivityMeta({
  activity,
  role,
  isSignIn,
  readOnly, // 是否能點擊參加按鈕
}: {
  activity: ActivityWithCount;
  role: ActivityRole | undefined;
  isSignIn: boolean;
  readOnly?: boolean;
}) {
  return (
    <div className="flex flex-col justify-between">
      <div className="flex w-full flex-row justify-between">
        <div className="mb-1 flex flex-row space-x-1">
          <Link href={`/activity/${activity.id}`}>
            <h1 className="text-xl font-bold">{activity.name}</h1>
          </Link>
          <Chip variant="bordered">
            {DisplayactivityStatus(activity.status)}
          </Chip>
        </div>
        {isSignIn && (
          <JoinButton
            joined={role != null}
            activityId={activity.id}
            readOnly={readOnly}
          />
        )}
      </div>
      <div className="text-gray-500">
        <span>建立於{relativeDate(activity.createDate)}</span>．
        <span className="font-bold hover:cursor-pointer hover:underline">
          {/* TODO: 點擊後在 modal 顯示成員 */}
          {activity._count.members} 名成員
        </span>
      </div>
    </div>
  );
}

export default async function ActivityById({ params }: Props) {
  const id: number = parseInt(params.id);
  if (isNaN(id)) {
    // TODO: 斷言不可能
    console.error(`活動 id 不是數字：${id}`);
    notFound();
  }

  const session = await getServerAuthSession();

  const activity = await queryActivityById(id);
  const role: ActivityRole | undefined = activity?.members[0]?.role;

  if (activity == null) {
    notFound();
  }
  return (
    <main className="flex w-screen grow flex-col items-center pt-10 ">
      <div className="flex w-full max-w-xl flex-col space-y-4 px-2">
        <ActivityMeta
          activity={activity}
          role={role}
          isSignIn={session != null}
        />
        <ActivityTabs activity={activity} />
      </div>
    </main>
  );
}
