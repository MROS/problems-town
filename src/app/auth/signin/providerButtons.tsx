"use client";

import { Button } from "@nextui-org/react";
import { type getProviders, signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { FaDiscord } from "react-icons/fa6";

type PromiseResolveType<T> = T extends Promise<infer P> ? P : T;

type Providers = PromiseResolveType<ReturnType<typeof getProviders>>;

const IconByProvider = new Map<string, JSX.Element>();
IconByProvider.set("Discord", <FaDiscord />);

export function ProviderButtons({ providers }: { providers: Providers }) {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? window.location.origin;
  return providers ? (
    Object.values(providers).map((provider) => (
      <div key={provider.name}>
        <Button
          variant="bordered"
          size="lg"
          onClick={() => signIn(provider.id, { callbackUrl })}
          startContent={IconByProvider.get(provider.name)}
        >
          {provider.name} 登入
        </Button>
      </div>
    ))
  ) : (
    <div>錯誤： 無法載入 Oauth provider</div>
  );
}
