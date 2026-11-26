import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { Training } from "@/entities/training";

import { trainingApi } from "@/entities/training";

interface UpdateTrainingPayload {
  id: string;

  data: Partial<Training>;
}

export function useUpdateTraining() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: UpdateTrainingPayload) =>
      trainingApi.update(id, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["training-list"],
      });

      queryClient.invalidateQueries({
        queryKey: [
          "training",
          variables.id,
        ],
      });
    },
  });
}