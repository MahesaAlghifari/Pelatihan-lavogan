import type {
  DashboardTraining,
} from "../types";

export function isPublishedTraining(
  training: DashboardTraining
) {
  return (
    training.status ===
    "published"
  );
}

export function getTrainingStatusVariant(
  status: DashboardTraining["status"]
): "default" | "secondary" {
  return status === "published"
    ? "default"
    : "secondary";
}

export function trainingParticipantLabel(
  value: number
) {
  return `${value.toLocaleString()} Participants`;
}