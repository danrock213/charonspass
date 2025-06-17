import { Star } from 'lucide-react';

type Props = {
  rating: number;
  size?: number;
};

export default function StarRatingDisplay({ rating, size = 20 }: Props) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  const stars = Array.from({ length: 5 }, (_, i) => {
    if (i < fullStars) return 'full';
    if (i === fullStars && hasHalf) return 'half';
    return 'empty';
  });

  return (
    <div className="flex items-center gap-1 text-yellow-500">
      {stars.map((type, i) => (
        <Star
          key={i}
          className="inline"
          style={{ width: size, height: size }}
          fill={type !== 'empty' ? 'currentColor' : 'none'}
          stroke="currentColor"
        />
      ))}
      <span className="text-sm text-gray-700 ml-1">({rating.toFixed(1)})</span>
    </div>
  );
}
