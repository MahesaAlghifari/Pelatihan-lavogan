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

export function CrudPage({
  children,
  className,
}: Props) {
  return (
    <section
      className={cn(
        "space-y-6",
        className
      )}
    >
      {children}
    </section>
  );
}