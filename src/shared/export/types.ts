export type ExportFormat =
  | "excel"
  | "csv"
  | "pdf"
  | "print";

export interface ExportOptions<T> {
  data: T[];

  filename?: string;

  sheetName?: string;
}