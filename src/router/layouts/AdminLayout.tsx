import { Outlet } from "react-router-dom";

import {
  AppHeader,
  AppSidebar,
} from "@/widgets/shell";

export function AdminLayout() {
  return (
    <div
      className="
        flex
        min-h-screen
        w-full
        bg-muted/40
      "
    >
      {/* Sidebar */}
      <AppSidebar />

      {/* Content */}
      <div
        className="
          flex
          min-w-0
          flex-1
          flex-col
        "
      >
        {/* Header */}
        <AppHeader />

        {/* Main Content */}
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
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;