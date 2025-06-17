import { useState, useEffect } from 'react';
import { Tribute } from '@/types/tribute';

const STORAGE_KEY = 'tributes';

export function useTributes() {
  const [tributes, setTributes] = useState<Tribute[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setTributes(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Failed to parse tributes from localStorage:', error);
      setTributes([]);
    }
  }, []);

  const saveAll = (newTributes: Tribute[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newTributes));
      setTributes(newTributes);
    } catch (error) {
      console.error('Failed to save tributes to localStorage:', error);
    }
  };

  const addTribute = (tribute: Tribute) => {
    const updated = [...tributes, tribute];
    saveAll(updated);
  };

  const updateTribute = (updatedTribute: Tribute) => {
    const updated = tributes.map(t => (t.id === updatedTribute.id ? updatedTribute : t));
    saveAll(updated);
  };

  const getTributeById = (id: string): Tribute | undefined => {
    return tributes.find(t => t.id === id);
  };

  const removeTribute = (id: string) => {
    const updated = tributes.filter(t => t.id !== id);
    saveAll(updated);
  };

  return {
    tributes,
    addTribute,
    updateTribute,
    getTributeById,
    removeTribute,
  };
}
