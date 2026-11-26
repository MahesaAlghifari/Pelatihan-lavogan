import {
  Loader2,
} from "lucide-react";

import {
  Card,
  CardContent,
} from "@/shared/components/ui/card";

interface Props {
  message?: string;
}

export function CrudLoading({
  message = "Loading...",
}: Props) {
  return (
    <Card>

      <CardContent className="flex flex-col items-center justify-center py-20">

        <Loader2 className="mb-4 h-8 w-8 animate-spin" />

        <p className="text-muted-foreground">
          {message}
        </p>

      </CardContent>

    </Card>
  );
}