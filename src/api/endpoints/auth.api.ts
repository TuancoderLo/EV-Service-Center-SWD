/**
 * Authentication API endpoints
 * Handle login, logout, register, and user management
 */

import { httpClient } from '../client';
import { USE_MOCK_DATA } from '../config';
import { normalizeHttpError } from '@/src/utils/http-error';

// Type definitions
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken?: string;
  user: {
    id: string;
    email: string;
    fullName: string;
    role: 'admin' | 'member' | 'staff' | 'technician';
    avatar?: string;
  };
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface RegisterResponse {
  message: string;
  user: {
    id: string;
    email: string;
    fullName: string;
  };
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
  confirmPassword: string;
}

// Mock data
const MOCK_USERS = [
  {
    id: '1',
    email: 'admin@test.com',
    password: '123456',
    fullName: 'Admin User',
    role: 'admin' as const,
  },
  {
    id: '2',
    email: 'member@test.com',
    password: '123456',
    fullName: 'Member User',
    role: 'member' as const,
  },
  {
    id: '3',
    email: 'staff@test.com',
    password: '123456',
    fullName: 'Staff User',
    role: 'staff' as const,
  },
  {
    id: '4',
    email: 'technician@test.com',
    password: '123456',
    fullName: 'Technician User',
    role: 'technician' as const,
  },
];

// API functions
export const authApi = {
  /**
   * User login
   */
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    try {
      if (USE_MOCK_DATA) {
        // Mock implementation
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
        
        const user = MOCK_USERS.find(u => u.email === data.email && u.password === data.password);
        if (!user) {
          throw new Error('Invalid email or password');
        }
        
        return {
          accessToken: `mock-token-${user.id}-${Date.now()}`,
          refreshToken: `mock-refresh-${user.id}-${Date.now()}`,
          user: {
            id: user.id,
            email: user.email,
            fullName: user.fullName,
            role: user.role,
          },
        };
      }
      
      // Real API call (to be implemented)
      const response = await httpClient.post<LoginResponse>('/auth/login', data);
      return response.data;
    } catch (error) {
      throw normalizeHttpError(error);
    }
  },

  /**
   * User registration
   */
  register: async (data: RegisterRequest): Promise<RegisterResponse> => {
    try {
      if (USE_MOCK_DATA) {
        // Mock implementation
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        if (data.password !== data.confirmPassword) {
          throw new Error('Passwords do not match');
        }
        
        const existingUser = MOCK_USERS.find(u => u.email === data.email);
        if (existingUser) {
          throw new Error('Email already exists');
        }
        
        return {
          message: 'Registration successful',
          user: {
            id: `${Date.now()}`,
            email: data.email,
            fullName: data.fullName,
          },
        };
      }
      
      // Real API call
      const response = await httpClient.post<RegisterResponse>('/auth/register', data);
      return response.data;
    } catch (error) {
      throw normalizeHttpError(error);
    }
  },

  /**
   * Forgot password
   */
  forgotPassword: async (data: ForgotPasswordRequest): Promise<{ message: string }> => {
    try {
      if (USE_MOCK_DATA) {
        // Mock implementation
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const user = MOCK_USERS.find(u => u.email === data.email);
        if (!user) {
          throw new Error('Email not found');
        }
        
        return {
          message: 'Password reset link sent to your email',
        };
      }
      
      // Real API call
      const response = await httpClient.post('/auth/forgot-password', data);
      return response.data;
    } catch (error) {
      throw normalizeHttpError(error);
    }
  },

  /**
   * Reset password
   */
  resetPassword: async (data: ResetPasswordRequest): Promise<{ message: string }> => {
    try {
      if (USE_MOCK_DATA) {
        // Mock implementation
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        if (data.password !== data.confirmPassword) {
          throw new Error('Passwords do not match');
        }
        
        return {
          message: 'Password reset successful',
        };
      }
      
      // Real API call
      const response = await httpClient.post('/auth/reset-password', data);
      return response.data;
    } catch (error) {
      throw normalizeHttpError(error);
    }
  },

  /**
   * Logout
   */
  logout: async (): Promise<void> => {
    try {
      if (USE_MOCK_DATA) {
        // Mock implementation
        await new Promise(resolve => setTimeout(resolve, 500));
        return;
      }
      
      // Real API call
      await httpClient.post('/auth/logout');
    } catch (error) {
      throw normalizeHttpError(error);
    }
  },

  /**
   * Refresh token
   */
  refreshToken: async (refreshToken: string): Promise<{ accessToken: string }> => {
    try {
      if (USE_MOCK_DATA) {
        // Mock implementation
        await new Promise(resolve => setTimeout(resolve, 500));
        
        return {
          accessToken: `mock-refreshed-token-${Date.now()}`,
        };
      }
      
      // Real API call
      const response = await httpClient.post('/auth/refresh', { refreshToken });
      return response.data;
    } catch (error) {
      throw normalizeHttpError(error);
    }
  },
};