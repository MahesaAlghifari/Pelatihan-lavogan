export const DEFAULT_PAGE_SIZE = 10;

export const PAGE_SIZE_OPTIONS = [
  10,
  20,
  50,
  100,
] as const;

export const DEFAULT_PAGINATION = {
  pageIndex: 0,
  pageSize: DEFAULT_PAGE_SIZE,
};

export const EMPTY_MESSAGE =
  "Tidak ada data.";

export const SEARCH_PLACEHOLDER =
  "Cari data...";