import type {
  Table as TanstackTable,
} from "@tanstack/react-table";

import {
  Table,
} from "@/shared/components/ui/table";

import { DataTableBody } from "./DataTableBody";
import { DataTableHeader } from "./DataTableHeader";

interface Props<TData extends object> {
  table: TanstackTable<TData>;
}

export function DataTableRoot<
  TData extends object,
>({  table,
}: Props<TData>) {
  return (
    <div className="rounded-lg border bg-background overflow-hidden">
      <Table>
        <DataTableHeader table={table} />

        <DataTableBody table={table} />
      </Table>
    </div>
  );
}