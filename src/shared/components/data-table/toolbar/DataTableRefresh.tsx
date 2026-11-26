import {
  RefreshCcw,
} from "lucide-react";

import { Button } from "@/shared/components/ui/button";

interface Props {
  loading?: boolean;

  onRefresh: () => void;
}

export function DataTableRefresh({
  loading,
  onRefresh,
}: Props) {
  return (
    <Button
      type="button"
      variant="outline"
      disabled={loading}
      onClick={onRefresh}
    >
      <RefreshCcw
        className={`mr-2 h-4 w-4 ${
          loading
            ? "animate-spin"
            : ""
        }`}
      />

      Refresh
    </Button>
  );
}