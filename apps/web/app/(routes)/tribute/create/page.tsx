'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { saveTribute } from '@/lib/data/tributes';
import { Tribute } from '@/types/tribute';
import { v4 as uuidv4 } from 'uuid';

type TributeFormData = Omit<Tribute, 'id'> & { createdBy?: string };

export default function CreateTributePage() {
  const router = useRouter();
  const { isSignedIn, user } = useUser();

  const [formData, setFormData] = useState<TributeFormData>({
    name: '',
    birthDate: '',
    deathDate: '',
    quote: '',
    candleMessage: '',
    tags: [],
    photoUrl: '',
  });

  const [tagInput, setTagInput] = useState('');
  const [error, setError] = useState('');

  // Redirect if not signed in
  useEffect(() => {
    if (!isSignedIn && typeof window !== 'undefined') {
      router.push('/sign-in?redirect_url=/tribute/create');
    }
  }, [isSignedIn, router]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddTag = () => {
    const newTag = tagInput.trim();
    if (newTag && !formData.tags.includes(newTag)) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag],
      }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, photoUrl: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      setError('Name is required.');
      return false;
    }
    if (!formData.birthDate) {
      setError('Birth date is required.');
      return false;
    }
    if (!formData.deathDate) {
      setError('Death date is required.');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (!user) {
      setError('User information missing. Please sign in again.');
      return;
    }

    const newTribute: Tribute = {
      id: uuidv4(),
      ...formData,
      createdBy: user.id,
    };

    saveTribute(newTribute);
    router.push(`/tribute/${newTribute.id}`);
  };

  if (!isSignedIn) return null;

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-[#1D3557]">Create a Tribute Page</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-1 font-medium text-[#1D3557]">
            Name <span className="text-red-600">*</span>
          </label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
            placeholder="Full name"
          />
        </div>

        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="block mb-1 font-medium text-[#1D3557]">
              Birth Date <span className="text-red-600">*</span>
            </label>
            <input
              type="date"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />
          </div>
          <div className="flex-1">
            <label className="block mb-1 font-medium text-[#1D3557]">
              Death Date <span className="text-red-600">*</span>
            </label>
            <input
              type="date"
              name="deathDate"
              value={formData.deathDate}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />
          </div>
        </div>

        <div>
          <label className="block mb-1 font-medium text-[#1D3557]">Favorite Quote</label>
          <textarea
            name="quote"
            value={formData.quote}
            onChange={handleChange}
            rows={2}
            className="w-full border p-2 rounded"
            placeholder="Favorite quote or memory"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-[#1D3557]">Candle Message</label>
          <textarea
            name="candleMessage"
            value={formData.candleMessage}
            onChange={handleChange}
            rows={2}
            className="w-full border p-2 rounded"
            placeholder="Message for candle tribute"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-[#1D3557]">Tags</label>
          <div className="flex items-center space-x-2">
            <input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              className="flex-1 border p-2 rounded"
              placeholder="Add tag..."
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddTag();
                }
              }}
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="px-3 py-1 bg-[#1D3557] text-white rounded"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap mt-2 gap-2">
            {formData.tags.map((tag) => (
              <span
                key={tag}
                className="bg-gray-200 px-2 py-1 rounded text-sm flex items-center space-x-1"
              >
                <span>{tag}</span>
                <button
                  type="button"
                  aria-label={`Remove tag ${tag}`}
                  onClick={() => handleRemoveTag(tag)}
                  className="ml-1 text-red-600 hover:text-red-800 font-bold"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        <div>
          <label className="block mb-1 font-medium text-[#1D3557]">Upload Photo</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          {formData.photoUrl && (
            <img
              src={formData.photoUrl}
              alt="Preview"
              className="mt-4 max-h-48 rounded object-contain"
            />
          )}
        </div>

        {error && (
          <p className="text-red-600 text-sm" role="alert">
            {error}
          </p>
        )}

        <div className="flex justify-between items-center">
          <button
            type="submit"
            className="px-4 py-2 bg-[#1D3557] text-white rounded hover:bg-[#F4A261] hover:text-[#1D3557] transition"
          >
            Save Tribute
          </button>
          <button
            type="button"
            onClick={() => router.push('/tribute')}
            className="text-sm text-gray-500 underline"
          >
            Cancel
          </button>
        </div>
      </form>
    </main>
  );
}
