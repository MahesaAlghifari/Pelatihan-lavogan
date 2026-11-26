import { Loader2 } from "lucide-react";

interface LoadingOverlayProps {
  open: boolean;
}

export default function LoadingOverlay({
  open,
}: LoadingOverlayProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/70 backdrop-blur-sm">
      <Loader2 className="h-10 w-10 animate-spin text-primary" />
    </div>
  );
}