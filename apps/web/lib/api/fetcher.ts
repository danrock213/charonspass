// lib/api/fetcher.ts

export async function fetcher<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  if (!res.ok) {
    throw new Error(`Error fetching ${url}: ${res.status}`);
  }

  return res.json();
}
