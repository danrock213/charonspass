'use client';

import { Tribute } from '@/types/tribute';
import { Vendor } from '@/types/dashboard';
import { ChecklistItem } from '@/types/dashboard';

export default function SummaryStats({
  tributes,
  vendors,
  checklist,
}: {
  tributes: Tribute[];
  vendors: Vendor[];
  checklist: ChecklistItem[];
}) {
  const totalTributes = tributes.length;
  const totalVendorsBooked = vendors.filter(v => v.booked).length;
  const checklistCompleted = checklist.filter(item => item.checked).length;
  const checklistTotal = checklist.length;

  const checklistPercent = checklistTotal === 0 ? 100 : Math.round((checklistCompleted / checklistTotal) * 100);

  return (
    <section className="mb-6">
      <h2 className="text-xl font-semibold text-[#1D3557] mb-2">Summary</h2>
      <div className="flex gap-8">
        <div>
          <p className="text-3xl font-bold text-[#1D3557]">{totalTributes}</p>
          <p>Tributes Created</p>
        </div>
        <div>
          <p className="text-3xl font-bold text-[#1D3557]">{totalVendorsBooked}</p>
          <p>Vendors Booked</p>
        </div>
        <div className="flex flex-col gap-1 w-48">
          <p className="font-semibold">Checklist Completion</p>
          <div className="bg-gray-300 rounded h-4 w-full">
            <div
              style={{ width: `${checklistPercent}%` }}
              className="bg-[#1D3557] h-4 rounded"
            />
          </div>
          <p>{checklistPercent}%</p>
        </div>
      </div>
    </section>
  );
}
