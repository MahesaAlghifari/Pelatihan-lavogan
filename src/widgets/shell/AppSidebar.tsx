import {
  PanelLeftClose,
  GraduationCap,
  X,
} from "lucide-react";

import {
  AppNavigation,
} from "./AppNavigation";

import {
  useSidebar,
} from "./SidebarProvider";
import {
  getInitials,
  useParticipantProfile,
} from "@/features/participant/profile/profileStorage";

interface AppSidebarProps {
  variant?: "admin" | "participant";
}

export function AppSidebar({ variant = "admin" }: AppSidebarProps) {
  const {
    collapsed,
    toggle,
    mobileOpen,
    closeMobile,
  } = useSidebar();

  const participantProfile = useParticipantProfile();
  const isParticipant = variant === "participant";
  const displayName = isParticipant ? participantProfile.name : "Admin MagangHub";
  const displayRole = isParticipant ? "Participant" : "Administrator";
  const portalSubtitle = isParticipant
    ? "Official Training Portal"
    : "Portal Pelatihan Resmi";
  const initials = isParticipant ? getInitials(participantProfile.name) : "M";

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        aria-hidden={collapsed}
        className={`
          sticky top-0 hidden lg:flex
          h-screen shrink-0 flex-col
          bg-white
          transition-all duration-300
          ${
            collapsed
              ? "w-0 overflow-hidden border-r-0 opacity-0 pointer-events-none"
              : "w-64 border-r border-slate-100 opacity-100"
          }
        `}
      >
        {/* Logo */}
        <div
          className={`
            flex h-20 items-center
            border-b border-slate-100
            ${collapsed ? "justify-center" : "gap-3 px-5"}
          `}
        >
          <div
            className="
              flex h-10 w-10 shrink-0
              items-center justify-center
              rounded-xl
              bg-blue-600
              text-white
            "
          >
            <GraduationCap className="h-5 w-5" />
          </div>

          {!collapsed && (
            <div>
              <h1 className="text-lg font-bold tracking-tight text-slate-900">
                MagangHub
              </h1>
              <p className="text-xs text-slate-500">
                {portalSubtitle}
              </p>
            </div>
          )}
        </div>

        {/* Collapse Button */}
        {!collapsed && (
          <button
            type="button"
            aria-label={isParticipant ? "Collapse sidebar" : "Sembunyikan sidebar"}
            title={isParticipant ? "Collapse sidebar" : "Sembunyikan sidebar"}
            onClick={toggle}
            className="
              absolute
              top-24
              -right-3
              z-50
              flex h-7 w-7
              items-center justify-center
              rounded-full
              border border-slate-200
              bg-white
              text-slate-500
              shadow-sm
              transition
              hover:bg-slate-50
            "
          >
            <PanelLeftClose className="h-4 w-4" />
          </button>
        )}

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-5">
          <AppNavigation collapsed={collapsed} variant={variant} />
        </nav>

        {/* Footer Profile */}
        <div className="border-t border-slate-100 p-4">
          <div
            className={`
              flex items-center
              rounded-xl
              bg-slate-50
              p-3
              ${collapsed ? "justify-center" : "gap-3"}
            `}
          >
            {isParticipant && participantProfile.avatarUrl ? (
              <img
                src={participantProfile.avatarUrl}
                alt={displayName}
                className="h-9 w-9 rounded-full object-cover shrink-0"
              />
            ) : (
              <div
                className="
                  flex h-9 w-9 shrink-0
                  items-center justify-center
                  rounded-full
                  bg-blue-100
                  text-sm
                  font-semibold
                  text-blue-600
                "
              >
                {initials}
              </div>
            )}

            {!collapsed && (
              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-800 truncate">
                  {displayName}
                </p>
                <p className="text-xs text-slate-500">
                  {displayRole}
                </p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[100] isolate flex lg:hidden">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
            onClick={closeMobile}
          />
          <aside className="relative z-10 flex h-full w-64 flex-col border-r border-slate-100 bg-white shadow-xl">
            <div className="flex h-20 items-center justify-between border-b border-slate-100 px-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <div>
                  <h1 className="text-lg font-bold tracking-tight text-slate-900">
                    MagangHub
                  </h1>
                  <p className="text-xs text-slate-500">{portalSubtitle}</p>
                </div>
              </div>
              <button
                type="button"
                aria-label={isParticipant ? "Close menu" : "Tutup menu"}
                onClick={closeMobile}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-4 py-5">
              <AppNavigation
                collapsed={false}
                variant={variant}
                onItemClick={closeMobile}
              />
            </nav>

            <div className="border-t border-slate-100 p-4">
              <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
                {isParticipant && participantProfile.avatarUrl ? (
                  <img
                    src={participantProfile.avatarUrl}
                    alt={displayName}
                    className="h-9 w-9 rounded-full object-cover shrink-0"
                  />
                ) : (
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-600">
                    {initials}
                  </div>
                )}
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-800 truncate">
                    {displayName}
                  </p>
                  <p className="text-xs text-slate-500">
                    {displayRole}
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}

export default AppSidebar;
