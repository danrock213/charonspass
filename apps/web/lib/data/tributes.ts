import { Tribute } from '@/types/tribute';

const API_BASE_PATH = '/api/tributes';

// Helper to get full URL for fetch in server or client
function getApiUrl(path = '') {
  if (typeof window === 'undefined') {
    // Server side: build full URL from env or default localhost
    const origin = process.env.NEXT_PUBLIC_APP_ORIGIN || 'http://localhost:3000';
    return origin + API_BASE_PATH + path;
  } else {
    // Client side: relative path works fine
    return API_BASE_PATH + path;
  }
}

export const getTributes = async (): Promise<Tribute[]> => {
  try {
    const res = await fetch(getApiUrl(), { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch tributes');
    const data = await res.json();
    return Array.isArray(data) ? data : getMockTributes();
  } catch (e) {
    console.error('Error fetching tributes:', e);
    return getMockTributes();
  }
};

export const getTributeById = async (id: string): Promise<Tribute | undefined> => {
  try {
    const res = await fetch(getApiUrl(`/${id}`), { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch tribute');
    return await res.json();
  } catch (e) {
    console.error(`Error fetching tribute ${id}:`, e);
    return undefined;
  }
};

export const saveTribute = async (tribute: Tribute): Promise<Tribute | undefined> => {
  const method = tribute.id ? 'PUT' : 'POST';
  const endpoint = tribute.id ? getApiUrl(`/${tribute.id}`) : getApiUrl();

  try {
    const res = await fetch(endpoint, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tribute),
    });

    if (!res.ok) throw new Error(`Failed to ${method === 'POST' ? 'create' : 'update'} tribute`);
    return await res.json();
  } catch (e) {
    console.error(`Error saving tribute:`, e);
    return undefined;
  }
};

export const addRSVPToTribute = async (
  tributeId: string,
  name: string,
  attending: boolean
): Promise<Tribute | undefined> => {
  const tribute = await getTributeById(tributeId);
  if (!tribute) return;

  if (!tribute.funeralDetails) tribute.funeralDetails = {};
  if (!tribute.funeralDetails.rsvpList) tribute.funeralDetails.rsvpList = [];

  const newRSVP = {
    name,
    attending,
    timestamp: new Date().toISOString(),
  };

  const index = tribute.funeralDetails.rsvpList.findIndex((r) => r.name === name);
  if (index !== -1) {
    tribute.funeralDetails.rsvpList[index] = newRSVP;
  } else {
    tribute.funeralDetails.rsvpList.push(newRSVP);
  }

  return await saveTribute(tribute);
};

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
