import {
  Users,
} from "lucide-react";

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
  ParticipantItem,
} from "./components";

import type {
  DashboardParticipant,
} from "./types";

interface DashboardRecentParticipantProps {
  participants: DashboardParticipant[];
}

export function DashboardRecentParticipant({
  participants,
}: DashboardRecentParticipantProps) {
  if (!participants.length) {
    return (
      <EmptyState
        title="No Participants"
        description="No recent participant available."
      />
    );
  }

  return (
    <Card>

      <CardHeader className="flex flex-row items-center gap-3">

        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">

          <Users className="h-5 w-5 text-primary" />

        </div>

        <div>

          <CardTitle>
            Recent Participants
          </CardTitle>

          <CardDescription>
            Latest registered participants
          </CardDescription>

        </div>

      </CardHeader>

      <CardContent className="space-y-3">

        {participants.map((participant) => (
          <ParticipantItem
            key={participant.id}
            participant={participant}
          />
        ))}

      </CardContent>

    </Card>
  );
}