"use client";

import { useState } from "react";
import api from "@/utils/api";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const signup = async () => {
    setLoading(true);
    setError("");
    setMessage("");

    try {
      await api.post("/auth/signup", {
        name,
        email,
        password,
      });

      setMessage(
        "Signup successful 🎉 Please check your email to verify your account."
      );

      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (err: any) {
      setError(
        err?.response?.data?.message || "Something went wrong. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-zinc-900 p-8 rounded-2xl shadow-xl">
      <h2 className="text-3xl font-bold mb-6 text-center">Create Account</h2>

      {/* SUCCESS MESSAGE */}
      {message && (
        <div className="mb-4 p-3 rounded bg-emerald-500/20 text-emerald-400 text-sm">
          {message}
        </div>
      )}

      {/* ERROR MESSAGE */}
      {error && (
        <div className="mb-4 p-3 rounded bg-red-500/20 text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* FORM */}
      <input
        className="w-full mb-4 p-3 rounded bg-zinc-800"
        placeholder="Full Name"
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="w-full mb-4 p-3 rounded bg-zinc-800"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        className="w-full mb-4 p-3 rounded bg-zinc-800"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      {/* EMAIL SIGNUP BUTTON */}
      <button
        onClick={signup}
        disabled={loading}
        className={`w-full p-3 rounded-xl font-semibold transition ${
          loading
            ? "bg-emerald-600/50 cursor-not-allowed"
            : "bg-emerald-600 hover:bg-emerald-700"
        }`}
      >
        {loading ? "Creating account..." : "Sign Up"}
      </button>

      {/* DIVIDER */}
      <div className="flex items-center my-6">
        <div className="flex-1 h-px bg-zinc-700" />
        <span className="px-3 text-xs text-zinc-500">OR</span>
        <div className="flex-1 h-px bg-zinc-700" />
      </div>

      {/* GOOGLE SIGNUP BUTTON */}
      <a
        href="http://localhost:3000/auth/google"
        className="block w-full text-center bg-red-600 hover:bg-red-700 p-3 rounded-xl font-semibold transition"
      >
        Continue with Google
      </a>

      <p className="text-center text-sm mt-6 text-zinc-400">
        Already have an account?{" "}
        <a href="/login" className="text-indigo-400">
          Login
        </a>
      </p>
    </div>
  );
}
