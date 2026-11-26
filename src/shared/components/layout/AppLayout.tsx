import type {
  PropsWithChildren,
} from "react";

import {
  AppHeader,
  AppSidebar,
} from "@/widgets/shell";

import { AppContent } from "./AppContent";
import { AppFooter } from "./AppFooter";
import { AppMain } from "./AppMain";

export function AppLayout({
  children,
}: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-muted/30">

      <AppSidebar />

      <div className="ml-64 flex min-h-screen flex-col">

        <AppHeader />

        <AppMain>

          <AppContent>

            {children}

          </AppContent>

          <AppFooter />

        </AppMain>

      </div>

    </div>
  );
}