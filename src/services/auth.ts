import { apiService } from "./api";
import { AuthResponse, LoginRequest, RegisterRequest, User } from "../types";

export const authService = {
  // Login
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    const response = await apiService.post<AuthResponse>(
      "/auth/login",
      credentials
    );
    return response.data;
  },

  // Register
  register: async (userData: RegisterRequest): Promise<AuthResponse> => {
    const response = await apiService.post<AuthResponse>(
      "/auth/register",
      userData
    );
    return response.data;
  },

  // Logout
  logout: async (): Promise<void> => {
    await apiService.post("/auth/logout");
  },

  // Refresh token
  refreshToken: async (): Promise<AuthResponse> => {
    const response = await apiService.post<AuthResponse>("/auth/refresh");
    return response.data;
  },

  // Get current user profile
  getProfile: async (): Promise<User> => {
    const response = await apiService.get<User>("/auth/profile");
    return response.data;
  },

  // Update profile
  updateProfile: async (userData: Partial<User>): Promise<User> => {
    const response = await apiService.put<User>("/auth/profile", userData);
    return response.data;
  },

  // Change password
  changePassword: async (
    currentPassword: string,
    newPassword: string
  ): Promise<void> => {
    await apiService.post("/auth/change-password", {
      currentPassword,
      newPassword,
    });
  },

  // Forgot password
  forgotPassword: async (email: string): Promise<void> => {
    await apiService.post("/auth/forgot-password", { email });
  },

  // Reset password
  resetPassword: async (token: string, newPassword: string): Promise<void> => {
    await apiService.post("/auth/reset-password", {
      token,
      newPassword,
    });
  },
};

// Mock authentication for development
export const mockAuth = {
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock users
    const mockUsers = [
      {
        id: "1",
        name: "Admin User",
        email: "admin@example.com",
        role: "admin" as const,
        phone: "0123456789",
      },
      {
        id: "2",
        name: "Staff User",
        email: "staff@example.com",
        role: "staff" as const,
        phone: "0123456788",
      },
      {
        id: "3",
        name: "Technician User",
        email: "tech@example.com",
        role: "technician" as const,
        phone: "0123456787",
      },
      {
        id: "4",
        name: "Member User",
        email: "member@example.com",
        role: "member" as const,
        phone: "0123456786",
      },
    ];

    const user = mockUsers.find((u) => u.email === credentials.email);

    if (!user || credentials.password !== "password") {
      throw new Error("Invalid email or password");
    }

    return {
      user,
      access_token: "mock_access_token_" + user.id,
      refresh_token: "mock_refresh_token_" + user.id,
    };
  },

  register: async (userData: RegisterRequest): Promise<AuthResponse> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: userData.name,
      email: userData.email,
      role: userData.role || "member",
      phone: userData.phone,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return {
      user: newUser,
      access_token: "mock_access_token_" + newUser.id,
      refresh_token: "mock_refresh_token_" + newUser.id,
    };
  },
};
