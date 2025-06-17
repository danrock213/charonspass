'use client';

import { useParams, useRouter } from 'next/navigation';
import { vendors } from '@/data/vendors';
import { useState, useEffect } from 'react';

export default function VendorEditPage() {
  const { category, vendorId } = useParams();
  const router = useRouter();

  // Find vendor to edit
  const vendorData = vendors.find((v) => v.category === category && v.id === vendorId);

  // If vendor not found, show error
  if (!vendorData) {
    return <p className="p-6 text-red-600">Vendor not found</p>;
  }

  // Local state to edit vendor data (initialize with vendorData)
  const [description, setDescription] = useState(vendorData.description || '');
  const [phone, setPhone] = useState(vendorData.phone || '');
  const [email, setEmail] = useState(vendorData.email || '');
  const [website, setWebsite] = useState(vendorData.website || '');
  const [hours, setHours] = useState(vendorData.hours || '');
  const [services, setServices] = useState(vendorData.services?.join(', ') || '');
  const [facebook, setFacebook] = useState(vendorData.social?.facebook || '');
  const [instagram, setInstagram] = useState(vendorData.social?.instagram || '');
  
  // For images, keep an array of files or URLs (for preview)
  const [images, setImages] = useState<(string | File)[]>(vendorData.images || []);

  // Handle image file input change (preview only)
  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    const filesArray = Array.from(e.target.files);
    // Append new files to existing images
    setImages((prev) => [...prev, ...filesArray]);
  }

  // Remove image by index
  function removeImage(index: number) {
    setImages((prev) => prev.filter((_, i) => i !== index));
  }

  // Fake submit handler (just logs data for now)
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Collect all updated data here, normally send to backend
    const updatedVendor = {
      description,
      phone,
      email,
      website,
      hours,
      services: services.split(',').map((s) => s.trim()).filter(Boolean),
      social: {
        facebook,
        instagram,
      },
      images,
    };
    console.log('Submitting vendor updates:', updatedVendor);
    alert('Vendor data saved (mock). Implement backend to persist changes.');
    // Optionally redirect back to vendor detail page
    router.push(`/vendors/${category}/${vendorId}`);
  }

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Edit Vendor Profile: {vendorData.name}</h1>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Description */}
        <div>
          <label htmlFor="description" className="block font-semibold mb-1">
            Detailed Description (HTML allowed)
          </label>
          <textarea
            id="description"
            rows={6}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded p-2"
          />
        </div>

        {/* Images */}
        <div>
          <label className="block font-semibold mb-1">Images (preview only)</label>
          <input type="file" multiple accept="image/*" onChange={handleImageChange} />
          <div className="mt-2 flex gap-4 overflow-x-auto">
            {images.map((img, idx) => {
              const src = typeof img === 'string' ? img : URL.createObjectURL(img);
              return (
                <div key={idx} className="relative w-32 h-20 rounded overflow-hidden border">
                  <img src={src} alt={`Vendor image ${idx + 1}`} className="object-cover w-full h-full" />
                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="absolute top-1 right-1 bg-red-600 text-white rounded px-1 text-xs"
                  >
                    X
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="phone" className="block font-semibold mb-1">Phone</label>
            <input
              id="phone"
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label htmlFor="email" className="block font-semibold mb-1">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label htmlFor="website" className="block font-semibold mb-1">Website</label>
            <input
              id="website"
              type="url"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label htmlFor="hours" className="block font-semibold mb-1">Hours</label>
            <input
              id="hours"
              type="text"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              placeholder="e.g. Mon-Fri 9am-5pm"
              className="w-full border rounded p-2"
            />
          </div>
        </div>

        {/* Services */}
        <div>
          <label htmlFor="services" className="block font-semibold mb-1">
            Services Offered (comma separated)
          </label>
          <input
            id="services"
            type="text"
            value={services}
            onChange={(e) => setServices(e.target.value)}
            className="w-full border rounded p-2"
          />
        </div>

        {/* Social Media */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="facebook" className="block font-semibold mb-1">Facebook URL</label>
            <input
              id="facebook"
              type="url"
              value={facebook}
              onChange={(e) => setFacebook(e.target.value)}
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label htmlFor="instagram" className="block font-semibold mb-1">Instagram URL</label>
            <input
              id="instagram"
              type="url"
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
              className="w-full border rounded p-2"
            />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-[#1D3557] text-white px-6 py-3 rounded hover:bg-[#274472] transition"
        >
          Save Changes
        </button>
      </form>
    </main>
  );
}
