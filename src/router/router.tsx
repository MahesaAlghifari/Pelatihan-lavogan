import {
  createBrowserRouter,
} from "react-router-dom";

import {
  AdminLayout,
  AuthLayout,
  ParticipantLayout,
  PublicLayout,
} from "./layouts";

import {
  ProtectedRoute,
  GuestRoute,
} from "./guards";

import {
  adminRoutes,
} from "./admin.routes";

import {
  authRoutes,
} from "./auth.routes";

import {
  participantRoutes,
} from "./participant.routes";

import {
  publicRoutes,
} from "./public.routes";

export const router =
  createBrowserRouter([
    {
      element: (
        <GuestRoute>

          <AuthLayout />

        </GuestRoute>
      ),

      children: authRoutes,
    },

    {
      element: (
        <ProtectedRoute>

          <AdminLayout />

        </ProtectedRoute>
      ),

      children: adminRoutes,
    },

    {
      element: (
        <ProtectedRoute>

          <ParticipantLayout />

        </ProtectedRoute>
      ),

      children:
        participantRoutes,
    },

    {
      element: <PublicLayout />,

      children: publicRoutes,
    },
  ]);