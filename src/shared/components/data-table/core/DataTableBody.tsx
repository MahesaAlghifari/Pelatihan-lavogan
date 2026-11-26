import {
  flexRender,
  type Table as TanstackTable,
} from "@tanstack/react-table";

import {
  TableBody,
  TableCell,
  TableRow,
} from "@/shared/components/ui/table";

import { DataTableEmpty } from "./DataTableEmpty";

interface Props<TData extends object> {
  table: TanstackTable<TData>;
}

export function DataTableBody<TData extends object>({
  table,
}: Props<TData>) {
  const rows =
    table.getRowModel().rows;

  if (!rows.length) {
    return (
      <TableBody>
        <DataTableEmpty
          colSpan={
            table.getVisibleLeafColumns()
              .length
          }
        />
      </TableBody>
    );
  }

  return (
    <TableBody>
      {rows.map((row) => (
        <TableRow
          key={row.id}
          data-state={
            row.getIsSelected() &&
            "selected"
          }
        >
          {row
            .getVisibleCells()
            .map((cell) => (
              <TableCell
                key={cell.id}
              >
                {flexRender(
                  cell.column.columnDef
                    .cell,
                  cell.getContext()
                )}
              </TableCell>
            ))}
        </TableRow>
      ))}
    </TableBody>
  );
}