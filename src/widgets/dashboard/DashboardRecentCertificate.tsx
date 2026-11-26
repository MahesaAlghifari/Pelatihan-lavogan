import {
  Award,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";

import {
  Badge,
} from "@/shared/components/ui/badge";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";

import {
  EmptyState,
} from "@/shared/components/states";

import {
  getInitials,
} from "@/shared/utils";

import type {
  DashboardCertificate,
} from "./types";

interface DashboardRecentCertificateProps {
  certificates: DashboardCertificate[];
}

export function DashboardRecentCertificate({
  certificates,
}: DashboardRecentCertificateProps) {
  if (!certificates.length) {
    return (
      <EmptyState
        title="No Certificates"
        description="No certificates have been issued."
      />
    );
  }

  return (
    <Card>

      <CardHeader className="flex flex-row items-center gap-3">

        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">

          <Award className="h-5 w-5 text-primary" />

        </div>

        <div>

          <CardTitle>
            Recent Certificates
          </CardTitle>

          <CardDescription>
            Latest generated certificates
          </CardDescription>

        </div>

      </CardHeader>

      <CardContent className="space-y-3">

        {certificates.map((certificate) => (
          <div
            key={certificate.id}
            className="flex items-center justify-between rounded-lg border p-4"
          >
            <div className="flex items-center gap-3">

              <Avatar>

                <AvatarImage
                  src={certificate.avatar}
                />

                <AvatarFallback>
                  {getInitials(
                    certificate.participant
                  )}
                </AvatarFallback>

              </Avatar>

              <div>

                <h4 className="font-medium">
                  {certificate.participant}
                </h4>

                <p className="text-sm text-muted-foreground">
                  {certificate.training}
                </p>

                <p className="text-xs text-muted-foreground">
                  {certificate.issuedAt}
                </p>

              </div>

            </div>

            <Badge
              variant={
                certificate.status === "issued"
                  ? "default"
                  : "secondary"
              }
            >
              {certificate.status}
            </Badge>

          </div>
        ))}

      </CardContent>

    </Card>
  );
}