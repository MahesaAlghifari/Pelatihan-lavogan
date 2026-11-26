import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/shared/lib/utils/cn";

type PageTitleLevel = "h1" | "h2" | "h3" | "h4";

interface PageTitleProps
  extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;

  level?: PageTitleLevel;

  subtitle?: ReactNode;
}

const headingClass: Record<PageTitleLevel, string> = {
  h1: "text-3xl font-bold tracking-tight",
  h2: "text-2xl font-semibold tracking-tight",
  h3: "text-xl font-semibold",
  h4: "text-lg font-semibold",
};

export default function PageTitle({
  children,
  subtitle,
  level = "h1",
  className,
  ...props
}: PageTitleProps) {
  const Component = level;

  return (
    <div className="space-y-1">
      <Component
        className={cn(
          headingClass[level],
          className
        )}
        {...props}
      >
        {children}
      </Component>

      {subtitle && (
        <p className="text-sm text-muted-foreground">
          {subtitle}
        </p>
      )}
    </div>
  );
}