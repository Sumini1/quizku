import React from "react";
import SurveySatu from "./Users/SurveySatu";
import SurveyDua from "./Users/SurveyDua";
import SurveyTiga from "./Users/SurveyTiga";
import SurveyTestLevels from "./Users/SurveyTestLevels";
import SurveyTest from "./Users/SurveyTest";
import FinalScoredTestExams from "./Users/FinalScoredTestExams";

export const surveyRoutes = [
  {
    path: "/survey-satu",
    element: <SurveySatu />,
  },
  {
    path: "/survey-dua",
    element: <SurveyDua />,
  },
  {
    path: "/survey-tiga",
    element: <SurveyTiga />,
  },
  {
    path: "/list-levels",
    element: <SurveyTestLevels />,
  },
  {
    path: "/survey-test/:id",
    element: <SurveyTest />,
  },
  {
    path: "/pemula/test-exams/final-scored",
    element: <FinalScoredTestExams />,
  },
];
