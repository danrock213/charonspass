'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

interface ChecklistItem {
  id: string;
  text: string;
  category: 'immediate' | 'shortTerm' | 'longTerm';
}

const checklistItems: ChecklistItem[] = [
  // Immediate Tasks
  { id: 'pronouncement-of-death', text: 'Obtain legal pronouncement of death', category: 'immediate' },
  { id: 'notify-family', text: 'Notify close family and friends', category: 'immediate' },
  { id: 'secure-property', text: "Secure the deceased's home and belongings", category: 'immediate' },
  { id: 'contact-funeral-home', text: 'Contact funeral home or cremation service', category: 'immediate' },
  { id: 'arrange-transport', text: 'Arrange transport of the body', category: 'immediate' },
  { id: 'care-for-pets', text: 'Make arrangements for any pets', category: 'immediate' },

  // Short-Term Tasks
  { id: 'get-death-certificates', text: 'Order multiple copies of the death certificate', category: 'shortTerm' },
  { id: 'write-obituary', text: 'Write and publish obituary', category: 'shortTerm' },
  { id: 'plan-funeral', text: 'Plan funeral or memorial service', category: 'shortTerm' },
  { id: 'create-tribute', text: 'Create tribute page or memorial website', category: 'shortTerm' },
  { id: 'contact-employer', text: 'Contact the deceased’s employer if applicable', category: 'shortTerm' },
  { id: 'notify-insurance', text: 'Notify life insurance company', category: 'shortTerm' },
  { id: 'close-accounts', text: 'Close social media and online accounts', category: 'shortTerm' },
  { id: 'check-will', text: 'Locate and review the will', category: 'shortTerm' },
  { id: 'contact-lawyer', text: 'Contact an estate lawyer if necessary', category: 'shortTerm' },
  { id: 'cancel-subscriptions', text: 'Cancel subscriptions and recurring payments', category: 'shortTerm' },

  // Long-Term Tasks
  { id: 'settle-estate', text: 'Settle the estate with executor and probate court', category: 'longTerm' },
  { id: 'distribute-assets', text: 'Distribute assets to beneficiaries', category: 'longTerm' },
  { id: 'file-final-taxes', text: 'File final income tax returns', category: 'longTerm' },
  { id: 'return-drivers-license', text: 'Return driver’s license and passport', category: 'longTerm' },
  { id: 'cancel-voter-registration', text: 'Cancel voter registration', category: 'longTerm' },
  { id: 'grief-counseling', text: 'Consider grief counseling or support groups', category: 'longTerm' },
];

export default function ChecklistPage() {
  const { isSignedIn } = useUser();
  const router = useRouter();
  const [checkedItems, setCheckedItems] = useState<{ [id: string]: boolean }>({});

  useEffect(() => {
    const stored = localStorage.getItem('checklist');
    if (stored) setCheckedItems(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem('checklist', JSON.stringify(checkedItems));
  }, [checkedItems]);

  const handleToggle = (id: string) => {
    if (!isSignedIn) {
      router.push('/sign-in?redirect_url=/checklist');
      return;
    }
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const grouped = {
    immediate: checklistItems.filter((item) => item.category === 'immediate'),
    shortTerm: checklistItems.filter((item) => item.category === 'shortTerm'),
    longTerm: checklistItems.filter((item) => item.category === 'longTerm'),
  };

  const Section = ({ title, items }: { title: string; items: ChecklistItem[] }) => (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-4 text-[#1D3557]">{title}</h2>
      <ul className="space-y-4">
        {items.map(({ id, text }) => (
          <li
            key={id}
            onClick={() => handleToggle(id)}
            className={`flex items-center cursor-pointer select-none rounded-lg p-4 transition-colors duration-300 
              ${checkedItems[id] ? 'bg-[#E0E6ED] text-gray-500 line-through' : 'bg-[#F8FAFC] hover:bg-[#D9E2EC] text-[#1D3557]'}
              shadow-sm
            `}
            role="checkbox"
            aria-checked={checkedItems[id]}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleToggle(id);
              }
            }}
          >
            <input
              type="checkbox"
              checked={checkedItems[id]}
              readOnly
              className="w-6 h-6 mr-4 cursor-pointer text-[#1D3557]"
            />
            <span className="text-lg">{text}</span>
          </li>
        ))}
      </ul>
    </section>
  );

  return (
    <main className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-lg mt-10">
      <h1 className="text-4xl font-extrabold text-[#1D3557] mb-10 text-center">
        Funeral Planning Checklist
      </h1>
      <Section title="As Soon As Possible" items={grouped.immediate} />
      <Section title="In the Next Few Days" items={grouped.shortTerm} />
      <Section title="Later / Long-Term" items={grouped.longTerm} />

      {!isSignedIn && (
        <p className="mt-10 text-center text-gray-500 text-sm">
          Please <a href="/sign-in?redirect_url=/checklist" className="text-[#1D3557] underline font-semibold">sign in</a> to track your checklist progress.
        </p>
      )}
    </main>
  );
}
