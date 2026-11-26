import { Wrench } from "lucide-react";

interface MaintenanceStateProps {
  title?: string;
  description?: string;
}

export default function MaintenanceState({
  title = "Under Maintenance",
  description = "This feature is temporarily unavailable.",
}: MaintenanceStateProps) {
  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center gap-4">
      <Wrench className="h-12 w-12 text-primary" />

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