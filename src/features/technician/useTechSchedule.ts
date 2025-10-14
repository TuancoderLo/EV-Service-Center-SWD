/**
 * Technician Schedule Hook
 * Handle schedule management for technicians
 */

import { Schedule, scheduleApi } from "@/src/api/endpoints/schedule.api";
import {
  getErrorMessage,
  logError,
  normalizeHttpError,
} from "@/src/utils/http-error";
import { useEffect, useState } from "react";

export interface UseTechScheduleReturn {
  schedules: Schedule[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  getMySchedules: () => Promise<void>;
  getSchedulesByDate: (date: string) => Promise<void>;
  updateAvailability: (
    scheduleId: string,
    isAvailable: boolean
  ) => Promise<Schedule>;
  getTodaySchedules: () => Schedule[];
  getUpcomingSchedules: () => Schedule[];
  isUpdating: boolean;
  clearError: () => void;
}

export const useTechSchedule = (): UseTechScheduleReturn => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSchedules = async (date?: string): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await scheduleApi.getSchedules(date);
      setSchedules(data);
    } catch (err) {
      const httpError = normalizeHttpError(err);
      const errorMessage = getErrorMessage(httpError);

      logError(httpError, "useTechSchedule.fetchSchedules");
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const getMySchedules = async (): Promise<void> => {
    await fetchSchedules();
  };

  const getSchedulesByDate = async (date: string): Promise<void> => {
    await fetchSchedules(date);
  };

  const updateAvailability = async (
    scheduleId: string,
    isAvailable: boolean
  ): Promise<Schedule> => {
    try {
      setIsUpdating(true);
      setError(null);

      // Mock update for availability - in real implementation, this would be a dedicated endpoint
      // For now, we'll simulate by updating the schedule with new availability status
      const schedule = schedules.find((s) => s.id === scheduleId);
      if (!schedule) {
        throw new Error("Schedule not found");
      }

      const updatedSchedule = { ...schedule, isAvailable };

      // Update local state
      setSchedules((prev) =>
        prev.map((schedule) =>
          schedule.id === scheduleId ? updatedSchedule : schedule
        )
      );

      return updatedSchedule;
    } catch (err) {
      const httpError = normalizeHttpError(err);
      const errorMessage = getErrorMessage(httpError);

      logError(httpError, "useTechSchedule.updateAvailability");
      setError(errorMessage);
      throw httpError;
    } finally {
      setIsUpdating(false);
    }
  };

  const getTodaySchedules = (): Schedule[] => {
    const today = new Date();
    const todayStr = today.toISOString().split("T")[0];

    return schedules.filter((schedule) => {
      const scheduleDate = new Date(schedule.date);
      const scheduleDateStr = scheduleDate.toISOString().split("T")[0];
      return scheduleDateStr === todayStr;
    });
  };

  const getUpcomingSchedules = (): Schedule[] => {
    const now = new Date();

    return schedules
      .filter((schedule) => {
        const scheduleDate = new Date(schedule.date);
        return scheduleDate > now;
      })
      .sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateA.getTime() - dateB.getTime();
      });
  };

  const clearError = () => {
    setError(null);
  };

  // Auto-fetch schedules when component mounts
  useEffect(() => {
    fetchSchedules();
  }, []);

  return {
    schedules,
    isLoading,
    error,
    refetch: fetchSchedules,
    getMySchedules,
    getSchedulesByDate,
    updateAvailability,
    getTodaySchedules,
    getUpcomingSchedules,
    isUpdating,
    clearError,
  };
};
