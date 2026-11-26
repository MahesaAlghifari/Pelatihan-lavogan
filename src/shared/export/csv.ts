import * as XLSX from "xlsx";

import type {
  ExportOptions,
} from "./types";

export function exportToCSV<
  T extends object,
>({
  data,
  filename = "export",
}: ExportOptions<T>) {
  const worksheet =
    XLSX.utils.json_to_sheet(data);

  const csv =
    XLSX.utils.sheet_to_csv(
      worksheet
    );

  const blob =
    new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

  const url =
    URL.createObjectURL(blob);

  const link =
    document.createElement("a");

  link.href = url;

  link.download =
    `${filename}.csv`;

  link.click();

  URL.revokeObjectURL(url);
}