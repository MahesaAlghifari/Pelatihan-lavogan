import type {
  Table,
} from "@tanstack/react-table";

import {
  Settings2,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";

import { Button } from "@/shared/components/ui/button";

interface Props<TData extends object> {
  table: Table<TData>;
}

export function DataTableViewOptions<
  TData extends object,
>({
  table,
}: Props<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
      >
        <Button
          type="button"
          variant="outline"
        >
          <Settings2 className="mr-2 h-4 w-4" />

          Kolom
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {table
          .getAllColumns()
          .filter((column) =>
            column.getCanHide()
          )
          .map((column) => (
            <DropdownMenuCheckboxItem
              key={column.id}
              checked={column.getIsVisible()}
              onCheckedChange={(
                value
              ) =>
                column.toggleVisibility(
                  Boolean(value)
                )
              }
            >
              {column.id}
            </DropdownMenuCheckboxItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}