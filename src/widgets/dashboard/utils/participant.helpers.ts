import type {
  DashboardParticipant,
} from "../types";

export function getParticipantInitials(
  name: string
) {
  return name
    .trim()
    .split(" ")
    .map((item) => item[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function sortParticipants(
  participants: DashboardParticipant[]
) {
  return [...participants].sort(
    (a, b) =>
      a.name.localeCompare(b.name)
  );
}

export function participantCountLabel(
  value: number
) {
  return `${value.toLocaleString()} Participants`;
}