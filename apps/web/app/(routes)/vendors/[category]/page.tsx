'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

import { vendors, vendorCategories } from '@/data/vendors';
import VendorCard from '@/components/vendor/VendorCard'; // OK to leave if it exists

export default function VendorCategoryPage() {
  const rawParams = useParams();
  const categoryParam = rawParams?.category;
  const category = Array.isArray(categoryParam) ? categoryParam[0] : categoryParam;

  if (!category) return <p className="p-6">Category not found.</p>;

  const categoryInfo = vendorCategories.find((cat) => cat.id === category);
  const filteredVendors = vendors.filter((v) => v.category === category);

  return (
    <main className="max-w-6xl mx-auto p-6">
      {/* Category sub-header with image and link */}
      {categoryInfo && (
        <Link
          href="/vendors"
          className="flex items-center gap-4 mb-8 hover:underline"
          aria-label="Back to Vendor Marketplace"
        >
          <Image
            src={categoryInfo.imageUrl}
            alt={categoryInfo.name}
            width={60}
            height={60}
            className="rounded-lg object-cover border border-gray-300"
          />
          <h1 className="text-3xl font-bold text-[#1D3557]">{categoryInfo.name}</h1>
        </Link>
      )}

      {filteredVendors.length === 0 ? (
        <p>No vendors found in this category.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {filteredVendors.map((vendor) => (
            <Link
              key={vendor.id}
              href={`/vendors/${category}/${vendor.id}`}
              className="group block border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative w-full h-40 bg-gray-100">
                {vendor.imageUrl ? (
                  <Image
                    src={vendor.imageUrl}
                    alt={vendor.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    No Image
                  </div>
                )}
              </div>
              <div className="p-3">
                <h2 className="text-lg font-semibold text-[#1D3557] truncate">{vendor.name}</h2>
                <p className="text-gray-600 text-sm truncate">{vendor.location}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
