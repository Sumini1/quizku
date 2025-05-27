import React from "react";
import Subcategory from "./Users/Subcategory";
import Categories from "./Users/Categories";
import Subcategories from "./Users/Subcategories";
import ThemesOrLevelsDetails from "./Users/ThemesOrLevelsDetail";
import CategoriesDetail from "./Users/CategoriesDetail";

export const subcategoryRoutes = [
  {
    path: "/subcategory/:difficultyId",
    element: <Subcategory />,
  },
  {
    path: "/categories/:difficultyId",
    element: <Categories />,
  },
  {
    path: "/subcategories/:id",
    element: <Subcategories />,
  },
  {
    path: "/categories-detail/:id",
    element: <CategoriesDetail />,
  },
  {
    path: "/theme-detail/:id",
    element: <ThemesOrLevelsDetails />,
  },
];