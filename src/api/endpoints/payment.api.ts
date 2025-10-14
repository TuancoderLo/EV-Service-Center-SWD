/**
 * Payment API endpoints
 * Handle payment processing and transaction history
 */

import { normalizeHttpError } from "@/src/utils/http-error";
import { httpClient } from "../client";
import { USE_MOCK_DATA } from "../config";

// Type definitions
export interface Payment {
  id: string;
  bookingId: string;
  userId: string;
  amount: number;
  currency: "USD" | "VND";
  status: "pending" | "processing" | "completed" | "failed" | "refunded";
  paymentMethod:
    | "credit_card"
    | "debit_card"
    | "paypal"
    | "bank_transfer"
    | "cash";
  transactionId?: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
}

export interface CreatePaymentRequest {
  bookingId: string;
  amount: number;
  currency: Payment["currency"];
  paymentMethod: Payment["paymentMethod"];
  description: string;
}

export interface PaymentIntent {
  id: string;
  clientSecret: string;
  amount: number;
  currency: string;
  status: string;
}

// Mock data
const MOCK_PAYMENTS: Payment[] = [
  {
    id: "1",
    bookingId: "1",
    userId: "2",
    amount: 150.0,
    currency: "USD",
    status: "completed",
    paymentMethod: "credit_card",
    transactionId: "txn_mock_123456",
    description: "Tesla Model 3 Maintenance Service",
    createdAt: "2025-10-14T10:00:00Z",
    updatedAt: "2025-10-14T10:05:00Z",
    completedAt: "2025-10-14T10:05:00Z",
  },
];

// API functions
export const paymentApi = {
  /**
   * Get payment history for user
   */
  getPayments: async (): Promise<Payment[]> => {
    try {
      if (USE_MOCK_DATA) {
        await new Promise((resolve) => setTimeout(resolve, 800));
        return MOCK_PAYMENTS;
      }

      const response = await httpClient.get<Payment[]>("/payments");
      return response.data;
    } catch (error) {
      throw normalizeHttpError(error);
    }
  },

  /**
   * Get payment by ID
   */
  getPaymentById: async (id: string): Promise<Payment> => {
    try {
      if (USE_MOCK_DATA) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        const payment = MOCK_PAYMENTS.find((p) => p.id === id);
        if (!payment) {
          throw new Error("Payment not found");
        }
        return payment;
      }

      const response = await httpClient.get<Payment>(`/payments/${id}`);
      return response.data;
    } catch (error) {
      throw normalizeHttpError(error);
    }
  },

  /**
   * Create payment intent
   */
  createPaymentIntent: async (
    data: CreatePaymentRequest
  ): Promise<PaymentIntent> => {
    try {
      if (USE_MOCK_DATA) {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        return {
          id: `pi_mock_${Date.now()}`,
          clientSecret: `pi_mock_${Date.now()}_secret`,
          amount: data.amount,
          currency: data.currency,
          status: "requires_payment_method",
        };
      }

      const response = await httpClient.post<PaymentIntent>(
        "/payments/create-intent",
        data
      );
      return response.data;
    } catch (error) {
      throw normalizeHttpError(error);
    }
  },

  /**
   * Process payment
   */
  processPayment: async (
    paymentIntentId: string,
    paymentMethodId: string
  ): Promise<Payment> => {
    try {
      if (USE_MOCK_DATA) {
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Simulate payment processing
        const mockPayment: Payment = {
          id: Date.now().toString(),
          bookingId: "1",
          userId: "2",
          amount: 150.0,
          currency: "USD",
          status: Math.random() > 0.1 ? "completed" : "failed", // 90% success rate
          paymentMethod: "credit_card",
          transactionId: `txn_mock_${Date.now()}`,
          description: "Service Payment",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          completedAt: new Date().toISOString(),
        };

        if (mockPayment.status === "failed") {
          throw new Error("Payment failed. Please try again.");
        }

        return mockPayment;
      }

      const response = await httpClient.post<Payment>("/payments/process", {
        paymentIntentId,
        paymentMethodId,
      });
      return response.data;
    } catch (error) {
      throw normalizeHttpError(error);
    }
  },

  /**
   * Refund payment
   */
  refundPayment: async (
    paymentId: string,
    amount?: number
  ): Promise<Payment> => {
    try {
      if (USE_MOCK_DATA) {
        await new Promise((resolve) => setTimeout(resolve, 1500));

        const payment = MOCK_PAYMENTS.find((p) => p.id === paymentId);
        if (!payment) {
          throw new Error("Payment not found");
        }

        return {
          ...payment,
          status: "refunded",
          updatedAt: new Date().toISOString(),
        };
      }

      const response = await httpClient.post<Payment>(
        `/payments/${paymentId}/refund`,
        {
          amount,
        }
      );
      return response.data;
    } catch (error) {
      throw normalizeHttpError(error);
    }
  },

  /**
   * Get payment methods for user
   */
  getPaymentMethods: async (): Promise<
    {
      id: string;
      type: string;
      last4: string;
      brand: string;
      expiryMonth: number;
      expiryYear: number;
    }[]
  > => {
    try {
      if (USE_MOCK_DATA) {
        await new Promise((resolve) => setTimeout(resolve, 600));

        return [
          {
            id: "pm_mock_1",
            type: "card",
            last4: "4242",
            brand: "visa",
            expiryMonth: 12,
            expiryYear: 2026,
          },
          {
            id: "pm_mock_2",
            type: "card",
            last4: "0005",
            brand: "mastercard",
            expiryMonth: 8,
            expiryYear: 2025,
          },
        ];
      }

      const response = await httpClient.get("/payments/methods");
      return response.data;
    } catch (error) {
      throw normalizeHttpError(error);
    }
  },
};
