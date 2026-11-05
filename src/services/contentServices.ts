import apiClient from "@/lib/axios";
import { Package, ServiceItem, GalleryItem, Testimonial, FAQ, BlogPost, SiteSettings, User, AuditLog } from "@/types";

export const packageService = {
  list: async (): Promise<Package[]> => {
    const res = await apiClient.get<Package[]>("/packages");
    return res.data;
  },
};

export const serviceService = {
  list: async (): Promise<ServiceItem[]> => {
    const res = await apiClient.get<ServiceItem[]>("/services");
    return res.data;
  },
};

export const galleryService = {
  list: async (): Promise<GalleryItem[]> => {
    const res = await apiClient.get<GalleryItem[]>("/gallery");
    return res.data;
  },
};

export const testimonialService = {
  list: async (): Promise<Testimonial[]> => {
    const res = await apiClient.get<Testimonial[]>("/testimonials");
    return res.data;
  },
  create: async (data: Partial<Testimonial>): Promise<Testimonial> => {
    const res = await apiClient.post<Testimonial>("/testimonials", data);
    return res.data;
  },
  update: async (id: string, data: Partial<Testimonial>): Promise<Testimonial> => {
    const res = await apiClient.put<Testimonial>(`/testimonials/${id}`, data);
    return res.data;
  },
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/testimonials/${id}`);
  },
};

export const faqService = {
  list: async (): Promise<FAQ[]> => {
    const res = await apiClient.get<FAQ[]>("/faqs");
    return res.data;
  },
  create: async (data: Partial<FAQ>): Promise<FAQ> => {
    const res = await apiClient.post<FAQ>("/faqs", data);
    return res.data;
  },
  update: async (id: string, data: Partial<FAQ>): Promise<FAQ> => {
    const res = await apiClient.put<FAQ>(`/faqs/${id}`, data);
    return res.data;
  },
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/faqs/${id}`);
  },
};

export const blogService = {
  list: async (): Promise<BlogPost[]> => {
    const res = await apiClient.get<BlogPost[]>("/blog");
    return res.data;
  },
  getBySlug: async (slug: string): Promise<BlogPost> => {
    const res = await apiClient.get<BlogPost>(`/blog/${slug}`);
    return res.data;
  },
  create: async (data: Partial<BlogPost>): Promise<BlogPost> => {
    const res = await apiClient.post<BlogPost>("/blog", data);
    return res.data;
  },
  update: async (id: string, data: Partial<BlogPost>): Promise<BlogPost> => {
    const res = await apiClient.put<BlogPost>(`/blog/${id}`, data);
    return res.data;
  },
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/blog/${id}`);
  },
};

export const settingsService = {
  get: async (): Promise<SiteSettings> => {
    const res = await apiClient.get<SiteSettings>("/settings");
    return res.data;
  },
  update: async (data: Partial<SiteSettings>): Promise<SiteSettings> => {
    const res = await apiClient.put<SiteSettings>("/settings", data);
    return res.data;
  },
};

export const userService = {
  list: async (): Promise<User[]> => {
    const res = await apiClient.get<User[]>("/users");
    return res.data;
  },
  create: async (data: Partial<User>): Promise<User> => {
    const res = await apiClient.post<User>("/users", data);
    return res.data;
  },
  update: async (id: string, data: Partial<User>): Promise<User> => {
    const res = await apiClient.put<User>(`/users/${id}`, data);
    return res.data;
  },
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/users/${id}`);
  },
};

export const auditService = {
  list: async (): Promise<AuditLog[]> => {
    const res = await apiClient.get<AuditLog[]>("/audit-logs");
    return res.data;
  },
};
