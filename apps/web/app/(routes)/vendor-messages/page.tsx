import Link from "next/link";

interface Conversation {
  id: string;
  userName: string;
  lastMessage: string;
}

const conversations: Conversation[] = [
  { id: "abc123", userName: "John Doe", lastMessage: "Thanks for your help!" },
  { id: "def456", userName: "Jane Smith", lastMessage: "When is the meeting?" },
  // You can leave this empty or replace with actual data later
];

export default function VendorMessagesPage() {
  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-4">Your Conversations</h1>
      {conversations.length === 0 ? (
        <p>No conversations yet.</p>
      ) : (
        <ul className="space-y-3">
          {conversations.map(({ id, userName, lastMessage }) => (
            <li
              key={id}
              className="p-4 bg-white rounded shadow hover:bg-gray-100 cursor-pointer"
            >
              <Link href={`/vendor-messages/${id}`}>
                <p className="font-semibold">{userName}</p>
                <p className="text-gray-600 truncate max-w-md">{lastMessage}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
