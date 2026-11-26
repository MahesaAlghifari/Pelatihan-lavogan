import { useQuery } from "@tanstack/react-query";

import { trainingApi } from "@/entities/training";

export function useTraining(id: string) {
  return useQuery({
    queryKey: ["training", id],

    queryFn: () => trainingApi.getById(id),

    enabled: Boolean(id),
  });
}