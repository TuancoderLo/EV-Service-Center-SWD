/**
 * Create Booking Hook for Members
 * Handle booking creation process
 */

import {
  Booking,
  bookingApi,
  CreateBookingRequest,
} from "@/src/api/endpoints/booking.api";
import {
  getErrorMessage,
  logError,
  normalizeHttpError,
} from "@/src/utils/http-error";
import { router } from "expo-router";
import { useState } from "react";

export interface UseCreateBookingReturn {
  createBooking: (data: CreateBookingRequest) => Promise<Booking>;
  isCreating: boolean;
  error: string | null;
  clearError: () => void;
}

export const useCreateBooking = (): UseCreateBookingReturn => {
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createBooking = async (
    data: CreateBookingRequest
  ): Promise<Booking> => {
    try {
      setIsCreating(true);
      setError(null);

      // Validate required fields
      if (
        !data.serviceType ||
        !data.vehicleInfo ||
        !data.scheduledDate ||
        !data.scheduledTime
      ) {
        throw new Error("Please fill in all required fields");
      }

      // Validate scheduled date is not in the past
      const scheduledDateTime = new Date(
        `${data.scheduledDate}T${data.scheduledTime}`
      );
      const now = new Date();

      if (scheduledDateTime <= now) {
        throw new Error("Scheduled date and time must be in the future");
      }

      // Create booking via API
      const newBooking = await bookingApi.createBooking(data);

      // Navigate to booking detail or history page
      router.push(`/member/detail?bookingId=${newBooking.id}`);

      return newBooking;
    } catch (err) {
      const httpError = normalizeHttpError(err);
      const errorMessage = getErrorMessage(httpError);

      logError(httpError, "useCreateBooking.createBooking");
      setError(errorMessage);
      throw httpError;
    } finally {
      setIsCreating(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  return {
    createBooking,
    isCreating,
    error,
    clearError,
  };
};
