import Link from 'next/link';

interface VendorConversationPageProps {
  params: {
    conversationId: string;
  };
}

export default function VendorConversationPage({ params }: VendorConversationPageProps) {
  const { conversationId } = params;

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <Link href="/vendor-messages" className="text-blue-600 hover:underline mb-4 inline-block">
        ← Back to Conversations
      </Link>

      <h1 className="text-3xl font-bold mb-4">Conversation {conversationId}</h1>

      {/* Placeholder for conversation messages */}
      <p>This is where the messages for conversation {conversationId} will appear.</p>
    </main>
  );
}
