export interface TableColumn<T> {
  key: keyof T | string;
  title: string;
  width?: number | string;
  align?: "left" | "center" | "right";
  sortable?: boolean;
}

export interface TablePagination {
  page: number;
  pageSize: number;
  total: number;
}