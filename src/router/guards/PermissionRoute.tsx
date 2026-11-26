import type {
  ReactNode,
} from "react";

import {
  Navigate,
} from "react-router-dom";

import {
  DEFAULT_ROLE_REDIRECT,
} from "../constants";

import type {
  AppPermission,
  AppRole,
} from "../types";

/**
 * Temporary auth hook.
 *
 * TODO:
 * Replace with useAuth() when
 * authentication & authorization
 * module is implemented.
 */
function useAuth() {
  return {
    user: {
      role: "admin" as AppRole,

      permissions: [
        "training.read",
        "training.create",
        "training.update",
        "training.delete",
      ] as AppPermission[],
    },
  };
}

interface Props {
  children: ReactNode;

  permissions: AppPermission[];

  /**
   * true  = user must have ALL permissions
   * false = user only needs ONE permission
   */
  requireAll?: boolean;
}

export function PermissionRoute({
  children,
  permissions,
  requireAll = false,
}: Props) {
  const { user } = useAuth();

  const hasPermission = requireAll
    ? permissions.every((permission) =>
        user.permissions.includes(permission)
      )
    : permissions.some((permission) =>
        user.permissions.includes(permission)
      );

  if (!hasPermission) {
    return (
      <Navigate
        replace
        to={
          DEFAULT_ROLE_REDIRECT[
            user.role
          ]
        }
      />
    );
  }

  return <>{children}</>;
}