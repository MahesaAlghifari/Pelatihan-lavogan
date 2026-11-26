export function formatDate(
  value: Date | string,
  locale = "id-ID"
): string {
  return new Intl.DateTimeFormat(
    locale,
    {
      dateStyle: "medium",
    }
  ).format(new Date(value));
}

export function formatDateTime(
  value: Date | string,
  locale = "id-ID"
): string {
  return new Intl.DateTimeFormat(
    locale,
    {
      dateStyle: "medium",
      timeStyle: "short",
    }
  ).format(new Date(value));
}

export function formatMonth(
  value: Date | string,
  locale = "id-ID"
): string {
  return new Intl.DateTimeFormat(
    locale,
    {
      month: "short",
    }
  ).format(new Date(value));
}