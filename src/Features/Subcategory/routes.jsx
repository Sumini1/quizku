import React from "react";
import Subcategory from "./Users/Subcategory";
import Category from "./Users/Category";
import Aqidah from "./Users/Aqidah";
import ThemesOrLevelsDetails from "./Users/ThemesOrLevelsDetail";

export const subcategoryRoutes = [
  {
    path: "/subcategory/:difficultyId",
    element: <Subcategory />,
  },
  {
    path: "/categories",
    element: <Category />,
  },
  {
    path: "/category/:id",
    element: <Aqidah />,
  },
  {
    path: "/theme-detail/:id",
    element: <ThemesOrLevelsDetails />,
  },
];