/**
 * Login Hook
 * Handle user login functionality
 */

import { authApi, LoginRequest } from "@/src/api/endpoints/auth.api";
import { useAuthStore } from "@/src/store/authStore";
import {
  getErrorMessage,
  logError,
  normalizeHttpError,
} from "@/src/utils/http-error";
import { router } from "expo-router";
import { useState } from "react";

export interface UseLoginReturn {
  login: (credentials: LoginRequest) => Promise<void>;
  isLoading: boolean;
  error: string | null;
  clearError: () => void;
}

export const useLogin = (): UseLoginReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login: setAuthData } = useAuthStore();

  const login = async (credentials: LoginRequest): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);

      // Call login API
      const response = await authApi.login(credentials);

      // Update auth store
      setAuthData(response.accessToken, response.user);

      // Navigate to appropriate dashboard based on role
      switch (response.user.role) {
        case "admin":
          router.replace("/admin");
          break;
        case "member":
          router.replace("/member");
          break;
        case "staff":
          router.replace("/staff");
          break;
        case "technician":
          router.replace("/technician");
          break;
        default:
          router.replace("/");
          break;
      }
    } catch (err) {
      const httpError = normalizeHttpError(err);
      const errorMessage = getErrorMessage(httpError);

      logError(httpError, "useLogin");
      setError(errorMessage);

      throw httpError;
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  return {
    login,
    isLoading,
    error,
    clearError,
  };
};
