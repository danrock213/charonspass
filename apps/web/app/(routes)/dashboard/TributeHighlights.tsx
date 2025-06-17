'use client';

import { Tribute } from '@/types/tribute';

export default function TributeHighlights({ tributes }: { tributes: Tribute[] }) {
  if (tributes.length === 0) {
    return (
      <section className="mb-6">
        <h2 className="text-xl font-semibold text-[#1D3557] mb-2">Tribute Highlights</h2>
        <p className="text-gray-500">You haven’t created any tributes yet.</p>
      </section>
    );
  }

  const latestTribute = tributes[tributes.length - 1];

  return (
    <section className="mb-6">
      <h2 className="text-xl font-semibold text-[#1D3557] mb-2">Tribute Highlights</h2>
      <div className="border p-4 rounded shadow">
        <h3 className="text-lg font-bold">{latestTribute.name}</h3>
        <p className="text-gray-700">{latestTribute.bio || 'No bio available.'}</p>
        <p className="text-sm text-gray-500">
          {latestTribute.birthDate} – {latestTribute.deathDate}
        </p>
      </div>
    </section>
  );
}
