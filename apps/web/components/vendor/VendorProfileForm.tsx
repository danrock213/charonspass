'use client';

import { useState, useEffect } from 'react';
import type { Vendor } from '@/types/vendor';
import { VendorProfile } from '@/types/vendor';


interface Props {
  vendorId: string;
  initialProfile?: VendorProfile | null;
  onSave?: (profile: VendorProfile) => void;
}

export default function VendorProfileForm({ vendorId, initialProfile, onSave }: Props) {
  // Form state
  const [businessName, setBusinessName] = useState('');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');
  const [address, setAddress] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [logoUrl, setLogoUrl] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  // Load initial profile data on mount or when initialProfile changes
  useEffect(() => {
    if (initialProfile) {
      setBusinessName(initialProfile.businessName || '');
      setDescription(initialProfile.description || '');
      setEmail(initialProfile.email || '');
      setPhone(initialProfile.phone || '');
      setWebsite(initialProfile.website || '');
      setAddress(initialProfile.address || '');
      setCategories(initialProfile.categories || []);
      setLogoUrl(initialProfile.logoUrl || '');
    }
  }, [initialProfile]);

  // Handle checkbox category toggling
  const allCategories = ['Funeral Home', 'Florist', 'Crematorium', 'Grief Counselor', 'Estate Lawyer', 'Memorial Products', 'Event Venue'];

  const toggleCategory = (cat: string) => {
    setCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  // Simple logo upload handler (converts to base64 string)
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setLogoUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // Save form data handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!businessName || !email) {
      setStatusMessage('Business Name and Email are required.');
      return;
    }

    const profile: VendorProfile = {
      vendorId,
      businessName,
      description,
      email,
      phone,
      website,
      address,
      categories,
      logoUrl,
      createdAt: initialProfile?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Save profile (user of this component handles actual saving)
    if (onSave) onSave(profile);

    setStatusMessage('Profile saved successfully!');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl p-4 border rounded shadow space-y-4">
      <h2 className="text-xl font-semibold mb-2">Vendor Profile</h2>

      <label className="block">
        Business Name*:
        <input
          type="text"
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
          required
          className="w-full border px-2 py-1 rounded"
        />
      </label>

      <label className="block">
        Description:
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border px-2 py-1 rounded"
        />
      </label>

      <label className="block">
        Email*:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border px-2 py-1 rounded"
        />
      </label>

      <label className="block">
        Phone:
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border px-2 py-1 rounded"
        />
      </label>

      <label className="block">
        Website:
        <input
          type="url"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          className="w-full border px-2 py-1 rounded"
        />
      </label>

      <label className="block">
        Address:
        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full border px-2 py-1 rounded"
        />
      </label>

      <fieldset>
        <legend className="font-semibold mb-1">Categories</legend>
        <div className="flex flex-wrap gap-3">
          {allCategories.map((cat) => (
            <label key={cat} className="inline-flex items-center space-x-2">
              <input
                type="checkbox"
                checked={categories.includes(cat)}
                onChange={() => toggleCategory(cat)}
              />
              <span>{cat}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <label className="block">
        Logo Upload:
        <input type="file" accept="image/*" onChange={handleLogoUpload} />
        {logoUrl && <img src={logoUrl} alt="Logo Preview" className="h-20 mt-2" />}
      </label>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Save Profile
      </button>

      {statusMessage && <p className="mt-2 text-sm text-green-600">{statusMessage}</p>}
    </form>
  );
}
