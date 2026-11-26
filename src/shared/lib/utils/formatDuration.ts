export function formatDuration(
  minutes: number
): string {
  const hour = Math.floor(minutes / 60);

  const minute = minutes % 60;

  if (!hour) {
    return `${minute} min`;
  }

  return `${hour} h ${minute} min`;
}