import { SearchX } from "lucide-react";

interface NotFoundStateProps {
  title?: string;
  description?: string;
}

export default function NotFoundState({
  title = "Data Not Found",
  description = "The requested data could not be found.",
}: NotFoundStateProps) {
  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center gap-4">
      <SearchX className="h-12 w-12 text-muted-foreground" />

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