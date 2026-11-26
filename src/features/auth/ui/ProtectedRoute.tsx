import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAuth } from "../hooks";

interface ProtectedRouteProps {
  redirectTo?: string;
}

export function ProtectedRoute({
  redirectTo = "/login",
}: ProtectedRouteProps) {
  const {
    currentUser,
    isAuthenticated,
    isInitialized,
    isLoading,
  } = useAuth();

  const location = useLocation();

  /**
   * Menunggu proses initialize auth selesai
   */
  if (!isInitialized || isLoading) {
    return null;
  }

  /**
   * Belum login
   */
  if (!isAuthenticated || !currentUser) {
    return (
      <Navigate
        to={redirectTo}
        replace
        state={{
          from: location,
        }}
      />
    );
  }

  /**
   * Sudah login
   */
  return <Outlet />;
}

export default ProtectedRoute;