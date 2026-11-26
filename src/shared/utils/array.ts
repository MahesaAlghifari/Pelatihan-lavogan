export function chunk<T>(
  array: T[],
  size: number
): T[][] {
  if (size <= 0) {
    return [];
  }

  const result: T[][] = [];

  for (let i = 0; i < array.length; i += size) {
    result.push(
      array.slice(i, i + size)
    );
  }

  return result;
}

export function unique<T>(
  array: T[]
): T[] {
  return [...new Set(array)];
}

export function sortBy<T>(
  array: T[],
  selector: (item: T) => string | number,
  order: "asc" | "desc" = "asc"
): T[] {
  return [...array].sort((a, b) => {
    const first = selector(a);
    const second = selector(b);

    if (first < second) {
      return order === "asc" ? -1 : 1;
    }

    if (first > second) {
      return order === "asc" ? 1 : -1;
    }

    return 0;
  });
}

export function groupBy<T, K extends string | number>(
  array: T[],
  selector: (item: T) => K
): Record<K, T[]> {
  return array.reduce(
    (groups, item) => {
      const key = selector(item);

      groups[key] ??= [];

      groups[key].push(item);

      return groups;
    },
    {} as Record<K, T[]>
  );
}