'use client';

import Header from '@/components/common/Header';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-10">
        {children}
      </main>
      <footer className="text-center text-gray-500 text-sm py-6 select-none">
        &copy; {new Date().getFullYear()} Starlit Passage. All rights reserved.
      </footer>
    </>
  );
}
