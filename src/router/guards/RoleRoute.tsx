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
  AppRole,
} from "../types";

/**
 * Temporary auth hook.
 *
 * TODO:
 * Replace with useAuth()
 */
function useAuth() {
  return {
    user: {
      role: "admin" as AppRole,
    },
  };
}

interface Props {
  children: ReactNode;

  roles: AppRole[];
}

export function RoleRoute({
  children,
  roles,
}: Props) {
  const {
    user,
  } = useAuth();

  if (
    !roles.includes(
      user.role
    )
  ) {
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