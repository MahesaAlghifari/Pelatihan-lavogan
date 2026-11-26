import type {
  ReactNode,
} from "react";

import {
  AlertTriangle,
} from "lucide-react";

import {
  Card,
  CardContent,
} from "@/shared/components/ui/card";

interface Props {
  title?: string;

  description?: string;

  action?: ReactNode;

  className?: string;
}

export function ErrorState({
  title = "Something went wrong",
  description = "An unexpected error occurred.",
  action,
  className,
}: Props) {
  return (
    <Card className={className}>

      <CardContent className="flex flex-col items-center justify-center py-20 text-center">

        <AlertTriangle className="mb-4 h-12 w-12 text-destructive" />

        <h3 className="text-xl font-semibold">
          {title}
        </h3>

        <p className="mt-2 max-w-md text-muted-foreground">
          {description}
        </p>

        {action && (
          <div className="mt-6">

            {action}

          </div>
        )}

      </CardContent>

    </Card>
  );
}