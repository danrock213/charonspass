import { currentUser } from '@clerk/nextjs/server';
import { getTributes } from '@/lib/data/tributes';

import DashboardShell from './DashboardShell';

export default async function DashboardPage() {
  const user = await currentUser();

  if (!user) {
    return (
      <main className="max-w-2xl mx-auto mt-20 text-center text-gray-500">
        <p>Please sign in to view your dashboard.</p>
      </main>
    );
  }

  // Fetch tributes
  const allTributes = getTributes();
  const userTributes = allTributes.filter(t => t.createdBy === user.id);

  // TODO: Replace these with your real data fetching logic
  const checklist = [
    { id: '1', title: 'Notify family members', dueDate: '2025-06-20', checked: false },
    { id: '2', title: 'Book funeral home', dueDate: '2025-06-22', checked: false },
    { id: '3', title: 'Arrange transportation', dueDate: '2025-06-23', checked: true },
    { id: '4', title: 'Order flowers', dueDate: '2025-06-25', checked: false },
  ];

  const vendors = [
    { id: 'v1', name: 'Sunrise Funeral Home', type: 'Funeral Home', booked: true },
    { id: 'v2', name: 'Peaceful Florists', type: 'Florist', booked: false },
    { id: 'v3', name: 'Memorial Transport', type: 'Transportation', booked: true },
  ];

  const allVendorTypes = ['Funeral Home', 'Florist', 'Transportation', 'Crematorium', 'Grief Counselor'];

  const events = [
    { id: 'e1', title: 'Memorial Service', date: '2025-07-01' },
    { id: 'e2', title: 'Reception', date: '2025-07-01' },
  ];

  const activities = [
    { id: 'a1', message: 'You created a new tribute for Jane Doe.', date: '2025-06-10T10:00:00Z' },
    { id: 'a2', message: 'Vendor "Sunrise Funeral Home" was booked.', date: '2025-06-12T15:00:00Z' },
  ];

  return (
    <DashboardShell
      firstName={user.firstName}
      tributes={userTributes}
      checklist={checklist}
      vendors={vendors}
      allVendorTypes={allVendorTypes}
      events={events}
      activities={activities}
    />
  );
}
