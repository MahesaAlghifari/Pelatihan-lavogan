import { ENV } from "@/app/config/env";

type LogContext = Record<string, unknown>;

class Logger {
  private readonly isDev = ENV.APP_ENV === "development";

  info(message: string, context?: LogContext): void {
    if (!this.isDev) return;

    console.info(
      `%c[INFO]`,
      "color:#2563eb;font-weight:bold;",
      message,
      context ?? ""
    );
  }

  success(message: string, context?: LogContext): void {
    if (!this.isDev) return;

    console.log(
      `%c[SUCCESS]`,
      "color:#16a34a;font-weight:bold;",
      message,
      context ?? ""
    );
  }

  warn(message: string, context?: LogContext): void {
    console.warn(
      `%c[WARNING]`,
      "color:#d97706;font-weight:bold;",
      message,
      context ?? ""
    );
  }

  error(
    message: string,
    error?: unknown,
    context?: LogContext
  ): void {
    console.error(
      `%c[ERROR]`,
      "color:#dc2626;font-weight:bold;",
      message,
      error,
      context ?? ""
    );
  }

  debug(message: string, context?: LogContext): void {
    if (!this.isDev) return;

    console.debug(
      `%c[DEBUG]`,
      "color:#7c3aed;font-weight:bold;",
      message,
      context ?? ""
    );
  }

  table(data: unknown): void {
    if (!this.isDev) return;

    console.table(data);
  }
}

export const logger = new Logger();