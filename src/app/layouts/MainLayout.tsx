import type { PropsWithChildren } from "react";

import { AppShell } from "@/widgets";

interface MainLayoutProps
  extends PropsWithChildren {}

export function MainLayout({
  children,
}: MainLayoutProps) {
  return <AppShell>{children}</AppShell>;
}

export default MainLayout;