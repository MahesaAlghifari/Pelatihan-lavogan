import {
  Inbox,
} from "lucide-react";

import {
  TableCell,
  TableRow,
} from "@/shared/components/ui/table";

interface Props {
  colSpan: number;

  message?: string;
}

export function DataTableEmpty({
  colSpan,
  message = "Tidak ada data.",
}: Props) {
  return (
    <TableRow>
      <TableCell
        colSpan={colSpan}
        className="h-56"
      >
        <div className="flex flex-col items-center justify-center gap-3">
          <Inbox className="h-10 w-10 text-muted-foreground" />

          <p className="text-sm text-muted-foreground">
            {message}
          </p>
        </div>
      </TableCell>
    </TableRow>
  );
}