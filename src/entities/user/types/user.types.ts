import type { BaseEntity } from "@/shared/types";

/**
 * ==========================================================
 * User Role
 * ==========================================================
 */

export type UserRole =
  | "super_admin"
  | "admin"
  | "participant"
  | "instructor";

/**
 * ==========================================================
 * User Status
 * ==========================================================
 */

export type UserStatus =
  | "active"
  | "inactive"
  | "pending"
  | "blocked";

/**
 * ==========================================================
 * User Entity
 * ==========================================================
 */

export interface User extends BaseEntity {
  fullName: string;

  email: string;

  avatar?: string | null;

  phone?: string | null;

  role: UserRole;

  status: UserStatus;
}

/**
 * ==========================================================
 * Authentication
 * ==========================================================
 */

export interface LoginRequest {
  email: string;

  password: string;
}

export interface LoginResponse {
  accessToken: string;

  refreshToken: string;

  user: User;
}

export interface RefreshTokenResponse {
  accessToken: string;

  refreshToken: string;
}