'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import VendorLocationForm from '@/components/VendorLocationForm';

export default function AddVendorPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    category: 'funeral-homes',
    phone: '',
    website: '',
    description: '',
    location: '',
    lat: 0,
    lng: 0,
    approved: false,
  });

  const [saving, setSaving] = useState(false);

  const handleLocationSave = (location: string, lat: number, lng: number) => {
    setForm((f) => ({ ...f, location, lat, lng }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({
      ...f,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    await fetch('/api/vendors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    setSaving(false);
    router.push('/vendors/pending'); // where you later approve
  };

  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Add / Edit Vendor</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Basic info */}
        {['name', 'phone', 'website'].map((field) => (
          <div key={field}>
            <label className="block text-sm font-medium">{field[0].toUpperCase() + field.slice(1)}</label>
            <input
              name={field}
              type={field === 'phone' ? 'tel' : 'text'}
              required={field === 'name'}
              value={(form as any)[field]}
              onChange={handleChange}
              className="w-full border p-2 rounded focus:ring-[#1D3557]"
            />
          </div>
        ))}

        {/* Category */}
        <div>
          <label className="block text-sm font-medium">Category</label>
          <select name="category" value={form.category} onChange={handleChange} className="w-full border p-2 rounded">
            {[
              'funeral-homes', 'crematoriums', 'florists',
              'grief-counselors', 'estate-lawyers',
              'memorial-products', 'event-venues'
            ].map((cat) => (
              <option key={cat} value={cat}>{cat.replace(/-/g, ' ')}</option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            name="description"
            rows={4}
            value={form.description}
            onChange={handleChange}
            className="w-full border p-2 rounded focus:ring-[#1D3557]"
          />
        </div>

        {/* Location + Geocode */}
        <VendorLocationForm initialLocation={form.location} onSave={handleLocationSave} />

        {/* Approval toggle */}
        <div>
          <label className="inline-flex items-center space-x-2">
            <input
              type="checkbox"
              name="approved"
              checked={form.approved}
              onChange={handleChange}
              className="form-checkbox"
            />
            <span className="text-sm">Approved (publishes vendor immediately)</span>
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={saving}
          className="bg-[#1D3557] text-white px-6 py-2 rounded hover:bg-[#F4A261] transition"
        >
          {saving ? 'Saving…' : 'Save Vendor'}
        </button>
      </form>
    </main>
  );
}
