'use client';

import { useState, useEffect } from 'react';
import { vendors } from '@/data/vendors';
import VendorCard from '@/components/VendorCard';
import { getDistanceFromLatLonInKm } from '@/utils/distance';

export default function AllVendorsPage() {
  const [city, setCity] = useState('');
  const [cityCoords, setCityCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [filteredVendors, setFilteredVendors] = useState(vendors);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function geocodeCity(cityName: string) {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(cityName)}`
      );
      const data = await response.json();
      if (data.length === 0) {
        setError('City not found.');
        setCityCoords(null);
      } else {
        const { lat, lon } = data[0];
        setCityCoords({ lat: parseFloat(lat), lng: parseFloat(lon) });
      }
    } catch {
      setError('Error fetching city location.');
      setCityCoords(null);
    }
    setLoading(false);
  }

  useEffect(() => {
    if (!cityCoords) {
      setFilteredVendors(vendors);
      return;
    }

    let filtered = vendors.filter((v) => {
      if (!v.lat || !v.lng) return false;
      const dist = getDistanceFromLatLonInKm(cityCoords.lat, cityCoords.lng, v.lat, v.lng);
      return dist <= 75;
    });

    if (filtered.length === 0) {
      filtered = vendors.filter((v) => {
        if (!v.lat || !v.lng) return false;
        const dist = getDistanceFromLatLonInKm(cityCoords.lat, cityCoords.lng, v.lat, v.lng);
        return dist <= 150;
      });
    }

    setFilteredVendors(filtered);
  }, [cityCoords]);

  function onSearch() {
    if (city.trim()) {
      geocodeCity(city.trim());
    }
  }

  return (
    <main className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-[#1D3557] mb-6 text-center">Search Vendors by Location</h1>

      <div className="mb-6 max-w-md mx-auto">
        <label htmlFor="city-input" className="block font-medium mb-2">
          Enter your city:
        </label>
        <div className="flex gap-2">
          <input
            id="city-input"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="e.g., Boston"
            className="flex-grow border border-gray-300 rounded px-3 py-2"
          />
          <button
            onClick={onSearch}
            disabled={loading}
            className="bg-[#1D3557] text-white px-4 py-2 rounded disabled:opacity-50"
          >
            {loading ? 'Searching…' : 'Search'}
          </button>
        </div>
        {error && <p className="text-red-600 mt-2">{error}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredVendors.map((vendor) => (
          <VendorCard key={vendor.id} vendor={vendor} />
        ))}
        {filteredVendors.length === 0 && (
          <p className="text-center text-gray-600 col-span-full">No vendors found nearby.</p>
        )}
      </div>
    </main>
  );
}
