/**
 * ==========================================================
 * Application Constants
 * ==========================================================
 * Global application constants only.
 * Do NOT place business/domain constants here.
 * ==========================================================
 */

/**
 * ==========================================================
 * App
 * ==========================================================
 */

export const APP = {
  NAME: "Lavogan LMS",
  SHORT_NAME: "lavoganlms",
  VERSION: "1.0.0",
  DESCRIPTION: "Learning Management System",
} as const;

/**
 * ==========================================================
 * Storage
 * ==========================================================
 */

export const STORAGE_KEYS = {
  ACCESS_TOKEN: "access_token",
  REFRESH_TOKEN: "refresh_token",
  USER: "user",
  USER_ROLE: "user_role",
  ACTIVE_TRAINING: "active_training_id",
  THEME: "theme",
  LANGUAGE: "language",
} as const;

/**
 * ==========================================================
 * Pagination
 * ==========================================================
 */

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
  PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
} as const;

/**
 * ==========================================================
 * Session
 * ==========================================================
 */

export const SESSION = {
  TIMEOUT: 1000 * 60 * 60, // 1 hour
} as const;

/**
 * ==========================================================
 * API
 * ==========================================================
 */

export const API = {
  TIMEOUT: 30000,
} as const;

/**
 * ==========================================================
 * UI
 * ==========================================================
 */

export const UI = {
  DEBOUNCE_DELAY: 500,
  TOAST_DURATION: 3000,
  MODAL_DURATION: 200,
} as const;

/**
 * ==========================================================
 * Date
 * ==========================================================
 */

export const DATE_FORMAT = {
  DEFAULT: "dd/MM/yyyy",
  DATETIME: "dd/MM/yyyy HH:mm",
  DATE_ONLY: "yyyy-MM-dd",
  TIME_ONLY: "HH:mm",
} as const;

/**
 * ==========================================================
 * File Upload
 * ==========================================================
 */

export const FILE = {
  MAX_UPLOAD_SIZE: 20 * 1024 * 1024,

  IMAGE_TYPES: [
    "image/png",
    "image/jpeg",
    "image/webp",
    "image/svg+xml",
  ] as const,

  DOCUMENT_TYPES: [
    "application/pdf",
    "application/zip",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ] as const,

  VIDEO_TYPES: [
    "video/mp4",
    "video/webm",
  ] as const,
};