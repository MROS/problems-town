import { getServerAuthSession } from "~/server/auth";

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <main className="flex grow flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="flex flex-col items-center justify-center">
            <p className="text-center text-2xl">
              {session && <span>你好！ {session.user?.name}</span>}
            </p>
            <p className="text-center text-2xl">歡迎來到做題小鎮</p>
          </div>
        </div>
      </div>
    </main>
  );
}
