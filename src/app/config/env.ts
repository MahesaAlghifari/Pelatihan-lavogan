/**
 * ==========================================================
 * Environment Configuration
 * ==========================================================
 * Centralized environment variables.
 * Only access import.meta.env through this file.
 */

export const ENV = {
  /**
   * Application
   */
  APP_NAME:
    import.meta.env.VITE_APP_NAME ?? "Lavogan LMS",

  APP_VERSION:
    import.meta.env.VITE_APP_VERSION ?? "1.0.0",

  APP_ENV:
    import.meta.env.MODE,

  /**
   * API
   */
  API_URL:
    import.meta.env.VITE_API_URL ?? "",

  API_TIMEOUT: Number(
    import.meta.env.VITE_API_TIMEOUT ?? 30000
  ),

  /**
   * Authentication
   */
  TOKEN_KEY:
    import.meta.env.VITE_TOKEN_KEY ??
    "lavogan_access_token",

  REFRESH_TOKEN_KEY:
    import.meta.env.VITE_REFRESH_TOKEN_KEY ??
    "lavogan_refresh_token",

  /**
   * Feature Flags
   */
  ENABLE_LOGGER:
    import.meta.env.VITE_ENABLE_LOGGER === "true",

  ENABLE_DEVTOOLS:
    import.meta.env.DEV,
} as const;

export default ENV;