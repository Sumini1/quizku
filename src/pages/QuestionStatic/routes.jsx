import React from "react";
import PageSatu from "./QuestionPages/PageSatu";
import PageDua from "./QuestionPages/PageDua";  

export const questionRoutes = [
    {
        path: "/page-satu",
        element: <PageSatu />,
    },
    {
        path: "/page-dua",
        element: <PageDua />,
    }
];