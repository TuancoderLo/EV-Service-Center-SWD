/**
 * Staff Schedule Hook
 * Handle schedule management for staff
 */

import {
  CreateScheduleRequest,
  Schedule,
  scheduleApi,
} from "@/src/api/endpoints/schedule.api";
import {
  getErrorMessage,
  logError,
  normalizeHttpError,
} from "@/src/utils/http-error";
import { useEffect, useState } from "react";

export interface UseStaffScheduleReturn {
  schedules: Schedule[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  getSchedulesByDate: (date: string) => Promise<void>;
  createSchedule: (data: CreateScheduleRequest) => Promise<Schedule>;
  updateSchedule: (
    scheduleId: string,
    data: Partial<CreateScheduleRequest>
  ) => Promise<Schedule>;
  deleteSchedule: (scheduleId: string) => Promise<void>;
  isCreating: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
  clearError: () => void;
}

export const useStaffSchedule = (): UseStaffScheduleReturn => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
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

      logError(httpError, "useStaffSchedule.fetchSchedules");
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const getSchedulesByDate = async (date: string): Promise<void> => {
    await fetchSchedules(date);
  };

  const createSchedule = async (
    data: CreateScheduleRequest
  ): Promise<Schedule> => {
    try {
      setIsCreating(true);
      setError(null);

      // Validate required fields
      if (
        !data.technicianId ||
        !data.date ||
        !data.timeSlots ||
        data.timeSlots.length === 0
      ) {
        throw new Error("Please fill in all required fields");
      }

      // Validate date is not in the past
      const scheduleDate = new Date(data.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (scheduleDate < today) {
        throw new Error("Schedule date cannot be in the past");
      }

      // Validate time slots
      for (const slot of data.timeSlots) {
        if (!slot.startTime || !slot.endTime) {
          throw new Error("All time slots must have start and end times");
        }

        if (slot.startTime >= slot.endTime) {
          throw new Error("End time must be after start time");
        }
      }

      const newSchedule = await scheduleApi.createSchedule(data);

      // Add to local state
      setSchedules((prev) => [...prev, newSchedule]);

      return newSchedule;
    } catch (err) {
      const httpError = normalizeHttpError(err);
      const errorMessage = getErrorMessage(httpError);

      logError(httpError, "useStaffSchedule.createSchedule");
      setError(errorMessage);
      throw httpError;
    } finally {
      setIsCreating(false);
    }
  };

  const updateSchedule = async (
    scheduleId: string,
    data: Partial<CreateScheduleRequest>
  ): Promise<Schedule> => {
    try {
      setIsUpdating(true);
      setError(null);

      const updatedSchedule = await scheduleApi.updateSchedule(
        scheduleId,
        data
      );

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

      logError(httpError, "useStaffSchedule.updateSchedule");
      setError(errorMessage);
      throw httpError;
    } finally {
      setIsUpdating(false);
    }
  };

  const deleteSchedule = async (scheduleId: string): Promise<void> => {
    try {
      setIsDeleting(true);
      setError(null);

      await scheduleApi.deleteSchedule(scheduleId);

      // Remove from local state
      setSchedules((prev) =>
        prev.filter((schedule) => schedule.id !== scheduleId)
      );
    } catch (err) {
      const httpError = normalizeHttpError(err);
      const errorMessage = getErrorMessage(httpError);

      logError(httpError, "useStaffSchedule.deleteSchedule");
      setError(errorMessage);
      throw httpError;
    } finally {
      setIsDeleting(false);
    }
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
    getSchedulesByDate,
    createSchedule,
    updateSchedule,
    deleteSchedule,
    isCreating,
    isUpdating,
    isDeleting,
    clearError,
  };
};
