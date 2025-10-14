/**
 * User Profile Hook
 * Handle current user data and profile management
 */

import { authApi } from "@/src/api/endpoints/auth.api";
import {
  UpdateUserRequest,
  User,
  usersApi,
} from "@/src/api/endpoints/users.api";
import { useAuthStore } from "@/src/store/authStore";
import {
  getErrorMessage,
  logError,
  normalizeHttpError,
} from "@/src/utils/http-error";
import { useEffect, useState } from "react";

export interface UseMeReturn {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  updateProfile: (data: UpdateUserRequest) => Promise<void>;
  isUpdating: boolean;
  clearError: () => void;
}

export const useMe = (): UseMeReturn => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user: authUser, setUser: setAuthUser } = useAuthStore();

  const fetchCurrentUser = async (): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);

      // If we have auth user, use that data first
      if (authUser) {
        setUser({
          ...authUser,
          phone: "",
          address: "",
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
      }

      // Fetch fresh user data from getMe API
      const { accessToken } = useAuthStore.getState();
      if (accessToken) {
        const userData = await authApi.getMe(accessToken);
        const fullUserData = {
          ...userData,
          phone: "",
          address: "",
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        setUser(fullUserData);

        // Update auth store with fresh data
        setAuthUser(userData);
      }
    } catch (err) {
      const httpError = normalizeHttpError(err);
      const errorMessage = getErrorMessage(httpError);

      logError(httpError, "useMe.fetchCurrentUser");
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (data: UpdateUserRequest): Promise<void> => {
    try {
      if (!user) {
        throw new Error("No user data available");
      }

      setIsUpdating(true);
      setError(null);

      // Call update API
      const updatedUser = await usersApi.updateUser(user.id, data);

      // Update local state
      setUser(updatedUser);

      // Update auth store if basic info changed
      if (data.fullName || data.avatar) {
        setAuthUser({
          ...authUser!,
          fullName: data.fullName || authUser!.fullName,
          avatar: data.avatar || authUser!.avatar,
        });
      }
    } catch (err) {
      const httpError = normalizeHttpError(err);
      const errorMessage = getErrorMessage(httpError);

      logError(httpError, "useMe.updateProfile");
      setError(errorMessage);
      throw httpError;
    } finally {
      setIsUpdating(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  // Auto-fetch user data when component mounts
  useEffect(() => {
    if (authUser) {
      fetchCurrentUser();
    }
    // fetchCurrentUser changes based on dependencies, but we only want to run when authUser changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authUser]);

  return {
    user,
    isLoading,
    error,
    refetch: fetchCurrentUser,
    updateProfile,
    isUpdating,
    clearError,
  };
};
