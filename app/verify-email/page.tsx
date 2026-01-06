'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import api from '@/utils/api';

type Status = 'loading' | 'success' | 'error';

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');

  const [status, setStatus] = useState<Status>('loading');
  const [message, setMessage] = useState('Verifying your email...');

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setMessage('Invalid or missing verification link ❌');
      return;
    }

    api
      .get(`/auth/verify-email?token=${token}`)
      .then(() => {
        setStatus('success');
        setMessage('Email verified successfully 🎉');

        setTimeout(() => {
          router.push('/login');
        }, 2500);
      })
      .catch(() => {
        setStatus('error');
        setMessage('Verification failed or link expired ❌');
      });
  }, [token, router]);

  return (
    <div className="w-full max-w-md bg-zinc-900 p-8 rounded-2xl shadow-xl text-center">
      {/* ICON */}
      <div className="mb-6">
        {status === 'loading' && (
          <div className="mx-auto h-12 w-12 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin" />
        )}

        {status === 'success' && (
          <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 text-2xl">
            ✓
          </div>
        )}

        {status === 'error' && (
          <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-red-500/20 text-red-400 text-2xl">
            ✕
          </div>
        )}
      </div>

      {/* TITLE */}
      <h2 className="text-2xl font-bold mb-3">Email Verification</h2>

      {/* MESSAGE */}
      <p
        className={`text-sm ${
          status === 'success'
            ? 'text-emerald-400'
            : status === 'error'
            ? 'text-red-400'
            : 'text-zinc-400'
        }`}
      >
        {message}
      </p>

      {/* FOOTER */}
      {status === 'success' && (
        <p className="text-xs text-zinc-500 mt-4">
          Redirecting to login...
        </p>
      )}
    </div>
  );
}
