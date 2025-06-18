import { currentUser } from '@clerk/nextjs/server';
import DashboardShell from './DashboardShell';
import type { Tribute } from '@/types/tribute';
import type { ChecklistItem, Vendor, Event, Activity } from '@/types/dashboard';

export default async function DashboardPage() {
  const user = await currentUser();

  if (!user) {
    return (
      <main className="max-w-2xl mx-auto mt-20 text-center text-gray-500">
        <p>Please sign in to view your dashboard.</p>
      </main>
    );
  }

  // Ensure firstName is string or undefined (not null)
  const firstName = user.firstName ?? undefined;

  // TODO: Replace with real fetch logic (example type assigned)
  const userTributes: Tribute[] = []; // Explicitly typed empty array

  // Sample checklist typed as ChecklistItem[]
  const checklist: ChecklistItem[] = [
    { id: '1', title: 'Notify family members', dueDate: '2025-06-20', checked: false },
    { id: '2', title: 'Book funeral home', dueDate: '2025-06-22', checked: false },
    { id: '3', title: 'Arrange transportation', dueDate: '2025-06-23', checked: true },
    { id: '4', title: 'Order flowers', dueDate: '2025-06-25', checked: false },
  ];

  const vendors: Vendor[] = [
    { id: 'v1', name: 'Sunrise Funeral Home', type: 'Funeral Home', booked: true },
    { id: 'v2', name: 'Peaceful Florists', type: 'Florist', booked: false },
    { id: 'v3', name: 'Memorial Transport', type: 'Transportation', booked: true },
  ];

  const allVendorTypes: string[] = ['Funeral Home', 'Florist', 'Transportation', 'Crematorium', 'Grief Counselor'];

  const events: Event[] = [
    { id: 'e1', title: 'Memorial Service', date: '2025-07-01' },
    { id: 'e2', title: 'Reception', date: '2025-07-01' },
  ];

  const activities: Activity[] = [
    { id: 'a1', message: 'You created a new tribute for Jane Doe.', date: '2025-06-10T10:00:00Z' },
    { id: 'a2', message: 'Vendor "Sunrise Funeral Home" was booked.', date: '2025-06-12T15:00:00Z' },
  ];

  return (
    <DashboardShell
      firstName={firstName}
      tributes={userTributes}
      checklist={checklist}
      vendors={vendors}
      allVendorTypes={allVendorTypes}
      events={events}
      activities={activities}
    />
  );
}
