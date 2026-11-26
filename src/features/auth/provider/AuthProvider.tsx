import {
  useEffect,
  type PropsWithChildren,
} from "react";

import { useAuth } from "../hooks";

export function AuthProvider({
  children,
}: PropsWithChildren) {
  const {
    initialize,
    isInitialized,
  } = useAuth();

  useEffect(() => {
    initialize();
  }, [initialize]);

  if (!isInitialized) {
    return null;
  }

  return children;
}