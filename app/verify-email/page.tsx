import { Suspense } from "react";
import VerifyEmailClient from "./verify-email-client";

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<Loading />}>
      <VerifyEmailClient />
    </Suspense>
  );
}

function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950">
      <p className="text-zinc-400">Verifying your email...</p>
    </div>
  );
}
