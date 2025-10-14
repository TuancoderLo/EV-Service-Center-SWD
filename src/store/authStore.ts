import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type UserRole = "admin" | "member" | "staff" | "technician";

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  avatar?: string;
}

interface AuthState {
  accessToken?: string;
  user?: User;
  role?: UserRole | null;
  isAuthenticated: boolean;
}

interface AuthActions {
  setToken: (token: string) => void;
  setUser: (user: User) => void;
  setRole: (role: UserRole) => void;
  login: (token: string, user: User) => void;
  logout: () => void;
  clearAuth: () => void;
}

type AuthStore = AuthState & AuthActions;

const initialState: AuthState = {
  accessToken: undefined,
  user: undefined,
  role: null,
  isAuthenticated: false,
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      setToken: (token: string) => {
        set({
          accessToken: token,
          isAuthenticated: !!token,
        });
      },

      setUser: (user: User) => {
        set({
          user,
          role: user.role,
          isAuthenticated: true,
        });
      },

      setRole: (role: UserRole) => {
        const currentUser = get().user;
        set({
          role,
          user: currentUser ? { ...currentUser, role } : undefined,
        });
      },

      login: (token: string, user: User) => {
        set({
          accessToken: token,
          user,
          role: user.role,
          isAuthenticated: true,
        });
      },

      logout: () => {
        set(initialState);
      },

      clearAuth: () => {
        set(initialState);
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        accessToken: state.accessToken,
        user: state.user,
        role: state.role,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

// Mock login function for testing
export const mockLogin = (
  email: string,
  password: string
): Promise<{ token: string; user: User }> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Mock users data
      const mockUsers: { email: string; password: string; user: User }[] = [
        {
          email: "admin@test.com",
          password: "123456",
          user: {
            id: "1",
            email: "admin@test.com",
            fullName: "Admin User",
            role: "admin",
            avatar: undefined,
          },
        },
        {
          email: "member@test.com",
          password: "123456",
          user: {
            id: "2",
            email: "member@test.com",
            fullName: "Member User",
            role: "member",
            avatar: undefined,
          },
        },
        {
          email: "staff@test.com",
          password: "123456",
          user: {
            id: "3",
            email: "staff@test.com",
            fullName: "Staff User",
            role: "staff",
            avatar: undefined,
          },
        },
        {
          email: "technician@test.com",
          password: "123456",
          user: {
            id: "4",
            email: "technician@test.com",
            fullName: "Technician User",
            role: "technician",
            avatar: undefined,
          },
        },
      ];

      const foundUser = mockUsers.find(
        (u) => u.email === email && u.password === password
      );

      if (foundUser) {
        resolve({
          token: `mock-token-${foundUser.user.id}-${Date.now()}`,
          user: foundUser.user,
        });
      } else {
        reject(new Error("Invalid email or password"));
      }
    }, 1000); // Simulate network delay
  });
};
