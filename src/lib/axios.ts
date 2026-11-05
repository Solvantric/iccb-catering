import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { toast } from "sonner";
import { handleMockRequest } from "./mock-api/adapter";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "/api";
// Set to false when connecting to a real external REST backend
export const USE_MOCK_API = process.env.NEXT_PUBLIC_USE_MOCK !== "false";

export const apiClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window !== "undefined") {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("iccb_auth_token="))
        ?.split("=")[1];
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// If mock API is enabled, bypass standard network requests and serve from our localStorage mock adapter
if (USE_MOCK_API) {
  apiClient.defaults.adapter = async (config) => {
    const method = config.method || "get";
    const url = config.url || "";
    let parsedData = config.data;
    if (typeof config.data === "string") {
      try {
        parsedData = JSON.parse(config.data);
      } catch (e) {
        parsedData = config.data;
      }
    }

    try {
      const mockRes = await handleMockRequest(method, url, parsedData, config.params);
      return {
        data: mockRes.data,
        status: mockRes.status,
        statusText: mockRes.status === 200 || mockRes.status === 201 ? "OK" : "Error",
        headers: {},
        config,
        request: {},
      };
    } catch (err: any) {
      return Promise.reject({
        response: {
          data: { message: err?.message || "Mock adapter error" },
          status: 500,
        },
      });
    }
  };
}

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string }>) => {
    const message = error.response?.data?.message || error.message || "An unexpected error occurred.";
    if (typeof window !== "undefined" && error.response?.status !== 404) {
      toast.error(message);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
