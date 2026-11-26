import { useMutation, useQueryClient } from "@tanstack/react-query";

import { trainingApi } from "@/entities/training";

export function useDeleteTraining() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      trainingApi.delete(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["training-list"],
      });
    },
  });
}