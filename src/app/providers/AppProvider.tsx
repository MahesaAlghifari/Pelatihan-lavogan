import type {
  PropsWithChildren,
} from "react";

import { Toaster } from "sonner";


import {
  AuthProvider,
} from "@/features/auth/provider";


import {
  SidebarProvider,
} from "@/widgets/shell/SidebarProvider";


import {
  QueryProvider,
} from "./QueryProvider";


import {
  ThemeProvider,
} from "./ThemeProvider";



export function AppProvider({
  children,
}: PropsWithChildren) {

  return (

    <QueryProvider>

      <ThemeProvider>

        <AuthProvider>

          <SidebarProvider>

            {children}
            <Toaster richColors position="bottom-right" />

          </SidebarProvider>

        </AuthProvider>

      </ThemeProvider>

    </QueryProvider>

  );

}



export default AppProvider;