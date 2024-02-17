"use client";

import { NextUIProvider } from "@nextui-org/react";
import { TRPCReactProvider } from "~/trpc/react";
import { SessionProvider } from "next-auth/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <SessionProvider>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </SessionProvider>
    </NextUIProvider>
  );
}
