// /hooks/useGeocode.ts
'use client';

import { useState, useEffect } from 'react';
import { geocodeWithCache } from '../utils/geocode';

export function useGeocode(location: string | null) {
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!location) {
      setCoords(null);
      return;
    }

    setLoading(true);
    geocodeWithCache(location)
      .then((result) => {
        setCoords(result);
        setError(null);
      })
      .catch(() => {
        setError('Failed to geocode location');
        setCoords(null);
      })
      .finally(() => setLoading(false));
  }, [location]);

  return { coords, loading, error };
}
