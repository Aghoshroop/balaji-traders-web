export type AvailabilityStatus =
  | 'in-stock'
  | 'available'
  | 'limited'
  | 'new-arrival'
  | 'ask'
  | 'bulk-only';

export const AVAILABILITY_LABELS: Record<AvailabilityStatus, string> = {
  'in-stock': 'In Stock',
  available: 'Available',
  limited: 'Limited Availability',
  'new-arrival': 'New Arrival',
  ask: 'Ask for Availability',
  'bulk-only': 'Contact for Bulk Requirement',
};

export const AVAILABILITY_COLORS: Record<AvailabilityStatus, string> = {
  'in-stock': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  available: 'bg-sky-50 text-sky-700 border-sky-200',
  limited: 'bg-amber-50 text-amber-700 border-amber-200',
  'new-arrival': 'bg-purple-50 text-purple-700 border-purple-200',
  ask: 'bg-slate-100 text-slate-700 border-slate-200',
  'bulk-only': 'bg-blue-50 text-blue-700 border-blue-200',
};

export interface ProductImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  categorySlug: string;
  sku: string;
  price?: number;
  mrp?: number;
  description: string;
  shortDescription: string;
  images: ProductImage[];
  colors: string[];
  sizes: string[];
  material?: string;
  features: string[];
  availability: AvailabilityStatus;
  tags: string[];
  gender: 'men' | 'women' | 'kids' | 'unisex';
  isFeatured?: boolean;
  isNewArrival?: boolean;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  description: string;
  image: string;
  productCount?: number;
  gender?: 'men' | 'women' | 'kids' | 'unisex';
  seoTitle: string;
  seoDescription: string;
}

export interface Brand {
  id: string;
  slug: string;
  name: string;
  description: string;
  logo?: string;
  website?: string;
  isMainBrand: boolean;
}

export type EnquiryType =
  | 'price'
  | 'availability'
  | 'bulk'
  | 'size-colour'
  | 'dealer'
  | 'general';

export const ENQUIRY_LABELS: Record<EnquiryType, string> = {
  price: 'Price Enquiry',
  availability: 'Check Availability',
  bulk: 'Bulk / Wholesale Order',
  'size-colour': 'Size & Colour Options',
  dealer: 'Dealer / Reseller Enquiry',
  general: 'General Enquiry',
};

export interface FAQItem {
  question: string;
  answer: string;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}
