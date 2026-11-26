export function formatNumber(
  value: number,
  locale = "id-ID"
): string {
  return new Intl.NumberFormat(locale).format(value);
}