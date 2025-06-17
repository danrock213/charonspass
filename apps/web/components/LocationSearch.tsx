// components/LocationSearch.tsx
'use client';
import { useState } from 'react';

interface LocationSearchProps {
  onSearch: (location: string) => void;
}

export default function LocationSearch({ onSearch }: LocationSearchProps) {
  const [location, setLocation] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setLocation(val);
    onSearch(val);
  };

  return (
    <input
      type="text"
      placeholder="Search by location"
      value={location}
      onChange={handleChange}
      className="border rounded px-3 py-2 w-full max-w-sm"
    />
  );
}
