import { http } from "./http";

export class BaseApi<T, TCreate = Partial<T>, TUpdate = Partial<T>> {
  constructor(private readonly endpoint: string) {}

  /**
   * Get List
   */
  getAll(params?: Record<string, unknown>) {
    return http.get<T[]>(this.endpoint, {
      params,
    });
  }

  /**
   * Get By Id
   */
  getById(id: string | number) {
    return http.get<T>(`${this.endpoint}/${id}`);
  }

  /**
   * Create
   */
  create(payload: TCreate) {
    return http.post<T>(
      this.endpoint,
      payload
    );
  }

  /**
   * Update
   */
  update(
    id: string | number,
    payload: TUpdate
  ) {
    return http.put<T>(
      `${this.endpoint}/${id}`,
      payload
    );
  }

  /**
   * Delete
   */
  delete(id: string | number) {
    return http.delete<void>(
      `${this.endpoint}/${id}`
    );
  }
}