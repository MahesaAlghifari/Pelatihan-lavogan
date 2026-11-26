import { useCallback } from "react";

import { authApi } from "../api";

import ENV from "@/app/config/env";

import {
  type LoginRequest,
  type User,
  useUserStore,
} from "@/entities/user";

import {
  clearTokens,
  getAccessToken,
  setTokens,
} from "@/shared/lib/auth";

import {
  readParticipantProfile,
  saveParticipantProfile,
} from "@/features/participant/profile/profileStorage";

const ADMIN_DEMO_USER: User = {
  id: "admin-1",
  fullName: "Admin MagangHub",
  email: "admin@maganghub.id",
  role: "admin",
  status: "active",
  createdAt: "2026-01-01T00:00:00Z",
  updatedAt: "2026-01-01T00:00:00Z",
};

const PARTICIPANT_DEMO_USER: User = {
  id: "participant-1",
  fullName: "Ahmad Sudirman",
  email: "peserta@maganghub.id",
  phone: "+62 812-3456-7890",
  role: "participant",
  status: "active",
  createdAt: "2026-01-15T00:00:00Z",
  updatedAt: "2026-01-15T00:00:00Z",
};

const DEMO_USERS: Record<string, { password: string; user: User }> = {
  "admin@maganghub.id": { password: "admin123", user: ADMIN_DEMO_USER },
  "admin@lavogan.id": { password: "admin123", user: ADMIN_DEMO_USER },
  "peserta@maganghub.id": { password: "peserta123", user: PARTICIPANT_DEMO_USER },
  "peserta@lavogan.id": { password: "peserta123", user: PARTICIPANT_DEMO_USER },
};

function resolveDemoUserFromToken(token: string | null): User | null {
  if (!token || !token.startsWith("demo-access-")) return null;
  const role = token.replace("demo-access-", "");
  const match = Object.values(DEMO_USERS).find(
    (entry) => entry.user.role === role
  );
  return match?.user ?? null;
}

export function useAuth() {
  const {
    currentUser,
    isAuthenticated,
    isLoading,
    isInitialized,

    setCurrentUser,
    setLoading,
    setInitialized,
    logout: clearUser,
  } = useUserStore();

  /**
   * Initialize Auth
   */
  const initialize = useCallback(async () => {
    try {
      setLoading(true);

      const token = getAccessToken();

      if (!token) {
        clearUser();
        return;
      }

      const demoUser = resolveDemoUserFromToken(token);
      if (demoUser) {
        setCurrentUser(demoUser);
        return;
      }

      if (!ENV.API_URL) {
        clearTokens();
        clearUser();
        return;
      }

      const response = await authApi.me();

      setCurrentUser(response.data);
    } catch (error) {
      console.error(error);

      clearTokens();
      clearUser();
    } finally {
      setLoading(false);
      setInitialized(true);
    }
  }, [
    clearUser,
    setCurrentUser,
    setLoading,
    setInitialized,
  ]);

  /**
   * Login
   */
  const login = useCallback(
    async (payload: LoginRequest) => {
      setLoading(true);

      try {
        const normalizedEmail = payload.email.trim().toLowerCase();
        const demoEntry = DEMO_USERS[normalizedEmail];

        if (demoEntry) {
          if (payload.password !== demoEntry.password) {
            throw new Error("Email atau password salah.");
          }

          const demoUser = demoEntry.user;
          setTokens(
            `demo-access-${demoUser.role}`,
            `demo-refresh-${demoUser.role}`
          );
          setCurrentUser(demoUser);

          if (demoUser.role === "participant") {
            const currentProfile = readParticipantProfile();
            saveParticipantProfile({
              ...currentProfile,
              name: currentProfile.name || demoUser.fullName,
              email: demoUser.email,
            });
          }

          return demoUser;
        }

        if (!ENV.API_URL) {
          throw new Error("Email atau password salah.");
        }

        const response = await authApi.login(payload);

        const {
          accessToken,
          refreshToken,
          user,
        } = response.data;

        setTokens(accessToken, refreshToken);

        setCurrentUser(user);

        return user;
      } finally {
        setLoading(false);
      }
    },
    [setCurrentUser, setLoading]
  );

  /**
   * Logout
   */
  const logout = useCallback(async () => {
    try {
      if (ENV.API_URL) {
        await authApi.logout();
      }
    } catch {
      // ignore
    }

    clearTokens();

    clearUser();
  }, [clearUser]);

  /**
   * Refresh Profile
   */
  const fetchProfile = useCallback(async () => {
    setLoading(true);

    try {
      const demoUser = resolveDemoUserFromToken(getAccessToken());
      if (demoUser) {
        setCurrentUser(demoUser);
        return demoUser;
      }

      const response = await authApi.me();

      setCurrentUser(response.data);

      return response.data;
    } finally {
      setLoading(false);
    }
  }, [setCurrentUser, setLoading]);

  return {
    /**
     * State
     */
    currentUser,

    isAuthenticated,

    isLoading,

    isInitialized,

    /**
     * Actions
     */
    initialize,
    login,
    logout,
    fetchProfile,
  };
}