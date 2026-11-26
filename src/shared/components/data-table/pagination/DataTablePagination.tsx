import type {
  Table,
} from "@tanstack/react-table";

import {
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
} from "lucide-react";

import {
  Button,
} from "@/shared/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";

import {
  PAGE_SIZE_OPTIONS,
} from "../constants";

interface Props<TData extends object> {
  table: Table<TData>;
}

export function DataTablePagination<
  TData extends object,
>({
  table,
}: Props<TData>) {
  const {
    pageIndex,
    pageSize,
  } = table.getState().pagination;

  const totalRows =
    table.getFilteredRowModel().rows.length;

  const from =
    totalRows === 0
      ? 0
      : pageIndex * pageSize + 1;

  const to =
    Math.min(
      (pageIndex + 1) * pageSize,
      totalRows
    );

  return (
    <div className="flex flex-col gap-4 border-t px-4 py-4 md:flex-row md:items-center md:justify-between">

      <div className="flex items-center gap-3">

        <span className="text-sm text-muted-foreground">
          Rows per page
        </span>

        <Select
          value={pageSize.toString()}
          onValueChange={(value) =>
            table.setPageSize(
              Number(value)
            )
          }
        >
          <SelectTrigger className="w-24">
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            {PAGE_SIZE_OPTIONS.map(
              (size) => (
                <SelectItem
                  key={size}
                  value={size.toString()}
                >
                  {size}
                </SelectItem>
              )
            )}
          </SelectContent>
        </Select>

        <span className="text-sm text-muted-foreground">
          {from}-{to} of {totalRows}
        </span>

      </div>

      <div className="flex items-center gap-2">

        <Button
          size="icon"
          variant="outline"
          disabled={
            !table.getCanPreviousPage()
          }
          onClick={() =>
            table.firstPage()
          }
        >
          <ChevronsLeft className="h-4 w-4" />
        </Button>

        <Button
          size="icon"
          variant="outline"
          disabled={
            !table.getCanPreviousPage()
          }
          onClick={() =>
            table.previousPage()
          }
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <span className="w-20 text-center text-sm">

          {pageIndex + 1}

          {" / "}

          {table.getPageCount()}

        </span>

        <Button
          size="icon"
          variant="outline"
          disabled={
            !table.getCanNextPage()
          }
          onClick={() =>
            table.nextPage()
          }
        >
          <ChevronRight className="h-4 w-4" />
        </Button>

        <Button
          size="icon"
          variant="outline"
          disabled={
            !table.getCanNextPage()
          }
          onClick={() =>
            table.lastPage()
          }
        >
          <ChevronsRight className="h-4 w-4" />
        </Button>

      </div>

    </div>
  );
}