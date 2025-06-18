"use client";

import React, { useState, useEffect } from "react";
import { Tribute, FuneralDetails } from "@/types/tribute";

interface TributeFormProps {
  initialData: Omit<Tribute, "id">;
  onSubmit: (data: Omit<Tribute, "id">) => void;
  submitLabel: string;
}

const emptyFuneralDetails: FuneralDetails = {
  dateTime: "",
  location: "",
  rsvpLink: "",      // add if you want RSVP link
  rsvpEnabled: false, // optional, default false
  rsvpList: [],
  notes: "",
};

const TributeForm: React.FC<TributeFormProps> = ({
  initialData,
  onSubmit,
  submitLabel,
}) => {
  // Initialize form state with nested funeralDetails object
  const [form, setForm] = useState<Omit<Tribute, "id">>({
    name: "",
    birthDate: "",
    deathDate: "",
    bio: "",
    story: "",
    photoUrl: "",
    funeralDetails: emptyFuneralDetails,
    tags: [],
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        ...initialData,
        funeralDetails: {
          ...emptyFuneralDetails,
          ...initialData.funeralDetails,
        },
      });
    }
  }, [initialData]);

  // Handle changes for normal fields or nested funeralDetails fields
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // Check if the changed field is inside funeralDetails
    if (
      name === "funeralDate" ||
      name === "funeralLocation" ||
      name === "funeralRsvpLink"
    ) {
      setForm((prev) => ({
        ...prev,
        funeralDetails: {
          ...prev.funeralDetails,
          // Map form field names to funeralDetails properties
          dateTime: name === "funeralDate" ? value : prev.funeralDetails?.dateTime ?? "",
          location: name === "funeralLocation" ? value : prev.funeralDetails?.location ?? "",
          rsvpLink: name === "funeralRsvpLink" ? value : prev.funeralDetails?.rsvpLink ?? "",
        },
      }));
    } else {
      // Normal top-level field
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-6 rounded shadow max-w-2xl mx-auto"
    >
      <h2 className="text-2xl font-bold text-[#1D3557] mb-4">{submitLabel}</h2>

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
        required
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
        value={form.funeralDetails?.dateTime ?? ""}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <input
        type="text"
        name="funeralLocation"
        placeholder="Location (address or venue name)"
        value={form.funeralDetails?.location ?? ""}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <input
        type="url"
        name="funeralRsvpLink"
        placeholder="RSVP Link (optional)"
        value={form.funeralDetails?.rsvpLink ?? ""}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <button
        type="submit"
        className="bg-[#1D3557] text-white px-4 py-2 rounded hover:bg-[#F4A261] hover:text-[#1D3557] transition"
      >
        {submitLabel}
      </button>
    </form>
  );
};

export default TributeForm;
