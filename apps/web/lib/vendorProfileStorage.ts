import type { Vendor } from '@/types/vendor';
import { VendorProfile } from '@/types/vendor';

const STORAGE_PREFIX = 'vendor-profile-';

export const getVendorProfile = (vendorId: string): VendorProfile | null => {
  if (typeof window === 'undefined') return null;
  const data = localStorage.getItem(STORAGE_PREFIX + vendorId);
  if (!data) return null;
  try {
    return JSON.parse(data) as VendorProfile;
  } catch (e) {
    console.error('Failed to parse vendor profile from localStorage', e);
    return null;
  }
};

export const saveVendorProfile = (profile: VendorProfile): void => {
  if (typeof window === 'undefined') return;
  profile.updatedAt = new Date().toISOString();
  localStorage.setItem(STORAGE_PREFIX + profile.vendorId, JSON.stringify(profile));

};
