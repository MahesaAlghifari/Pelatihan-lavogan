import type {
  RouteObject,
} from "react-router-dom";

import {
  DashboardPage,
} from "@/pages/admin/dashboard";

import {
  TrainingPage,
  TrainingCreatePage,
  TrainingDetailPage,
  TrainingEditPage,
} from "@/pages/admin/training";

import { AdminCertificatesPage } from "@/features/admin/certificates/AdminCertificatesPage";
import { LearningPathPage } from "@/features/admin/curriculum/LearningPathPage";
import { MaterialsPage } from "@/features/admin/curriculum/MaterialsPage";
import { ModulesPage } from "@/features/admin/curriculum/ModulesPage";
import { AdminParticipantsPage } from "@/features/admin/participants/AdminParticipantsPage";
import { AdminQuizPage } from "@/features/admin/quiz/AdminQuizPage";
import { AdminSchemesPage } from "@/features/admin/schemes/AdminSchemesPage";
import { SettingsPage } from "@/features/admin/settings/SettingsPage";

import {
  ADMIN_PATH,
} from "./paths";

export const adminRoutes: RouteObject[] = [
  {
    path: ADMIN_PATH.DASHBOARD,

    element: <DashboardPage />,
  },

  {
    path: ADMIN_PATH.TRAINING,

    element: <TrainingPage />,
  },

  {
    path: ADMIN_PATH.TRAINING_CREATE,

    element: <TrainingCreatePage />,
  },

  {
    path: ADMIN_PATH.TRAINING_DETAIL,

    element: <TrainingDetailPage />,
  },

  {
    path: ADMIN_PATH.TRAINING_EDIT,

    element: <TrainingEditPage />,
  },

  {
    path: ADMIN_PATH.LEARNING_PATH,

    element: <LearningPathPage />,
  },

  {
    path: ADMIN_PATH.MODULE,

    element: <ModulesPage />,
  },

  {
    path: ADMIN_PATH.MATERIAL,

    element: <MaterialsPage />,
  },

  {
    path: ADMIN_PATH.PARTICIPANT,

    element: <AdminParticipantsPage />,
  },

  {
    path: ADMIN_PATH.CERTIFICATE,

    element: <AdminCertificatesPage />,
  },

  {
    path: ADMIN_PATH.QUIZ,

    element: <AdminQuizPage />,
  },

  {
    path: ADMIN_PATH.SCHEME,

    element: <AdminSchemesPage />,
  },

  {
    path: ADMIN_PATH.SETTINGS,

    element: <SettingsPage />,
  },
];