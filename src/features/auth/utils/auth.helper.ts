import { isAuthenticated } from "@/shared/lib/auth";

export function requireAuth() {
  return isAuthenticated();
}

export function hasRole(
  currentRole: string | undefined,
  roles: string[]
) {
  if (!currentRole) return false;

  return roles.includes(currentRole);
}