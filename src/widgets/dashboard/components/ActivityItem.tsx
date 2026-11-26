import {
  Clock3,
} from "lucide-react";

import type {
  DashboardActivityItem,
} from "../types";

interface ActivityItemProps {
  activity: DashboardActivityItem;
}

export function ActivityItem({
  activity,
}: ActivityItemProps) {
  return (
    <div className="flex items-start gap-3 rounded-lg border p-4">

      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">

        <Clock3 className="h-5 w-5 text-primary" />

      </div>

      <div className="flex-1 space-y-1">

        <h4 className="text-sm font-semibold">
          {activity.title}
        </h4>

        <p className="text-sm text-muted-foreground">
          {activity.description}
        </p>

        <span className="text-xs text-muted-foreground">
          {activity.time}
        </span>

      </div>

    </div>
  );
}