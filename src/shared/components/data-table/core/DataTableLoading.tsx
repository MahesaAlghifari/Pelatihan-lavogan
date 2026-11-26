import {
  Skeleton,
} from "@/shared/components/ui/skeleton";

import {
  TableBody,
  TableCell,
  TableRow,
} from "@/shared/components/ui/table";

interface Props {
  columns: number;

  rows?: number;
}

export function DataTableLoading({
  columns,
  rows = 8,
}: Props) {
  return (
    <TableBody>
      {Array.from({
        length: rows,
      }).map((_, row) => (
        <TableRow key={row}>
          {Array.from({
            length: columns,
          }).map((_, col) => (
            <TableCell key={col}>
              <Skeleton className="h-5 w-full" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
}