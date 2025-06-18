export interface VendorCategory {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Message {
  id: string;
  sender: string;
  content: string;
  date: string;
}

export interface Vendor {
  id: string;
  name: string;
  category: string;
  location: string;
  lat?: number;
  lng?: number;
  phone?: string;
  email?: string;
  website?: string;
  imageUrl?: string;
  images?: string[];
  description?: string;
  reviews?: Review[]; // ✅ Added this line
}

export const vendorCategories: VendorCategory[] = [
  {
    id: 'funeral-homes',
    name: 'Funeral Homes',
    imageUrl: '/images/categories/funeral-home.png',
    description: 'Compassionate funeral homes to guide your family through loss.',
  },
  {
    id: 'crematoriums',
    name: 'Crematoriums',
    imageUrl: '/images/categories/crematorium.png',
    description: 'Respectful cremation services across the country.',
  },
  {
    id: 'florists',
    name: 'Florists',
    imageUrl: '/images/categories/florist.png',
    description: 'Floral arrangements and bouquets for memorials.',
  },
  {
    id: 'grief-counselors',
    name: 'Grief Counselors',
    imageUrl: '/images/categories/grief-counselor.png',
    description: 'Supportive therapists to help with the grieving process.',
  },
  {
    id: 'estate-lawyers',
    name: 'Estate Lawyers',
    imageUrl: '/images/categories/estate-lawyer.png',
    description: 'Legal professionals for wills, trusts, and probate.',
  },
  {
    id: 'memorial-products',
    name: 'Memorial Product Providers',
    imageUrl: '/images/categories/memorial-product.png',
    description: 'Caskets, urns, keepsakes, and more.',
  },
  {
    id: 'event-venues',
    name: 'Event Venues',
    imageUrl: '/images/categories/event-venue.png',
    description: 'Memorial gathering spaces and venues.',
  },
];

export const vendors: Vendor[] = [
  {
    id: 'sunset-funeral-home',
    name: 'Sunset Funeral Home',
    category: 'funeral-homes',
    location: 'New York, NY',
    lat: 40.7128,
    lng: -74.0060,
    phone: '212-555-1234',
    website: 'https://sunsetfuneralhome.com',
    imageUrl: '/images/vendors/sunset-funeral-home.png',
    images: ['/images/vendors/sunset-funeral-home.png'],
    description: 'Providing compassionate funeral services in New York.',
  },
  {
    id: 'peaceful-cremations',
    name: 'Peaceful Cremations',
    category: 'crematoriums',
    location: 'Los Angeles, CA',
    lat: 34.0522,
    lng: -118.2437,
    phone: '310-555-2345',
    website: 'https://peacefulcremations.com',
    imageUrl: '/images/vendors/peaceful-cremations.png',
    description: 'Dignified and respectful cremation services.',
  },
  {
    id: 'bloom-and-remembrance',
    name: 'Bloom & Remembrance Florals',
    category: 'florists',
    location: 'Chicago, IL',
    lat: 41.8781,
    lng: -87.6298,
    phone: '773-555-7890',
    website: 'https://bloomandremembrance.com',
    imageUrl: '/images/vendors/bloom-florist.png',
    description: 'Elegant floral arrangements for memorial services.',
  },
  {
    id: 'new-hope-counseling',
    name: 'New Hope Counseling',
    category: 'grief-counselors',
    location: 'Austin, TX',
    lat: 30.2672,
    lng: -97.7431,
    email: 'support@newhopecounseling.com',
    website: 'https://newhopecounseling.com',
    imageUrl: '/images/vendors/new-hope-counseling.png',
    description: 'Licensed counselors specializing in grief support.',
  },
  {
    id: 'legacy-law-group',
    name: 'Legacy Law Group',
    category: 'estate-lawyers',
    location: 'San Francisco, CA',
    lat: 37.7749,
    lng: -122.4194,
    phone: '415-555-4321',
    website: 'https://legacylawgroup.com',
    imageUrl: '/images/vendors/legacy-law.png',
    description: 'Experienced estate attorneys for your peace of mind.',
  },
  {
    id: 'eternal-keepsakes',
    name: 'Eternal Keepsakes',
    category: 'memorial-products',
    location: 'Orlando, FL',
    lat: 28.5383,
    lng: -81.3792,
    website: 'https://eternalkeepsakes.com',
    imageUrl: '/images/vendors/eternal-keepsakes.png',
    description: 'Unique urns, jewelry, and memory boxes.',
  },
  {
    id: 'tranquil-meadows-venue',
    name: 'Tranquil Meadows Venue',
    category: 'event-venues',
    location: 'Denver, CO',
    lat: 39.7392,
    lng: -104.9903,
    phone: '303-555-6789',
    website: 'https://tranquilmeadows.com',
    imageUrl: '/images/vendors/tranquil-meadows.png',
    description: 'A peaceful setting for memorial gatherings.',
  },
];
