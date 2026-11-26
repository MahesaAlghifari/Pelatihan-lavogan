/**
 * Session Storage Helper
 * --------------------------------------------------------
 * Wrapper around browser sessionStorage with
 * type-safe helper methods.
 */

export const sessionStorageService = {
  get<T>(key: string): T | null {
    try {
      const value = sessionStorage.getItem(key);

      if (!value) return null;

      return JSON.parse(value) as T;
    } catch (error) {
      console.error(`[SessionStorage] Failed to get "${key}"`, error);
      return null;
    }
  },

  set<T>(key: string, value: T): void {
    try {
      sessionStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`[SessionStorage] Failed to save "${key}"`, error);
    }
  },

  remove(key: string): void {
    try {
      sessionStorage.removeItem(key);
    } catch (error) {
      console.error(`[SessionStorage] Failed to remove "${key}"`, error);
    }
  },

  clear(): void {
    try {
      sessionStorage.clear();
    } catch (error) {
      console.error("[SessionStorage] Failed to clear storage", error);
    }
  },

  has(key: string): boolean {
    return sessionStorage.getItem(key) !== null;
  },
};