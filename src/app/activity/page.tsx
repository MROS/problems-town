import NewActivityButton from "./newActivityButton";

export const metadata = {
  title: "活動 | 做題小鎮",
};

export default async function Activity() {
  return (
    <main className="flex w-screen grow flex-col items-center pt-10">
      <div className="flex w-full max-w-xl flex-col px-2">
        <div className="mb-3 flex flex-row items-end justify-between">
          <div className="font-bold">活動</div>
          <NewActivityButton />
        </div>
      </div>
    </main>
  );
}
