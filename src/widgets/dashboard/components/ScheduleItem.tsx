import {
  CalendarClock,
} from "lucide-react";

import type {
  DashboardScheduleItem,
} from "../types";

interface ScheduleItemProps {
  schedule: DashboardScheduleItem;
}

export function ScheduleItem({
  schedule,
}: ScheduleItemProps) {
  return (
    <div className="flex items-start gap-3 rounded-lg border p-4">

      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">

        <CalendarClock className="h-5 w-5 text-primary" />

      </div>

      <div className="flex-1 space-y-1">

        <h4 className="text-sm font-semibold">
          {schedule.title}
        </h4>

        <p className="text-sm text-muted-foreground">
          {schedule.instructor}
        </p>

        <span className="text-xs text-muted-foreground">
          {schedule.time}
        </span>

      </div>

    </div>
  );
}