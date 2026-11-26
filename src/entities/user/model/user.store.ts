import { create } from "zustand";

import type { User } from "../types";

interface UserState {
  /**
   * Current User
   */
  currentUser: User | null;

  /**
   * Authentication
   */
  isAuthenticated: boolean;

  /**
   * Global Loading
   */
  isLoading: boolean;

  /**
   * App Initialized
   */
  isInitialized: boolean;

  /**
   * Actions
   */
  setCurrentUser: (
    user: User | null
  ) => void;

  setLoading: (
    loading: boolean
  ) => void;

  setInitialized: (
    initialized: boolean
  ) => void;

  logout: () => void;

  reset: () => void;
}

const initialState = {
  currentUser: null,
  isAuthenticated: false,
  isLoading: false,
  isInitialized: false,
};

export const useUserStore =
  create<UserState>((set) => ({
    ...initialState,

    setCurrentUser: (user) =>
      set({
        currentUser: user,
        isAuthenticated: !!user,
      }),

    setLoading: (loading) =>
      set({
        isLoading: loading,
      }),

    setInitialized: (
      initialized
    ) =>
      set({
        isInitialized: initialized,
      }),

    logout: () =>
      set({
        currentUser: null,
        isAuthenticated: false,
      }),

    reset: () =>
      set(initialState),
  }));