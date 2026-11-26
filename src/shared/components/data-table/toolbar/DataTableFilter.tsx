import type { Table } from "@tanstack/react-table";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";

import { Button } from "@/shared/components/ui/button";

import {
  Filter,
} from "lucide-react";

export interface FilterOption {
  label: string;

  value: string;
}

interface Props<TData extends object> {
  table: Table<TData>;

  columnId: string;

  title: string;

  options: FilterOption[];
}

export function DataTableFilter<TData extends object>({
  table,
  columnId,
  title,
  options,
}: Props<TData>) {
  const column =
    table.getColumn(columnId);

  const value =
    column?.getFilterValue() as
      | string
      | undefined;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
      >
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />

          {title}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuLabel>
          {title}
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {options.map((option) => (
          <DropdownMenuCheckboxItem
            key={option.value}
            checked={
              value === option.value
            }
            onCheckedChange={() =>
              column?.setFilterValue(
                value === option.value
                  ? undefined
                  : option.value
              )
            }
          >
            {option.label}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}