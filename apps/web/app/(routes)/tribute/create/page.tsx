'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { Tribute } from '@/types/tribute';
import { v4 as uuidv4 } from 'uuid';
import TributeForm from '@/components/TributeForm';
import { useTributes } from '@/lib/hooks/useTributes'; // adjust path as needed

export default function CreateTributePage() {
  const router = useRouter();
  const { isSignedIn, user } = useUser();
  const { addTribute } = useTributes();

  // Redirect if not signed in
  useEffect(() => {
    if (!isSignedIn && typeof window !== 'undefined') {
      router.push('/sign-in?redirect_url=/tribute/create');
    }
  }, [isSignedIn, router]);

  const handleCreate = (data: Omit<Tribute, 'id' | 'createdBy'>) => {
    if (!user) return;

    const newTribute: Tribute = {
      id: uuidv4(),
      ...data,
      createdBy: user.id,
    };

    addTribute(newTribute);
    router.push(`/tribute/${newTribute.id}`);
  };

  if (!isSignedIn) return null;

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-[#1D3557]">Create a Tribute Page</h1>
      <TributeForm
        initialData={{
          name: '',
          birthDate: '',
          deathDate: '',
          quote: '',
          candleMessage: '',
          tags: [],
          imageUrl: '',
        }}
        onSubmit={handleCreate}
        submitLabel="Save Tribute"
      />
    </main>
  );
}
