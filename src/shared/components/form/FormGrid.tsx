import type {
  PropsWithChildren,
} from "react";

import { cn } from "@/shared/lib/utils";

interface Props
  extends PropsWithChildren {
  columns?: 1 | 2 | 3 | 4;

  className?: string;
}

export function FormGrid({
  columns = 2,
  className,
  children,
}: Props) {
  const grid = {
    1: "grid-cols-1",

    2: "grid-cols-1 md:grid-cols-2",

    3: "grid-cols-1 md:grid-cols-2 xl:grid-cols-3",

    4: "grid-cols-1 md:grid-cols-2 xl:grid-cols-4",
  };

  return (
    <div
      className={cn(
        "grid gap-6",
        grid[columns],
        className
      )}
    >
      {children}
    </div>
  );
}