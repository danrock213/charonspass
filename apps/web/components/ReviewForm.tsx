'use client';

import { useState } from 'react';

type ReviewFormProps = {
  onSubmit: (review: { author: string; rating: number; text: string }) => void;
};

export default function ReviewForm({ onSubmit }: ReviewFormProps) {
  const [author, setAuthor] = useState('');
  const [rating, setRating] = useState(0);
  const [text, setText] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (rating === 0) {
      alert('Please select a rating');
      return;
    }
    if (author.trim() === '' || text.trim() === '') {
      alert('Please fill in all fields');
      return;
    }
    onSubmit({ author: author.trim(), rating, text: text.trim() });
    setAuthor('');
    setRating(0);
    setText('');
  }

  return (
    <form onSubmit={handleSubmit} className="border p-4 rounded shadow space-y-4 max-w-md">
      <h3 className="text-xl font-semibold">Submit a Review</h3>

      <div>
        <label htmlFor="author" className="block font-semibold mb-1">
          Your Name
        </label>
        <input
          id="author"
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full border rounded p-2"
          required
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Rating</label>
        <div className="flex space-x-2 text-yellow-400">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className={`text-2xl ${star <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
              aria-label={`${star} star${star > 1 ? 's' : ''}`}
            >
              ★
            </button>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="text" className="block font-semibold mb-1">
          Review
        </label>
        <textarea
          id="text"
          rows={4}
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full border rounded p-2"
          required
        />
      </div>

      <button
        type="submit"
        className="bg-[#1D3557] text-white px-6 py-2 rounded hover:bg-[#274472] transition"
      >
        Submit Review
      </button>
    </form>
  );
}
