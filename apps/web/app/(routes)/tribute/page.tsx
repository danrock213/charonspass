'use client';

import Link from 'next/link';
import { useMemo, useState, useEffect } from 'react';
import { Tribute } from '@/types/tribute';
import { useUser } from '@clerk/nextjs';
import { useTributes } from '@/hooks/useTributes';

export default function TributeListPage() {
  const { tributes } = useTributes();
  const { isSignedIn } = useUser();

  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(searchTerm.trim()), 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Sort tributes by deathDate descending (latest first)
  const sortedTributes = useMemo(() => {
    return [...tributes].sort((a, b) => (b.deathDate || '').localeCompare(a.deathDate || ''));
  }, [tributes]);

  // Filter tributes by search term
  const filteredTributes = useMemo(() => {
    if (!debouncedSearch) return sortedTributes;
    const lower = debouncedSearch.toLowerCase();
    return sortedTributes.filter(
      (t) =>
        t.name.toLowerCase().includes(lower) ||
        (t.tags?.some((tag) => tag.toLowerCase().includes(lower)) ?? false)
    );
  }, [debouncedSearch, sortedTributes]);

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-[#1D3557]">Tribute Pages</h1>

      <div className="relative mb-6">
        <input
          type="search"
          placeholder="Search tributes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border border-gray-300 rounded px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-[#1D3557]"
          aria-label="Search tributes"
          spellCheck={false}
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1D3557] transition"
          >
            &#10005;
          </button>
        )}
      </div>

      {isSignedIn ? (
        <Link
          href="/tribute/create"
          className="inline-block mb-6 px-5 py-2 bg-[#1D3557] text-white rounded hover:bg-[#F4A261] hover:text-[#1D3557] transition"
        >
          + Create New Tribute
        </Link>
      ) : (
        <p className="mb-4 text-gray-700">
          You can browse public tributes below.{' '}
          <Link
            href="/sign-in?redirect_url=/tribute/create"
            className="text-[#1D3557] underline hover:text-[#F4A261]"
          >
            Sign in
          </Link>{' '}
          to create and manage your own.
        </p>
      )}

      {tributes.length === 0 ? (
        <p className="text-gray-500">No tributes found.</p>
      ) : filteredTributes.length === 0 ? (
        <p className="text-gray-500">No tributes match your search.</p>
      ) : (
        <ul className="space-y-4">
          {filteredTributes.map((t) => (
            <li
              key={t.id}
              className="border p-4 rounded bg-gray-50 hover:bg-gray-100 transition flex items-center gap-4"
              style={{ animation: 'fadeIn 0.3s ease forwards' }}
            >
              <Link
                href={`/tribute/${t.id}`}
                className="flex-grow flex items-center gap-4 focus:outline-none focus:ring-2 focus:ring-[#1D3557] rounded"
              >
                {t.photoUrl ? (
                  <img
                    src={t.photoUrl}
                    alt={`Photo of ${t.name}`}
                    className="h-16 w-16 rounded object-cover flex-shrink-0"
                  />
                ) : (
                  <div className="h-16 w-16 bg-gray-300 rounded flex items-center justify-center text-gray-600 font-semibold text-lg">
                    {t.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <p className="text-xl font-semibold text-[#1D3557]">{t.name}</p>
                  <p className="text-gray-600 text-sm">
                    {t.birthDate || '—'} – {t.deathDate || '—'}
                  </p>
                </div>
              </Link>
              {isSignedIn && (
                <Link
                  href={`/tribute/${t.id}/edit`}
                  className="text-sm text-[#1D3557] underline hover:text-[#F4A261]"
                >
                  Edit
                </Link>
              )}
            </li>
          ))}
        </ul>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </main>
  );
}
