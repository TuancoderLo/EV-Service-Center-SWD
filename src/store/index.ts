import { create } from "zustand";
import * as SecureStore from "expo-secure-store";
import { User, Role } from "../types";

type AuthState = {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isInitialized: boolean;
  setAuth: (user: User, token: string) => Promise<void>;
  logout: () => Promise<void>;
  clear: () => Promise<void>;
  initialize: () => Promise<void>;
  setLoading: (loading: boolean) => void;
  updateUser: (user: Partial<User>) => void;
};

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: null,
  isLoading: false,
  isInitialized: false,

  setAuth: async (user: User, token: string) => {
    try {
      await SecureStore.setItemAsync("access_token", token);
      await SecureStore.setItemAsync("user_data", JSON.stringify(user));
      set({ user, token, isInitialized: true });
    } catch (error) {
      console.error("Error saving auth data:", error);
      set({ isInitialized: true });
    }
  },

  logout: async () => {
    try {
      await SecureStore.deleteItemAsync("access_token");
      await SecureStore.deleteItemAsync("user_data");
      set({ user: null, token: null, isInitialized: true });
    } catch (error) {
      console.error("Error clearing auth data:", error);
      set({ user: null, token: null, isInitialized: true });
    }
  },

  clear: async () => {
    try {
      await SecureStore.deleteItemAsync("access_token");
      await SecureStore.deleteItemAsync("user_data");
      set({ user: null, token: null, isInitialized: true });
    } catch (error) {
      console.error("Error clearing auth data:", error);
      set({ user: null, token: null, isInitialized: true });
    }
  },

  initialize: async () => {
    if (get().isInitialized) return;

    try {
      const token = await SecureStore.getItemAsync("access_token");
      const userData = await SecureStore.getItemAsync("user_data");

      if (token && userData) {
        const user = JSON.parse(userData);
        set({ token, user, isInitialized: true });
      } else {
        set({ isInitialized: true });
      }
    } catch (error) {
      console.error("Error initializing auth:", error);
      set({ isInitialized: true });
    }
  },

  setLoading: (isLoading: boolean) => set({ isLoading }),

  updateUser: (userData: Partial<User>) => {
    const currentUser = get().user;
    if (currentUser) {
      const updatedUser = { ...currentUser, ...userData };
      set({ user: updatedUser });
      // Save to secure store
      SecureStore.setItemAsync("user_data", JSON.stringify(updatedUser)).catch(
        (error) => console.error("Error updating user data:", error)
      );
    }
  },
}));

// Theme store
type ThemeState = {
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (isDark: boolean) => void;
};

export const useThemeStore = create<ThemeState>((set) => ({
  isDark: false,
  toggleTheme: () => set((state) => ({ isDark: !state.isDark })),
  setTheme: (isDark: boolean) => set({ isDark }),
}));
