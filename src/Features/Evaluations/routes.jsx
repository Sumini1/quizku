import React from "react";
import EvaluationSatu from "./User/EvaluationSatu";
import FinalScoredEvaluationSatu from "./User/FinalScoredEvaluationSatu";
import UlasanSoal from "./User/UlasanSoal";

export const evaluationsRoutes = [
  {
    path: "/pemula/evaluation-satu/:id",
    element: <EvaluationSatu />,
  },
  {
    path: "/pemula/evaluation-satu/final-scored",
    element: <FinalScoredEvaluationSatu />,
  },
  {
    path: "/ulasan-soal",
    element: <UlasanSoal />,
  },
];