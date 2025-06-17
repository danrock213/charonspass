// @/lib/geocode.ts

export async function geocodeCity(city: string): Promise<{ lat: number; lng: number } | null> {
  try {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(city)}&format=json&limit=1`;

    const res = await fetch(url, {
      headers: {
        'User-Agent': 'PeacefulPassageApp/1.0 (admin@peacefulpassage.app)', // Replace with your contact info
      },
    });

    if (!res.ok) {
      console.error(`Geocoding failed with status ${res.status}`);
      return null;
    }

    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) {
      console.warn(`No results found for city: ${city}`);
      return null;
    }

    const { lat, lon } = data[0];
    return { lat: parseFloat(lat), lng: parseFloat(lon) };
  } catch (err) {
    console.error(`Error during geocoding:`, err);
    return null;
  }
}
