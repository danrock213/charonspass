'use client';

import { useState } from 'react';
import Link from 'next/link';

interface AuthFormProps {
  mode: 'sign-in' | 'sign-up';
  userType: 'user' | 'vendor';
}

export default function AuthForm({ mode, userType }: AuthFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isSignIn = mode === 'sign-in';
  const isUser = userType === 'user';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Connect to API or logic
    console.log({ email, password, mode, userType });
  };

  return (
    <>
      <h1 className="text-2xl font-bold text-center text-[#1D3557] mb-4">
        {isSignIn ? 'Sign In' : 'Sign Up'} as {isUser ? 'User' : 'Vendor'}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1D3557]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1D3557]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#1D3557] hover:bg-[#F4A261] text-white font-semibold py-2 px-4 rounded transition"
        >
          {isSignIn ? 'Sign In' : 'Sign Up'}
        </button>
      </form>

      <div className="text-center text-sm text-gray-600 mt-4">
        {isSignIn ? (
          <>
            Don't have an account?{' '}
            <Link
              href={`/${userType === 'user' ? 'sign-up' : 'vendor-sign-up'}`}
              className="text-[#1D3557] hover:underline"
            >
              Sign Up
            </Link>
          </>
        ) : (
          <>
            Already have an account?{' '}
            <Link
              href={`/${userType === 'user' ? 'user-auth' : 'vendor-auth'}`}
              className="text-[#1D3557] hover:underline"
            >
              Sign In
            </Link>
          </>
        )}
      </div>
    </>
  );
}
