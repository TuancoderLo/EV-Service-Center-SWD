export type Role = "member" | "staff" | "technician" | "admin";

export type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
  phone?: string;
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type AuthResponse = {
  user: User;
  access_token: string;
  refresh_token?: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = {
  name: string;
  email: string;
  password: string;
  phone?: string;
  role?: Role;
};

// Booking types
export type BookingStatus = "pending" | "confirmed" | "completed" | "cancelled";

export type Booking = {
  id: string;
  userId: string;
  serviceId: string;
  technicianId?: string;
  status: BookingStatus;
  scheduledDate: string;
  scheduledTime: string;
  location: string;
  description?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  user?: User;
  service?: Service;
  technician?: User;
};

export type BookingRequest = {
  serviceId: string;
  scheduledDate: string;
  scheduledTime: string;
  location: string;
  description?: string;
};

// Service types
export type Service = {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number; // in minutes
  category: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

// Navigation types
export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Bookings: undefined;
  Services: undefined;
  Profile: undefined;
  Dashboard: undefined;
};

export type HomeStackParamList = {
  HomeScreen: undefined;
  ServiceDetail: { serviceId: string };
  BookingForm: { serviceId: string };
};

export type BookingStackParamList = {
  BookingList: undefined;
  BookingDetail: { bookingId: string };
  BookingEdit: { bookingId: string };
};

export type ProfileStackParamList = {
  ProfileScreen: undefined;
  EditProfile: undefined;
  Settings: undefined;
  About: undefined;
};

// Dashboard types (for different roles)
export type DashboardStackParamList = {
  DashboardHome: undefined;
  ManageBookings: undefined;
  ManageUsers: undefined;
  ManageServices: undefined;
  ManageInventory: undefined;
  Revenue: undefined;
};

// API Response types
export type ApiResponse<T = any> = {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
};

export type PaginatedResponse<T> = {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type ApiError = {
  message: string;
  code?: string;
  details?: any;
};
