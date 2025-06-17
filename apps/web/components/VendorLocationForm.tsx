'use client';

import { useState } from 'react';
import { useGeocode } from '@/hooks/useGeocode';

interface VendorLocationFormProps {
  initialLocation?: string;
  onSave: (location: string, lat: number, lng: number) => void;
}

export default function VendorLocationForm({ initialLocation = '', onSave }: VendorLocationFormProps) {
  const [locationInput, setLocationInput] = useState(initialLocation);
  const { coords, loading, error } = useGeocode(locationInput);

  const handleSubmit = () => {
    if (!coords) {
      alert('Please enter a valid location and wait for geocoding.');
      return;
    }
    onSave(locationInput, coords.lat, coords.lng);
  };

  return (
    <div className="max-w-md p-4 border rounded shadow">
      <label htmlFor="location" className="block font-semibold mb-1">
        Vendor Location:
      </label>
      <input
        id="location"
        type="text"
        value={locationInput}
        onChange={(e) => setLocationInput(e.target.value)}
        placeholder="e.g. Tarrytown, NY"
        className="border p-2 rounded w-full"
      />
      {loading && <p className="text-gray-500 mt-1">Geocoding location...</p>}
      {error && <p className="text-red-600 mt-1">{error}</p>}
      {coords && (
        <p className="text-green-700 mt-1">
          Coordinates: {coords.lat.toFixed(5)}, {coords.lng.toFixed(5)}
        </p>
      )}
      <button
        onClick={handleSubmit}
        className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Save Location
      </button>
    </div>
  );
}
