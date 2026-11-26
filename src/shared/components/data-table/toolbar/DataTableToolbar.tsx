import type {
  Table,
} from "@tanstack/react-table";

interface Props<TData extends object> {
  table: Table<TData>;

  children: React.ReactNode;
}

export function DataTableToolbar<
  TData extends object,
>({
  children,
}: Props<TData>) {
  return (
    <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
      {children}
    </div>
  );
}