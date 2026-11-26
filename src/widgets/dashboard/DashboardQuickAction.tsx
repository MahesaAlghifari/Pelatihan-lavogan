import {
  BookOpen,
  FileText,
  Plus,
  Users,
} from "lucide-react";

import { Button } from "@/shared/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";

const actions = [
  {
    title: "Create Training",
    icon: Plus,
    onClick: () => {},
  },
  {
    title: "Manage Participants",
    icon: Users,
    onClick: () => {},
  },
  {
    title: "Upload Material",
    icon: BookOpen,
    onClick: () => {},
  },
  {
    title: "Generate Certificate",
    icon: FileText,
    onClick: () => {},
  },
];

export function DashboardQuickAction() {
  return (
    <Card>

      <CardHeader>

        <CardTitle>
          Quick Actions
        </CardTitle>

        <CardDescription>
          Frequently used shortcuts
        </CardDescription>

      </CardHeader>

      <CardContent className="grid grid-cols-2 gap-3">

        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Button
              key={action.title}
              variant="outline"
              className="h-20 flex-col gap-2"
              onClick={action.onClick}
            >
              <Icon className="h-5 w-5" />

              <span className="text-xs">
                {action.title}
              </span>

            </Button>
          );
        })}

      </CardContent>

    </Card>
  );
}