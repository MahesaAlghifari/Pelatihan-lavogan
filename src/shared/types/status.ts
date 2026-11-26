export type Status =
  | "active"
  | "inactive"
  | "draft"
  | "published"
  | "pending"
  | "completed"
  | "failed";

export type LoadingState =
  | "idle"
  | "loading"
  | "success"
  | "error";