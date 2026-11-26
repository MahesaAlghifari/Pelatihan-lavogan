import type { PropsWithChildren } from "react";

import { cn } from "@/shared/lib/utils";

interface PageContentProps extends PropsWithChildren {
  className?: string;
}

export function PageContent({
  className,
  children,
}: PageContentProps) {
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