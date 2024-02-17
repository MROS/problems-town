"use client";

import { type getProviders, signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

type PromiseResolveType<T> = T extends Promise<infer P> ? P : T;

type Providers = PromiseResolveType<ReturnType<typeof getProviders>>;

export function ProviderButtons({ providers }: { providers: Providers }) {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? window.location.origin;
  return providers ? (
    Object.values(providers).map((provider) => (
      <div key={provider.name}>
        <button onClick={() => signIn(provider.id, { callbackUrl })}>
          {provider.name} 登入
        </button>
      </div>
    ))
  ) : (
    <div>錯誤： 無法載入 Oauth provider</div>
  );
}
