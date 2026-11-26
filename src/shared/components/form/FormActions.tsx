import type {
  PropsWithChildren,
} from "react";

import { Button } from "@/shared/components/ui/button";

interface Props
  extends PropsWithChildren {
  loading?: boolean;

  submitLabel?: string;

  cancelLabel?: string;

  onCancel?: () => void;
}

export function FormActions({
  loading,

  submitLabel = "Simpan",

  cancelLabel = "Batal",

  onCancel,

  children,
}: Props) {
  return (
    <div className="flex justify-end gap-3 border-t pt-6">
      {onCancel && (
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
        >
          {cancelLabel}
        </Button>
      )}

      {children}

      <Button
        type="submit"
        disabled={loading}
      >
        {loading
          ? "Menyimpan..."
          : submitLabel}
      </Button>
    </div>
  );
}