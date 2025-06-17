'use client';

import { useRouter } from 'next/navigation';

export default function QuickLinks() {
  const router = useRouter();

  return (
    <section className="mb-6">
      <h2 className="text-xl font-semibold text-[#1D3557] mb-2">Quick Links</h2>
      <div className="flex flex-wrap gap-4">
        <button
          onClick={() => router.push('/tribute/new')}
          className="px-4 py-2 bg-[#1D3557] text-white rounded hover:bg-[#457B9D]"
        >
          + Create Tribute
        </button>
        <button
          onClick={() => router.push('/checklist')}
          className="px-4 py-2 border rounded text-[#1D3557] hover:bg-gray-100"
        >
          Open Checklist
        </button>
        <button
          onClick={() => router.push('/vendors')}
          className="px-4 py-2 border rounded text-[#1D3557] hover:bg-gray-100"
        >
          Browse Vendors
        </button>
      </div>
    </section>
  );
}
