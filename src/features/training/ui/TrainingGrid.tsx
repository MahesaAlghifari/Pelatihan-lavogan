import type { Training } from "@/entities/training";

import { TrainingCard } from "./TrainingCard";

interface TrainingGridProps {
  trainings: Training[];
}

export function TrainingGrid({
  trainings,
}: TrainingGridProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

      {trainings.map((training) => (
        <TrainingCard
          key={training.id}
          training={training}
        />
      ))}

    </div>
  );
}