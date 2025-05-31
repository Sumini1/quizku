import React from "react";
import ExamSatu from "./Users/ExamSatu";
import FinalScoredExamSatu from "./Users/FinalScoredExamSatu";
import UlasanExamQuestions from "./Users/UlasanExamQuestions";

export const examsRoutes = [
    {
        path : "/pemula/exam-satu/:id",
        element : <ExamSatu />
    },
    {
        path : "/pemula/exam-satu/final-scored",
        element : <FinalScoredExamSatu />
    },
    {
        path : "/ulasan-exam-questions",
        element : <UlasanExamQuestions />
    }
]