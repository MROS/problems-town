import { getProviders } from "next-auth/react";
import { ProviderButtons } from "./providerButtons";
import { Suspense } from "react";

export default async function SignIn() {
  const providers = await getProviders();
  return (
    <main className="flex grow flex-col items-center justify-center">
      <Suspense>
        <ProviderButtons providers={providers} />
      </Suspense>
    </main>
  );
}
