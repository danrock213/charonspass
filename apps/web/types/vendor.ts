// types/vendor.ts

export interface VendorCategory {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
}

export interface Vendor {
  id: string;
  name: string;
  category: string;
  location: string;
  lat?: number;
  lng?: number;
  phone?: string;
  website?: string;
  imageUrl?: string;
  images?: string[]; // optional array of images for the detail page
  description?: string;
  email?: string;
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
