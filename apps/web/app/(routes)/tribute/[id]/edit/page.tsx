'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { Tribute } from '@/types/tribute';
import TributeForm from '@/components/tribute/TributeForm';
import { useTributes } from '@/hooks/useTributes';

export default function EditTributePage() {
  const params = useParams();
  const id = typeof params?.id === 'string' ? params.id : Array.isArray(params?.id) ? params.id[0] : '';

  const router = useRouter();
  const { user, isSignedIn } = useUser();
  const { tributes } = useTributes();

  const [tribute, setTribute] = useState<Tribute | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSignedIn) return; // Wait until signed-in state is known

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

    setLoading(false);
  }, [id, tributes, user?.id, isSignedIn]);

  // <-- Fix here: parameter now matches TributeForm's expected onSubmit type
  const handleUpdate = (data: Omit<Tribute, 'id'>) => {
    if (!tribute) return; // Safety check

    const updatedTribute: Tribute = { id: tribute.id, ...data };

    const updatedList = tributes.map((t) =>
      t.id === updatedTribute.id ? updatedTribute : t
    );

    if (typeof window !== 'undefined') {
      localStorage.setItem('tributes', JSON.stringify(updatedList));
    }

    router.push(`/tribute/${updatedTribute.id}`);
  };

  if (loading) {
    return (
      <main className="max-w-2xl mx-auto p-6 text-center text-gray-500">
        Loading tribute...
      </main>
    );
  }

  if (!tribute) {
    return (
      <main className="max-w-2xl mx-auto p-6 text-center text-red-600">
        Tribute not found or access denied.
      </main>
    );
  }

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
