/**
 * Date Formatting Utilities
 */

export function formatDate(
  value: Date | string | number,
  locale = "id-ID",
  options?: Intl.DateTimeFormatOptions
): string {
  return new Intl.DateTimeFormat(
    locale,
    options ?? {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }
  ).format(new Date(value));
}

export function formatDateTime(
  value: Date | string | number,
  locale = "id-ID"
): string {
  return new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export function formatTime(
  value: Date | string |number,
  locale = "id-ID"
): string {
  return new Intl.DateTimeFormat(locale, {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}