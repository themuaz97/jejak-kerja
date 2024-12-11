export const base_url = import.meta.env.VITE_BACKEND;

// Example usage
export const ENDPOINTS = {
  // authentication
  LOGIN: `/auth/login`,
  REGISTER: `/auth/register`,
  ME: `/auth/me`,
  REFRESH_TOKEN: `/auth/refresh-token`
};