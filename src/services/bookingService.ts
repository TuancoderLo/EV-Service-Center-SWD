import { apiService } from "./api";
import { Booking, BookingRequest, PaginatedResponse } from "../types";

export const bookingService = {
  // Get user's bookings
  getMyBookings: async (status?: string): Promise<Booking[]> => {
    const params = status ? `?status=${status}` : "";
    const response = await apiService.get<Booking[]>(`/bookings/my${params}`);
    return response.data;
  },

  // Get all bookings (admin/staff only)
  getAllBookings: async (
    page = 1,
    limit = 10,
    status?: string
  ): Promise<PaginatedResponse<Booking>> => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(status && { status }),
    });
    const response = await apiService.get<PaginatedResponse<Booking>>(
      `/bookings?${params}`
    );
    return response.data;
  },

  // Get booking by ID
  getBookingById: async (bookingId: string): Promise<Booking> => {
    const response = await apiService.get<Booking>(`/bookings/${bookingId}`);
    return response.data;
  },

  // Create new booking
  createBooking: async (bookingData: BookingRequest): Promise<Booking> => {
    const response = await apiService.post<Booking>("/bookings", bookingData);
    return response.data;
  },

  // Update booking
  updateBooking: async (
    bookingId: string,
    bookingData: Partial<BookingRequest>
  ): Promise<Booking> => {
    const response = await apiService.put<Booking>(
      `/bookings/${bookingId}`,
      bookingData
    );
    return response.data;
  },

  // Cancel booking
  cancelBooking: async (bookingId: string, reason?: string): Promise<void> => {
    await apiService.patch(`/bookings/${bookingId}/cancel`, { reason });
  },

  // Confirm booking (staff only)
  confirmBooking: async (
    bookingId: string,
    technicianId?: string
  ): Promise<Booking> => {
    const response = await apiService.patch<Booking>(
      `/bookings/${bookingId}/confirm`,
      { technicianId }
    );
    return response.data;
  },

  // Complete booking (technician only)
  completeBooking: async (
    bookingId: string,
    notes?: string
  ): Promise<Booking> => {
    const response = await apiService.patch<Booking>(
      `/bookings/${bookingId}/complete`,
      { notes }
    );
    return response.data;
  },

  // Get available time slots
  getAvailableTimeSlots: async (
    date: string,
    serviceId: string
  ): Promise<string[]> => {
    const response = await apiService.get<string[]>(
      `/bookings/available-slots?date=${date}&serviceId=${serviceId}`
    );
    return response.data;
  },

  // Get booking statistics (admin/staff only)
  getBookingStats: async (startDate?: string, endDate?: string) => {
    const params = new URLSearchParams({
      ...(startDate && { startDate }),
      ...(endDate && { endDate }),
    });
    const response = await apiService.get(`/bookings/stats?${params}`);
    return response.data;
  },
};
