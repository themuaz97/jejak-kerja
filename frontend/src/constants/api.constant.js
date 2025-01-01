export const base_url = import.meta.env.VITE_BACKEND;

// Example usage
export const ENDPOINTS = {
  /* --------------------------- LANDING ---------------------------- */
  // FAQs
  FAQ_CATEGORIES: `/faq/categories`,
  FAQ_QUESTIONS: `/faq/questions`,
  FAQ_ANSWERS: `/faq/answers`,

  /* ---------------------------- USERS ----------------------------- */
  // auth
  GOOGLE_LOGIN: `/auth/google`,
  REGISTER: `/auth/register`,
  LOGIN: `/auth/login`,
  LOGOUT: `/auth/logout`,
  REFRESH_TOKEN: `/auth/refresh-token`,
  FORGOT_PASSWORD: `/auth/forgot-password`,
  RESET_PASSWORD: `/auth/reset-password`,
  
  // account
  ME: `/me`,
  ACCOUNT_PERSONAL_UPDATE: `/account/personal/update`,
  ACCOUNT_PASSWORD_UPDATE: `/account/password/update`,
  ADMIN_USER_DELETE: `/user/:id/delete`,

  // dashboard
  DASHBOARD_COUNT: `/dashboard/count`,
  DASHBOARD_JOBS_BY_STATUS: `/dashboard/jobs-by-status`,
  DASHBOARD_JOBS_BY_PLATFORM: `/dashboard/jobs-by-platform`,

  // job applications
  JOB_APPLICATIONS: `/job-applications`,
  JOB_APPLICATION_ADD: `/job-application/add`,
  JOB_APPLICATION_UPDATE: `/job-application/:id/update`,
  JOB_APPLICATION_DELETE: `/job-application/:id/delete`,

  // application status
  APPLICATION_STATUS: `/application-status`,

  // application overall
  APPLICATION_OVERALL: `/application-overall`,

  /* ---------------------------- ADMIN ---------------------------- */
  /* ------------------------ CONFIGURATION ------------------------ */
  // roles
  ADMIN_ROLES: `/admin/roles`,
  ADMIN_ROLE_ADD: `/admin/role/add`,
  ADMIN_ROLE_UPDATE: `/admin/role/:id/update`,
  ADMIN_ROLE_DELETE: `/admin/role/:id/delete`,

  // users
  ADMIN_USERS: `/admin/users`,
  ADMIN_USER_ADD: `/admin/user/add`,
  ADMIN_USER_UPDATE: `/admin/user/:id/update`,
  ADMIN_USER_ACTIVATE: `/admin/user/:id/activate`,

  // application status
  ADMIN_APPLICATION_STATUS: `/admin/application-status`,
  ADMIN_APPLICATION_STATUS_ADD: `/admin/application-status/add`,
  ADMIN_APPLICATION_STATUS_UPDATE: `/admin/application-status/:id/update`,
  ADMIN_APPLICATION_STATUS_DELETE: `/admin/application-status/:id/delete`,
  ADMIN_APPLICATION_STATUS_ACTIVATE: `/admin/application-status/:id/activate`,

  // application overall
  ADMIN_APPLICATION_OVERALL: `/admin/application-overall`,
  ADMIN_APPLICATION_OVERALL_ADD: `/admin/application-overall/add`,
  ADMIN_APPLICATION_OVERALL_UPDATE: `/admin/application-overall/:id/update`,
  ADMIN_APPLICATION_OVERALL_DELETE: `/admin/application-overall/:id/delete`,
  ADMIN_APPLICATION_OVERALL_ACTIVATE: `/admin/application-overall/:id/activate`,

  /* ------------------------ LANDING ------------------------ */

  // FAQs
  ADMIN_FAQ_CATEGORIES: `/admin/faq/categories`,
  ADMIN_FAQ_CATEGORY_ADD: `/admin/faq/category/add`,
  ADMIN_FAQ_CATEGORY_UPDATE: `/admin/faq/category/:id/update`,
  ADMIN_FAQ_CATEGORY_DELETE: `/admin/faq/category/:id/delete`,
  ADMIN_FAQ_CATEGORY_ACTIVATE: `/admin/faq/category/:id/activate`,

  ADMIN_FAQ_QUESTIONS: `/admin/faq/questions`,
  ADMIN_FAQ_QUESTION_ADD: `/admin/faq/question/add`,
  ADMIN_FAQ_QUESTION_UPDATE: `/admin/faq/question/:id/update`,
  ADMIN_FAQ_QUESTION_DELETE: `/admin/faq/question/:id/delete`,
  ADMIN_FAQ_QUESTION_ACTIVATE: `/admin/faq/question/:id/activate`,

  ADMIN_FAQ_ANSWERS: `/admin/faq/answers`,
  ADMIN_FAQ_ANSWER_ADD: `/admin/faq/answer/add`,
  ADMIN_FAQ_ANSWER_UPDATE: `/admin/faq/answer/:id/update`,
  ADMIN_FAQ_ANSWER_DELETE: `/admin/faq/answer/:id/delete`,
  ADMIN_FAQ_ANSWER_ACTIVATE: `/admin/faq/answer/:id/activate`,
};