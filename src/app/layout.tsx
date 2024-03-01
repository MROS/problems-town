import "~/styles/globals.css";

import { Inter } from "next/font/google";

import { Providers } from "./providers";
import Navigation from "./navigation";
import SetNameModal from "./setNameModal";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "做題小鎮",
  description: "不再孤獨學習！",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-Hant" className="light">
      <body className={`font-sans ${inter.variable}`}>
        <Providers>
          <Navigation />
          <SetNameModal />
          {children}
        </Providers>
      </body>
    </html>
  );
}
