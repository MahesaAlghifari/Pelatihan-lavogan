import { Construction } from "lucide-react";

interface UnderDevelopmentProps {
  title?: string;
  description?: string;
}

export default function UnderDevelopment({
  title = "Under Development",
  description = "This feature is currently under development.",
}: UnderDevelopmentProps) {
  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center gap-4 text-center">
      <Construction className="h-14 w-14 text-primary" />

      <div>
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}