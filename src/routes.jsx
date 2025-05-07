import { ProtectedRouteAdmin, ProtectedRouteUser } from "./Hoc/ProtectedRoutes";
import Home from "./pages/Home";
import React from "react";
import { ScreenRoutes } from "./pages/onBoarding.jsx/routes";
import { authRoutes } from "./Features/Auth/routes";
import { surveyRoutes } from "./Features/Survey/routes";
import PageNotFound from "./pages/PageNotFound";
import { questionRoutes } from "./pages/QuestionStatic/routes";

export const routes = [
  {
    path: "/",
    element: <Home />,
  },
  ...ScreenRoutes,
  ...authRoutes,
  ...surveyRoutes,
  {
    path: "*",
    element: <PageNotFound />,
  },
  ...questionRoutes,
];
