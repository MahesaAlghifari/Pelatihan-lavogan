import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";

import {
  EmptyState,
} from "@/shared/components/states";

import {
  TrainingItem,
} from "./components";

import type {
  DashboardTraining,
} from "./types";

interface ActiveTrainingWidgetProps {
  trainings: DashboardTraining[];
}

export function ActiveTrainingWidget({
  trainings,
}: ActiveTrainingWidgetProps) {
  if (!trainings.length) {
    return (
      <Card>

        <CardHeader>

          <CardTitle>
            Active Training
          </CardTitle>

        </CardHeader>

        <CardContent>

          <EmptyState
            title="No Active Training"
            description="There are currently no active trainings."
          />

        </CardContent>

      </Card>
    );
  }

  return (
    <Card>

      <CardHeader>

        <CardTitle>
          Active Training
        </CardTitle>

      </CardHeader>

      <CardContent className="space-y-3">

        {trainings.map((training) => (
          <TrainingItem
            key={training.id}
            training={training}
          />
        ))}

      </CardContent>

    </Card>
  );
}