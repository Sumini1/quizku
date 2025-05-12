// import { ProtectedRouteAdmin, ProtectedRouteUser } from "./Hoc/ProtectedRoutes";
import Home from "./pages/Home";
import React from "react";
import { ScreenRoutes } from "./pages/onBoarding.jsx/routes";
import { authRoutes } from "./Features/Auth/routes";
import { surveyRoutes } from "./Features/Survey/routes";
import PageNotFound from "./pages/PageNotFound";
import { questionRoutes } from "./pages/QuestionStatic/routes";
import { difficultiesRoutes } from "./Features/Difficulties/routes";
import { subcategoryRoutes } from "./Features/Subcategory/routes";
import { buttonMobileRoutes } from './pages/ButtonMobile/routes';

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
  ...difficultiesRoutes,
  ...subcategoryRoutes,
  ...buttonMobileRoutes
];
