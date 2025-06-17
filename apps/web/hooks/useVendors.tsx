// hooks/useVendors.ts
import { useState, useEffect } from 'react';

export type VendorStatus = 'pending' | 'approved' | 'rejected';

export interface Vendor {
  id: string;
  name: string;
  category: string;
  status: VendorStatus;
  // add other vendor fields as needed
}

const STORAGE_KEY = 'vendors';

export function useVendors() {
  const [vendors, setVendors] = useState<Vendor[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed: Vendor[] = JSON.parse(stored);
      // Default status to 'pending' if missing
      const normalized = parsed.map(v => ({
        ...v,
        status: v.status || 'pending',
      }));
      setVendors(normalized);
      // Save normalized back to localStorage in case status was missing
      localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
    }
  }, []);

  const saveAll = (newVendors: Vendor[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newVendors));
    setVendors(newVendors);
  };

  const updateVendorStatus = (id: string, status: VendorStatus) => {
    const updated = vendors.map(v => (v.id === id ? { ...v, status } : v));
    saveAll(updated);
  };

  return { vendors, updateVendorStatus };
}
