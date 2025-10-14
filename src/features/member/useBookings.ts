/**
 * Bookings Hook for Members
 * Handle booking list and history
 */

import { Booking, bookingApi } from "@/src/api/endpoints/booking.api";
import {
  getErrorMessage,
  logError,
  normalizeHttpError,
} from "@/src/utils/http-error";
import { useEffect, useState } from "react";

export interface UseBookingsReturn {
  bookings: Booking[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  cancelBooking: (bookingId: string) => Promise<void>;
  isCancelling: boolean;
  clearError: () => void;
}

export const useBookings = (): UseBookingsReturn => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBookings = async (): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await bookingApi.getBookings();
      setBookings(data);
    } catch (err) {
      const httpError = normalizeHttpError(err);
      const errorMessage = getErrorMessage(httpError);

      logError(httpError, "useBookings.fetchBookings");
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const cancelBooking = async (bookingId: string): Promise<void> => {
    try {
      setIsCancelling(true);
      setError(null);

      await bookingApi.cancelBooking(bookingId);

      // Remove cancelled booking from local state
      setBookings((prev) => prev.filter((booking) => booking.id !== bookingId));
    } catch (err) {
      const httpError = normalizeHttpError(err);
      const errorMessage = getErrorMessage(httpError);

      logError(httpError, "useBookings.cancelBooking");
      setError(errorMessage);
      throw httpError;
    } finally {
      setIsCancelling(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  // Auto-fetch bookings when component mounts
  useEffect(() => {
    fetchBookings();
  }, []);

  return {
    bookings,
    isLoading,
    error,
    refetch: fetchBookings,
    cancelBooking,
    isCancelling,
    clearError,
  };
};
