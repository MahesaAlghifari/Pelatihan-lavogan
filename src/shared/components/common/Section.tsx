import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/shared/lib/utils/cn";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  title?: string;

  description?: string;

  action?: ReactNode;

  children: ReactNode;

  footer?: ReactNode;
}

export default function Section({
  title,
  description,
  action,
  footer,
  children,
  className,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        "space-y-6 rounded-xl border border-border bg-background p-6 shadow-sm",
        className
      )}
      {...props}
    >
      {(title || description || action) && (
        <header className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="space-y-1">
            {title && (
              <h2 className="text-lg font-semibold">
                {title}
              </h2>
            )}

            {description && (
              <p className="text-sm text-muted-foreground">
                {description}
              </p>
            )}
          </div>

          {action && (
            <div className="flex shrink-0 items-center gap-2">
              {action}
            </div>
          )}
        </header>
      )}

      <div>{children}</div>

      {footer && (
        <footer className="border-t border-border pt-4">
          {footer}
        </footer>
      )}
    </section>
  );
}