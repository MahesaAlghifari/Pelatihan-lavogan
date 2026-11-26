import type {
  RouteObject,
} from "react-router-dom";

import {
  LoginPage,
} from "@/pages/auth";

import {
  AUTH_PATH,
} from "./paths";

export const authRoutes: RouteObject[] = [
  {
    path: AUTH_PATH.LOGIN,

    element: <LoginPage />,
  },
];