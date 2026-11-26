export interface JwtPayload {
  sub?: string;
  exp?: number;
  iat?: number;
  role?: string;

  [key: string]: unknown;
}

export function decodeJwt<T = JwtPayload>(
  token: string
): T | null {
  try {
    const payload = token.split(".")[1];

    if (!payload) return null;

    return JSON.parse(atob(payload)) as T;
  } catch {
    return null;
  }
}

export function isTokenExpired(
  token: string
): boolean {
  const payload = decodeJwt(token);

  if (!payload?.exp) {
    return true;
  }

  return payload.exp * 1000 < Date.now();
}