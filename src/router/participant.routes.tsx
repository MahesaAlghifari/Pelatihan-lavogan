import type {
  RouteObject,
} from "react-router-dom";

import {
  PARTICIPANT_PATH,
} from "./paths";

import {
  DashboardPage,
  SchemesPage,
  LearningPage,
  TrainingInfoPage,
  QuizPage,
  CertificatePage,
  ProfilePage,
} from "@/pages/participant";

export const participantRoutes: RouteObject[] = [
  {
    path: PARTICIPANT_PATH.DASHBOARD,

    element: <DashboardPage />,

    handle: {
      title: "Dashboard",

      label: "Dashboard",

      breadcrumb: "Dashboard",

      showInNavigation: true,

      requiresAuth: true,

      roles: ["participant"],
    },
  },

  {
    path: PARTICIPANT_PATH.SCHEMES,

    element: <SchemesPage />,

    handle: {
      title: "Program Pelatihan",

      label: "Program Pelatihan",

      breadcrumb: "Program Pelatihan",

      showInNavigation: true,

      requiresAuth: true,

      roles: ["participant"],
    },
  },

  {
    path: PARTICIPANT_PATH.SCHEME_DETAIL,

    element: <TrainingInfoPage />,

    handle: {
      title: "Detail Pelatihan",

      breadcrumb: "Detail Pelatihan",

      requiresAuth: true,

      roles: ["participant"],
    },
  },

  {
    path: PARTICIPANT_PATH.LEARNING,

    element: <LearningPage />,

    handle: {
      title: "Learning",

      label: "Learning",

      breadcrumb: "Learning",

      showInNavigation: true,

      requiresAuth: true,

      roles: ["participant"],
    },
  },

  {
    path: PARTICIPANT_PATH.LEARNING_DETAIL,

    element: <TrainingInfoPage />,

    handle: {
      title: "Training Detail",

      breadcrumb: "Training Detail",

      requiresAuth: true,

      roles: ["participant"],
    },
  },

  {
    path: PARTICIPANT_PATH.QUIZ,

    element: <QuizPage />,

    handle: {
      title: "Quiz",

      breadcrumb: "Quiz",

      requiresAuth: true,

      roles: ["participant"],
    },
  },

  {
    path: PARTICIPANT_PATH.CERTIFICATE,

    element: <CertificatePage />,

    handle: {
      title: "Certificate",

      label: "Certificate",

      breadcrumb: "Certificate",

      showInNavigation: true,

      requiresAuth: true,

      roles: ["participant"],
    },
  },

  {
    path: PARTICIPANT_PATH.PROFILE,

    element: <ProfilePage />,

    handle: {
      title: "Profile",

      label: "Profile",

      breadcrumb: "Profile",

      showInNavigation: true,

      requiresAuth: true,

      roles: ["participant"],
    },
  },
];