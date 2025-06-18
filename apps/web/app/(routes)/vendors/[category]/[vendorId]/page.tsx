'use client';

import { useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { vendors } from '@/data/vendors';
import Image from 'next/image';
import Link from 'next/link';
import { getCategoryLabel } from '@/lib/vendorUtils';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import StarRatingInput from '@/components/StarRatingInput';
import StarRatingDisplay from '@/components/StarRatingDisplay';
import type { Review } from '@/types/vendor';
import type { Message } from '@/types/message';


export default function VendorDetailPage() {
  const { category, vendorId } = useParams() as { category: string; vendorId: string };
  const router = useRouter();

  const vendor = useMemo(
    () => vendors.find((v) => v.category === category && v.id === vendorId),
    [category, vendorId]
  );

  const [reviews, setReviews] = useLocalStorage<Record<string, Review[]>>('vendorReviews', {});
  const [messages, setMessages] = useLocalStorage<Record<string, Message[]>>('vendorMessages', {});

  const isSignedIn = true; // Replace with real auth
  const userName = 'DemoUser'; // Replace with real user

  const vendorReviews = useMemo(
    () =>
      [...(reviews[vendorId] || [])].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      ),
    [reviews, vendorId]
  );

  const vendorMessages = messages[vendorId] || [];
  const recentUserMessages = vendorMessages.filter((msg) => msg.sender === userName).slice(0, 3);

  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [reviewError, setReviewError] = useState('');

  const [messageText, setMessageText] = useState('');
  const [messageError, setMessageError] = useState('');

  const averageRating = useMemo(() => {
    if (vendorReviews.length === 0) return null;
    const total = vendorReviews.reduce((sum, r) => sum + r.rating, 0);
    return total / vendorReviews.length;
  }, [vendorReviews]);

  const handleSubmitReview = () => {
    if (!isSignedIn) {
      router.push('/sign-in');
      return;
    }

    if (rating < 1 || rating > 5) {
      setReviewError('Rating must be between 1 and 5');
      return;
    }
    if (!reviewText.trim()) {
      setReviewError('Please enter a review message');
      return;
    }

    const newReview: Review = {
      id: `${Date.now()}`,
      author: userName,
      rating,
      comment: reviewText.trim(),
      date: new Date().toISOString(),
    };

    setReviews({
      ...reviews,
      [vendorId]: [newReview, ...vendorReviews],
    });

    setRating(5);
    setReviewText('');
    setReviewError('');
  };

  const handleSubmitMessage = () => {
    if (!isSignedIn) {
      router.push('/sign-in');
      return;
    }

    if (!messageText.trim()) {
      setMessageError('Please enter a message');
      return;
    }

    const newMessage: Message = {
      id: `${Date.now()}`,
      sender: userName,
      content: messageText.trim(),
      date: new Date().toISOString(),
    };

    setMessages({
      ...messages,
      [vendorId]: [newMessage, ...vendorMessages],
    });

    setMessageText('');
    setMessageError('');
    alert('Message sent successfully!');
  };

  if (!vendor) {
    return (
      <main className="max-w-4xl mx-auto p-6">
        <p className="text-red-600">Vendor not found.</p>
        <Link href={`/vendors/${category}`} className="text-blue-600 underline">
          Back to {getCategoryLabel(category)}
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto p-6">
      <Link href={`/vendors/${category}`} className="text-blue-600 underline mb-4 inline-block">
        &larr; Back to {getCategoryLabel(category)}
      </Link>

      <h1 className="text-4xl font-bold text-[#1D3557] mb-4">{vendor.name}</h1>

      {averageRating !== null && (
        <div className="text-yellow-600 mb-4">
          <StarRatingDisplay rating={averageRating} size={16} />{' '}
          {averageRating.toFixed(1)} ({vendorReviews.length} reviews)
        </div>
      )}

      <div className="flex gap-4 overflow-x-auto mb-6">
        {vendor.images?.length ? (
          vendor.images.map((img, idx) => (
            <div
              key={idx}
              className="relative w-64 h-40 flex-shrink-0 rounded overflow-hidden shadow"
            >
              <Image src={img} alt={`${vendor.name} image ${idx + 1}`} fill className="object-cover" />
            </div>
          ))
        ) : vendor.imageUrl ? (
          <div className="relative w-64 h-40 rounded overflow-hidden shadow">
            <Image src={vendor.imageUrl} alt={`${vendor.name}`} fill className="object-cover" />
          </div>
        ) : (
          <p className="text-gray-500">No image available</p>
        )}
      </div>

      <p className="mb-6 text-gray-700 whitespace-pre-line">{vendor.description}</p>

      <div className="mb-6 space-y-1 text-gray-800">
        <p>
          <strong>Location:</strong> {vendor.location}
        </p>
        {vendor.phone && (
          <p>
            <strong>Phone:</strong>{' '}
            <a href={`tel:${vendor.phone}`} className="text-blue-600 underline">
              {vendor.phone}
            </a>
          </p>
        )}
        {vendor.email && (
          <p>
            <strong>Email:</strong>{' '}
            <a href={`mailto:${vendor.email}`} className="text-blue-600 underline">
              {vendor.email}
            </a>
          </p>
        )}
        {vendor.website && (
          <p>
            <strong>Website:</strong>{' '}
            <a href={vendor.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
              {vendor.website}
            </a>
          </p>
        )}
      </div>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Send a Message</h2>
        {isSignedIn ? (
          <div className="p-4 border rounded bg-gray-50">
            <textarea
              rows={3}
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              className="w-full border rounded p-2"
              placeholder="Write your message here..."
            />
            {messageError && <p className="text-red-600 mt-2">{messageError}</p>}
            <button
              onClick={handleSubmitMessage}
              className="mt-3 bg-[#1D3557] text-white px-4 py-2 rounded hover:bg-[#16324a] transition"
            >
              Send Message
            </button>

            {recentUserMessages.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Your Recent Messages</h3>
                <ul className="space-y-2">
                  {recentUserMessages.map((msg) => (
                    <li key={msg.id} className="border p-2 rounded bg-white text-sm text-gray-700">
                      <p className="whitespace-pre-line">{msg.content}</p>
                      <p className="text-gray-400 text-xs mt-1">
                        {new Date(msg.date).toLocaleDateString()} at{' '}
                        {new Date(msg.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : (
          <p>
            <Link href="/sign-in" className="text-blue-600 underline">
              Sign in
            </Link>{' '}
            to message this vendor.
          </p>
        )}
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Reviews ({vendorReviews.length})</h2>

        <div className="mb-6 p-4 border rounded bg-gray-50">
          {isSignedIn ? (
            <>
              <label className="block mb-1 font-medium">Rating:</label>
              <StarRatingInput rating={rating} onChange={setRating} />

              <label className="block mt-4 mb-1 font-medium">Your Review:</label>
              <textarea
                rows={3}
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                className="w-full border rounded p-2"
              />

              {reviewError && <p className="text-red-600 mt-2">{reviewError}</p>}

              <button
                onClick={handleSubmitReview}
                className="mt-3 bg-[#1D3557] text-white px-4 py-2 rounded hover:bg-[#16324a] transition"
              >
                Submit Review
              </button>
            </>
          ) : (
            <p>
              <Link href="/sign-in" className="text-blue-600 underline">
                Sign in
              </Link>{' '}
              to post a review.
            </p>
          )}
        </div>

        <ul>
          {vendorReviews.length === 0 && <li>No reviews yet.</li>}
          {vendorReviews.map((rev) => (
            <li key={rev.id} className="mb-4 border-b pb-2">
              <p className="font-semibold">
                {rev.author} <StarRatingDisplay rating={rev.rating} size={16} />
              </p>
              <p className="text-gray-700 whitespace-pre-line">{rev.comment}</p>
              <p className="text-gray-500 text-sm">{new Date(rev.date).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
