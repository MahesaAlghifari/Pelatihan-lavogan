import * as XLSX from "xlsx";

import type {
  ExportOptions,
} from "./types";

export function exportToExcel<
  T extends object,
>({
  data,
  filename = "export",
  sheetName = "Sheet1",
}: ExportOptions<T>) {
  const worksheet =
    XLSX.utils.json_to_sheet(data);

  const workbook =
    XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    sheetName
  );

  XLSX.writeFile(
    workbook,
    `${filename}.xlsx`
  );
}