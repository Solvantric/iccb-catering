import apiClient from "@/lib/axios";
import { MenuItem } from "@/types";

export const menuService = {
  list: async (params?: { category?: string; cuisine?: string; search?: string }): Promise<MenuItem[]> => {
    const res = await apiClient.get<MenuItem[]>("/menu", { params });
    return res.data;
  },

  getBySlug: async (slug: string): Promise<MenuItem> => {
    const res = await apiClient.get<MenuItem>(`/menu/${slug}`);
    return res.data;
  },

  create: async (data: Partial<MenuItem>): Promise<MenuItem> => {
    const res = await apiClient.post<MenuItem>("/menu", data);
    return res.data;
  },

  update: async (id: string, data: Partial<MenuItem>): Promise<MenuItem> => {
    const res = await apiClient.put<MenuItem>(`/menu/${id}`, data);
    return res.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/menu/${id}`);
  },
};
