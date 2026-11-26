import {
  Trophy,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
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

interface DashboardTopTrainingProps {
  trainings: DashboardTraining[];
}

export function DashboardTopTraining({
  trainings,
}: DashboardTopTrainingProps) {
  if (!trainings.length) {
    return (
      <EmptyState
        title="No Training"
        description="No popular training available."
      />
    );
  }

  return (
    <Card>

      <CardHeader className="flex flex-row items-center gap-3">

        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">

          <Trophy className="h-5 w-5 text-primary" />

        </div>

        <div>

          <CardTitle>
            Top Training
          </CardTitle>

          <CardDescription>
            Most popular trainings
          </CardDescription>

        </div>

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