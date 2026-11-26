import type {
  ComponentType,
  ReactNode,
} from "react";

import type {
  LucideIcon,
} from "lucide-react";

import type {
  RouteObject,
} from "react-router-dom";

/* ============================================================================
 * Role
 * ========================================================================== */

export type AppRole =
  | "super_admin"
  | "admin"
  | "participant"
  | "instructor";

/* ============================================================================
 * Permission
 * ========================================================================== */

export type AppPermission = string;

/* ============================================================================
 * Route Meta
 * ========================================================================== */

export interface RouteMeta {
  /**
   * Browser title
   */
  title: string;

  /**
   * Sidebar label
   */
  label?: string;

  /**
   * Breadcrumb label
   */
  breadcrumb?: string;

  /**
   * Navigation icon
   */
  icon?: LucideIcon;

  /**
   * Show in sidebar
   */
  showInNavigation?: boolean;

  /**
   * Show in breadcrumb
   */
  showInBreadcrumb?: boolean;

  /**
   * Require authentication
   */
  requiresAuth?: boolean;

  /**
   * Allowed roles
   */
  roles?: AppRole[];

  /**
   * Required permissions
   */
  permissions?: AppPermission[];
}

/* ============================================================================
 * App Route
 * ========================================================================== */

export type AppRoute = RouteObject & {
  meta?: RouteMeta;

  children?: AppRoute[];
};

/* ============================================================================
 * Navigation Item
 * ========================================================================== */

export interface NavigationItem {
  label: string;

  href: string;

  icon?: LucideIcon;

  children?: NavigationItem[];

  roles?: AppRole[];

  permissions?: AppPermission[];
}

/* ============================================================================
 * Breadcrumb Item
 * ========================================================================== */

export interface BreadcrumbItem {
  label: string;

  href?: string;
}

/* ============================================================================
 * Page Component
 * ========================================================================== */

export type PageComponent = ComponentType;

/* ============================================================================
 * Layout Component
 * ========================================================================== */

export interface LayoutProps {
  children?: ReactNode;
}