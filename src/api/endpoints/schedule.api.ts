/**
 * Schedule API endpoints
 * Handle technician schedules and availability
 */

import { httpClient } from '../client';
import { USE_MOCK_DATA } from '../config';
import { normalizeHttpError } from '@/src/utils/http-error';

// Type definitions
export interface Schedule {
  id: string;
  technicianId: string;
  technicianName: string;
  date: string;
  timeSlots: TimeSlot[];
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
  bookingId?: string;
  serviceType?: string;
}

export interface AvailableSlot {
  date: string;
  time: string;
  technicianId: string;
  technicianName: string;
  duration: number; // in minutes
}

export interface CreateScheduleRequest {
  technicianId: string;
  date: string;
  timeSlots: {
    startTime: string;
    endTime: string;
  }[];
}

// Mock data
const MOCK_SCHEDULES: Schedule[] = [
  {
    id: '1',
    technicianId: '4',
    technicianName: 'John Technician',
    date: '2025-10-20',
    timeSlots: [
      {
        id: '1',
        startTime: '09:00',
        endTime: '11:00',
        isBooked: false,
      },
      {
        id: '2',
        startTime: '11:00',
        endTime: '13:00',
        isBooked: true,
        bookingId: '1',
        serviceType: 'maintenance',
      },
      {
        id: '3',
        startTime: '14:00',
        endTime: '16:00',
        isBooked: false,
      },
    ],
    isAvailable: true,
    createdAt: '2025-10-14T08:00:00Z',
    updatedAt: '2025-10-14T09:00:00Z',
  },
];

// API functions
export const scheduleApi = {
  /**
   * Get all schedules
   */
  getSchedules: async (date?: string): Promise<Schedule[]> => {
    try {
      if (USE_MOCK_DATA) {
        await new Promise(resolve => setTimeout(resolve, 800));
        
        if (date) {
          return MOCK_SCHEDULES.filter(s => s.date === date);
        }
        
        return MOCK_SCHEDULES;
      }
      
      const response = await httpClient.get<Schedule[]>('/schedules', {
        params: { date },
      });
      return response.data;
    } catch (error) {
      throw normalizeHttpError(error);
    }
  },

  /**
   * Get schedule by technician ID
   */
  getScheduleByTechnician: async (technicianId: string, date?: string): Promise<Schedule[]> => {
    try {
      if (USE_MOCK_DATA) {
        await new Promise(resolve => setTimeout(resolve, 600));
        
        let filtered = MOCK_SCHEDULES.filter(s => s.technicianId === technicianId);
        
        if (date) {
          filtered = filtered.filter(s => s.date === date);
        }
        
        return filtered;
      }
      
      const response = await httpClient.get<Schedule[]>(`/schedules/technician/${technicianId}`, {
        params: { date },
      });
      return response.data;
    } catch (error) {
      throw normalizeHttpError(error);
    }
  },

  /**
   * Get available time slots
   */
  getAvailableSlots: async (date: string, serviceType?: string): Promise<AvailableSlot[]> => {
    try {
      if (USE_MOCK_DATA) {
        await new Promise(resolve => setTimeout(resolve, 700));
        
        const availableSlots: AvailableSlot[] = [];
        
        MOCK_SCHEDULES
          .filter(s => s.date === date && s.isAvailable)
          .forEach(schedule => {
            schedule.timeSlots
              .filter(slot => !slot.isBooked)
              .forEach(slot => {
                availableSlots.push({
                  date: schedule.date,
                  time: slot.startTime,
                  technicianId: schedule.technicianId,
                  technicianName: schedule.technicianName,
                  duration: 120, // Default 2 hours
                });
              });
          });
        
        return availableSlots;
      }
      
      const response = await httpClient.get<AvailableSlot[]>('/schedules/available', {
        params: { date, serviceType },
      });
      return response.data;
    } catch (error) {
      throw normalizeHttpError(error);
    }
  },

  /**
   * Create schedule
   */
  createSchedule: async (data: CreateScheduleRequest): Promise<Schedule> => {
    try {
      if (USE_MOCK_DATA) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const timeSlots: TimeSlot[] = data.timeSlots.map((slot, index) => ({
          id: `${Date.now()}_${index}`,
          startTime: slot.startTime,
          endTime: slot.endTime,
          isBooked: false,
        }));
        
        const newSchedule: Schedule = {
          id: Date.now().toString(),
          technicianId: data.technicianId,
          technicianName: 'Mock Technician',
          date: data.date,
          timeSlots,
          isAvailable: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        
        return newSchedule;
      }
      
      const response = await httpClient.post<Schedule>('/schedules', data);
      return response.data;
    } catch (error) {
      throw normalizeHttpError(error);
    }
  },

  /**
   * Update schedule
   */
  updateSchedule: async (id: string, data: Partial<CreateScheduleRequest>): Promise<Schedule> => {
    try {
      if (USE_MOCK_DATA) {
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const schedule = MOCK_SCHEDULES.find(s => s.id === id);
        if (!schedule) {
          throw new Error('Schedule not found');
        }
        
        const updatedSchedule: Schedule = {
          ...schedule,
          updatedAt: new Date().toISOString(),
        };
        
        if (data.date) updatedSchedule.date = data.date;
        if (data.technicianId) updatedSchedule.technicianId = data.technicianId;
        
        return updatedSchedule;
      }
      
      const response = await httpClient.put<Schedule>(`/schedules/${id}`, data);
      return response.data;
    } catch (error) {
      throw normalizeHttpError(error);
    }
  },

  /**
   * Delete schedule
   */
  deleteSchedule: async (id: string): Promise<void> => {
    try {
      if (USE_MOCK_DATA) {
        await new Promise(resolve => setTimeout(resolve, 500));
        return;
      }
      
      await httpClient.delete(`/schedules/${id}`);
    } catch (error) {
      throw normalizeHttpError(error);
    }
  },

  /**
   * Book time slot
   */
  bookTimeSlot: async (scheduleId: string, slotId: string, bookingId: string): Promise<Schedule> => {
    try {
      if (USE_MOCK_DATA) {
        await new Promise(resolve => setTimeout(resolve, 600));
        
        const schedule = MOCK_SCHEDULES.find(s => s.id === scheduleId);
        if (!schedule) {
          throw new Error('Schedule not found');
        }
        
        const updatedTimeSlots = schedule.timeSlots.map(slot =>
          slot.id === slotId
            ? { ...slot, isBooked: true, bookingId }
            : slot
        );
        
        return {
          ...schedule,
          timeSlots: updatedTimeSlots,
          updatedAt: new Date().toISOString(),
        };
      }
      
      const response = await httpClient.patch<Schedule>(`/schedules/${scheduleId}/book-slot`, {
        slotId,
        bookingId,
      });
      return response.data;
    } catch (error) {
      throw normalizeHttpError(error);
    }
  },
};