/**
 * Users API endpoints
 * Handle user management and profiles
 */

import { normalizeHttpError } from "@/src/utils/http-error";
import { httpClient } from "../client";
import { USE_MOCK_DATA } from "../config";

// Type definitions
export interface User {
  id: string;
  email: string;
  fullName: string;
  role: "admin" | "member" | "staff" | "technician";
  avatar?: string;
  phone?: string;
  address?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateUserRequest {
  fullName?: string;
  phone?: string;
  address?: string;
  avatar?: string;
}

export interface CreateUserRequest {
  email: string;
  fullName: string;
  role: User["role"];
  phone?: string;
  address?: string;
}

// Mock data
const MOCK_USERS: User[] = [
  {
    id: "1",
    email: "admin@test.com",
    fullName: "Admin User",
    role: "admin",
    phone: "+1234567890",
    isActive: true,
    createdAt: "2025-01-01T00:00:00Z",
    updatedAt: "2025-10-14T00:00:00Z",
  },
  {
    id: "2",
    email: "member@test.com",
    fullName: "Member User",
    role: "member",
    phone: "+1234567891",
    isActive: true,
    createdAt: "2025-01-02T00:00:00Z",
    updatedAt: "2025-10-14T00:00:00Z",
  },
  {
    id: "3",
    email: "staff@test.com",
    fullName: "Staff User",
    role: "staff",
    phone: "+1234567892",
    isActive: true,
    createdAt: "2025-01-03T00:00:00Z",
    updatedAt: "2025-10-14T00:00:00Z",
  },
  {
    id: "4",
    email: "technician@test.com",
    fullName: "Technician User",
    role: "technician",
    phone: "+1234567893",
    isActive: true,
    createdAt: "2025-01-04T00:00:00Z",
    updatedAt: "2025-10-14T00:00:00Z",
  },
];

// API functions
export const usersApi = {
  /**
   * Get all users (admin only)
   */
  getUsers: async (): Promise<User[]> => {
    try {
      if (USE_MOCK_DATA) {
        await new Promise((resolve) => setTimeout(resolve, 800));
        return MOCK_USERS;
      }

      const response = await httpClient.get<User[]>("/users");
      return response.data;
    } catch (error) {
      throw normalizeHttpError(error);
    }
  },

  /**
   * Get user by ID
   */
  getUserById: async (id: string): Promise<User> => {
    try {
      if (USE_MOCK_DATA) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        const user = MOCK_USERS.find((u) => u.id === id);
        if (!user) {
          throw new Error("User not found");
        }
        return user;
      }

      const response = await httpClient.get<User>(`/users/${id}`);
      return response.data;
    } catch (error) {
      throw normalizeHttpError(error);
    }
  },

  /**
   * Get current user profile
   */
  getCurrentUser: async (): Promise<User> => {
    try {
      if (USE_MOCK_DATA) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        // Return first user as current user for mock
        return MOCK_USERS[0];
      }

      const response = await httpClient.get<User>("/users/me");
      return response.data;
    } catch (error) {
      throw normalizeHttpError(error);
    }
  },

  /**
   * Update user profile
   */
  updateUser: async (id: string, data: UpdateUserRequest): Promise<User> => {
    try {
      if (USE_MOCK_DATA) {
        await new Promise((resolve) => setTimeout(resolve, 800));

        const user = MOCK_USERS.find((u) => u.id === id);
        if (!user) {
          throw new Error("User not found");
        }

        return {
          ...user,
          ...data,
          updatedAt: new Date().toISOString(),
        };
      }

      const response = await httpClient.put<User>(`/users/${id}`, data);
      return response.data;
    } catch (error) {
      throw normalizeHttpError(error);
    }
  },

  /**
   * Create new user (admin only)
   */
  createUser: async (data: CreateUserRequest): Promise<User> => {
    try {
      if (USE_MOCK_DATA) {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const existingUser = MOCK_USERS.find((u) => u.email === data.email);
        if (existingUser) {
          throw new Error("Email already exists");
        }

        const newUser: User = {
          id: Date.now().toString(),
          ...data,
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        return newUser;
      }

      const response = await httpClient.post<User>("/users", data);
      return response.data;
    } catch (error) {
      throw normalizeHttpError(error);
    }
  },

  /**
   * Delete user (admin only)
   */
  deleteUser: async (id: string): Promise<void> => {
    try {
      if (USE_MOCK_DATA) {
        await new Promise((resolve) => setTimeout(resolve, 600));
        return;
      }

      await httpClient.delete(`/users/${id}`);
    } catch (error) {
      throw normalizeHttpError(error);
    }
  },

  /**
   * Toggle user active status (admin only)
   */
  toggleUserStatus: async (id: string): Promise<User> => {
    try {
      if (USE_MOCK_DATA) {
        await new Promise((resolve) => setTimeout(resolve, 500));

        const user = MOCK_USERS.find((u) => u.id === id);
        if (!user) {
          throw new Error("User not found");
        }

        return {
          ...user,
          isActive: !user.isActive,
          updatedAt: new Date().toISOString(),
        };
      }

      const response = await httpClient.patch<User>(
        `/users/${id}/toggle-status`
      );
      return response.data;
    } catch (error) {
      throw normalizeHttpError(error);
    }
  },
};
