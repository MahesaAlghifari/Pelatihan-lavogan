import type { PropsWithChildren } from "react";

import { AppShell } from "@/widgets";

interface ParticipantLayoutProps
  extends PropsWithChildren {}

export function ParticipantLayout({
  children,
}: ParticipantLayoutProps) {
  return <AppShell>{children}</AppShell>;
}

export default ParticipantLayout;