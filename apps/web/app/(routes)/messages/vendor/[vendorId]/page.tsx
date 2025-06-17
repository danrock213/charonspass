'use client';

import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';

interface Message {
  id: string;
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

// Helper to get conversations from localStorage
function getConversations(): Conversation[] {
  if (typeof window === 'undefined') return [];
  const raw = localStorage.getItem('conversations');
  return raw ? JSON.parse(raw) : [];
}

// Helper to save conversations to localStorage
function saveConversations(conversations: Conversation[]) {
  localStorage.setItem('conversations', JSON.stringify(conversations));
}

export default function ConversationPage() {
  const { vendorId } = useParams();
  const router = useRouter();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const convos = getConversations();
    setConversations(convos);
    const conv = convos.find((c) => c.vendorId === vendorId) || null;
    setConversation(conv);

    // Mark messages as read on open
    if (conv && conv.unreadCount > 0) {
      conv.unreadCount = 0;
      saveConversations(convos);
      setConversations([...convos]);
      setConversation({ ...conv });
    }
  }, [vendorId]);

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation]);

  if (!conversation) {
    return (
      <main className="max-w-4xl mx-auto p-6">
        <p className="text-red-600">Conversation not found.</p>
        <button
          className="text-blue-600 underline"
          onClick={() => router.push('/messages')}
        >
          Back to Messages
        </button>
      </main>
    );
  }

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      id: crypto.randomUUID(),
      text: input.trim(),
      sender: 'user',
      timestamp: Date.now(),
    };

    const updatedConversation: Conversation = {
      ...conversation,
      messages: [...conversation.messages, newMessage],
    };

    // Update conversations array
    const updatedConversations = conversations.map((c) =>
      c.vendorId === vendorId ? updatedConversation : c
    );

    saveConversations(updatedConversations);
    setConversations(updatedConversations);
    setConversation(updatedConversation);
    setInput('');
  };

  return (
    <main className="max-w-4xl mx-auto p-6 flex flex-col h-[80vh]">
      <header className="flex items-center space-x-4 mb-4">
        <button
          onClick={() => router.push('/messages')}
          className="text-blue-600 underline"
        >
          &larr; Back
        </button>
        <img
          src={conversation.vendorImageUrl}
          alt={conversation.vendorName}
          className="w-12 h-12 rounded-full object-cover"
        />
        <h1 className="text-2xl font-bold text-[#1D3557]">{conversation.vendorName}</h1>
      </header>

      <div className="flex-1 overflow-y-auto border rounded p-4 bg-white">
        {conversation.messages.length === 0 ? (
          <p className="text-gray-500">No messages yet. Say hello!</p>
        ) : (
          conversation.messages.map((msg) => (
            <div
              key={msg.id}
              className={`mb-2 max-w-[75%] p-2 rounded ${
                msg.sender === 'user'
                  ? 'bg-blue-200 text-blue-900 ml-auto'
                  : 'bg-gray-200 text-gray-900'
              }`}
            >
              <p>{msg.text}</p>
              <span className="text-xs text-gray-600 block mt-1">
                {new Date(msg.timestamp).toLocaleString()}
              </span>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="mt-4 flex space-x-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-grow border rounded p-2"
        />
        <button
          type="submit"
          className="bg-[#1D3557] text-white px-4 rounded hover:bg-[#27496d]"
        >
          Send
        </button>
      </form>
    </main>
  );
}
