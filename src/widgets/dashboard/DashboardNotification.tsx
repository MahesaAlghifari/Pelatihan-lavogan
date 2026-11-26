import { Bell } from "lucide-react";

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

import type {
  DashboardNotificationItem,
} from "./types";

interface DashboardNotificationProps {
  notifications: DashboardNotificationItem[];
}

export function DashboardNotification({
  notifications,
}: DashboardNotificationProps) {
  if (!notifications.length) {
    return (
      <EmptyState
        title="No Notifications"
        description="You're all caught up."
      />
    );
  }

  return (
    <Card>

      <CardHeader className="flex flex-row items-center gap-3">

        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">

          <Bell className="h-5 w-5 text-primary" />

        </div>

        <div>

          <CardTitle>
            Notifications
          </CardTitle>

          <CardDescription>
            Latest system activities
          </CardDescription>

        </div>

      </CardHeader>

      <CardContent className="space-y-3">

        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="rounded-lg border p-4 transition-colors hover:bg-muted/40"
          >
            <div className="flex items-start justify-between gap-4">

              <div className="min-w-0">

                <h4 className="font-medium">
                  {notification.title}
                </h4>

                <p className="mt-1 text-sm text-muted-foreground">
                  {notification.description}
                </p>

              </div>

              <span className="shrink-0 text-xs text-muted-foreground">
                {notification.time}
              </span>

            </div>
          </div>
        ))}

      </CardContent>

    </Card>
  );
}