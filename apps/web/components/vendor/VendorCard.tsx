'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Vendor } from '@/data/vendors';
import { calculateAverageRating } from '@/lib/vendorUtils';
import StarRatingDisplay from './StarRatingDisplay';

interface Props {
  vendor: Vendor;
}

export default function VendorCard({ vendor }: Props) {
  const avg = vendor.reviews ? calculateAverageRating(vendor.reviews) : null;

  return (
    <Link
      href={`/vendors/${vendor.category}/${vendor.id}`}
      className="group block border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
      aria-label={`View details for ${vendor.name}`}
    >
      <div className="relative w-full h-40 bg-gray-100">
        <Image
          src={vendor.imageUrl ?? '/images/placeholders/vendor.png'}
          alt={vendor.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, 25vw"
          priority={false}
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-[#1D3557] truncate">{vendor.name}</h3>
        <p className="text-sm text-gray-600 truncate">{vendor.location}</p>
        {avg !== null && (
          <div className="text-sm text-yellow-600 mt-1 flex items-center gap-1">
            <StarRatingDisplay rating={avg} size={14} />
            <span>{avg.toFixed(1)} ({vendor.reviews.length})</span>
          </div>
        )}
      </div>
    </Link>
  );
}
