// @/lib/vendorUtils.ts
import { vendorCategories } from '@/data/vendors';

export function getCategoryLabel(id: string): string {
  const cat = vendorCategories.find((c) => c.id === id);
  return cat?.name ?? id;
}

export function isValidCategoryId(id: string): boolean {
  return vendorCategories.some((c) => c.id === id);
}

export function isLocationMatch(search: string, location: string): boolean {
  const s = search.trim().toLowerCase();
  if (!s) return true;
  return location.toLowerCase().includes(s);
}

export function calculateAverageRating(reviews: Review[]): number | null {
  if (reviews.length === 0) return null;
  return reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
}
