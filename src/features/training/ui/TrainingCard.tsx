import { Link } from "react-router-dom";

import type { Training } from "@/entities/training";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/shared/components/ui/card";

import { Button } from "@/shared/components/ui/button";

interface TrainingCardProps {
  training: Training;
}

export function TrainingCard({
  training,
}: TrainingCardProps) {
  return (
    <Card className="h-full">
      <CardHeader>

        <img
          src={training.thumbnail ?? undefined}
          alt={training.title}
          className="aspect-video w-full rounded-lg object-cover"
        />

      </CardHeader>

      <CardContent className="space-y-3">

        <h3 className="text-lg font-semibold">
          {training.title}
        </h3>

        <p className="line-clamp-2 text-sm text-muted-foreground">
          {training.description}
        </p>

      </CardContent>

      <CardFooter>

        <Button
          asChild
          className="w-full"
        >
          <Link
            to={`/training/${training.id}`}
          >
            Lihat Detail
          </Link>
        </Button>

      </CardFooter>
    </Card>
  );
}