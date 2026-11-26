import {
  Star,
} from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";

import {
  Badge,
} from "@/shared/components/ui/badge";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";

import {
  EmptyState,
} from "@/shared/components/states";

import {
  getInitials,
} from "@/shared/utils";

import type {
  DashboardInstructor,
} from "./types";

interface DashboardTopInstructorProps {
  instructors: DashboardInstructor[];
}

export function DashboardTopInstructor({
  instructors,
}: DashboardTopInstructorProps) {
  if (!instructors.length) {
    return (
      <EmptyState
        title="No Instructor"
        description="No instructor data available."
      />
    );
  }

  return (
    <Card>

      <CardHeader className="flex flex-row items-center gap-3">

        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">

          <Star className="h-5 w-5 text-primary" />

        </div>

        <div>

          <CardTitle>
            Top Instructor
          </CardTitle>

          <CardDescription>
            Highest performing instructors
          </CardDescription>

        </div>

      </CardHeader>

      <CardContent className="space-y-3">

        {instructors.map((instructor) => (
          <div
            key={instructor.id}
            className="flex items-center justify-between rounded-lg border p-4"
          >
            <div className="flex items-center gap-3">

              <Avatar>

                <AvatarImage
                  src={instructor.avatar}
                />

                <AvatarFallback>
                  {getInitials(
                    instructor.name
                  )}
                </AvatarFallback>

              </Avatar>

              <div>

                <h4 className="font-medium">
                  {instructor.name}
                </h4>

                <p className="text-sm text-muted-foreground">
                  {instructor.training} Training
                </p>

                <p className="text-xs text-muted-foreground">
                  {instructor.participant} Participants
                </p>

              </div>

            </div>

            <Badge variant="secondary">
              ⭐ {instructor.rating.toFixed(1)}
            </Badge>

          </div>
        ))}

      </CardContent>

    </Card>
  );
}