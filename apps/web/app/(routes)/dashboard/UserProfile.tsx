'use client';

import { useRouter } from 'next/navigation';

export default function UserProfile({
  firstName,
  onSignOut,
}: {
  firstName?: string;
  onSignOut?: () => void;
}) {
  const router = useRouter();

  return (
    <section className="mb-6 flex justify-between items-center">
      <p className="text-[#1D3557] font-semibold">Logged in as {firstName || 'User'}</p>
      <button
        onClick={() => {
          onSignOut ? onSignOut() : router.push('/signout');
        }}
        className="px-3 py-1 border rounded text-[#1D3557] hover:bg-gray-100"
      >
        Sign Out
      </button>
    </section>
  );
}
