import {
  INITIAL_LEADS,
  INITIAL_QUOTATIONS,
  INITIAL_BOOKINGS,
  MENU_ITEMS,
  MENU_CATEGORIES,
  PACKAGES,
  SERVICES,
  GALLERY_ITEMS,
  TESTIMONIALS,
  FAQS,
  BLOG_POSTS,
  DEMO_USERS,
  INITIAL_SETTINGS,
} from "@/data";
import { Lead, Quotation, Booking, MenuItem, BlogPost, FAQ, Testimonial, GalleryItem, User, SiteSettings, Package, ServiceItem } from "@/types";

const STORAGE_KEYS = {
  LEADS: "iccb_mock_leads",
  QUOTATIONS: "iccb_mock_quotations",
  BOOKINGS: "iccb_mock_bookings",
  MENU: "iccb_mock_menu",
  PACKAGES: "iccb_mock_packages",
  SERVICES: "iccb_mock_services",
  GALLERY: "iccb_mock_gallery",
  TESTIMONIALS: "iccb_mock_testimonials",
  FAQS: "iccb_mock_faqs",
  BLOG: "iccb_mock_blog",
  USERS: "iccb_mock_users",
  SETTINGS: "iccb_mock_settings",
  AUDIT: "iccb_mock_audit_logs",
};

// In-memory fallback for SSR
const memoryStore: Record<string, any> = {
  [STORAGE_KEYS.LEADS]: [...INITIAL_LEADS],
  [STORAGE_KEYS.QUOTATIONS]: [...INITIAL_QUOTATIONS],
  [STORAGE_KEYS.BOOKINGS]: [...INITIAL_BOOKINGS],
  [STORAGE_KEYS.MENU]: [...MENU_ITEMS],
  [STORAGE_KEYS.PACKAGES]: [...PACKAGES],
  [STORAGE_KEYS.SERVICES]: [...SERVICES],
  [STORAGE_KEYS.GALLERY]: [...GALLERY_ITEMS],
  [STORAGE_KEYS.TESTIMONIALS]: [...TESTIMONIALS],
  [STORAGE_KEYS.FAQS]: [...FAQS],
  [STORAGE_KEYS.BLOG]: [...BLOG_POSTS],
  [STORAGE_KEYS.USERS]: [...DEMO_USERS],
  [STORAGE_KEYS.SETTINGS]: { ...INITIAL_SETTINGS },
  [STORAGE_KEYS.AUDIT]: [
    {
      id: "aud-1",
      userId: "usr-admin",
      userName: "Tariqul Alam",
      action: "UPDATE",
      module: "Menu",
      details: "Updated pricing for Shahi Kacchi Biryani",
      timestamp: "2026-11-04T12:00:00Z",
    },
    {
      id: "aud-2",
      userId: "usr-sales",
      userName: "Zubair Hossain",
      action: "CREATE",
      module: "Quotations",
      details: "Issued Quotation #QT-2026-0042 to Mahmudur Rahman",
      timestamp: "2026-11-03T14:15:00Z",
    },
  ],
};

function getItem<T>(key: string, defaultData: T): T {
  if (typeof window === "undefined") {
    return (memoryStore[key] as T) || defaultData;
  }
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      localStorage.setItem(key, JSON.stringify(defaultData));
      return defaultData;
    }
    return JSON.parse(raw) as T;
  } catch (err) {
    return defaultData;
  }
}

function setItem<T>(key: string, data: T): void {
  if (typeof window === "undefined") {
    memoryStore[key] = data;
    return;
  }
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    // quota exceeded or SSR
  }
}

export const mockStore = {
  getLeads: () => getItem<Lead[]>(STORAGE_KEYS.LEADS, INITIAL_LEADS),
  saveLeads: (data: Lead[]) => setItem(STORAGE_KEYS.LEADS, data),

  getQuotations: () => getItem<Quotation[]>(STORAGE_KEYS.QUOTATIONS, INITIAL_QUOTATIONS),
  saveQuotations: (data: Quotation[]) => setItem(STORAGE_KEYS.QUOTATIONS, data),

  getBookings: () => getItem<Booking[]>(STORAGE_KEYS.BOOKINGS, INITIAL_BOOKINGS),
  saveBookings: (data: Booking[]) => setItem(STORAGE_KEYS.BOOKINGS, data),

  getMenu: () => getItem<MenuItem[]>(STORAGE_KEYS.MENU, MENU_ITEMS),
  saveMenu: (data: MenuItem[]) => setItem(STORAGE_KEYS.MENU, data),

  getPackages: () => getItem<Package[]>(STORAGE_KEYS.PACKAGES, PACKAGES),
  savePackages: (data: Package[]) => setItem(STORAGE_KEYS.PACKAGES, data),

  getServices: () => getItem<ServiceItem[]>(STORAGE_KEYS.SERVICES, SERVICES),
  saveServices: (data: ServiceItem[]) => setItem(STORAGE_KEYS.SERVICES, data),

  getGallery: () => getItem<GalleryItem[]>(STORAGE_KEYS.GALLERY, GALLERY_ITEMS),
  saveGallery: (data: GalleryItem[]) => setItem(STORAGE_KEYS.GALLERY, data),

  getTestimonials: () => getItem<Testimonial[]>(STORAGE_KEYS.TESTIMONIALS, TESTIMONIALS),
  saveTestimonials: (data: Testimonial[]) => setItem(STORAGE_KEYS.TESTIMONIALS, data),

  getFaqs: () => getItem<FAQ[]>(STORAGE_KEYS.FAQS, FAQS),
  saveFaqs: (data: FAQ[]) => setItem(STORAGE_KEYS.FAQS, data),

  getBlog: () => getItem<BlogPost[]>(STORAGE_KEYS.BLOG, BLOG_POSTS),
  saveBlog: (data: BlogPost[]) => setItem(STORAGE_KEYS.BLOG, data),

  getUsers: () => getItem<User[]>(STORAGE_KEYS.USERS, DEMO_USERS),
  saveUsers: (data: User[]) => setItem(STORAGE_KEYS.USERS, data),

  getSettings: () => getItem<SiteSettings>(STORAGE_KEYS.SETTINGS, INITIAL_SETTINGS),
  saveSettings: (data: SiteSettings) => setItem(STORAGE_KEYS.SETTINGS, data),

  getAuditLogs: () => getItem<any[]>(STORAGE_KEYS.AUDIT, memoryStore[STORAGE_KEYS.AUDIT]),
  logAction: (action: string, module: string, details: string, userName = "Admin") => {
    const logs = getItem<any[]>(STORAGE_KEYS.AUDIT, memoryStore[STORAGE_KEYS.AUDIT]);
    const newLog = {
      id: "aud-" + Date.now(),
      userId: "usr-current",
      userName,
      action,
      module,
      details,
      timestamp: new Date().toISOString(),
    };
    logs.unshift(newLog);
    setItem(STORAGE_KEYS.AUDIT, logs);
  },

  resetAll: () => {
    if (typeof window !== "undefined") {
      Object.values(STORAGE_KEYS).forEach((k) => localStorage.removeItem(k));
    }
  },
};

