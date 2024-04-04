"use client";
import { type Activity } from "@prisma/client";
import { Tab, Tabs } from "@nextui-org/react";
import { MyMarkdown } from "~/app/_components/myMarkdown";

type Props = {
  activity: Activity;
};

function About({ activity }: Props) {
  return (
    <div className="mt-4">
      <div className="markdown-body">
        <MyMarkdown headingIncrease={1}>{activity.description}</MyMarkdown>
      </div>
    </div>
  );
}

function Tasks({ activity }: Props) {
  return (
    <div className="flex flex-row justify-center">
      <div className="mt-2 text-gray-500">目前尚無任務</div>
    </div>
  );
}

export default function ActivityTabs({ activity }: Props) {
  return (
    <Tabs variant="underlined">
      <Tab key="任務" title="任務">
        <Tasks activity={activity} />
      </Tab>
      <Tab key="介紹" title="介紹">
        <About activity={activity} />
      </Tab>
    </Tabs>
  );
}
