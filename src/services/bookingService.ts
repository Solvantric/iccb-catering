import apiClient from "@/lib/axios";
import { Booking } from "@/types";

export const bookingService = {
  list: async (): Promise<Booking[]> => {
    const res = await apiClient.get<Booking[]>("/bookings");
    return res.data;
  },

  getById: async (id: string): Promise<Booking> => {
    const res = await apiClient.get<Booking>(`/bookings/${id}`);
    return res.data;
  },

  create: async (data: Partial<Booking>): Promise<Booking> => {
    const res = await apiClient.post<Booking>("/bookings", data);
    return res.data;
  },

  update: async (id: string, data: Partial<Booking>): Promise<Booking> => {
    const res = await apiClient.put<Booking>(`/bookings/${id}`, data);
    return res.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/bookings/${id}`);
  },
};

