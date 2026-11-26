import { Database } from "lucide-react";

interface NoDataProps {
  title?: string;
  description?: string;
}

export default function NoData({
  title = "No Data",
  description = "There is no data available.",
}: NoDataProps) {
  return (
    <div className="flex min-h-[240px] flex-col items-center justify-center gap-4 text-center">
      <Database className="h-12 w-12 text-muted-foreground" />

      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}