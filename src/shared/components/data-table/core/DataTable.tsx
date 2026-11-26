import type {
  ColumnDef,
} from "@tanstack/react-table";

import {
  useDataTable,
} from "../hooks";

import {
  DataTableRoot,
} from "./DataTableRoot";

import {
  DataTableToolbar,
} from "../toolbar/DataTableToolbar";

import {
  DataTableSearch,
} from "../toolbar/DataTableSearch";

import {
  DataTableFilter,
  type FilterOption,
} from "../toolbar/DataTableFilter";

import {
  DataTableRefresh,
} from "../toolbar/DataTableRefresh";

import {
  DataTableViewOptions,
} from "../toolbar/DataTableViewOptions";

import {
  DataTableExport,
} from "../toolbar/DataTableExport";

import {
  DataTablePagination,
} from "../pagination/DataTablePagination";

interface FilterConfig {
  columnId: string;

  title: string;

  options: FilterOption[];
}

interface Props<TData, TValue = unknown> {
  data: TData[];

  columns: ColumnDef<TData, TValue>[];

  loading?: boolean;

  searchColumn?: string;

  searchPlaceholder?: string;

  filters?: FilterConfig[];

  exportFilename?: string;

  onRefresh?: () => void;
}

export function DataTable<
  TData extends object,
  TValue = unknown,
>({
  data,
  columns,

  loading,

  searchColumn,

  searchPlaceholder,

  filters = [],

  exportFilename,

  onRefresh,
}: Props<TData, TValue>) {
  const dt =
    useDataTable({
      data,

      columns,
    });

  return (
    <div className="space-y-4">

      <DataTableToolbar
        table={dt.table}
      >

        <div className="flex flex-wrap gap-2">

          {searchColumn && (
            <DataTableSearch
              table={dt.table}
              columnId={
                searchColumn
              }
              placeholder={
                searchPlaceholder
              }
            />
          )}

          {filters.map(
            (filter) => (
              <DataTableFilter
                key={
                  filter.columnId
                }
                table={dt.table}
                columnId={
                  filter.columnId
                }
                title={filter.title}
                options={
                  filter.options
                }
              />
            )
          )}

        </div>

        <div className="flex flex-wrap gap-2">

          <DataTableExport
            data={data}
            filename={
              exportFilename
            }
          />

          {onRefresh && (
            <DataTableRefresh
              loading={loading}
              onRefresh={
                onRefresh
              }
            />
          )}

          <DataTableViewOptions
            table={dt.table}
          />

        </div>

      </DataTableToolbar>

      <DataTableRoot
        table={dt.table}
      />

      <DataTablePagination
        table={dt.table}
      />

    </div>
  );
}