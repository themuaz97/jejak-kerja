export const base_url = import.meta.env.VITE_BACKEND;

// Example usage
export const ENDPOINTS = {
  // authentication
  REGISTER: `/auth/register`,
  LOGIN: `/auth/login`,
  LOGOUT: `/auth/logout`,
  ME: `/auth/me`,
  REFRESH_TOKEN: `/auth/refresh-token`
};