import { STORAGE_KEYS } from "@/app/config";

/**
 * ==========================================================
 * Token Storage
 * ==========================================================
 */

/**
 * Get Access Token
 */
export function getAccessToken(): string | null {
  return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
}

/**
 * Save Access Token
 */
export function setAccessToken(token: string): void {
  localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token);
}

/**
 * Remove Access Token
 */
export function removeAccessToken(): void {
  localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
}

/**
 * Get Refresh Token
 */
export function getRefreshToken(): string | null {
  return localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
}

/**
 * Save Refresh Token
 */
export function setRefreshToken(token: string): void {
  localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, token);
}

/**
 * Remove Refresh Token
 */
export function removeRefreshToken(): void {
  localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
}

/**
 * Save Both Tokens
 */
export function setTokens(
  accessToken: string,
  refreshToken: string
): void {
  setAccessToken(accessToken);
  setRefreshToken(refreshToken);
}

/**
 * Clear All Tokens
 */
export function clearTokens(): void {
  removeAccessToken();
  removeRefreshToken();
}

/**
 * Check Authentication
 */
export function isAuthenticated(): boolean {
  return Boolean(getAccessToken());
}