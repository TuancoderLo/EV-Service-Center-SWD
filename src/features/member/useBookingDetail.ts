/**
 * Booking Detail Hook for Members
 * Handle individual booking details
 */

import { Booking, bookingApi } from "@/src/api/endpoints/booking.api";
import {
  getErrorMessage,
  logError,
  normalizeHttpError,
} from "@/src/utils/http-error";
import { useEffect, useState } from "react";

export interface UseBookingDetailReturn {
  booking: Booking | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  clearError: () => void;
}

export const useBookingDetail = (bookingId: string): UseBookingDetailReturn => {
  const [booking, setBooking] = useState<Booking | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBookingDetail = async (): Promise<void> => {
    if (!bookingId) return;

    try {
      setIsLoading(true);
      setError(null);

      const data = await bookingApi.getBookingById(bookingId);
      setBooking(data);
    } catch (err) {
      const httpError = normalizeHttpError(err);
      const errorMessage = getErrorMessage(httpError);

      logError(httpError, "useBookingDetail.fetchBookingDetail");
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  // Auto-fetch booking detail when bookingId changes
  useEffect(() => {
    if (bookingId) {
      fetchBookingDetail();
    }
  }, [bookingId]); // fetchBookingDetail is stable, no need to include

  return {
    booking,
    isLoading,
    error,
    refetch: fetchBookingDetail,
    clearError,
  };
};
