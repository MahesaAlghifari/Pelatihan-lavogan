import { Ban } from "lucide-react";

interface ForbiddenStateProps {
  title?: string;
  description?: string;
}

export default function ForbiddenState({
  title = "Access Denied",
  description = "You don't have permission to access this page.",
}: ForbiddenStateProps) {
  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center gap-4">
      <Ban className="h-12 w-12 text-destructive" />

      <div className="text-center">
        <h3 className="text-lg font-semibold">
          {title}
        </h3>

        <p className="text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
}