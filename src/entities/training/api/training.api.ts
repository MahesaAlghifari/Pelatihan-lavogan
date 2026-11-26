import { http } from "@/shared/lib/api";

import type {
  Training,
  CreateTrainingDto,
  UpdateTrainingDto,
  TrainingQuery,
} from "../types";

class TrainingApi {
  private readonly baseUrl = "/trainings";

  /**
   * ==========================================================
   * GET ALL
   * ==========================================================
   */
  async getAll(
    params?: TrainingQuery
  ): Promise<Training[]> {
    const response = await http.get<Training[]>(
      this.baseUrl,
      {
        params,
      }
    );

    return response.data;
  }

  /**
   * ==========================================================
   * GET DETAIL
   * ==========================================================
   */
  async getById(
    id: string
  ): Promise<Training> {
    const response = await http.get<Training>(
      `${this.baseUrl}/${id}`
    );

    return response.data;
  }

  /**
   * ==========================================================
   * CREATE
   * ==========================================================
   */
  async create(
    payload: CreateTrainingDto
  ): Promise<Training> {
    const response = await http.post<Training>(
      this.baseUrl,
      payload
    );

    return response.data;
  }

  /**
   * ==========================================================
   * UPDATE
   * ==========================================================
   */
  async update(
    id: string,
    payload: UpdateTrainingDto
  ): Promise<Training> {
    const response = await http.put<Training>(
      `${this.baseUrl}/${id}`,
      payload
    );

    return response.data;
  }

  /**
   * ==========================================================
   * DELETE
   * ==========================================================
   */
  async delete(
    id: string
  ): Promise<void> {
    await http.delete(
      `${this.baseUrl}/${id}`
    );
  }
}

export const trainingApi = new TrainingApi();