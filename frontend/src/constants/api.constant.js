export const base_url = import.meta.env.VITE_BACKEND;

// Example usage
export const ENDPOINTS = {
  /* ------------------------ AUTHENTICATION ------------------------ */
  REGISTER: `/auth/register`,
  LOGIN: `/auth/login`,
  LOGOUT: `/auth/logout`,
  ME: `/auth/me`,
  REFRESH_TOKEN: `/auth/refresh-token`,

  /* ------------------------ CONFIGURATION ------------------------ */
  // roles
  ROLES: `/roles`,
  ROLE_ADD: `/role/add`,
  ROLE_UPDATE: `/role/:id/update`,
  ROLE_DELETE: `/role/:id/delete`,

  // users
  USERS: `/users`,
  USER_ADD: `/user/add`,
  USER_UPDATE: `/user/:id/update`,
  USER_DELETE: `/user/:id/delete`,
  USER_ACTIVATE: `/user/:id/activate`,

  // application status
  APPLICATION_STATUS: `/application-status`,

  // application overall
  APPLICATION_OVERALL: `/application-overall`,
};