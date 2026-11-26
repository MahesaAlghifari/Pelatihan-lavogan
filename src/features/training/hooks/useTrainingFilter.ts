import { useState } from "react";

export interface UseTrainingFilterReturn {
  search: string;
  status: string;

  setSearch: (value: string) => void;
  setStatus: (value: string) => void;

  reset: () => void;
}

export function useTrainingFilter(): UseTrainingFilterReturn {
  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("all");

  const reset = () => {
    setSearch("");
    setStatus("all");
  };

  return {
    search,
    status,

    setSearch,
    setStatus,

    reset,
  };
}