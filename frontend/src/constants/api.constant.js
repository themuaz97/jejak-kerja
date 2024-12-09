export const BASE_URL = import.meta.env.VITE_BACKEND;

// Example usage
export const ENDPOINTS = {
  LOGIN: `${BASE_URL}/auth/login`,
  REGISTER: `${BASE_URL}/auth/register`,
};