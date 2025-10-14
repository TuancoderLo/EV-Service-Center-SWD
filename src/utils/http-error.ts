/**
 * HTTP Error Handler
 * Standardize error handling across the application
 */

import { AxiosError } from "axios";

export interface HttpError {
  code: string;
  message: string;
  status?: number;
  originalError?: any;
}

export interface ApiErrorResponse {
  error?: {
    code?: string;
    message?: string;
    details?: any;
  };
  message?: string;
  errors?: any;
}

/**
 * Convert various error types to standardized HttpError format
 */
export const normalizeHttpError = (error: unknown): HttpError => {
  // Handle Axios errors
  if (error instanceof Error && "isAxiosError" in error) {
    const axiosError = error as AxiosError<ApiErrorResponse>;

    // Server responded with error status
    if (axiosError.response) {
      const { status, data } = axiosError.response;

      return {
        code: data?.error?.code || `HTTP_${status}`,
        message: data?.error?.message || data?.message || axiosError.message,
        status,
        originalError: axiosError,
      };
    }

    // Network error (no response)
    if (axiosError.request) {
      return {
        code: "NETWORK_ERROR",
        message:
          "Unable to connect to server. Please check your internet connection.",
        originalError: axiosError,
      };
    }

    // Request setup error
    return {
      code: "REQUEST_ERROR",
      message: axiosError.message,
      originalError: axiosError,
    };
  }

  // Handle standard JavaScript errors
  if (error instanceof Error) {
    return {
      code: "UNKNOWN_ERROR",
      message: error.message,
      originalError: error,
    };
  }

  // Handle string errors
  if (typeof error === "string") {
    return {
      code: "UNKNOWN_ERROR",
      message: error,
      originalError: error,
    };
  }

  // Handle unknown error types
  return {
    code: "UNKNOWN_ERROR",
    message: "An unexpected error occurred",
    originalError: error,
  };
};

/**
 * Get user-friendly error message based on error code
 */
export const getErrorMessage = (error: HttpError): string => {
  const errorMessages: Record<string, string> = {
    // Authentication errors
    AUTH_INVALID_CREDENTIALS: "Invalid email or password",
    AUTH_TOKEN_EXPIRED: "Your session has expired. Please login again",
    AUTH_UNAUTHORIZED: "You are not authorized to perform this action",

    // Network errors
    NETWORK_ERROR:
      "Unable to connect to server. Please check your internet connection",
    REQUEST_TIMEOUT: "Request timed out. Please try again",

    // Server errors
    HTTP_500: "Server error. Please try again later",
    HTTP_503: "Service temporarily unavailable. Please try again later",
    HTTP_404: "The requested resource was not found",
    HTTP_400: "Invalid request. Please check your input",

    // Validation errors
    VALIDATION_ERROR: "Please check your input and try again",

    // Default
    UNKNOWN_ERROR: "An unexpected error occurred. Please try again",
  };

  return (
    errorMessages[error.code] || error.message || errorMessages["UNKNOWN_ERROR"]
  );
};

/**
 * Check if error is a specific type
 */
export const isNetworkError = (error: HttpError): boolean => {
  return error.code === "NETWORK_ERROR" || error.code === "REQUEST_TIMEOUT";
};

export const isAuthError = (error: HttpError): boolean => {
  return error.code.startsWith("AUTH_") || error.status === 401;
};

export const isServerError = (error: HttpError): boolean => {
  return (
    (error.status && error.status >= 500) || error.code.startsWith("HTTP_5")
  );
};

export const isClientError = (error: HttpError): boolean => {
  return (
    (error.status && error.status >= 400 && error.status < 500) ||
    error.code.startsWith("HTTP_4")
  );
};

/**
 * Log error for debugging (development only)
 */
export const logError = (error: HttpError, context?: string): void => {
  if (__DEV__) {
    console.error(`🚨 HTTP Error${context ? ` (${context})` : ""}:`, {
      code: error.code,
      message: error.message,
      status: error.status,
      originalError: error.originalError,
    });
  }
};
