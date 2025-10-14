/**
 * API Configuration
 * Contains base URL and environment settings for API calls
 */

// Environment variables (can be moved to .env later)
const API_CONFIG = {
  // Mock API base URL (replace with real backend URL later)
  BASE_URL: "https://670d0f30073307b4ee44ca3b.mockapi.io/api/v1",

  // Alternative: Local development
  // BASE_URL: 'http://localhost:3000/api/v1',

  // Production URL (to be set later)
  // BASE_URL: 'https://your-production-api.com/api/v1',

  TIMEOUT: 10000, // 10 seconds

  // API Versions
  VERSION: "v1",

  // Feature flags
  USE_MOCK_DATA: true, // Set to false when connecting to real backend
  ENABLE_LOGGING: __DEV__, // Enable logging in development
};

export const { BASE_URL, TIMEOUT, VERSION, USE_MOCK_DATA, ENABLE_LOGGING } =
  API_CONFIG;

export default API_CONFIG;
