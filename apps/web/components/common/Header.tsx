'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from '@clerk/nextjs';

export default function Header() {
  const { user } = useUser();
  const router = useRouter();

  const handleProtectedNav = (path: string) => {
    if (user) {
      router.push(path);
    } else {
      router.push('/sign-in');
    }
  };

  const handleLogoClick = () => {
    router.push(user ? '/dashboard' : '/');
  };

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-3 flex justify-between items-center">
        <div className="flex flex-col">
          <div
            className="flex items-center space-x-3 cursor-pointer mb-2"
            onClick={handleLogoClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleLogoClick()}
          >
            <Image src="/logo.png" alt="Starlit Passage Logo" width={40} height={40} />
            <span className="text-2xl font-bold text-[#1D3557] hover:text-[#F4A261] transition-colors select-none">
              Starlit Passage
            </span>
          </div>

          <div className="flex space-x-8 text-sm font-medium text-[#1D3557] items-center">
            <Link
              href="/checklist"
              className="hover:text-[#F4A261] transition-colors"
            >
              Checklist
            </Link>

            <div className="relative group">
              <button className="hover:text-[#F4A261] transition-colors">
                Vendors ▾
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <Link href="/vendors" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  All Vendors
                </Link>
                <Link href="/vendors/funeral-homes" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Funeral Homes
                </Link>
                <Link href="/vendors/crematoriums" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Crematoriums
                </Link>
                <Link href="/vendors/florists" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Florists
                </Link>
                <Link href="/vendors/grief-counselors" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Grief Counselors
                </Link>
                <Link href="/vendors/estate-lawyers" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Estate Lawyers
                </Link>
                <Link href="/vendors/memorial-products" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Memorial Products
                </Link>
                <Link href="/vendors/event-venues" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Event Venues
                </Link>
              </div>
            </div>

            <Link href="/tribute" className="hover:text-[#F4A261] transition-colors">
              Tribute Page
            </Link>

            {user?.publicMetadata?.role === 'admin' && (
              <Link href="/admin/dashboard" className="hover:text-[#F4A261] transition-colors">
                Admin Dashboard
              </Link>
            )}

            {user && (
              <button
                onClick={() => router.push('/messages')}
                className="relative text-lg"
                aria-label="Messages"
                title="Messages"
              >
                <span aria-hidden="true">💬</span>
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-col items-end justify-center">
          <div className="flex items-center space-x-4">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="text-sm text-[#1D3557] hover:text-[#F4A261] transition">
                  Sign In
                </button>
              </SignInButton>
              <Link
                href="/sign-up"
                className="text-sm bg-[#1D3557] text-white px-4 py-2 rounded hover:bg-[#F4A261] hover:text-[#1D3557] transition"
              >
                Sign Up
              </Link>
            </SignedOut>

            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>

          <SignedOut>
            <Link
              href="/vendor-auth"
              className="text-xs text-gray-500 hover:text-[#1D3557] whitespace-nowrap mt-1"
              style={{ maxWidth: 234 }}
            >
              Are you a vendor? Sign in here
            </Link>
          </SignedOut>
        </div>
      </nav>
    </header>
  );
}
