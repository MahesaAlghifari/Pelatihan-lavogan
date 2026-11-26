import { client, API_ENDPOINTS } from "@/shared/lib/api";

import type {
  LoginRequest,
  LoginResponse,
  User,
} from "@/entities/user";

export const authApi = {
  login(payload: LoginRequest) {
    return client.post<LoginResponse>(
      API_ENDPOINTS.AUTH.LOGIN,
      payload
    );
  },

  logout() {
    return client.post<void>(
      API_ENDPOINTS.AUTH.LOGOUT
    );
  },

  me() {
    return client.get<User>(
      API_ENDPOINTS.AUTH.PROFILE
    );
  },

  refresh(refreshToken: string) {
    return client.post<{
      accessToken: string;
      refreshToken: string;
    }>(
      API_ENDPOINTS.AUTH.REFRESH,
      {
        refreshToken,
      }
    );
  },
};