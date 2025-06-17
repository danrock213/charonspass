'use client';

import { ChecklistItem } from '@/types/dashboard';

export default function NextChecklistItems({
  items,
  onToggleCheck,
}: {
  items: ChecklistItem[];
  onToggleCheck?: (id: string, checked: boolean) => void;
}) {
  if (items.length === 0) {
    return <p className="text-gray-500">All checklist items completed! 🎉</p>;
  }

  return (
    <section className="mb-6">
      <h2 className="text-xl font-semibold text-[#1D3557] mb-2">Next Checklist Items</h2>
      <ul>
        {items.map(({ id, title, dueDate, checked }) => (
          <li key={id} className="flex items-center justify-between mb-2 p-2 border rounded">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={checked}
                onChange={() => onToggleCheck && onToggleCheck(id, !checked)}
                className="w-5 h-5"
              />
              <span className={checked ? 'line-through text-gray-400' : ''}>{title}</span>
            </label>
            {dueDate && (
              <time className="text-sm text-gray-500" dateTime={dueDate}>
                {new Date(dueDate).toLocaleDateString()}
              </time>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
