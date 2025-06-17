'use client';
import { useState } from 'react';
import { Star } from 'lucide-react';

type Props = {
  rating: number;
  onChange: (rating: number) => void;
};

export default function StarRatingInput({ rating, onChange }: Props) {
  const [hovered, setHovered] = useState(0);

  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          key={i}
          type="button"
          onClick={() => onChange(i)}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(0)}
          className="text-yellow-500"
        >
          <Star
            fill={i <= (hovered || rating) ? 'currentColor' : 'none'}
            stroke="currentColor"
            className="w-6 h-6"
          />
        </button>
      ))}
    </div>
  );
}
