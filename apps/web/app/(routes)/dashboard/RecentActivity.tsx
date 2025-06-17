'use client';

import { Activity } from '@/types/dashboard';

export default function RecentActivity({ activities }: { activities: Activity[] }) {
  if (activities.length === 0) {
    return (
      <section className="mb-6">
        <h2 className="text-xl font-semibold text-[#1D3557] mb-2">Recent Activity</h2>
        <p className="text-gray-500">No recent activity.</p>
      </section>
    );
  }

  return (
    <section className="mb-6">
      <h2 className="text-xl font-semibold text-[#1D3557] mb-2">Recent Activity</h2>
      <ul>
        {activities.map(({ id, message, date }) => (
          <li key={id} className="border p-2 rounded mb-2">
            <p>{message}</p>
            <time dateTime={date} className="text-gray-500 text-sm">
              {new Date(date).toLocaleString()}
            </time>
          </li>
        ))}
      </ul>
    </section>
  );
}
