export function isEmail(
  value: string
): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    value
  );
}

export function isRequired(
  value: unknown
): boolean {
  return value !== undefined &&
    value !== null &&
    value !== "";
}

export function isPhoneNumber(
  value: string
): boolean {
  return /^[0-9+\-()\s]+$/.test(
    value
  );
}