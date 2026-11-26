import {
  Bell,
  CheckCheck,
  ChevronDown,
  LogOut,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  Settings,
  User,
} from "lucide-react";

import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSidebar } from "./SidebarProvider";
import {
  getInitials,
  useParticipantProfile,
} from "@/features/participant/profile/profileStorage";
import { useAuth } from "@/features/auth/hooks/useAuth";

interface AppHeaderProps {
  variant?: "admin" | "participant";
}

interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  href: string;
  unread: boolean;
}

const PARTICIPANT_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "notif-1",
    title: "Materi Baru Tersedia",
    description: "Lanjutkan modul HTML & CSS Fundamentals di Materi Belajar.",
    time: "10 menit lalu",
    href: "/participant/learning",
    unread: true,
  },
  {
    id: "notif-2",
    title: "Quiz Evaluasi Modul",
    description: "Selesaikan Quiz HTML Basics & CSS Styling untuk syarat sertifikat.",
    time: "1 jam lalu",
    href: "/participant/quiz/html-intro-video",
    unread: true,
  },
  {
    id: "notif-3",
    title: "Klaim Sertifikat Pelatihan",
    description: "Pantau checklist kelulusan Anda pada halaman Sertifikat.",
    time: "Hari ini",
    href: "/participant/certificate",
    unread: false,
  },
];

const ADMIN_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "adm-1",
    title: "Peserta Baru Bergabung",
    description: "5 peserta baru mendaftar pada skema Full Stack Web Dev.",
    time: "15 menit lalu",
    href: "/admin/participants",
    unread: true,
  },
  {
    id: "adm-2",
    title: "Sertifikat Menunggu Verifikasi",
    description: "1 pengajuan sertifikat siap diperiksa dan diterbitkan.",
    time: "2 jam lalu",
    href: "/admin/certificates",
    unread: true,
  },
];

function getHeaderTitle(pathname: string, variant: "admin" | "participant") {
  if (pathname.includes("/schemes")) return "Program Pelatihan";
  if (pathname.includes("/learning-path")) return "Learning Path";
  if (pathname.includes("/learning/")) return "Detail Pelatihan";
  if (pathname.includes("/learning")) return "Materi Belajar";
  if (pathname.includes("/quiz")) return "Quiz";
  if (pathname.includes("/certificate")) return "Sertifikat";
  if (pathname.includes("/profile")) return "Profil";
  if (pathname.includes("/participants")) return "Participants";
  if (pathname.includes("/materials")) return "Materials";
  if (pathname.includes("/modules")) return "Modules";
  if (pathname.includes("/training")) return "Training";
  if (pathname.includes("/settings")) return "Settings";
  return variant === "participant" ? "Dashboard Peserta" : "Dashboard";
}

export function AppHeader({ variant = "admin" }: AppHeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { collapsed, toggle, setMobileOpen } = useSidebar();
  const { logout } = useAuth();
  const participantProfile = useParticipantProfile();
  const isParticipant = variant === "participant";
  const displayName = isParticipant ? participantProfile.name : "Admin MagangHub";
  const displayRole = isParticipant ? "Peserta Magang" : "Administrator";
  const initials = isParticipant ? getInitials(participantProfile.name) : "M";
  const pageTitle = getHeaderTitle(location.pathname, variant);

  const [open, setOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>(() =>
    isParticipant ? PARTICIPANT_NOTIFICATIONS : ADMIN_NOTIFICATIONS
  );

  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        headerRef.current &&
        !headerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
        setNotifOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        setNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const unreadCount = notifications.filter((n) => n.unread).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const handleNotificationClick = (item: NotificationItem) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === item.id ? { ...n, unread: false } : n))
    );
    setNotifOpen(false);
    navigate(item.href);
  };

  return (
    <header
      ref={headerRef}
      className="
        sticky
        top-0
        z-30
        flex
        h-14
        shrink-0
        items-center
        justify-between
        border-b
        border-slate-100
        bg-white
        px-4
        sm:px-5
      "
    >
      {/* LEFT */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label="Buka menu navigasi"
          onClick={() => setMobileOpen(true)}
          className="
            flex h-10 w-10
            items-center justify-center
            rounded-xl
            border border-slate-200
            bg-white
            text-slate-600
            hover:bg-slate-50
            lg:hidden
          "
        >
          <Menu className="h-5 w-5" />
        </button>

        <button
          type="button"
          aria-label={collapsed ? "Tampilkan sidebar" : "Sembunyikan sidebar"}
          title={collapsed ? "Tampilkan sidebar" : "Sembunyikan sidebar"}
          onClick={toggle}
          className="
            hidden lg:flex h-10 w-10
            items-center justify-center
            rounded-xl
            border border-slate-200
            bg-white
            text-slate-600
            hover:bg-slate-50
            transition-colors
          "
        >
          {collapsed ? (
            <PanelLeftOpen className="h-5 w-5" />
          ) : (
            <PanelLeftClose className="h-5 w-5" />
          )}
        </button>

        <h1 className="text-lg font-semibold text-slate-900">
          {pageTitle}
        </h1>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3">
        {/* Notification */}
        <div className="relative">
          <button
            type="button"
            aria-label="Notifikasi"
            onClick={() => {
              setNotifOpen((prev) => !prev);
              setOpen(false);
            }}
            className="
              relative
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              border
              border-slate-200
              bg-white
              text-slate-600
              transition
              hover:bg-slate-50
            "
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-blue-600" />
            )}
          </button>

          {notifOpen && (
            <div
              className="
                absolute
                right-0
                mt-3
                w-80
                rounded-2xl
                border
                border-slate-100
                bg-white
                p-3
                shadow-xl
              "
            >
              <div className="flex items-center justify-between px-2 pb-2.5 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-slate-900">
                    Notifikasi
                  </span>
                  {unreadCount > 0 && (
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-blue-600">
                      {unreadCount} baru
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    type="button"
                    onClick={markAllRead}
                    className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:underline"
                  >
                    <CheckCheck className="h-3.5 w-3.5" />
                    Tandai dibaca
                  </button>
                )}
              </div>

              <div className="mt-2 space-y-1 max-h-72 overflow-y-auto">
                {notifications.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleNotificationClick(item)}
                    className={`w-full text-left rounded-xl p-2.5 transition-colors hover:bg-slate-50 ${
                      item.unread ? "bg-blue-50/40" : ""
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-xs font-semibold text-slate-900">
                        {item.title}
                      </p>
                      {item.unread && (
                        <span className="mt-1 h-2 w-2 rounded-full bg-blue-600 shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                      {item.description}
                    </p>
                    <span className="text-[11px] text-slate-400 mt-1 block">
                      {item.time}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* PROFILE */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setOpen((prev) => !prev);
              setNotifOpen(false);
            }}
            className="
              flex
              items-center
              gap-3
              rounded-xl
              px-2
              py-1.5
              transition
              hover:bg-slate-50
            "
          >
            {/* Avatar */}
            {isParticipant && participantProfile.avatarUrl ? (
              <img
                src={participantProfile.avatarUrl}
                alt={displayName}
                className="h-10 w-10 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
                {initials}
              </div>
            )}

            {/* Text */}
            <div className="hidden text-left md:block">
              <p className="text-sm font-semibold text-slate-900">
                {displayName}
              </p>
              <p className="text-xs text-slate-500">
                {displayRole}
              </p>
            </div>

            <ChevronDown className="h-4 w-4 text-slate-400" />
          </button>

          {/* DROPDOWN */}
          {open && (
            <div className="absolute right-0 mt-3 w-56 rounded-2xl border border-slate-100 bg-white p-2 shadow-lg">
              <button
                type="button"
                onClick={() => {
                  navigate(
                    isParticipant ? "/participant/profile" : "/admin/dashboard"
                  );
                  setOpen(false);
                }}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-700 hover:bg-slate-50"
              >
                <User className="h-4 w-4" />
                {isParticipant ? "Profil Saya" : "Dashboard"}
              </button>

              <button
                type="button"
                onClick={() => {
                  navigate(
                    isParticipant ? "/participant/schemes" : "/admin/settings"
                  );
                  setOpen(false);
                }}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-700 hover:bg-slate-50"
              >
                <Settings className="h-4 w-4" />
                {isParticipant ? "Program Pelatihan" : "Settings"}
              </button>

              <div className="my-2 border-t border-slate-100" />

              <button
                type="button"
                onClick={async () => {
                  await logout();
                  setOpen(false);
                  navigate("/login");
                }}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-red-600 hover:bg-red-50"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default AppHeader;
