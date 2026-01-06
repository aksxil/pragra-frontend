import { Suspense } from "react";
import OAuthSuccessClient from "./oauth-success-client";

export default function OAuthSuccessPage() {
  return (
    <Suspense fallback={<Loading />}>
      <OAuthSuccessClient />
    </Suspense>
  );
}

function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950">
      <p className="text-zinc-400">Signing you in...</p>
    </div>
  );
}
