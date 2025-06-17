'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Conversation {
  unreadCount: number;
}

export default function MessagesIcon() {
  const [totalUnread, setTotalUnread] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in by inspecting localStorage or any auth indicator you have
    const token = localStorage.getItem('authToken'); // adjust if you store it differently
    setIsLoggedIn(!!token);

    if (token) {
      const raw = localStorage.getItem('conversations');
      const conversations: Conversation[] = raw ? JSON.parse(raw) : [];
      const unreadSum = conversations.reduce((sum, c) => sum + (c.unreadCount || 0), 0);
      setTotalUnread(unreadSum);
    }
  }, []);

  if (!isLoggedIn) return null;

  return (
    <Link href="/messages" className="relative inline-block">
      {/* Message bubble SVG */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-gray-700 hover:text-[#1D3557]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M7 8h10M7 12h6m-6 4h4m5 1a9 9 0 11-8-16 9 9 0 018 16z"
        />
      </svg>

      {/* Unread badge */}
      {totalUnread > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full px-1.5 py-0.5 font-bold">
          {totalUnread}
        </span>
      )}
    </Link>
  );
}
