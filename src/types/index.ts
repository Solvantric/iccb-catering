export interface Venue {
  id: string;
  slug: string;
  name: string;
  hallNumber?: string;
  tagline: string;
  description: string;
  features: string[];
  specs?: {
    area?: string;
    capacity?: string;
    parking?: string;
  };
  image: string;
}

export interface EventTypeItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  image?: string;
  features?: string[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  caption?: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
  order: number;
}

export interface SiteSettings {
  brandName: string;
  tagline: string;
  address: string;
  cateringPhone: string;
  bookingPhones: string[];
  cateringEmail: string;
  generalEmail: string;
  socialLinks: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    youtube?: string;
  };
}

export interface EnquiryFormData {
  name: string;
  email: string;
  phone: string;
  eventType: string;
  approxGuests: number;
  preferredDate: string;
  venue: string;
  message?: string;
}
