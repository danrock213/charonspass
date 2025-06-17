import { Tribute } from '@/types/tribute';

const STORAGE_KEY = 'tributes';

// Get all tributes from localStorage or fallback to default mock data
export const getTributes = (): Tribute[] => {
  if (typeof window === 'undefined') return []; // Prevent SSR issues

  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored) as Tribute[];
    } catch (e) {
      console.error('Failed to parse tributes from localStorage', e);
    }
  }
  return getMockTributes();
};

// Get a single tribute by ID
export const getTributeById = (id: string): Tribute | undefined => {
  return getTributes().find((t) => t.id === id);
};

// Save or update a tribute in localStorage
export const saveTribute = (tribute: Tribute) => {
  const tributes = getTributes();
  const index = tributes.findIndex((t) => t.id === tribute.id);

  if (index !== -1) {
    // Preserve existing createdBy if missing on update
    if (!tribute.createdBy && tributes[index].createdBy) {
      tribute.createdBy = tributes[index].createdBy;
    }
    tributes[index] = { ...tributes[index], ...tribute }; // update existing, merging to preserve fields
  } else {
    // For new tribute, createdBy should already be set by caller
    tributes.push(tribute); // add new
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tributes));
  } catch (e) {
    console.error('Failed to save tributes to localStorage', e);
  }
};

// Add or update RSVP for a tribute
export const addRSVPToTribute = (
  tributeId: string,
  name: string,
  attending: boolean
) => {
  const tributes = getTributes();
  const tributeIndex = tributes.findIndex((t) => t.id === tributeId);
  if (tributeIndex === -1) return;

  const tribute = tributes[tributeIndex];

  if (!tribute.funeralDetails) tribute.funeralDetails = {};
  if (!tribute.funeralDetails.rsvpList) tribute.funeralDetails.rsvpList = [];

  // Avoid duplicate RSVP by name
  const existingIndex = tribute.funeralDetails.rsvpList.findIndex(
    (rsvp) => rsvp.name === name
  );
  const newRSVP = {
    name,
    attending,
    timestamp: new Date().toISOString(),
  };

  if (existingIndex !== -1) {
    tribute.funeralDetails.rsvpList[existingIndex] = newRSVP;
  } else {
    tribute.funeralDetails.rsvpList.push(newRSVP);
  }

  tributes[tributeIndex] = tribute;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tributes));
  } catch (e) {
    console.error('Failed to save tributes to localStorage', e);
  }
};

// Default hardcoded mock tributes
export const getMockTributes = (): Tribute[] => [
  {
    id: '1',
    name: 'Jane Doe',
    birthDate: '1950-01-01',
    deathDate: '2024-05-12',
    bio: 'A kind and loving person remembered forever.',
    photoUrl: '/placeholder.jpg',
    createdBy: 'mock-user-1',
  },
  {
    id: '2',
    name: 'John Smith',
    birthDate: '1945-03-22',
    deathDate: '2023-11-04',
    bio: 'A life well lived.',
    photoUrl: '/placeholder.jpg',
    createdBy: 'mock-user-2',
  },
];
