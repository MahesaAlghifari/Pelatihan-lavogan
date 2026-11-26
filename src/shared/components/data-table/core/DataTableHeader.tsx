import {
  flexRender,
  type Table as TanstackTable,
} from "@tanstack/react-table";

import {
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";

interface Props<
  TData extends object,
> {
  table: TanstackTable<TData>;
}

export function DataTableHeader<
  TData extends object,
>({  table,
}: Props<TData>) {
  return (
    <TableHeader>
      {table
        .getHeaderGroups()
        .map((group) => (
          <TableRow key={group.id}>
            {group.headers.map((header) => (
              <TableHead key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </TableHead>
            ))}
          </TableRow>
        ))}
    </TableHeader>
  );
}