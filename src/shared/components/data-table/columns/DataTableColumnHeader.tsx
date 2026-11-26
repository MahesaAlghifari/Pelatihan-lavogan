import type { Column } from "@tanstack/react-table";

import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
} from "lucide-react";

import { Button } from "@/shared/components/ui/button";

interface Props<TData extends object, TValue> {
  column: Column<TData, TValue>;

  title: string;
}

export function DataTableColumnHeader<
  TData extends object,
  TValue,
>({
  column,
  title,
}: Props<TData, TValue>) {
  if (!column.getCanSort()) {
    return title;
  }

  const sorted = column.getIsSorted();

  return (
    <Button
      variant="ghost"
      className="-ml-3 h-8"
      onClick={() =>
        column.toggleSorting(
          sorted === "asc"
        )
      }
    >
      {title}

      {sorted === "asc" && (
        <ArrowUp className="ml-2 h-4 w-4" />
      )}

      {sorted === "desc" && (
        <ArrowDown className="ml-2 h-4 w-4" />
      )}

      {!sorted && (
        <ArrowUpDown className="ml-2 h-4 w-4 opacity-50" />
      )}
    </Button>
  );
}