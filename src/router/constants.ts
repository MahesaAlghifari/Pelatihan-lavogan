import {
  AUTH_PATH,
  ADMIN_PATH,
  PARTICIPANT_PATH,
  PUBLIC_PATH,
} from "./paths";

import type {
  AppRole,
} from "./types";

/* ============================================================================
 * Default Routes
 * ========================================================================== */

export const DEFAULT_ROUTE =
  PUBLIC_PATH.HOME;

export const LOGIN_ROUTE =
  AUTH_PATH.LOGIN;

export const NOT_FOUND_ROUTE =
  "*";

/* ============================================================================
 * Redirect After Login
 * ========================================================================== */

export const DEFAULT_ROLE_REDIRECT: Record<
  AppRole,
  string
> = {
  super_admin:
    ADMIN_PATH.DASHBOARD,

  admin:
    ADMIN_PATH.DASHBOARD,

  participant:
    PARTICIPANT_PATH.DASHBOARD,

  instructor:
    ADMIN_PATH.DASHBOARD,
};

/* ============================================================================
 * Navigation
 * ========================================================================== */

export const DEFAULT_NAVIGATION_COLLAPSED =
  false;

/* ============================================================================
 * Breadcrumb
 * ========================================================================== */

export const SHOW_HOME_BREADCRUMB =
  true;

/* ============================================================================
 * Auth
 * ========================================================================== */

export const TOKEN_STORAGE_KEY =
  "access_token";

export const REFRESH_TOKEN_STORAGE_KEY =
  "refresh_token";

export const USER_STORAGE_KEY =
  "current_user";

/* ============================================================================
 * Router
 * ========================================================================== */

export const ROUTER_BASENAME =
  "/";

/* ============================================================================
 * Pagination
 * ========================================================================== */

export const DEFAULT_PAGE_SIZE =
  10;

export const PAGE_SIZE_OPTIONS = [
  10,
  20,
  50,
  100,
] as const;