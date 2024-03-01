import "~/styles/globals.css";
import "~/styles/github-markdown-light.css"; // TODO: 自己寫一份以縮小打包體積

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex w-full grow flex-col items-center pt-4 ">
      <div className="flex w-full max-w-xl flex-col px-2">
        <div className="markdown-body flex flex-col justify-between pb-40 pt-6">
          {children}
        </div>
      </div>
    </main>
  );
}
