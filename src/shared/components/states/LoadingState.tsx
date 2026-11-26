import {
  Loader2,
} from "lucide-react";

import {
  Card,
  CardContent,
} from "@/shared/components/ui/card";

interface Props {
  message?: string;

  className?: string;
}

export function LoadingState({
  message = "Loading...",
  className,
}: Props) {
  return (
    <Card className={className}>

      <CardContent className="flex flex-col items-center justify-center py-20">

        <Loader2 className="mb-4 h-8 w-8 animate-spin" />

        <p className="text-muted-foreground">
          {message}
        </p>

      </CardContent>

    </Card>
  );
}