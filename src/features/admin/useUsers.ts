/**
 * Users Management Hook for Admin
 * Handle user listing and management
 */

import {
  CreateUserRequest,
  User,
  usersApi,
} from "@/src/api/endpoints/users.api";
import {
  getErrorMessage,
  logError,
  normalizeHttpError,
} from "@/src/utils/http-error";
import { useEffect, useState } from "react";

export interface UseUsersReturn {
  users: User[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  createUser: (data: CreateUserRequest) => Promise<User>;
  deleteUser: (userId: string) => Promise<void>;
  toggleUserStatus: (userId: string) => Promise<void>;
  isCreating: boolean;
  isDeleting: boolean;
  isToggling: boolean;
  clearError: () => void;
}

export const useUsers = (): UseUsersReturn => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isToggling, setIsToggling] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async (): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await usersApi.getUsers();
      setUsers(data);
    } catch (err) {
      const httpError = normalizeHttpError(err);
      const errorMessage = getErrorMessage(httpError);

      logError(httpError, "useUsers.fetchUsers");
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const createUser = async (data: CreateUserRequest): Promise<User> => {
    try {
      setIsCreating(true);
      setError(null);

      // Validate required fields
      if (!data.email || !data.fullName || !data.role) {
        throw new Error("Please fill in all required fields");
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        throw new Error("Please enter a valid email address");
      }

      const newUser = await usersApi.createUser(data);

      // Add to local state
      setUsers((prev) => [...prev, newUser]);

      return newUser;
    } catch (err) {
      const httpError = normalizeHttpError(err);
      const errorMessage = getErrorMessage(httpError);

      logError(httpError, "useUsers.createUser");
      setError(errorMessage);
      throw httpError;
    } finally {
      setIsCreating(false);
    }
  };

  const deleteUser = async (userId: string): Promise<void> => {
    try {
      setIsDeleting(true);
      setError(null);

      await usersApi.deleteUser(userId);

      // Remove from local state
      setUsers((prev) => prev.filter((user) => user.id !== userId));
    } catch (err) {
      const httpError = normalizeHttpError(err);
      const errorMessage = getErrorMessage(httpError);

      logError(httpError, "useUsers.deleteUser");
      setError(errorMessage);
      throw httpError;
    } finally {
      setIsDeleting(false);
    }
  };

  const toggleUserStatus = async (userId: string): Promise<void> => {
    try {
      setIsToggling(true);
      setError(null);

      const updatedUser = await usersApi.toggleUserStatus(userId);

      // Update local state
      setUsers((prev) =>
        prev.map((user) => (user.id === userId ? updatedUser : user))
      );
    } catch (err) {
      const httpError = normalizeHttpError(err);
      const errorMessage = getErrorMessage(httpError);

      logError(httpError, "useUsers.toggleUserStatus");
      setError(errorMessage);
      throw httpError;
    } finally {
      setIsToggling(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  // Auto-fetch users when component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
    isLoading,
    error,
    refetch: fetchUsers,
    createUser,
    deleteUser,
    toggleUserStatus,
    isCreating,
    isDeleting,
    isToggling,
    clearError,
  };
};
