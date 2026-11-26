/**
 * ==========================================================
 * API Endpoints
 * ==========================================================
 */

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    REFRESH: "/auth/refresh",
    PROFILE: "/auth/me",
  },

  USERS: "/users",

  PARTICIPANTS: "/participants",

  TRAININGS: "/trainings",

  MODULES: "/modules",

  MATERIALS: "/materials",

  QUIZZES: "/quizzes",

  QUESTIONS: "/questions",

  CERTIFICATES: "/certificates",

  SCHEMES: "/schemes",

  DASHBOARD: "/dashboard",

  SETTINGS: "/settings",

  UPLOAD: "/upload",
} as const;

export default API_ENDPOINTS;