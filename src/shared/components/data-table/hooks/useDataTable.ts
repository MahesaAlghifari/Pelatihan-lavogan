import { useMemo, useState } from "react";

import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnFiltersState,
  type PaginationState,
  type RowSelectionState,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table";

import type {
  UseDataTableProps,
} from "../types";

export function useDataTable<
  TData extends object,
  TValue = unknown,
>({
  data,
  columns,

  pageCount = -1,

  manualFiltering = false,

  manualPagination = false,

  manualSorting = false,

  initialPageSize = 10,

  enableRowSelection = true,
}: UseDataTableProps<
  TData,
  TValue
>) {
  const [sorting, setSorting] =
    useState<SortingState>([]);

  const [
    columnFilters,
    setColumnFilters,
  ] =
    useState<ColumnFiltersState>(
      []
    );

  const [
    rowSelection,
    setRowSelection,
  ] =
    useState<RowSelectionState>({});

  const [
    columnVisibility,
    setColumnVisibility,
  ] =
    useState<VisibilityState>({});

  const [
    globalFilter,
    setGlobalFilter,
  ] = useState("");

  const [
    pagination,
    setPagination,
  ] =
    useState<PaginationState>({
      pageIndex: 0,
      pageSize: initialPageSize,
    });

  const table = useReactTable({
    data,

    columns,

    pageCount,

    state: {
      sorting,

      pagination,

      rowSelection,

      columnFilters,

      columnVisibility,

      globalFilter,
    },

    manualPagination,

    manualSorting,

    manualFiltering,

    enableRowSelection,

    enableSorting: true,

    enableMultiSort: false,

    onSortingChange:
      setSorting,

    onPaginationChange:
      setPagination,

    onColumnFiltersChange:
      setColumnFilters,

    onColumnVisibilityChange:
      setColumnVisibility,

    onRowSelectionChange:
      setRowSelection,

    onGlobalFilterChange:
      setGlobalFilter,

    getCoreRowModel:
      getCoreRowModel(),

    getFilteredRowModel:
      manualFiltering
        ? undefined
        : getFilteredRowModel(),

    getPaginationRowModel:
      manualPagination
        ? undefined
        : getPaginationRowModel(),

    getSortedRowModel:
      manualSorting
        ? undefined
        : getSortedRowModel(),
  });

  const selectedRows =
    useMemo(
      () =>
        table
          .getSelectedRowModel()
          .rows.map(
            (row) => row.original
          ),
      [table, rowSelection]
    );

  return {
    table,

    selectedRows,

    sorting,

    pagination,

    globalFilter,

    rowSelection,

    columnFilters,

    columnVisibility,

    setSorting,

    setPagination,

    setGlobalFilter,

    setRowSelection,

    setColumnFilters,

    setColumnVisibility,
  };
}