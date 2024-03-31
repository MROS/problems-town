import { Divider } from "@nextui-org/react";

export const metadata = {
  title: "舉辦活動 | 做題小鎮",
};

export default async function Activity() {
  return (
    <main className="flex grow flex-col">
      <div className="flex w-full flex-col items-center px-4 pt-10">
        <div className="flex w-full max-w-lg flex-col">
          <h1 className="text-lg font-bold">舉辦活動</h1>
          <Divider className="mb-4 mt-2" />
          <div className="space-y-10"></div>
        </div>
      </div>
    </main>
  );
}
