import type {
  AxiosError,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from "axios";

import client from "./client";

import {
  getAccessToken,
  removeAccessToken,
} from "@/shared/lib/auth";

/**
 * ==========================================================
 * Request Interceptor
 * ==========================================================
 */

client.interceptors.request.use(
  (
    config: InternalAxiosRequestConfig
  ) => {
    const token = getAccessToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },

  (error: AxiosError) =>
    Promise.reject(error)
);

/**
 * ==========================================================
 * Response Interceptor
 * ==========================================================
 */

client.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    if (
      error.response?.status === 401
    ) {
      removeAccessToken();

      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default client;