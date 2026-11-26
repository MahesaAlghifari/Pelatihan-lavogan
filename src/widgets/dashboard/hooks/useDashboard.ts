import {
  useCallback,
  useMemo,
} from "react";

import {
  dashboardService,
} from "../services";

import type {
  DashboardData,
} from "../types";

export interface UseDashboardReturn
  extends DashboardData {
  isLoading: boolean;

  error: Error | null;

  refetch: () => Promise<void>;
}

export function useDashboard(): UseDashboardReturn {
  const isLoading = false;

  const error: Error | null = null;

  const refetch = useCallback(
    async () => {
      /**
       * TODO:
       * Replace with TanStack Query
       *
       * await queryClient.invalidateQueries({
       *   queryKey: ["dashboard"],
       * });
       */
    },
    []
  );

  const data = useMemo<DashboardData>(
    () =>
      dashboardService.getDashboard(),
    []
  );

  return {
    ...data,

    isLoading,

    error,

    refetch,
  };
}