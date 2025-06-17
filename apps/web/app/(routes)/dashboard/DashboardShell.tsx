'use client';

import { useState } from 'react';
import { Tribute } from '@/types/tribute';
import { ChecklistItem, Vendor, Event, Activity } from '@/types/dashboard';

import NextChecklistItems from './NextChecklistItems';
import BookedVendors from './BookedVendors';
import UpcomingEvents from './UpcomingEvents';
import RecentActivity from './RecentActivity';
import TributeHighlights from './TributeHighlights';
import QuickLinks from './QuickLinks';
import SummaryStats from './SummaryStats';
import HelpResources from './HelpResources';
import UserProfile from './UserProfile';

export default function DashboardShell({
  firstName,
  tributes,
  checklist,
  vendors,
  events,
  activities,
  allVendorTypes,
}: {
  firstName?: string;
  tributes: Tribute[];
  checklist: ChecklistItem[];
  vendors: Vendor[];
  events: Event[];
  activities: Activity[];
  allVendorTypes: string[];
}) {
  const [checklistItems, setChecklistItems] = useState(checklist);

  function toggleChecklistItem(id: string, checked: boolean) {
    setChecklistItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, checked } : item
      )
    );
  }

  function handleBookVendor(type: string) {
    // For demo, just alert - replace with real logic
    alert(`Navigate to vendor booking for: ${type}`);
  }

  return (
    <main className="max-w-4xl mx-auto p-6">
      <UserProfile firstName={firstName} />
      <h1 className="text-3xl font-bold text-[#1D3557] mb-6">
        Welcome, {firstName || 'Friend'} 🌟
      </h1>

      <SummaryStats
        tributes={tributes}
        vendors={vendors}
        checklist={checklistItems}
      />

      <NextChecklistItems
        items={checklistItems.filter(i => !i.checked).slice(0, 3)}
        onToggleCheck={toggleChecklistItem}
      />

      <BookedVendors
        vendors={vendors}
        allVendorTypes={allVendorTypes}
        onBookVendor={handleBookVendor}
      />

      <UpcomingEvents events={events} />
      <RecentActivity activities={activities} />
      <TributeHighlights tributes={tributes} />
      <QuickLinks />
      <HelpResources />
    </main>
  );
}
