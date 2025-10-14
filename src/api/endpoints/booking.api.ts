/**
 * Booking API endpoints
 * Handle booking creation, management, and history
 */

import { httpClient } from '../client';
import { USE_MOCK_DATA } from '../config';
import { normalizeHttpError } from '@/src/utils/http-error';

// Type definitions
export interface Booking {
  id: string;
  userId: string;
  serviceType: 'maintenance' | 'repair' | 'inspection' | 'charging';
  vehicleInfo: {
    make: string;
    model: string;
    year: number;
    licensePlate: string;
  };
  scheduledDate: string;
  scheduledTime: string;
  status: 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
  description?: string;
  estimatedDuration: number; // in minutes
  assignedTechnician?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBookingRequest {
  serviceType: Booking['serviceType'];
  vehicleInfo: Booking['vehicleInfo'];
  scheduledDate: string;
  scheduledTime: string;
  description?: string;
}

// Mock data
const MOCK_BOOKINGS: Booking[] = [
  {
    id: '1',
    userId: '2', // member
    serviceType: 'maintenance',
    vehicleInfo: {
      make: 'Tesla',
      model: 'Model 3',
      year: 2022,
      licensePlate: 'ABC-123',
    },
    scheduledDate: '2025-10-20',
    scheduledTime: '10:00',
    status: 'confirmed',
    description: 'Regular maintenance check',
    estimatedDuration: 120,
    assignedTechnician: 'John Doe',
    createdAt: '2025-10-14T08:00:00Z',
    updatedAt: '2025-10-14T09:00:00Z',
  },
];

// API functions
export const bookingApi = {
  /**
   * Get all bookings for current user
   */
  getBookings: async (): Promise<Booking[]> => {
    try {
      if (USE_MOCK_DATA) {
        await new Promise(resolve => setTimeout(resolve, 800));
        return MOCK_BOOKINGS;
      }
      
      const response = await httpClient.get<Booking[]>('/bookings');
      return response.data;
    } catch (error) {
      throw normalizeHttpError(error);
    }
  },

  /**
   * Get booking by ID
   */
  getBookingById: async (id: string): Promise<Booking> => {
    try {
      if (USE_MOCK_DATA) {
        await new Promise(resolve => setTimeout(resolve, 500));
        const booking = MOCK_BOOKINGS.find(b => b.id === id);
        if (!booking) {
          throw new Error('Booking not found');
        }
        return booking;
      }
      
      const response = await httpClient.get<Booking>(`/bookings/${id}`);
      return response.data;
    } catch (error) {
      throw normalizeHttpError(error);
    }
  },

  /**
   * Create new booking
   */
  createBooking: async (data: CreateBookingRequest): Promise<Booking> => {
    try {
      if (USE_MOCK_DATA) {
        await new Promise(resolve => setTimeout(resolve, 1200));
        
        const newBooking: Booking = {
          id: Date.now().toString(),
          userId: '2', // Mock current user
          ...data,
          status: 'pending',
          estimatedDuration: 90, // Default duration
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        
        return newBooking;
      }
      
      const response = await httpClient.post<Booking>('/bookings', data);
      return response.data;
    } catch (error) {
      throw normalizeHttpError(error);
    }
  },

  /**
   * Update booking
   */
  updateBooking: async (id: string, data: Partial<CreateBookingRequest>): Promise<Booking> => {
    try {
      if (USE_MOCK_DATA) {
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const booking = MOCK_BOOKINGS.find(b => b.id === id);
        if (!booking) {
          throw new Error('Booking not found');
        }
        
        return {
          ...booking,
          ...data,
          updatedAt: new Date().toISOString(),
        };
      }
      
      const response = await httpClient.put<Booking>(`/bookings/${id}`, data);
      return response.data;
    } catch (error) {
      throw normalizeHttpError(error);
    }
  },

  /**
   * Cancel booking
   */
  cancelBooking: async (id: string): Promise<void> => {
    try {
      if (USE_MOCK_DATA) {
        await new Promise(resolve => setTimeout(resolve, 600));
        return;
      }
      
      await httpClient.delete(`/bookings/${id}`);
    } catch (error) {
      throw normalizeHttpError(error);
    }
  },
};