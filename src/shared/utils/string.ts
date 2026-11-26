export function capitalize(
  value: string
): string {
  if (!value) {
    return "";
  }

  return (
    value.charAt(0).toUpperCase() +
    value.slice(1)
  );
}

export function truncate(
  value: string,
  length = 50
): string {
  if (value.length <= length) {
    return value;
  }

  return `${value.slice(
    0,
    length
  )}...`;
}

export function getInitials(
  value: string
): string {
  return value
    .trim()
    .split(" ")
    .map((item) => item[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}