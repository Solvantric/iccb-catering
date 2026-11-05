import apiClient from "@/lib/axios";
import { Quotation } from "@/types";

export const quotationService = {
  list: async (): Promise<Quotation[]> => {
    const res = await apiClient.get<Quotation[]>("/quotations");
    return res.data;
  },

  getById: async (id: string): Promise<Quotation> => {
    const res = await apiClient.get<Quotation>(`/quotations/${id}`);
    return res.data;
  },

  create: async (data: Partial<Quotation>): Promise<Quotation> => {
    const res = await apiClient.post<Quotation>("/quotations", data);
    return res.data;
  },

  update: async (id: string, data: Partial<Quotation>): Promise<Quotation> => {
    const res = await apiClient.put<Quotation>(`/quotations/${id}`, data);
    return res.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/quotations/${id}`);
  },
};
