// File: app/tribute/[id]/edit/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/lib/authContext";
import { Tribute } from "../../page";

export default function EditTributePage() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuth();

  const [form, setForm] = useState<Tribute | null>(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("tributes") || "[]");
    const tribute = stored.find((t: Tribute) => t.id === id);
    if (!tribute || tribute.creatorId !== user?.id) {
      router.push("/tribute");
    } else {
      setForm(tribute);
    }
  }, [id]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const stored = JSON.parse(localStorage.getItem("tributes") || "[]");
    const updated = stored.map((t: Tribute) =>
      t.id === id ? form : t
    );
    localStorage.setItem("tributes", JSON.stringify(updated));
    router.push(`/tribute/${id}`);
  }

  if (!form) return null;

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold text-[#1D3557] mb-6">Edit Tribute</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          required
          type="text"
          placeholder="Full Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full border px-4 py-2 rounded"
        />
        <div className="flex gap-4">
          <input
            type="date"
            required
            value={form.birthDate}
            onChange={(e) => setForm({ ...form, birthDate: e.target.value })}
            className="w-full border px-4 py-2 rounded"
          />
          <input
            type="date"
            required
            value={form.deathDate}
            onChange={(e) => setForm({ ...form, deathDate: e.target.value })}
            className="w-full border px-4 py-2 rounded"
          />
        </div>
        <textarea
          required
          placeholder="Obituary..."
          value={form.obituary}
          onChange={(e) => setForm({ ...form, obituary: e.target.value })}
          className="w-full border px-4 py-2 h-40 rounded"
        />
        <button
          type="submit"
          className="bg-[#1D3557] text-white px-6 py-2 rounded hover:bg-[#F4A261] hover:text-[#1D3557]"
        >
          Update Tribute
        </button>
      </form>
    </div>
  );
}
