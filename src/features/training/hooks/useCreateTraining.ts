import { useMutation, useQueryClient } from "@tanstack/react-query";

import { trainingApi } from "@/entities/training";

export function useCreateTraining() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: trainingApi.create,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["training-list"],
      });
    },
  });
}