/**
 * Browser Crypto Helpers
 * --------------------------------------------------------
 * Utility helpers around Web Crypto API.
 */

export const cryptoService = {
  /**
   * Generate UUID
   */
  uuid(): string {
    return crypto.randomUUID();
  },

  /**
   * Generate random string
   */
  random(length = 32): string {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    const bytes = crypto.getRandomValues(
      new Uint8Array(length)
    );

    return Array.from(bytes)
      .map((byte) => chars[byte % chars.length])
      .join("");
  },

  /**
   * SHA-256 Hash
   */
  async sha256(value: string): Promise<string> {
    const encoder = new TextEncoder();

    const data = encoder.encode(value);

    const hashBuffer = await crypto.subtle.digest(
      "SHA-256",
      data
    );

    return Array.from(new Uint8Array(hashBuffer))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  },

  /**
   * Base64 Encode
   */
  encode(value: string): string {
    return btoa(value);
  },

  /**
   * Base64 Decode
   */
  decode(value: string): string {
    return atob(value);
  },
};