/**
 * ==========================================================
 * APPLICATION PERMISSIONS
 * ==========================================================
 * Global Role & Permission Configuration
 *
 * Digunakan untuk:
 * - Route Guard
 * - Sidebar
 * - Menu
 * - Button Visibility
 * - Authorization
 * ==========================================================
 */

export const ROLES = {
  SUPER_ADMIN: "super_admin",
  ADMIN: "admin",
  PARTICIPANT: "participant",
  INSTRUCTOR: "instructor",
  ASSESSOR: "assessor",
} as const;

export type UserRole = (typeof ROLES)[keyof typeof ROLES];

export const PERMISSIONS = {
  DASHBOARD_VIEW: "dashboard:view",

  USER_VIEW: "user:view",
  USER_CREATE: "user:create",
  USER_UPDATE: "user:update",
  USER_DELETE: "user:delete",

  SCHEME_VIEW: "scheme:view",
  SCHEME_CREATE: "scheme:create",
  SCHEME_UPDATE: "scheme:update",
  SCHEME_DELETE: "scheme:delete",

  TRAINING_VIEW: "training:view",
  TRAINING_CREATE: "training:create",
  TRAINING_UPDATE: "training:update",
  TRAINING_DELETE: "training:delete",

  LEARNING_VIEW: "learning:view",

  MATERIAL_VIEW: "material:view",
  MATERIAL_CREATE: "material:create",
  MATERIAL_UPDATE: "material:update",
  MATERIAL_DELETE: "material:delete",

  QUIZ_VIEW: "quiz:view",
  QUIZ_CREATE: "quiz:create",
  QUIZ_UPDATE: "quiz:update",
  QUIZ_DELETE: "quiz:delete",

  CERTIFICATE_VIEW: "certificate:view",
  CERTIFICATE_GENERATE: "certificate:generate",

  PROFILE_VIEW: "profile:view",
  PROFILE_UPDATE: "profile:update",

  SETTINGS_VIEW: "settings:view",
  SETTINGS_UPDATE: "settings:update",
} as const;

export type Permission =
  (typeof PERMISSIONS)[keyof typeof PERMISSIONS];

export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  [ROLES.SUPER_ADMIN]: Object.values(PERMISSIONS),

  [ROLES.ADMIN]: [
    PERMISSIONS.DASHBOARD_VIEW,

    PERMISSIONS.USER_VIEW,
    PERMISSIONS.USER_CREATE,
    PERMISSIONS.USER_UPDATE,
    PERMISSIONS.USER_DELETE,

    PERMISSIONS.SCHEME_VIEW,
    PERMISSIONS.SCHEME_CREATE,
    PERMISSIONS.SCHEME_UPDATE,
    PERMISSIONS.SCHEME_DELETE,

    PERMISSIONS.TRAINING_VIEW,
    PERMISSIONS.TRAINING_CREATE,
    PERMISSIONS.TRAINING_UPDATE,
    PERMISSIONS.TRAINING_DELETE,

    PERMISSIONS.MATERIAL_VIEW,
    PERMISSIONS.MATERIAL_CREATE,
    PERMISSIONS.MATERIAL_UPDATE,
    PERMISSIONS.MATERIAL_DELETE,

    PERMISSIONS.QUIZ_VIEW,
    PERMISSIONS.QUIZ_CREATE,
    PERMISSIONS.QUIZ_UPDATE,
    PERMISSIONS.QUIZ_DELETE,

    PERMISSIONS.CERTIFICATE_VIEW,
    PERMISSIONS.CERTIFICATE_GENERATE,

    PERMISSIONS.SETTINGS_VIEW,
    PERMISSIONS.SETTINGS_UPDATE,
  ],

  [ROLES.PARTICIPANT]: [
    PERMISSIONS.DASHBOARD_VIEW,

    PERMISSIONS.LEARNING_VIEW,

    PERMISSIONS.QUIZ_VIEW,

    PERMISSIONS.CERTIFICATE_VIEW,

    PERMISSIONS.PROFILE_VIEW,
    PERMISSIONS.PROFILE_UPDATE,
  ],

  [ROLES.INSTRUCTOR]: [
    PERMISSIONS.DASHBOARD_VIEW,

    PERMISSIONS.LEARNING_VIEW,

    PERMISSIONS.MATERIAL_VIEW,
    PERMISSIONS.MATERIAL_UPDATE,

    PERMISSIONS.QUIZ_VIEW,

    PERMISSIONS.PROFILE_VIEW,
    PERMISSIONS.PROFILE_UPDATE,
  ],

  [ROLES.ASSESSOR]: [
    PERMISSIONS.DASHBOARD_VIEW,

    PERMISSIONS.QUIZ_VIEW,

    PERMISSIONS.CERTIFICATE_VIEW,

    PERMISSIONS.PROFILE_VIEW,
  ],
};