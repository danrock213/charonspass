'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type VendorForm = {
  title: string;
  category: string;
  location: string;
  description: string;
  active: boolean;
};

const initialState: VendorForm = {
  title: '',
  category: '',
  location: '',
  description: '',
  active: true,
};

const categoryOptions = [
  'Funeral Home',
  'Crematorium',
  'Florist',
  'Grief Counselor',
  'Estate Lawyer',
  'Memorial Products',
  'Event Venue',
  'Catering',
  'Transportation',
];

export default function EditVendorListingPage() {
  const params = useSearchParams();
  const router = useRouter();
  const [form, setForm] = useState<VendorForm>(initialState);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const id = params?.get('id');
    if (id) {
      // Simulate loading existing listing data
      setForm({
        title: 'Elegant Catering',
        category: 'Catering',
        location: 'NYC',
        description: 'We provide tasteful experiences for memorial events.',
        active: true,
      });
      setIsEditing(true);
    }
  }, [params]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, type } = e.target;

    // For checkboxes, we need to cast e.target to HTMLInputElement to access checked safely
    if (type === 'checkbox') {
      const target = e.target as HTMLInputElement;
      setForm((prev) => ({
        ...prev,
        [name]: target.checked,
      }));
    } else {
      const target = e.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
      setForm((prev) => ({
        ...prev,
        [name]: target.value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Saving vendor listing:', form);
    router.push('/vendor/dashboard');
  };

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">
        {isEditing ? 'Edit Listing' : 'Create New Listing'}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">Select category</option>
            {categoryOptions.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block font-medium">Location</label>
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            rows={4}
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="active"
            checked={form.active}
            onChange={handleChange}
          />
          <label className="font-medium">Active</label>
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-[#1D3557] text-white rounded hover:bg-[#457B9D]"
        >
          {isEditing ? 'Update Listing' : 'Create Listing'}
        </button>
      </form>
    </main>
  );
}
