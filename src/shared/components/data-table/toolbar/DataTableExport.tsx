import {
  Download,
} from "lucide-react";

import {
  Button,
} from "@/shared/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";

import {
  exportToCSV,
  exportToExcel,
} from "@/shared/export";

interface Props<T extends object> {
  data: T[];

  filename?: string;

  formats?: (
    | "excel"
    | "csv"
  )[];
}

export function DataTableExport<
  T extends object,
>({
  data,
  filename = "export",

  formats = [
    "excel",
    "csv",
  ],
}: Props<T>) {
  return (
    <DropdownMenu>

      <DropdownMenuTrigger
        asChild
      >

        <Button
          variant="outline"
        >
          <Download className="mr-2 h-4 w-4" />

          Export
        </Button>

      </DropdownMenuTrigger>

      <DropdownMenuContent>

        {formats.includes(
          "excel"
        ) && (
          <DropdownMenuItem
            onClick={() =>
              exportToExcel({
                data,
                filename,
              })
            }
          >
            Excel (.xlsx)
          </DropdownMenuItem>
        )}

        {formats.includes(
          "csv"
        ) && (
          <DropdownMenuItem
            onClick={() =>
              exportToCSV({
                data,
                filename,
              })
            }
          >
            CSV (.csv)
          </DropdownMenuItem>
        )}

      </DropdownMenuContent>

    </DropdownMenu>
  );
}