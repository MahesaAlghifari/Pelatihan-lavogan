import { ShieldAlert } from "lucide-react";

interface UnauthorizedStateProps {
  title?: string;
  description?: string;
}

export default function UnauthorizedState({
  title = "Unauthorized",
  description = "You need to login to access this page.",
}: UnauthorizedStateProps) {
  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center gap-4">
      <ShieldAlert className="h-12 w-12 text-destructive" />

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