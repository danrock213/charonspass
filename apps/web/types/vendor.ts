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

export interface Vendor {
  id: string;
  name: string;
  category: string; // category ID
  location: string;
  lat?: number;
  lng?: number;
  phone?: string;
  website?: string;
  email?: string;
  imageUrl?: string;
  images?: (string | File)[];
  description?: string;
  hours?: string;
  services?: string[];
  social?: {
    facebook?: string;
    instagram?: string;
    [key: string]: string | undefined;
  };
  approved?: boolean;
  updatedAt?: string;
  reviews?: Review[]; // ✅ <-- Add this line
}

export interface VendorProfile {
  vendorId: string;
  businessName?: string;
  description?: string;
  email?: string;
  phone?: string;
  address?: string;
  website?: string;
  categories?: string[];
  logoUrl?: string;
  createdAt?: string;
  updatedAt?: string;
  bio?: string;
  services?: string[];
  availability?: string;
  gallery?: string[];
}
