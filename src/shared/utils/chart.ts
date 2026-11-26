export function calculatePercentage(
  value: number,
  total: number
): number {
  if (total === 0) {
    return 0;
  }

  return Number(
    ((value / total) * 100).toFixed(1)
  );
}

export function calculateTrend(
  current: number,
  previous: number
): number {
  if (previous === 0) {
    return 0;
  }

  return Number(
    (
      ((current - previous) /
        previous) *
      100
    ).toFixed(1)
  );
}

export function sum(
  values: number[]
): number {
  return values.reduce(
    (total, value) => total + value,
    0
  );
}