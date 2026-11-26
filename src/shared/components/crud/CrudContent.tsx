import type {
  PropsWithChildren,
} from "react";

import {
  cn,
} from "@/shared/lib/utils";

interface Props
  extends PropsWithChildren {
  className?: string;
}

export function CrudContent({
  children,
  className,
}: Props) {
  return (
    <div
      className={cn(
        "space-y-6",
        className
      )}
    >
      {children}
    </div>
  );
}