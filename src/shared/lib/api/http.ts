import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";

import { client } from "./client";

/**
 * ==========================================================
 * HTTP Client (reuses shared intercepted Axios client)
 * ==========================================================
 */

export const http: AxiosInstance = client;

/**
 * ==========================================================
 * Helper Methods
 * ==========================================================
 */

export async function get<T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> {
  const response: AxiosResponse<T> =
    await http.get(url, config);

  return response.data;
}

export async function post<T>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig
): Promise<T> {
  const response: AxiosResponse<T> =
    await http.post(url, data, config);

  return response.data;
}

export async function put<T>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig
): Promise<T> {
  const response: AxiosResponse<T> =
    await http.put(url, data, config);

  return response.data;
}

export async function patch<T>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig
): Promise<T> {
  const response: AxiosResponse<T> =
    await http.patch(url, data, config);

  return response.data;
}

export async function del<T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> {
  const response: AxiosResponse<T> =
    await http.delete(url, config);

  return response.data;
}

export default http;