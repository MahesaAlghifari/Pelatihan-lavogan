import type {
  MaterialType,
  TrainingStatus,
} from "../types";

/**
 * ==========================================================
 * Training Status
 * ==========================================================
 */

export const TRAINING_STATUS = {
  DRAFT: "draft",
  PUBLISHED: "published",
  ARCHIVED: "archived",
} as const satisfies Record<string, TrainingStatus>;

export const TRAINING_STATUS_LABEL: Record<
  TrainingStatus,
  string
> = {
  draft: "Draft",
  published: "Published",
  archived: "Archived",
};

export const TRAINING_STATUS_COLOR: Record<
  TrainingStatus,
  string
> = {
  draft: "secondary",
  published: "success",
  archived: "destructive",
};

/**
 * ==========================================================
 * Material Type
 * ==========================================================
 */

export const MATERIAL_TYPE = {
  VIDEO: "video",
  DOCUMENT: "document",
  QUIZ: "quiz",
  ASSIGNMENT: "assignment",
} as const satisfies Record<string, MaterialType>;

export const MATERIAL_TYPE_LABEL: Record<
  MaterialType,
  string
> = {
  video: "Video",
  document: "Document",
  quiz: "Quiz",
  assignment: "Assignment",
};

export const MATERIAL_TYPE_ICON: Record<
  MaterialType,
  string
> = {
  video: "PlayCircle",
  document: "FileText",
  quiz: "ClipboardCheck",
  assignment: "Upload",
};