/**
 * Update User Hook for Admin
 * Handle individual user profile updates
 */

import {
  UpdateUserRequest,
  User,
  usersApi,
} from "@/src/api/endpoints/users.api";
import {
  getErrorMessage,
  logError,
  normalizeHttpError,
} from "@/src/utils/http-error";
import { useState } from "react";

export interface UseUpdateUserReturn {
  updateUser: (userId: string, data: UpdateUserRequest) => Promise<User>;
  isUpdating: boolean;
  error: string | null;
  clearError: () => void;
}

export const useUpdateUser = (): UseUpdateUserReturn => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateUser = async (
    userId: string,
    data: UpdateUserRequest
  ): Promise<User> => {
    try {
      setIsUpdating(true);
      setError(null);

      // Validate required fields if provided
      if (data.fullName && data.fullName.trim().length < 2) {
        throw new Error("Full name must be at least 2 characters long");
      }

      if (data.phone && data.phone.length > 0) {
        // Basic phone validation
        const phoneRegex = /^[+]?[\d\s\-()]+$/;
        if (!phoneRegex.test(data.phone)) {
          throw new Error("Please enter a valid phone number");
        }
      }

      const updatedUser = await usersApi.updateUser(userId, data);

      return updatedUser;
    } catch (err) {
      const httpError = normalizeHttpError(err);
      const errorMessage = getErrorMessage(httpError);

      logError(httpError, "useUpdateUser.updateUser");
      setError(errorMessage);
      throw httpError;
    } finally {
      setIsUpdating(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  return {
    updateUser,
    isUpdating,
    error,
    clearError,
  };
};
