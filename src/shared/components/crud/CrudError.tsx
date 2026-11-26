import type {
  ReactNode,
} from "react";

import {
  AlertTriangle,
} from "lucide-react";

import {
  Button,
} from "@/shared/components/ui/button";

import {
  Card,
  CardContent,
} from "@/shared/components/ui/card";

interface Props {
  title?: string;

  description?: string;

  action?: ReactNode;
}

export function CrudError({
  title = "Something went wrong",
  description = "An unexpected error occurred.",
  action,
}: Props) {
  return (
    <Card>

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