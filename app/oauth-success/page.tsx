'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function OAuthSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const token = searchParams.get('token');

    if (token) {
      // Save JWT
      localStorage.setItem('token', token);

      // Redirect to products
      router.push('/products');
    } else {
      router.push('/login');
    }
  }, [router, searchParams]);

  return (
    <div className="w-full max-w-md bg-zinc-900 p-8 rounded-2xl shadow-xl text-center">
      <h2 className="text-2xl font-bold mb-2">Signing you in…</h2>
      <p className="text-zinc-400">
        Please wait while we complete your login
      </p>
    </div>
  );
}
