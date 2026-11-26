export function formatPercentage(
  value: number
) {
  return `${value}%`;
}

export function chartHeight() {
  return 320;
}

export function getTrendDirection(
  value: number
) {
  return value >= 0
    ? "up"
    : "down";
}