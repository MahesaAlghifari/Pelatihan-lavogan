import {
  Navigate,
  Outlet,
} from "react-router-dom";

import { useAuth } from "../hooks";

interface PublicRouteProps {
  redirectTo?: string;
}

export function PublicRoute({
  redirectTo = "/dashboard",
}: PublicRouteProps) {
  const {
    isAuthenticated,
    isInitialized,
  } = useAuth();

  if (!isInitialized) {
    return null;
  }

  if (isAuthenticated) {
    return (
      <Navigate
        replace
        to={redirectTo}
      />
    );
  }

  return <Outlet />;
}