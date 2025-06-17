'use client';

import { useState } from "react";

export default function VendorProfile() {
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, just log the data — we'll add backend saving later
    console.log({ businessName, email, phone, address, description });
    alert("Profile saved! (This is a placeholder — backend coming soon.)");
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Vendor Profile</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
        <label className="block mb-2 font-medium text-gray-700">Business Name</label>
        <input
          type="text"
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
          required
          className="w-full mb-4 px-3 py-2 border border-gray-300 rounded-md"
        />

        <label className="block mb-2 font-medium text-gray-700">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full mb-4 px-3 py-2 border border-gray-300 rounded-md"
        />

        <label className="block mb-2 font-medium text-gray-700">Phone</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full mb-4 px-3 py-2 border border-gray-300 rounded-md"
        />

        <label className="block mb-2 font-medium text-gray-700">Address</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full mb-4 px-3 py-2 border border-gray-300 rounded-md"
        />

        <label className="block mb-2 font-medium text-gray-700">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="w-full mb-4 px-3 py-2 border border-gray-300 rounded-md"
        ></textarea>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold"
        >
          Save Profile
        </button>
      </form>
    </main>
  );
}
