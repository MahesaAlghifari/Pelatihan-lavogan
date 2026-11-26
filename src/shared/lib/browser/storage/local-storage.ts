/**
 * Local Storage Helper
 * --------------------------------------------------------
 * Wrapper around browser localStorage with
 * type-safe helper methods.
 */

export const localStorageService = {
  get<T>(key: string): T | null {
    try {
      const value = localStorage.getItem(key);

      if (!value) return null;

      return JSON.parse(value) as T;
    } catch (error) {
      console.error(`[LocalStorage] Failed to get "${key}"`, error);
      return null;
    }
  },

  set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`[LocalStorage] Failed to save "${key}"`, error);
    }
  },

  remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`[LocalStorage] Failed to remove "${key}"`, error);
    }
  },

  clear(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error("[LocalStorage] Failed to clear storage", error);
    }
  },

  has(key: string): boolean {
    return localStorage.getItem(key) !== null;
  },
};