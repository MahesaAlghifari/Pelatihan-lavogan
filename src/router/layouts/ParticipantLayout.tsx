import { Outlet, useLocation } from "react-router-dom";

import {
  AppHeader,
  AppSidebar,
} from "@/widgets/shell";

export function ParticipantLayout() {
  const location = useLocation();
  const isLearningSplit = location.pathname === "/participant/learning";
  const isDashboardFixed = location.pathname === "/participant/dashboard";

  return (
    <div
      className={`flex w-full bg-[#F3F6FB] ${
        isDashboardFixed
          ? "min-h-screen lg:h-screen lg:overflow-hidden"
          : "min-h-screen"
      }`}
    >
      <AppSidebar variant="participant" />

      <div
        className={`flex min-w-0 flex-1 flex-col ${
          isDashboardFixed ? "lg:h-full lg:overflow-hidden" : ""
        }`}
      >
        <AppHeader variant="participant" />

        <main
          className={`flex-1 min-w-0 w-full ${
            isLearningSplit
              ? "overflow-x-clip p-0"
              : isDashboardFixed
                ? "p-4 lg:p-4 lg:px-5 lg:min-h-0 lg:overflow-hidden"
                : "overflow-x-clip p-4 sm:p-6"
          }`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}
