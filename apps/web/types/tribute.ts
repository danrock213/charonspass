'use client';

import { Tribute, RSVP } from '@/types/tribute';

const STORAGE_KEY = 'tributes';

// Utility to safely parse JSON
function safeParse<T>(json: string | null, fallback: T): T {
  if (!json) return fallback;
  try {
    return JSON.parse(json) as T;
  } catch {
    console.error('Failed to parse JSON');
    return fallback;
  }
}

// Get all tributes from localStorage or fallback to default mock data
export const getTributes = (): Tribute[] => {
  if (typeof window === 'undefined') return []; // SSR guard

  const stored = localStorage.getItem(STORAGE_KEY);
  const parsed = safeParse<Tribute[]>(stored, getMockTributes());
  return Array.isArray(parsed) ? parsed : getMockTributes();
};

// Get a single tribute by ID
export const getTributeById = (id: string): Tribute | undefined => {
  return getTributes().find((t) => t.id === id);
};

// Save or update a tribute in localStorage
export const saveTribute = (tribute: Tribute): void => {
  if (typeof window === 'undefined') return; // SSR guard

  const tributes = getTributes();
  const index = tributes.findIndex((t) => t.id === tribute.id);

  if (index !== -1) {
    // Preserve existing createdBy if missing on update
    if (!tribute.createdBy && tributes[index].createdBy) {
      tribute.createdBy = tributes[index].createdBy;
    }
    tributes[index] = tribute;
  } else {
    tributes.push(tribute);
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(tributes));
};

// Add or update RSVP for a tribute
export const addRSVPToTribute = (tributeId: string, name: string, attending: boolean): void => {
  if (typeof window === 'undefined') return; // SSR guard

  const tributes = getTributes();
  const tributeIndex = tributes.findIndex((t) => t.id === tributeId);
  if (tributeIndex === -1) return;

  const tribute = { ...tributes[tributeIndex] };

  if (!tribute.funeralDetails) tribute.funeralDetails = {};
  if (!tribute.funeralDetails.rsvpList) tribute.funeralDetails.rsvpList = [];

  const newRSVP: RSVP = {
    name,
    attending,
    timestamp: new Date().toISOString(),
  };

  const existingIndex = tribute.funeralDetails.rsvpList.findIndex((rsvp) => rsvp.name === name);

  if (existingIndex !== -1) {
    tribute.funeralDetails.rsvpList[existingIndex] = newRSVP;
  } else {
    tribute.funeralDetails.rsvpList.push(newRSVP);
  }

  tributes[tributeIndex] = tribute;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tributes));
};

// Default hardcoded mock tributes
export const getMockTributes = (): Tribute[] => [
  {
    id: '1',
    name: 'Jane Doe',
    birthDate: '1950-01-01',
    deathDate: '2024-05-12',
    bio: 'A kind and loving person remembered forever.',
    photoBase64: '', // keep or replace with default base64 image string
    createdBy: 'mock-user-1',
  },
  {
    id: '2',
    name: 'John Smith',
    birthDate: '1945-03-22',
    deathDate: '2023-11-04',
    bio: 'A life well lived.',
    photoBase64: '',
    createdBy: 'mock-user-2',
  },
];
