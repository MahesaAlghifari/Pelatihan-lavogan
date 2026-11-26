import type { Table } from "@tanstack/react-table";

import {
  Search,
  X,
} from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";

interface Props<TData extends object> {
  table: Table<TData>;

  columnId: string;

  placeholder?: string;
}

export function DataTableSearch<TData extends object>({
  table,
  columnId,
  placeholder = "Cari...",
}: Props<TData>) {
  const column =
    table.getColumn(columnId);

  const value =
    (column?.getFilterValue() as string) ??
    "";

  return (
    <div className="flex items-center gap-2">
      <Search className="h-4 w-4 text-muted-foreground" />

      <Input
        className="w-[280px]"
        placeholder={placeholder}
        value={value}
        onChange={(event) =>
          column?.setFilterValue(
            event.target.value
          )
        }
      />

      {value && (
        <Button
          type="button"
          size="icon"
          variant="ghost"
          onClick={() =>
            column?.setFilterValue("")
          }
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}