import { Navigate } from "react-router-dom";

import type {
  AppRoute,
} from "./types";

import {
  ADMIN_PATH,
  PUBLIC_PATH,
} from "./paths";

export const publicRoutes: AppRoute[] =
  [
    {
      path: PUBLIC_PATH.HOME,

      element: <Navigate to={ADMIN_PATH.DASHBOARD} replace />,

      meta: {
        title: "Home",
      },
    },

    {
      path: PUBLIC_PATH.ABOUT,

      element: <></>,

      meta: {
        title: "About",
      },
    },

    {
      path: PUBLIC_PATH.FAQ,

      element: <></>,

      meta: {
        title: "FAQ",
      },
    },

    {
      path:
        PUBLIC_PATH.CONTACT,

      element: <></>,

      meta: {
        title: "Contact",
      },
    },
  ];