"use client";

import { useState } from "react";
import api from "@/utils/api";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const login = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      router.push("/products");
    } catch (err: any) {
      setError(
        err?.response?.data?.message || "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-zinc-900 p-8 rounded-2xl shadow-xl">
      <h2 className="text-3xl font-bold mb-6 text-center">Welcome Back</h2>

      {/* ERROR MESSAGE */}
      {error && (
        <div className="mb-4 p-3 rounded bg-red-500/20 text-red-400 text-sm">
          {error}
        </div>
      )}

      <input
        className="w-full mb-4 p-3 rounded bg-zinc-800 outline-none"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        className="w-full mb-4 p-3 rounded bg-zinc-800 outline-none"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      {/* EMAIL LOGIN BUTTON */}
      <button
        onClick={login}
        disabled={loading}
        className={`w-full p-3 rounded-xl font-semibold transition ${
          loading
            ? "bg-indigo-600/50 cursor-not-allowed"
            : "bg-indigo-600 hover:bg-indigo-700"
        }`}
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      {/* DIVIDER */}
      <div className="flex items-center my-6">
        <div className="flex-1 h-px bg-zinc-700" />
        <span className="px-3 text-xs text-zinc-500">OR</span>
        <div className="flex-1 h-px bg-zinc-700" />
      </div>

      {/* GOOGLE LOGIN BUTTON */}
       <a
         href={`${process.env.NEXT_PUBLIC_API_URL}/auth/google`}
        className="block w-full text-center bg-red-600 hover:bg-red-700 p-3 rounded-xl font-semibold transition"
      >
        Continue with Google
      </a>

      <p className="text-center text-sm mt-6 text-zinc-400">
        No account?{" "}
        <a href="/signup" className="text-indigo-400">
          Sign up
        </a>
      </p>
    </div>
  );
}
