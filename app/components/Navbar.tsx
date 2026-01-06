"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <nav className="w-full bg-zinc-900 absolute top-0 border-b border-zinc-800">
      <div className="max-w-6xl mx-auto px-8 h-16 flex items-center justify-between">
        {/* LOGO */}
        <Link href="/products" className="text-xl font-bold text-indigo-400">
          Pragra<span className="text-white">Shop</span>
        </Link>

        {/* NAV LINKS */}
        <div className="flex items-center gap-6">
          <Link
            href="/products"
            className="text-sm text-zinc-300 hover:text-white"
          >
            Products
          </Link>

          <Link
            href="/orders"
            className="text-sm text-zinc-300 hover:text-white"
          >
            Orders
          </Link>

          <button
            onClick={logout}
            className="text-sm bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-semibold"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
