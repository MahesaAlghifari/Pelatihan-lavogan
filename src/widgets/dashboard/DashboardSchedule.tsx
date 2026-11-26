import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";

import {
  ScheduleItem,
} from "./components";

import type {
  DashboardScheduleItem,
} from "./types";

interface DashboardScheduleProps {
  schedules: DashboardScheduleItem[];
}

export function DashboardSchedule({
  schedules,
}: DashboardScheduleProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Today's Schedule
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {schedules.map((schedule) => (
          <ScheduleItem
            key={schedule.id}
            schedule={schedule}
          />
        ))}
      </CardContent>
    </Card>
  );
}