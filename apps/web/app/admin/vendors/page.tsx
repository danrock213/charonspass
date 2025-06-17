'use client';

import { useState } from 'react';
import { useVendors, VendorStatus } from '@/hooks/useVendors';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

const ADMIN_EMAILS = ['youremail@example.com']; // replace with your admin email(s)

export default function AdminVendorListPage() {
  const { vendors, updateVendorStatus } = useVendors();
  const { user, isSignedIn } = useUser();
  const router = useRouter();

  const [filter, setFilter] = useState<'all' | VendorStatus>('pending');

  // Redirect non-admin users away
  if (!isSignedIn) {
    router.push('/sign-in?redirect_url=/admin/vendors');
    return null;
  }
  if (!user || !ADMIN_EMAILS.includes(user.emailAddresses[0].emailAddress)) {
    router.push('/');
    return null;
  }

  const filteredVendors =
    filter === 'all' ? vendors : vendors.filter(v => v.status === filter);

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-[#1D3557]">Vendor Approvals</h1>

      <div className="mb-4 flex space-x-4">
        {['all', 'pending', 'approved', 'rejected'].map(status => (
          <button
            key={status}
            onClick={() => setFilter(status as any)}
            className={`px-4 py-2 rounded ${
              filter === status
                ? 'bg-[#1D3557] text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2 text-left">Name</th>
            <th className="border border-gray-300 p-2 text-left">Category</th>
            <th className="border border-gray-300 p-2 text-left">Status</th>
            <th className="border border-gray-300 p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredVendors.length === 0 && (
            <tr>
              <td colSpan={4} className="text-center p-4 text-gray-500">
                No vendors to show.
              </td>
            </tr>
          )}
          {filteredVendors.map(vendor => (
            <tr key={vendor.id} className="hover:bg-gray-50">
              <td className="border border-gray-300 p-2">{vendor.name}</td>
              <td className="border border-gray-300 p-2">{vendor.category}</td>
              <td className="border border-gray-300 p-2 capitalize">{vendor.status}</td>
              <td className="border border-gray-300 p-2 space-x-2">
                {vendor.status !== 'approved' && (
                  <button
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                    onClick={() => updateVendorStatus(vendor.id, 'approved')}
                  >
                    Approve
                  </button>
                )}
                {vendor.status !== 'rejected' && (
                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    onClick={() => updateVendorStatus(vendor.id, 'rejected')}
                  >
                    Reject
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
