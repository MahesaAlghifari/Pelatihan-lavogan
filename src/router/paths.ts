/**
 * ==========================================================
 * Authentication
 * ==========================================================
 */

export const AUTH_PATH = {
  LOGIN: "/login",

  FORGOT_PASSWORD: "/forgot-password",

  RESET_PASSWORD: "/reset-password",
} as const;

/**
 * ==========================================================
 * Admin
 * ==========================================================
 */

export const ADMIN_PATH = {
  ROOT: "/admin",

  DASHBOARD: "/admin/dashboard",

  TRAINING: "/admin/training",

  TRAINING_CREATE: "/admin/training/create",

  TRAINING_DETAIL: "/admin/training/:id",

  TRAINING_EDIT: "/admin/training/:id/edit",

  PARTICIPANT: "/admin/participants",

  PARTICIPANT_DETAIL:
    "/admin/participants/:id",

  LEARNING_PATH:
    "/admin/learning-path",

  LEARNING_PATH_CREATE:
    "/admin/learning-path/create",

  LEARNING_PATH_EDIT:
    "/admin/learning-path/:id/edit",

  MATERIAL:
    "/admin/materials",

  MATERIAL_CREATE:
    "/admin/materials/create",

  MATERIAL_EDIT:
    "/admin/materials/:id/edit",

  MODULE:
    "/admin/modules",

  MODULE_CREATE:
    "/admin/modules/create",

  MODULE_EDIT:
    "/admin/modules/:id/edit",

  QUIZ:
    "/admin/quizzes",

  QUIZ_CREATE:
    "/admin/quizzes/create",

  QUIZ_EDIT:
    "/admin/quizzes/:id/edit",

  CERTIFICATE:
    "/admin/certificates",

  SCHEME:
    "/admin/schemes",

  SETTINGS:
    "/admin/settings",

  PROFILE:
    "/admin/profile",
} as const;

/**
 * ==========================================================
 * Participant
 * ==========================================================
 */

export const PARTICIPANT_PATH = {
  ROOT: "/participant",

  DASHBOARD:
    "/participant/dashboard",

  SCHEMES:
    "/participant/schemes",

  SCHEME_DETAIL:
    "/participant/schemes/:id",

  LEARNING:
    "/participant/learning",

  LEARNING_DETAIL:
    "/participant/learning/:id",

  QUIZ:
    "/participant/quiz/:id",

  CERTIFICATE:
    "/participant/certificate",

  PROFILE:
    "/participant/profile",
} as const;

/**
 * ==========================================================
 * Public
 * ==========================================================
 */

export const PUBLIC_PATH = {
  HOME: "/",

  ABOUT: "/about",

  FAQ: "/faq",

  CONTACT: "/contact",
} as const;

/**
 * ==========================================================
 * Combined
 * ==========================================================
 */

export const PATH = {
  ...AUTH_PATH,

  ...ADMIN_PATH,

  ...PARTICIPANT_PATH,

  ...PUBLIC_PATH,
} as const;