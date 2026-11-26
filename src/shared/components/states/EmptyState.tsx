import type {
  ReactNode,
} from "react";

import {
  Inbox,
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

  icon?: ReactNode;

  action?: ReactNode;

  className?: string;
}

export function EmptyState({
  title = "No Data",
  description = "No data available.",
  icon,
  action,
  className,
}: Props) {
  return (
    <Card className={className}>

      <CardContent className="flex flex-col items-center justify-center py-16 text-center">

        {icon ?? (
          <Inbox className="mb-4 h-14 w-14 text-muted-foreground" />
        )}

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