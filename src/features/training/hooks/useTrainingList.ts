import { useQuery } from "@tanstack/react-query";

import { trainingApi } from "../api";

export function useTrainingList() {
  return useQuery({
    queryKey: ["trainings"],

    queryFn: () =>
      trainingApi.getAll(),
  });
}