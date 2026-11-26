import type {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  RowSelectionState,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table";

/* -------------------------------------------------------------------------- */
/*                                   Table                                    */
/* -------------------------------------------------------------------------- */

export interface UseDataTableProps<
  TData extends object,
  TValue = unknown,
> {
  data: TData[];

  columns: ColumnDef<TData, TValue>[];

  loading?: boolean;

  pageCount?: number;

  rowCount?: number;

  manualPagination?: boolean;

  manualSorting?: boolean;

  manualFiltering?: boolean;

  initialPageSize?: number;

  enableRowSelection?: boolean;
}

/* -------------------------------------------------------------------------- */
/*                                   State                                    */
/* -------------------------------------------------------------------------- */

export interface DataTableState {
  sorting: SortingState;

  pagination: PaginationState;

  rowSelection: RowSelectionState;

  columnFilters: ColumnFiltersState;

  columnVisibility: VisibilityState;

  globalFilter: string;
}

/* -------------------------------------------------------------------------- */
/*                                   Filter                                   */
/* -------------------------------------------------------------------------- */

export interface FilterOption {
  label: string;

  value: string;
}

export interface DataTableFilterConfig {
  columnId: string;

  title: string;

  options: FilterOption[];
}

/* -------------------------------------------------------------------------- */
/*                                   Export                                   */
/* -------------------------------------------------------------------------- */

export type DataTableExportFormat =
  | "excel"
  | "csv"
  | "pdf"
  | "print";

export interface DataTableExportProps<
  TData extends object,
> {
  data: TData[];

  filename?: string;

  formats?: DataTableExportFormat[];
}

/* -------------------------------------------------------------------------- */
/*                               View Options                                 */
/* -------------------------------------------------------------------------- */

export interface ColumnMeta {
  label?: string;
}

/* -------------------------------------------------------------------------- */
/*                                  Search                                    */
/* -------------------------------------------------------------------------- */

export interface DataTableSearchProps {
  columnId: string;

  placeholder?: string;
}