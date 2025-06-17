// app/vendor/dashboard/page.tsx

import { currentUser } from '@clerk/nextjs/server';
import VendorDashboardShell, { VendorListing } from './VendorDashboardShell';

export default async function VendorDashboardPage() {
  const user = await currentUser();

  if (!user || user.publicMetadata.role !== 'vendor') {
    return (
      <main className="max-w-2xl mx-auto mt-20 text-center text-gray-500">
        <p>You do not have access to this vendor dashboard.</p>
      </main>
    );
  }

  // 🔧 Replace these mocks with actual data fetching later
  const listings: VendorListing[] = [
    { id: 'l1', title: 'Elegant Catering', category: 'Catering', location: 'NYC', active: true },
    { id: 'l2', title: 'Comfort Transport', category: 'Transportation', location: 'NYC', active: false },
  ];
  const stats = { views: 150, leads: 12, approved: true };

  return <VendorDashboardShell businessName={user.firstName || user.emailAddresses[0].emailAddress} listings={listings} stats={stats} />;
}
