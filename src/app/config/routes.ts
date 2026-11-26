/**
 * ==========================================================
 * APPLICATION ROUTES
 * ==========================================================
 * Semua route aplikasi didefinisikan di sini.
 *
 * Jangan hardcode string route di component.
 * ==========================================================
 */

export const ROUTES = {
  ROOT: "/",

  AUTH: {
    LOGIN: "/login",
    LOGOUT: "/logout",
  },

  ADMIN: {
    ROOT: "/admin",

    DASHBOARD: "/admin/dashboard",

    SCHEMES: "/admin/schemes",

    TRAININGS: "/admin/trainings",

    LEARNING_PATHS: "/admin/learning-paths",

    MATERIALS: "/admin/materials",

    QUIZZES: "/admin/quizzes",

    PARTICIPANTS: "/admin/participants",

    CERTIFICATES: "/admin/certificates",

    SETTINGS: "/admin/settings",
  },

  PARTICIPANT: {
    ROOT: "/participant",

    DASHBOARD: "/participant/dashboard",

    SCHEMES: "/participant/schemes",

    TRAINING_INFO: "/participant/training-info",

    LEARNING: "/participant/learning",

    QUIZ: "/participant/quiz",

    CERTIFICATE: "/participant/certificate",

    PROFILE: "/participant/profile",
  },

  ERROR: {
    FORBIDDEN: "/403",

    NOT_FOUND: "/404",
  },
} as const;