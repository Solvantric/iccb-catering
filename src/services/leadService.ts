import apiClient from "@/lib/axios";
import { Lead } from "@/types";

export const leadService = {
  list: async (params?: { status?: string; search?: string }): Promise<Lead[]> => {
    const res = await apiClient.get<Lead[]>("/leads", { params });
    return res.data;
  },

  getById: async (id: string): Promise<Lead> => {
    const res = await apiClient.get<Lead>(`/leads/${id}`);
    return res.data;
  },

  create: async (data: Partial<Lead>): Promise<Lead> => {
    const res = await apiClient.post<Lead>("/leads", data);
    return res.data;
  },

  update: async (id: string, data: Partial<Lead>): Promise<Lead> => {
    const res = await apiClient.put<Lead>(`/leads/${id}`, data);
    return res.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/leads/${id}`);
  },
};

