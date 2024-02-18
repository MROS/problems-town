import { getProviders } from "next-auth/react";
import { ProviderButtons } from "./providerButtons";
import { Suspense } from "react";

export default async function SignIn() {
  const providers = await getProviders();
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <Suspense>
          <ProviderButtons providers={providers} />
        </Suspense>
      </div>
    </main>
  );
}
