import React from "react";
import SurveySatu from "./Users/SurveySatu"
import SurveyDua from "./Users/SurveyDua"
import SurveyTiga from "./Users/SurveyTiga";
import SurveyTestLevels from "./Users/SurveyTestLevels";

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
    }
];