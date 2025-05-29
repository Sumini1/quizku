import React from "react";
import ExamSatu from "./Users/ExamSatu";
import FinalScoredExamSatu from "./Users/FinalScoredExamSatu";

export const examsRoutes = [
    {
        path : "/pemula/exam-satu/:id",
        element : <ExamSatu />
    },
    {
        path : "/pemula/exam-satu/final-scored",
        element : <FinalScoredExamSatu />
    }
]