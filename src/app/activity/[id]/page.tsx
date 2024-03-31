import { notFound } from "next/navigation";
import { MyMarkdown } from "~/app/_components/myMarkdown";
import { db } from "~/server/db";

type Props = {
  params: { id: string };
};

export default async function ActivityById({ params }: Props) {
  const id = parseInt(params.id);
  if (isNaN(id)) {
    // TODO: 斷言不可能
  }

  const activity = await db.activity.findUnique({
    where: {
      id,
    },
  });

  if (activity == null) {
    notFound();
  }
  return (
    <main className="flex w-screen grow flex-col items-center pt-10 ">
      <div className="flex w-full max-w-xl flex-col px-2">
        <div className="mb-3 flex flex-col justify-between">
          <h1 className="text-xl font-bold">{activity.name}</h1>
          <h2 className="mb-1 text-lg font-bold text-primary-500">活動內容</h2>
          <MyMarkdown>{activity.description}</MyMarkdown>
        </div>
      </div>
    </main>
  );
}
