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
  APPLICATION_STATUS_ADD: `/application-status/add`,
  APPLICATION_STATUS_UPDATE: `/application-status/:id/update`,
  APPLICATION_STATUS_DELETE: `/application-status/:id/delete`,
  APPLICATION_STATUS_ACTIVATE: `/application-status/:id/activate`,

  // application overall
  APPLICATION_OVERALL: `/application-overall`,
  APPLICATION_OVERALL_ADD: `/application-overall/add`,
  APPLICATION_OVERALL_UPDATE: `/application-overall/:id/update`,
  APPLICATION_OVERALL_DELETE: `/application-overall/:id/delete`,
  APPLICATION_OVERALL_ACTIVATE: `/application-overall/:id/activate`,

  /* ------------------------ JOB APPLICATION ------------------------ */
  JOB_APPLICATIONS: `/job-applications`,
  JOB_APPLICATION_ADD: `/job-application/add`,
  JOB_APPLICATION_UPDATE: `/job-application/:id/update`,
  JOB_APPLICATION_DELETE: `/job-application/:id/delete`,
};