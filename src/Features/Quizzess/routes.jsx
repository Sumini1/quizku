import React from "react";
import QuizSatu from "./User/QuizSatu";
import FinalScoredQuizSatu from "./User/FinalScoredQuizSatu";
import UlasanQuizQuestions from "./User/UlasanQuizQuestions";

export const quizzesRoutes = [
  {
    path: "/pemula/quiz-satu/:id",
    element: <QuizSatu />,
  },
  {
    path: "/pemula/quiz-satu/final-scored",
    element: <FinalScoredQuizSatu />,
  },
  {
    path: "/ulasan-quiz-questions",
    element: <UlasanQuizQuestions />,
  },
];