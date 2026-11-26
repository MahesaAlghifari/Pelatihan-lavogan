import { BaseApi } from "@/shared/lib/api";

import { http } from "@/shared/lib/api";

import type {
  LoginRequest,
  LoginResponse,
  User,
} from "../types";

class UserApi extends BaseApi<User> {
  constructor() {
    super("/users");
  }

  login(payload: LoginRequest) {
    return http.post<LoginResponse>(
      "/auth/login",
      payload
    );
  }

  logout() {
    return http.post<void>(
      "/auth/logout"
    );
  }

  me() {
    return http.get<User>(
      "/auth/me"
    );
  }

  updateProfile(
    payload: Partial<User>
  ) {
    return http.put<User>(
      "/users/profile",
      payload
    );
  }
}

export const userApi =
  new UserApi();