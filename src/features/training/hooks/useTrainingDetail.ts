import { useQuery } from "@tanstack/react-query";

import { trainingApi } from "../api";

export function useTrainingDetail(
  id: string
) {
  return useQuery({
    enabled: !!id,

    queryKey: [
      "training",
      id,
    ],

    queryFn: () =>
      trainingApi.getById(id),
  });
}