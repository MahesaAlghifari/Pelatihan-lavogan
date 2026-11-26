import { useMemo, useState } from "react";

export function usePagination(
  totalItems: number,
  pageSize = 10
) {
  const [page, setPage] = useState(1);

  const totalPages = Math.max(
    1,
    Math.ceil(totalItems / pageSize)
  );

  const startIndex =
    (page - 1) * pageSize;

  const endIndex =
    startIndex + pageSize;

  const pagination = useMemo(
    () => ({
      page,
      pageSize,
      totalItems,
      totalPages,
      startIndex,
      endIndex,
    }),
    [
      page,
      pageSize,
      totalItems,
      totalPages,
      startIndex,
      endIndex,
    ]
  );

  return {
    ...pagination,

    setPage,

    next() {
      setPage((p) =>
        Math.min(totalPages, p + 1)
      );
    },

    previous() {
      setPage((p) =>
        Math.max(1, p - 1)
      );
    },
  };
}