'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/authContext';
import { vendors } from '@/data/vendors';

export default function PendingApprovalsPage() {
  const { user } = useAuth();
  const router = useRouter();

  // Redirect if not logged in or not an admin
  useEffect(() => {
    if (!user) {
      router.replace('/user-auth');
    } else if (user.role !== 'admin') {
      alert('Access denied: Admins only.');
      router.replace('/');
    }
  }, [user, router]);

  const pendingVendors = vendors.filter((v) => !v.approved);

  const handleApprove = (vendorId: string) => {
    // Simulate backend call
    console.log(`Approved vendor with ID: ${vendorId}`);
    // In a real app, you’d update vendor.approved in your backend/db
  };

  if (!user || user.role !== 'admin') {
    return null; // Prevent flicker before redirect
  }

  return (
    <main className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-[#1D3557] mb-4">Pending Vendor Approvals</h1>
      {pendingVendors.length === 0 ? (
        <p className="text-gray-600">No vendors pending approval.</p>
      ) : (
        <ul className="space-y-4">
          {pendingVendors.map((vendor) => (
            <li
              key={vendor.id}
              className="border rounded p-4 flex justify-between items-center"
            >
              <div>
                <p className="text-lg font-semibold text-[#1D3557]">{vendor.name}</p>
                <p className="text-sm text-gray-600">{vendor.location}</p>
              </div>
              <button
                onClick={() => handleApprove(vendor.id)}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
              >
                Approve
              </button>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
