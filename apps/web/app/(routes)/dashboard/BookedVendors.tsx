'use client';

import { Vendor } from '@/types/dashboard';

interface BookedVendorsProps {
  vendors: Vendor[];
  allVendorTypes: string[];
  onBookVendor?: (type: string) => void;
}

export default function BookedVendors({ vendors, allVendorTypes, onBookVendor }: BookedVendorsProps) {
  const booked = vendors.filter((v) => v.booked);
  const bookedTypes = new Set(booked.map((v) => v.type));
  const missingTypes = allVendorTypes.filter((type) => !bookedTypes.has(type));

  return (
    <section className="mb-6">
      <h2 className="text-xl font-semibold text-[#1D3557] mb-2">Booked Vendors</h2>
      {booked.length > 0 ? (
        <ul className="mb-4">
          {booked.map((v) => (
            <li key={v.id} className="border p-2 rounded mb-2">
              <strong>{v.name}</strong> — <em>{v.type}</em>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 mb-4">You haven’t booked any vendors yet.</p>
      )}

      {missingTypes.length > 0 && (
        <>
          <h3 className="text-lg font-semibold text-[#1D3557] mb-2">Vendors to Book</h3>
          <ul className="flex flex-wrap gap-2">
            {missingTypes.map((type) => (
              <li key={type}>
                <button
                  onClick={() => onBookVendor?.(type)}
                  className="px-3 py-1 bg-[#1D3557] text-white rounded hover:bg-[#457B9D]"
                >
                  Book {type}
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}
