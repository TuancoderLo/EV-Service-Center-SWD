// Date utilities
export const formatDate = (
  date: Date | string,
  format?: "short" | "long" | "time"
) => {
  const dateObj = typeof date === "string" ? new Date(date) : date;

  switch (format) {
    case "short":
      return dateObj.toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    case "long":
      return dateObj.toLocaleDateString("vi-VN", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
    case "time":
      return dateObj.toLocaleTimeString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
      });
    default:
      return dateObj.toLocaleDateString("vi-VN");
  }
};

export const formatDateTime = (date: Date | string) => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return `${formatDate(dateObj, "short")} ${formatDate(dateObj, "time")}`;
};

export const isToday = (date: Date | string) => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  const today = new Date();
  return dateObj.toDateString() === today.toDateString();
};

export const isTomorrow = (date: Date | string) => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return dateObj.toDateString() === tomorrow.toDateString();
};

export const getRelativeTime = (date: Date | string) => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  const now = new Date();
  const diffMs = now.getTime() - dateObj.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 1) return "Vừa xong";
  if (diffMins < 60) return `${diffMins} phút trước`;
  if (diffHours < 24) return `${diffHours} giờ trước`;
  if (diffDays < 7) return `${diffDays} ngày trước`;
  return formatDate(dateObj, "short");
};

// Currency utilities
export const formatCurrency = (
  amount: number,
  currency: "VND" | "USD" = "VND"
) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatNumber = (num: number) => {
  return new Intl.NumberFormat("vi-VN").format(num);
};

// String utilities
export const truncateString = (str: string, maxLength: number) => {
  if (str.length <= maxLength) return str;
  return str.substring(0, maxLength) + "...";
};

export const capitalizeFirst = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const formatPhoneNumber = (phone: string) => {
  // Remove all non-digits
  const cleaned = phone.replace(/\D/g, "");

  // Format as Vietnamese phone number
  if (cleaned.length === 10) {
    return cleaned.replace(/(\d{4})(\d{3})(\d{3})/, "$1 $2 $3");
  }
  if (cleaned.length === 11) {
    return cleaned.replace(/(\d{4})(\d{3})(\d{4})/, "$1 $2 $3");
  }

  return phone;
};

// Validation utilities
export const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhoneNumber = (phone: string) => {
  const phoneRegex = /^(\+84|84|0)(3|5|7|8|9)([0-9]{8})$/;
  return phoneRegex.test(phone.replace(/\s/g, ""));
};

export const validatePassword = (password: string) => {
  return {
    isValid: password.length >= 6,
    hasMinLength: password.length >= 6,
    hasUpperCase: /[A-Z]/.test(password),
    hasLowerCase: /[a-z]/.test(password),
    hasNumber: /\d/.test(password),
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };
};

// Storage utilities
export const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
};

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let lastCall = 0;
  return (...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      func(...args);
    }
  };
};

// Array utilities
export const groupBy = <T>(array: T[], key: keyof T) => {
  return array.reduce((groups, item) => {
    const group = groups[item[key] as any] || [];
    group.push(item);
    groups[item[key] as any] = group;
    return groups;
  }, {} as Record<string, T[]>);
};

export const sortBy = <T>(
  array: T[],
  key: keyof T,
  order: "asc" | "desc" = "asc"
) => {
  return [...array].sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];

    if (aVal < bVal) return order === "asc" ? -1 : 1;
    if (aVal > bVal) return order === "asc" ? 1 : -1;
    return 0;
  });
};

// Device utilities
export const isIOS = () => {
  return require("react-native").Platform.OS === "ios";
};

export const isAndroid = () => {
  return require("react-native").Platform.OS === "android";
};

// Error handling
export const getErrorMessage = (error: any): string => {
  if (typeof error === "string") return error;
  if (error?.message) return error.message;
  if (error?.data?.message) return error.data.message;
  return "Có lỗi xảy ra, vui lòng thử lại";
};
