'use client';

import { Dispatch, SetStateAction } from 'react';

interface Props {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  placeholder?: string;
}

export default function SearchBar({ search, setSearch, placeholder = 'Search...' }: Props) {
  return (
    <input
      type="text"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder={placeholder}
      className="w-full border px-4 py-2 rounded mb-4"
    />
  );
}
