'use client';

import { Event } from '@/types/dashboard';

export default function UpcomingEvents({ events }: { events: Event[] }) {
  if (events.length === 0) {
    return (
      <section className="mb-6">
        <h2 className="text-xl font-semibold text-[#1D3557] mb-2">Upcoming Events</h2>
        <p className="text-gray-500">No upcoming events.</p>
      </section>
    );
  }

  return (
    <section className="mb-6">
      <h2 className="text-xl font-semibold text-[#1D3557] mb-2">Upcoming Events</h2>
      <ul>
        {events.map(({ id, title, date }) => (
          <li key={id} className="border p-2 rounded mb-2 flex justify-between">
            <span>{title}</span>
            <time dateTime={date} className="text-gray-500">
              {new Date(date).toLocaleDateString()}
            </time>
          </li>
        ))}
      </ul>
    </section>
  );
}
