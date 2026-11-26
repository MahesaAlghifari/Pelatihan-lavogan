import type {
  ReactNode,
} from "react";

import {
  Navigate,
  useLocation,
} from "react-router-dom";

import {
  AUTH_PATH,
} from "../paths";

/**
 * Temporary auth hook.
 *
 * TODO:
 * Replace with useAuth() when authentication
 * module is implemented.
 */
function useAuth() {
  return {
    isAuthenticated: true,
    isLoading: false,
  };
}

interface Props {
  children: ReactNode;
}

export function ProtectedRoute({
  children,
}: Props) {
  const location =
    useLocation();

  const {
    isAuthenticated,
    isLoading,
  } = useAuth();

  if (isLoading) {
    return null;
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        replace
        to={AUTH_PATH.LOGIN}
        state={{
          from: location,
        }}
      />
    );
  }

  return <>{children}</>;
}