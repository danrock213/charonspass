export async function geocodeCity(
  city: string
): Promise<{ lat: number; lng: number } | null> {
  try {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
      city
    )}&format=json&limit=1`;

    const res = await fetch(url, {
      headers: {
        "User-Agent": "StarlitPassageApp/1.0 (admin@starlitpassage.com)", // Customize for your app
      },
    });

    if (!res.ok) {
      console.error(`Geocoding failed with status ${res.status}`);
      return null;
    }

    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) return null;

    const { lat, lon } = data[0];
    return { lat: parseFloat(lat), lng: parseFloat(lon) };
  } catch (err) {
    console.error(`Error during geocoding:`, err);
    return null;
  }
}

// Fix: export this so it's usable elsewhere
export const geocodeWithCache = geocodeCity;
