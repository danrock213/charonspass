"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Tribute } from "@/types/tribute";
import { v4 as uuidv4 } from "uuid";
import TributeForm from "@/components/tribute/TributeForm";
import { useTributes } from "@/hooks/useTributes";

export default function CreateTributePage() {
  const router = useRouter();
  const { isSignedIn, user } = useUser();
  const { addTribute } = useTributes();

  // Redirect unauthenticated users to sign-in page with redirect URL back here
  useEffect(() => {
    if (!isSignedIn && typeof window !== "undefined") {
      router.push("/sign-in?redirect_url=/tribute/create");
    }
  }, [isSignedIn, router]);

  // Guard to ensure user is defined before accessing user.id
  if (!isSignedIn || !user) return null; // or loading spinner

  // Handler passed to TributeForm
  const handleCreate = (data: Omit<Tribute, "id" | "createdBy">) => {
    const newTribute: Tribute = {
      id: uuidv4(),
      createdBy: user.id,
      ...data,
    };
    addTribute(newTribute);
    router.push(`/tribute/${newTribute.id}`);
  };

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-[#1D3557]">Create a Tribute Page</h1>
      <TributeForm
        initialData={{
          name: "",
          birthDate: "",
          deathDate: "",
          bio: "",
          obituaryText: "",
          photoBase64: "",
          funeralDetails: {
            rsvpEnabled: false,
            rsvpList: [],
            dateTime: "",
            location: "",
            notes: "",
          },
          tags: [],
        }}
        onSubmit={handleCreate}
        submitLabel="Save Tribute"
      />
    </main>
  );
}
