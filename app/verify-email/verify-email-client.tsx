"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import api from "@/utils/api";

export default function VerifyEmailClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [message, setMessage] = useState("Verifying your email...");

  useEffect(() => {
    if (!token) {
      setMessage("Invalid or expired verification link ❌");
      return;
    }

    api
      .get(`/auth/verify-email?token=${token}`)
      .then(() => {
        setMessage("Email verified successfully 🎉");
        setTimeout(() => router.push("/login"), 2000);
      })
      .catch(() => {
        setMessage("Verification failed or link expired ❌");
      });
  }, [token, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950">
      <div className="bg-zinc-900 p-8 rounded-2xl shadow-xl text-center max-w-md">
        <h2 className="text-2xl font-bold mb-4">Email Verification</h2>
        <p className="text-zinc-400">{message}</p>
      </div>
    </div>
  );
}
