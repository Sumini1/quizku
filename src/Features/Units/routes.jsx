import React from "react";
import Readings from "./Users/Readings";
import ReadingDetail from "./Users/ReadingDetail";
import TemaBelajar from "./Users/TemaBelajar";

export const unitsRoutes = [
  {
    path: "/readings/:id",
    element: <Readings />,
  },
  {
    path: "/tema-belajar/:themeId",
    element: <TemaBelajar />,
  },
  {
    path: "/reading-detail/:id",
    element: <ReadingDetail />,
  },
];