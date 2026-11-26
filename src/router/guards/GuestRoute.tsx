import type {
  ReactNode,
} from "react";

import {
  Navigate,
} from "react-router-dom";

import type {
  AppRole,
} from "../types";

import {
  DEFAULT_ROLE_REDIRECT,
} from "../constants";

/**
 * Temporary auth hook.
 *
 * TODO:
 * Replace with useAuth()
 */
function useAuth() {
  return {
    isAuthenticated: false,

    isLoading: false,

    user: {
      role: "admin" as AppRole,
    },
  };
}

interface GuestRouteProps {
  children: ReactNode;
}

export function GuestRoute({
  children,
}: GuestRouteProps) {
  const {
    isAuthenticated,
    isLoading,
    user,
  } = useAuth();

  if (isLoading) {
    return null;
  }

  if (isAuthenticated) {
    return (
      <Navigate
        replace
        to={DEFAULT_ROLE_REDIRECT[user.role]}
      />
    );
  }

  return <>{children}</>;
}