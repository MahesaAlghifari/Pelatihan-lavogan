import type { BaseEntity } from "@/shared/types";

/**
 * ==========================================================
 * Training Status
 * ==========================================================
 */

export type TrainingStatus =
  | "draft"
  | "published"
  | "archived";

/**
 * ==========================================================
 * Training Level
 * ==========================================================
 */

export type TrainingLevel =
  | "beginner"
  | "intermediate"
  | "advanced";

/**
 * ==========================================================
 * Material Type
 * ==========================================================
 */

export type MaterialType =
  | "video"
  | "document"
  | "quiz"
  | "assignment";

/**
 * ==========================================================
 * Training Entity
 * ==========================================================
 */

export interface Training extends BaseEntity {
  title: string;

  description: string;

  thumbnail?: string | null;

  duration: number;

  level: TrainingLevel;

  status: TrainingStatus;
}

/**
 * ==========================================================
 * DTO
 * ==========================================================
 */

export interface CreateTrainingDto {
  title: string;

  description: string;

  duration: number;

  level: TrainingLevel;

  thumbnail?: string | null;
}

export interface UpdateTrainingDto
  extends Partial<CreateTrainingDto> {
  status?: TrainingStatus;
}

/**
 * ==========================================================
 * Query
 * ==========================================================
 */

export interface TrainingQuery {
  page?: number;

  limit?: number;

  search?: string;

  status?: TrainingStatus;

  level?: TrainingLevel;
}