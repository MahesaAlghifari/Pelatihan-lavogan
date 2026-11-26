export function formatCurrency(
  value: number,
  currency = "IDR",
  locale = "id-ID"
): string {
  return new Intl.NumberFormat(
    locale,
    {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }
  ).format(value);
}

export function formatNumber(
  value: number,
  locale = "id-ID"
): string {
  return new Intl.NumberFormat(
    locale
  ).format(value);
}

export function formatPercent(
  value: number
): string {
  return `${value}%`;
}

export function formatCompactNumber(
  value: number,
  locale = "id-ID"
): string {
  return new Intl.NumberFormat(
    locale,
    {
      notation: "compact",
    }
  ).format(value);
}