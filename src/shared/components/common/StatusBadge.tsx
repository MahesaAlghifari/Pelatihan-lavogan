import { CheckCircle2, Clock3, XCircle } from "lucide-react";

import { cn } from "@/shared/lib/utils/cn";

export type Status =
  | "active"
  | "inactive"
  | "published"
  | "draft"
  | "archived"
  | "completed"
  | "in_progress"
  | "pending"
  | "approved"
  | "rejected";

interface StatusBadgeProps {
  status: Status;

  label?: string;

  className?: string;
}

const STATUS_CONFIG = {
  active: {
    label: "Active",
    className:
      "bg-green-100 text-green-700 border-green-200",
    icon: CheckCircle2,
  },

  inactive: {
    label: "Inactive",
    className:
      "bg-gray-100 text-gray-700 border-gray-200",
    icon: Clock3,
  },

  published: {
    label: "Published",
    className:
      "bg-emerald-100 text-emerald-700 border-emerald-200",
    icon: CheckCircle2,
  },

  draft: {
    label: "Draft",
    className:
      "bg-yellow-100 text-yellow-700 border-yellow-200",
    icon: Clock3,
  },

  archived: {
    label: "Archived",
    className:
      "bg-slate-100 text-slate-700 border-slate-200",
    icon: Clock3,
  },

  completed: {
    label: "Completed",
    className:
      "bg-green-100 text-green-700 border-green-200",
    icon: CheckCircle2,
  },

  in_progress: {
    label: "In Progress",
    className:
      "bg-blue-100 text-blue-700 border-blue-200",
    icon: Clock3,
  },

  pending: {
    label: "Pending",
    className:
      "bg-orange-100 text-orange-700 border-orange-200",
    icon: Clock3,
  },

  approved: {
    label: "Approved",
    className:
      "bg-green-100 text-green-700 border-green-200",
    icon: CheckCircle2,
  },

  rejected: {
    label: "Rejected",
    className:
      "bg-red-100 text-red-700 border-red-200",
    icon: XCircle,
  },
} as const;

export default function StatusBadge({
  status,
  label,
  className,
}: StatusBadgeProps) {
  const config = STATUS_CONFIG[status];

  const Icon = config.icon;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium",
        config.className,
        className
      )}
    >
      <Icon className="h-3.5 w-3.5" />

      {label ?? config.label}
    </span>
  );
}