import {
  Mail,
  User,
} from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";

import {
  getInitials,
} from "@/shared/utils";

import type {
  DashboardParticipant,
} from "../types";

interface ParticipantItemProps {
  participant: DashboardParticipant;
}

export function ParticipantItem({
  participant,
}: ParticipantItemProps) {
  return (
    <div className="rounded-lg border p-4 transition-colors hover:bg-muted/40">

      <div className="flex items-center gap-4">

        <Avatar className="h-11 w-11">

          <AvatarImage
            src={participant.avatar}
            alt={participant.name}
          />

          <AvatarFallback>
            {getInitials(participant.name)}
          </AvatarFallback>

        </Avatar>

        <div className="min-w-0 flex-1">

          <h4 className="truncate font-semibold">
            {participant.name}
          </h4>

          <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">

            <Mail className="h-4 w-4" />

            <span className="truncate">
              {participant.email}
            </span>

          </div>

          <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">

            <User className="h-4 w-4" />

            <span className="truncate">
              {participant.training}
            </span>

          </div>

        </div>

      </div>

    </div>
  );
}