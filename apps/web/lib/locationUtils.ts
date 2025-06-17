export function isLocationMatch(search: string, vendorLocation: string): boolean {
  if (!search) return true; // If no search, match all

  const normalize = (str: string) =>
    str.toLowerCase().replace(/[^a-z0-9]/g, '');

  const normalizedSearch = normalize(search);
  const normalizedVendorLoc = normalize(vendorLocation);

  // Check if either string includes the other
  return (
    normalizedVendorLoc.includes(normalizedSearch) ||
    normalizedSearch.includes(normalizedVendorLoc)
  );
}
