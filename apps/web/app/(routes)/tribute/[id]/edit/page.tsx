'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs'; // switched from useAuth for consistency
import { Tribute } from '@/types/tribute';
import TributeForm from '@/components/TributeForm';
import { useTributes } from '@/lib/hooks/useTributes';

export default function EditTributePage() {
  const { id } = useParams();
  const router = useRouter();
  const { user, isSignedIn } = useUser();
  const { tributes, addTribute } = useTributes();
  const [tribute, setTribute] = useState<Tribute | null>(null);

  // Load tribute on mount or when tributes/user/id change
  useEffect(() => {
    if (!isSignedIn) {
      router.push('/sign-in?redirect_url=/tribute');
      return;
    }

    if (!id || !user) {
      router.push('/tribute');
      return;
    }

    const found = tributes.find((t) => t.id === id);

    if (!found || found.createdBy !== user.id) {
      router.push('/tribute');
    } else {
      setTribute(found);
    }
  }, [id, tributes, user, isSignedIn, router]);

  const handleUpdate = (updatedTribute: Tribute) => {
    // Update tributes list by replacing the tribute with matching id
    const updatedList = tributes.map((t) =>
      t.id === updatedTribute.id ? updatedTribute : t
    );

    // Save updated list to localStorage
    localStorage.setItem('tributes', JSON.stringify(updatedList));

    // (Optional) Could add a method to your hook for updating tributes to keep in sync

    router.push(`/tribute/${updatedTribute.id}`);
  };

  if (!tribute) return null;

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-[#1D3557]">Edit Tribute</h1>
      <TributeForm
        initialData={tribute}
        onSubmit={handleUpdate}
        submitLabel="Update Tribute"
      />
    </main>
  );
}
