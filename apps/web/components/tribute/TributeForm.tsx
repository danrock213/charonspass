'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Tribute } from '@/types/tribute';
import { v4 as uuidv4 } from 'uuid';
import { saveTribute } from '@/lib/data/tributes';

export default function TributeForm() {
  const router = useRouter();
  const [form, setForm] = useState<Omit<Tribute, 'id'>>({
    name: '',
    birthDate: '',
    deathDate: '',
    bio: '',
    story: '',
    photoUrl: '',
    funeralDate: '',
    funeralLocation: '',
    funeralRsvpLink: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tribute: Tribute = {
      id: uuidv4(),
      ...form,
    };
    saveTribute(tribute);
    router.push('/tribute');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-[#1D3557] mb-4">Create a Tribute Page</h2>

      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={form.name}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />

      <div className="flex gap-4">
        <input
          type="date"
          name="birthDate"
          value={form.birthDate}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="date"
          name="deathDate"
          value={form.deathDate}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
      </div>

      <textarea
        name="bio"
        placeholder="Short Biography"
        value={form.bio}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        rows={3}
      />

      <textarea
        name="story"
        placeholder="Their Story (optional)"
        value={form.story}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        rows={6}
      />

      <input
        type="url"
        name="photoUrl"
        placeholder="Photo URL"
        value={form.photoUrl}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <hr className="my-4" />

      <h3 className="text-xl font-semibold text-[#1D3557]">Funeral Information</h3>

      <input
        type="datetime-local"
        name="funeralDate"
        value={form.funeralDate}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <input
        type="text"
        name="funeralLocation"
        placeholder="Location (address or venue name)"
        value={form.funeralLocation}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <input
        type="url"
        name="funeralRsvpLink"
        placeholder="RSVP Link (optional)"
        value={form.funeralRsvpLink}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <button
        type="submit"
        className="bg-[#1D3557] text-white px-4 py-2 rounded hover:bg-[#F4A261] hover:text-[#1D3557] transition"
      >
        Save Tribute
      </button>
    </form>
  );
}
