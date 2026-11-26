import type {
  ReactNode,
} from "react";

import {
  Button,
} from "@/shared/components/ui/button";

import {
  cn,
} from "@/shared/lib/utils";

interface Props {
  title: string;

  description?: string;

  action?: ReactNode;

  className?: string;
}

export function CrudHeader({
  title,
  description,
  action,
  className,
}: Props) {
  return (
    <header
      className={cn(
        "flex flex-col gap-4 md:flex-row md:items-center md:justify-between",
        className
      )}
    >
      <div>

        <h1 className="text-3xl font-bold tracking-tight">
          {title}
        </h1>

        {description && (
          <p className="mt-1 text-muted-foreground">
            {description}
          </p>
        )}

      </div>

      {action && (
        <div className="flex items-center gap-2">
          {action}
        </div>
      )}

    </header>
  );
}