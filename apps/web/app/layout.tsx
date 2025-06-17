import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import ClientLayout from './ClientLayout';

export const metadata = {
  title: 'Starlit Passage',
  description: 'Funeral planning made simple',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="bg-blue-50 text-gray-900 min-h-screen font-sans">
          <ClientLayout>{children}</ClientLayout>
        </body>
      </html>
    </ClerkProvider>
  );
}
