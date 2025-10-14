/**
 * API Interceptors
 * Handle authentication tokens, refresh tokens, and common request/response logic
 */

import { useAuthStore } from "@/src/store/authStore";
import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import apiClient from "./client";

// Token management
let isRefreshing = false;
let failedQueue: {
  resolve: (value?: any) => void;
  reject: (reason?: any) => void;
}[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token);
    }
  });

  failedQueue = [];
};

// Request interceptor - Add auth token
export const setupRequestInterceptor = () => {
  apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const { accessToken } = useAuthStore.getState();

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }

      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    }
  );
};

// Response interceptor - Handle token refresh
export const setupResponseInterceptor = () => {
  apiClient.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    async (error: AxiosError) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & {
        _retry?: boolean;
      };

      // Handle 401 Unauthorized - Token expired
      if (error.response?.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          // If already refreshing, queue this request
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then(() => {
              return apiClient(originalRequest);
            })
            .catch((err) => {
              return Promise.reject(err);
            });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          // TODO: Implement refresh token logic
          // const newToken = await refreshAuthToken();
          // const { setToken } = useAuthStore.getState();
          // setToken(newToken);
          // processQueue(null, newToken);
          // return apiClient(originalRequest);

          // For now, just logout user
          const { logout } = useAuthStore.getState();
          logout();
          processQueue(error, null);

          return Promise.reject(error);
        } catch (refreshError) {
          processQueue(refreshError, null);
          const { logout } = useAuthStore.getState();
          logout();
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      // Handle other HTTP errors
      return Promise.reject(error);
    }
  );
};

// Mock refresh token function (to be implemented later)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const refreshAuthToken = async (): Promise<string> => {
  // TODO: Implement actual refresh token API call
  // const response = await httpClient.post('/auth/refresh', {
  //   refreshToken: getRefreshToken()
  // });
  // return response.data.accessToken;

  throw new Error("Refresh token not implemented yet");
};

// Initialize interceptors
export const initializeInterceptors = () => {
  setupRequestInterceptor();
  setupResponseInterceptor();
};

// Export for manual setup if needed
export { apiClient };
