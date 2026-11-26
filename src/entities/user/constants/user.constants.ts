import type {
  UserRole,
  UserStatus,
} from "../types";

/**
 * ==========================================================
 * User Roles
 * ==========================================================
 */

export const USER_ROLE = {
  SUPER_ADMIN: "super_admin",
  ADMIN: "admin",
  PARTICIPANT: "participant",
  INSTRUCTOR: "instructor",
} as const satisfies Record<string, UserRole>;

/**
 * ==========================================================
 * User Status
 * ==========================================================
 */

export const USER_STATUS = {
  ACTIVE: "active",
  INACTIVE: "inactive",
  PENDING: "pending",
  BLOCKED: "blocked",
} as const satisfies Record<string, UserStatus>;

/**
 * ==========================================================
 * User Labels
 * ==========================================================
 */

export const USER_ROLE_LABEL: Record<UserRole, string> = {
  super_admin: "Super Admin",
  admin: "Administrator",
  participant: "Participant",
  instructor: "Instructor",
};

export const USER_STATUS_LABEL: Record<UserStatus, string> = {
  active: "Active",
  inactive: "Inactive",
  pending: "Pending",
  blocked: "Blocked",
};