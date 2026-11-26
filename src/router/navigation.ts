import {
  Award,
  BookOpen,
  ClipboardList,
  FolderOpen,
  GraduationCap,
  Home,
  Layers,
  Settings,
  ShieldCheck,
  User,
  Users,
} from "lucide-react";

import {
  ADMIN_PATH,
  PARTICIPANT_PATH,
} from "./paths";

import type {
  NavigationItem,
} from "./types";

/* ============================================================================
 * Admin Navigation
 * ========================================================================== */

export const adminNavigation: NavigationItem[] =
  [
    {
      label: "Dashboard",

      href: ADMIN_PATH.DASHBOARD,

      icon: Home,
    },

    {
      label: "Training",

      href: ADMIN_PATH.TRAINING,

      icon: GraduationCap,
    },

    {
      label: "Learning Path",

      href:
        ADMIN_PATH.LEARNING_PATH,

      icon: Layers,
    },

    {
      label: "Material",

      href:
        ADMIN_PATH.MATERIAL,

      icon: FolderOpen,
    },

    {
      label: "Module",

      href:
        ADMIN_PATH.MODULE,

      icon: BookOpen,
    },

    {
      label: "Quiz",

      href:
        ADMIN_PATH.QUIZ,

      icon: ClipboardList,
    },

    {
      label: "Participant",

      href:
        ADMIN_PATH.PARTICIPANT,

      icon: Users,
    },

    {
      label: "Certificate",

      href:
        ADMIN_PATH.CERTIFICATE,

      icon: Award,
    },

    {
      label: "Scheme",

      href:
        ADMIN_PATH.SCHEME,

      icon: ShieldCheck,
    },

    {
      label: "Settings",

      href:
        ADMIN_PATH.SETTINGS,

      icon: Settings,
    },

    {
      label: "Profile",

      href:
        ADMIN_PATH.PROFILE,

      icon: User,
    },
  ];

/* ============================================================================
 * Participant Navigation
 * ========================================================================== */

export const participantNavigation: NavigationItem[] =
  [
    {
      label: "Dashboard",

      href:
        PARTICIPANT_PATH.DASHBOARD,

      icon: Home,
    },

    {
      label: "Learning",

      href:
        PARTICIPANT_PATH.LEARNING,

      icon: GraduationCap,
    },

    {
      label: "Certificate",

      href:
        PARTICIPANT_PATH.CERTIFICATE,

      icon: Award,
    },

    {
      label: "Profile",

      href:
        PARTICIPANT_PATH.PROFILE,

      icon: User,
    },
  ];