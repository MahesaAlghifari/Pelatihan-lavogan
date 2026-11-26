import type {
  PropsWithChildren,
} from "react";


import {
  AppHeader,
} from "./AppHeader";


import {
  AppSidebar,
} from "./AppSidebar";


import {
  AppFooter,
} from "./AppFooter";



export function AppShell({
  children,
}: PropsWithChildren) {


  return (
    <div
      className="
        flex
        min-h-screen
        w-full
        bg-background
      "
    >
      {/* Sidebar */}
      <AppSidebar />

      {/* Content Area */}
      <div
        className="
          flex
          min-w-0
          flex-1
          flex-col
        "
      >
        <AppHeader />

        <main
          className="
            flex-1
            min-w-0
            w-full
            overflow-x-clip
            p-4
            sm:p-6
          "
        >
          {children}
        </main>

        <AppFooter />
      </div>
    </div>
  );

}


export default AppShell;