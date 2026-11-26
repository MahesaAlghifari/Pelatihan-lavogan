import { useTrainingList } from "../hooks";

import { TrainingGrid } from "./TrainingGrid";

import { TrainingEmpty } from "./TrainingEmpty";

export function TrainingList() {
  const {
    data,
    isLoading,
  } = useTrainingList();

  if (isLoading) {
    return <>Loading...</>;
  }

  const trainings =
    data ?? [];

  if (trainings.length === 0) {
    return <TrainingEmpty />;
  }

  return (
    <TrainingGrid
      trainings={trainings}
    />
  );
}