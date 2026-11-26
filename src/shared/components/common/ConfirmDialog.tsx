import {
  AlertTriangle,
  CheckCircle2,
  Info,
  XCircle,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";

import { Button } from "@/shared/components/ui/button";

type ConfirmDialogVariant =
  | "danger"
  | "warning"
  | "info"
  | "success";

interface ConfirmDialogProps {
  open: boolean;

  title: string;

  description?: string;

  confirmText?: string;

  cancelText?: string;

  loading?: boolean;

  variant?: ConfirmDialogVariant;

  onConfirm: () => void;

  onCancel: () => void;
}

const variantConfig = {
  danger: {
    icon: XCircle,
    iconClass: "text-red-500",
    buttonClass: "bg-red-600 hover:bg-red-700",
  },

  warning: {
    icon: AlertTriangle,
    iconClass: "text-yellow-500",
    buttonClass: "bg-yellow-600 hover:bg-yellow-700",
  },

  info: {
    icon: Info,
    iconClass: "text-blue-500",
    buttonClass: "bg-blue-600 hover:bg-blue-700",
  },

  success: {
    icon: CheckCircle2,
    iconClass: "text-green-500",
    buttonClass: "bg-green-600 hover:bg-green-700",
  },
};

export default function ConfirmDialog({
  open,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  loading = false,
  variant = "danger",
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const config = variantConfig[variant];

  const Icon = config.icon;

  return (
    <Dialog open={open} onOpenChange={onCancel}>
      <DialogContent className="sm:max-w-md">

        <DialogHeader>

          <div className="flex justify-center mb-3">

            <Icon
              className={`h-12 w-12 ${config.iconClass}`}
            />

          </div>

          <DialogTitle className="text-center">
            {title}
          </DialogTitle>

          {description && (
            <DialogDescription className="text-center">
              {description}
            </DialogDescription>
          )}

        </DialogHeader>

        <DialogFooter className="flex-col sm:flex-row gap-2">

          <Button
            variant="outline"
            onClick={onCancel}
            disabled={loading}
            className="w-full"
          >
            {cancelText}
          </Button>

          <Button
            onClick={onConfirm}
            disabled={loading}
            className={`w-full ${config.buttonClass}`}
          >
            {loading ? "Processing..." : confirmText}
          </Button>

        </DialogFooter>

      </DialogContent>
    </Dialog>
  );
}