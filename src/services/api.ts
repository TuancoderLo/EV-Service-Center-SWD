import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from "axios";
import * as SecureStore from "expo-secure-store";
import { ApiResponse, ApiError } from "../types";

// Create axios instance
const api: AxiosInstance = axios.create({
  baseURL: "http://localhost:3000/api", // Replace with your API URL
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await SecureStore.getItemAsync("access_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Error getting token from secure store:", error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    // Handle 401 errors (unauthorized)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Clear stored auth data
        await SecureStore.deleteItemAsync("access_token");
        await SecureStore.deleteItemAsync("user_data");

        // Redirect to login (you might want to use navigation here)
        // navigation.navigate('Login');
      } catch (clearError) {
        console.error("Error clearing auth data:", clearError);
      }
    }

    // Transform error response
    const apiError: ApiError = {
      message:
        (error.response?.data as any)?.message ||
        error.message ||
        "An error occurred",
      code: (error.response?.data as any)?.code || error.code,
      details: (error.response?.data as any)?.details || error.response?.data,
    };

    return Promise.reject(apiError);
  }
);

// Generic API methods
export const apiService = {
  get: async <T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> => {
    const response = await api.get(url, config);
    return response.data;
  },

  post: async <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> => {
    const response = await api.post(url, data, config);
    return response.data;
  },

  put: async <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> => {
    const response = await api.put(url, data, config);
    return response.data;
  },

  patch: async <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> => {
    const response = await api.patch(url, data, config);
    return response.data;
  },

  delete: async <T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> => {
    const response = await api.delete(url, config);
    return response.data;
  },
};

export default api;
