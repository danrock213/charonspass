'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Message {
  id: string; // unique message id
  text: string;
  sender: 'user' | 'vendor';
  timestamp: number;
}

interface Conversation {
  vendorId: string;
  vendorName: string;
  vendorImageUrl: string;
  messages: Message[];
  unreadCount: number;
}

// Helper to get conversations from localStorage or empty array
function getConversations(): Conversation[] {
  if (typeof window === 'undefined') return [];
  const raw = localStorage.getItem('conversations');
  return raw ? JSON.parse(raw) : [];
}

export default function MessagesPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);

  useEffect(() => {
    setConversations(getConversations());
  }, []);

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-[#1D3557]">Messages</h1>

      {conversations.length === 0 ? (
        <p className="text-gray-500">No conversations yet.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {conversations.map((conv) => {
            const lastMsg = conv.messages[conv.messages.length - 1];
            return (
              <li key={conv.vendorId} className="py-4">
                <Link
                  href={`/messages/${conv.vendorId}`}
                  className="flex items-center space-x-4 hover:bg-gray-100 rounded p-2"
                >
                  <img
                    src={conv.vendorImageUrl}
                    alt={conv.vendorName}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-lg font-semibold text-[#1D3557]">{conv.vendorName}</p>
                    <p className="text-gray-600 truncate">{lastMsg?.text}</p>
                  </div>
                  {conv.unreadCount > 0 && (
                    <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                      {conv.unreadCount}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}
