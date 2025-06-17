// app/vendor/dashboard/VendorDashboardShell.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export type VendorListing = {
  id: string;
  title: string;
  category: string;
  location: string;
  active: boolean;
};

export default function VendorDashboardShell({
  businessName,
  listings,
  stats,
}: {
  businessName: string;
  listings: VendorListing[];
  stats: { views: number; leads: number; approved: boolean };
}) {
  const router = useRouter();
  const [vendorListings, setVendorListings] = useState(listings);

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Welcome, {businessName}!</h1>

      <section className="mb-6 grid grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded shadow">
          <h2 className="text-lg font-semibold">Views</h2>
          <p className="text-2xl">{stats.views}</p>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <h2 className="text-lg font-semibold">Leads</h2>
          <p className="text-2xl">{stats.leads}</p>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <h2 className="text-lg font-semibold">Approved</h2>
          <p className="text-2xl">{stats.approved ? '✅' : '❌'}</p>
        </div>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Your Listings</h2>
        {vendorListings.length > 0 ? (
          <ul className="space-y-4 divide-y">
            {vendorListings.map((item) => (
              <li key={item.id} className="py-4 flex justify-between items-center">
                <div>
                  <p className="font-bold">{item.title}</p>
                  <p className="text-sm text-gray-500">{item.category} — {item.location}</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    className="px-3 py-1 border rounded hover:bg-gray-100"
                    onClick={() => router.push(`/vendor/listings/edit?id=${item.id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-3 py-1 border rounded hover:bg-gray-100"
                    onClick={() => {
                      setVendorListings((prev) =>
                        prev.map((l) =>
                          l.id === item.id ? { ...l, active: !l.active } : l
                        )
                      );
                    }}
                  >
                    {item.active ? 'Deactivate' : 'Activate'}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>You haven’t added any listings yet.</p>
        )}
        <button
          onClick={() => router.push('/vendor/listings/edit')}
          className="mt-4 px-4 py-2 bg-[#1D3557] text-white rounded hover:bg-[#457B9D]"
        >
          + Add New Listing
        </button>
      </section>
    </main>
  );
}
