import type { ReactNode } from "react";
import { Construction } from "lucide-react";

import { Button } from "@/shared/components/ui/button";

interface FeaturePlaceholderProps {
  title?: string;

  description?: string;

  icon?: ReactNode;

  actionLabel?: string;

  onAction?: () => void;

  children?: ReactNode;

  className?: string;
}

export default function FeaturePlaceholder({
  title = "Feature Under Development",

  description = "This feature is currently being developed and will be available in a future update.",

  icon,

  actionLabel,

  onAction,

  children,

  className = "",
}: FeaturePlaceholderProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-background px-10 py-16 text-center ${className}`}
    >
      <div className="mb-6 rounded-full bg-muted p-5">
        {icon ?? (
          <Construction
            className="h-12 w-12 text-primary"
            strokeWidth={1.8}
          />
        )}
      </div>

      <h2 className="text-2xl font-semibold">
        {title}
      </h2>

      <p className="mt-3 max-w-lg text-sm text-muted-foreground">
        {description}
      </p>

      {children}

      {actionLabel && onAction && (
        <Button
          className="mt-8"
          onClick={onAction}
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
}