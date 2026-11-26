import type {
  ReactNode,
} from "react";

import {
  cn,
} from "@/shared/lib/utils";

interface Props {
  left?: ReactNode;

  right?: ReactNode;

  className?: string;
}

export function CrudToolbar({
  left,
  right,
  className,
}: Props) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 md:flex-row md:items-center md:justify-between",
        className
      )}
    >
      <div className="flex flex-wrap items-center gap-2">
        {left}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {right}
      </div>
    </div>
  );
}