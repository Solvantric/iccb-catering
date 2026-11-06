export type LeadStatus = 'New' | 'Contacted' | 'Tasting' | 'Quoted' | 'Won' | 'Lost';
export type LeadType = 'quote' | 'booking' | 'tasting' | 'inquiry' | 'general';

export interface LeadNote {
  id: string;
  author: string;
  text: string;
  createdAt: string;
}

export interface LeadActivity {
  id: string;
  type: string;
  description: string;
  timestamp: string;
  user: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  companyName?: string;
  city: string;
  eventType: string;
  venue?: string;
  guestCount: number;
  eventDate: string; // DD/MM/YYYY
  budgetRange?: string;
  cuisinePreference?: string;
  packagePreference?: string;
  message?: string;
  status: LeadStatus;
  type: LeadType;
  assignee?: string;
  createdAt: string;
  updatedAt: string;
  notes: LeadNote[];
  activities: LeadActivity[];
  isSample?: boolean;
}

export interface QuotationItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface QuotationExtra {
  id: string;
  name: string;
  price: number;
}

export interface Quotation {
  id: string;
  quotationNumber: string;
  leadId?: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  eventType: string;
  eventDate: string;
  venue: string;
  guestCount: number;
  packageName: string;
  packagePricePerHead: number;
  items: QuotationItem[];
  extras: QuotationExtra[];
  subtotal: number;
  taxRate: number; // e.g., 0.05 (5%)
  taxAmount: number;
  discount: number;
  total: number;
  status: 'Draft' | 'Sent' | 'Accepted' | 'Rejected';
  version: number;
  notes?: string;
  createdAt: string;
  isSample?: boolean;
}

export interface Booking {
  id: string;
  bookingNumber: string;
  leadId?: string;
  clientName: string;
  email: string;
  phone: string;
  eventType: string;
  hallOrVenue: string;
  eventDate: string;
  guests: number;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  totalAmount: number;
  paidAmount: number;
  notes?: string;
  createdAt: string;
  isSample?: boolean;
}

export interface MenuItem {
  id: string;
  slug: string;
  name: string;
  nameBn?: string;
  description: string;
  descriptionBn?: string;
  category: 'Appetizers' | 'Mains' | 'Biryani & Rice' | 'Curries' | 'Desserts' | 'Beverages' | 'Breads';
  cuisine: 'Mughal' | 'Continental' | 'Multi-cuisine' | 'Traditional Bengali' | 'Chinese';
  price: number; // BDT
  image: string;
  dietTags: ('Halal' | 'Veg' | 'Non-Veg' | 'Spicy' | 'Chef Special')[];
  isAvailable: boolean;
  isFeatured: boolean;
  isTodaysMenu: boolean;
  allergens?: string[];
  preparationTime?: string;
  calories?: string;
  isSample?: boolean;
}

export interface MenuCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  displayOrder: number;
}

export interface Package {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  tag?: string; // e.g. "Most Popular", "Executive Choice"
  description: string;
  pricePerHead: number; // BDT
  minGuests: number;
  cuisineType: string;
  courses: {
    name: string;
    items: string[];
  }[];
  inclusions: string[];
  popular?: boolean;
  isSample?: boolean;
}

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  titleBn?: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  image: string;
  features: string[];
  idealFor: string[];
  sampleMenu?: string[];
  isSample?: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  titleBn?: string;
  category: 'Weddings' | 'Corporate' | 'Social' | 'Plating' | 'Venues';
  categoryBn?: string;
  imageUrl: string;
  caption?: string;
  captionBn?: string;
  isSample?: boolean;
}

export interface Testimonial {
  id: string;
  author: string;
  authorBn?: string;
  role: string;
  roleBn?: string;
  company?: string;
  companyBn?: string;
  eventType: string;
  eventTypeBn?: string;
  content: string;
  contentBn?: string;
  rating: number;
  avatarUrl: string;
  date: string;
  approved: boolean;
  isSample?: boolean;
}

export interface FAQ {
  id: string;
  question: string;
  questionBn?: string;
  answer: string;
  answerBn?: string;
  category: 'General' | 'Booking & Payment' | 'Menu & Tasting' | 'Logistics' | 'Venues';
  order: number;
  isSample?: boolean;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  readTime: string;
  category: string;
  tags: string[];
  publishedAt: string;
  status: 'draft' | 'published' | 'scheduled';
  seoTitle?: string;
  seoDescription?: string;
  isSample?: boolean;
}

export interface NewsItem {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  publishedAt: string;
  category: string;
  isSample?: boolean;
}

export interface ClientLogo {
  id: string;
  name: string;
  logoUrl: string;
  industry: string;
  isSample?: boolean;
}

export type UserRole = 'Admin' | 'Sales' | 'Content Editor' | 'Viewer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: 'active' | 'inactive';
  avatarUrl: string;
  lastLogin: string;
  phone?: string;
}

export interface RolePermission {
  id: string;
  name: UserRole;
  description: string;
  permissions: string[];
}

export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  module: string;
  details: string;
  timestamp: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'lead' | 'quotation' | 'booking' | 'system';
  read: boolean;
  timestamp: string;
  link?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
  status: 'unread' | 'read' | 'replied';
  isSample?: boolean;
}

export interface Subscriber {
  id: string;
  email: string;
  source: string;
  subscribedAt: string;
  status: 'active' | 'unsubscribed';
  isSample?: boolean;
}

export interface SiteSettings {
  brandName: string;
  tagline: string;
  address: string;
  cateringPhone: string;
  bookingPhones: string[];
  cateringEmail: string;
  generalEmail: string;
  whatsappNumber: string;
  hours: string;
  announcementBar: {
    enabled: boolean;
    text: string;
    linkText: string;
    linkUrl: string;
  };
  offerPopup: {
    enabled: boolean;
    title: string;
    discountText: string;
    description: string;
    code: string;
  };
  socialLinks: {
    facebook: string;
    instagram: string;
    linkedin: string;
    youtube: string;
  };
}

