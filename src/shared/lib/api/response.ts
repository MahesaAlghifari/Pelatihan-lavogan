import type { AxiosResponse } from "axios";

export function unwrapResponse<T>(
  response: AxiosResponse<T>
): T {
  return response.data;
}