import type {
  Column,
} from "@tanstack/react-table";

export function isSortable<T>(
  column: Column<T>
) {
  return column.getCanSort();
}

export function isHideable<T>(
  column: Column<T>
) {
  return column.getCanHide();
}

export function getColumnTitle(
  id: string
) {
  return id
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) =>
      c.toUpperCase()
    );
}