'use client';

import React, { useState } from 'react';

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
}

interface ConversationPageProps {
  params: {
    conversationId: string;
  };
}

export default function ConversationPage({ params }: ConversationPageProps) {
  const { conversationId } = params;

  const [messages, setMessages] = useState<Message[]>([
    { id: '1', sender: 'user', content: 'Hi, I’m interested in your services.', timestamp: '2025-06-10T10:00:00Z' },
    { id: '2', sender: 'vendor', content: 'Thanks for reaching out! How can I help?', timestamp: '2025-06-10T10:01:00Z' },
  ]);

  const [newMessage, setNewMessage] = useState('');

  const handleSend = () => {
    if (!newMessage.trim()) return;

    const messageToAdd: Message = {
      id: String(messages.length + 1),
      sender: 'user',
      content: newMessage,
      timestamp: new Date().toISOString(),
    };

    setMessages([...messages, messageToAdd]);
    setNewMessage('');
  };

  return (
    <main className="flex flex-col p-6 min-h-screen bg-white max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Conversation {conversationId}</h1>
      <div className="flex-grow overflow-auto mb-4 flex flex-col space-y-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`p-3 rounded max-w-[80%] ${
              msg.sender === 'user' ? 'bg-blue-100 self-start' : 'bg-gray-200 self-end'
            }`}
          >
            <p>{msg.content}</p>
            <small className="text-gray-500">{new Date(msg.timestamp).toLocaleString()}</small>
          </div>
        ))}
      </div>

      <div className="flex space-x-3">
        <input
          type="text"
          className="flex-grow border rounded p-2"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleSend();
            }
          }}
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700"
          aria-label="Send message"
        >
          Send
        </button>
      </div>
    </main>
  );
}
