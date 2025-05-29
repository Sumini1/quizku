// import { configureStore } from "@reduxjs/toolkit";
// import registerReducer from "../Features/Auth/Reducer/registerSlice"; // Import your reducer
// import loginReducer from "../Features/Auth/Reducer/loginSlice";
// import modalReducer from "../pages/QuestionStatic/Reducer/modalSlice";
// import forgotPasswordReducer from "../Features/Auth/Reducer/forgotPasswordCheck";
// import difficultiesReducer from "../Features/Difficulties/Reducer/difficulties";
// import subcategoryReducer from "../Features/Subcategory/Reducer/subcategory";

// export const store = configureStore({
//   reducer: {
//     register: registerReducer, // Register your reducer here
//     login: loginReducer,
//     modal: modalReducer,
//     forgotPassword: forgotPasswordReducer,
//     difficulties: difficultiesReducer,
//     subcategory: subcategoryReducer,
//   },
// });

import { configureStore } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

// Import api dan setup interceptors
import api, { setupAxiosInterceptors } from "../Features/Auth/Reducer/axios";

// Import reducer
import registerReducer from "../Features/Auth/Reducer/registerSlice";
import loginReducer from "../Features/Auth/Reducer/loginSlice";
import modalReducer from "../pages/QuestionStatic/Reducer/modalSlice";
import forgotPasswordReducer from "../Features/Auth/Reducer/forgotPasswordCheck";
import difficultiesReducer from "../Features/Difficulties/Reducer/difficulties";
import subcategoryReducer from "../Features/Subcategory/Reducer/subcategory";
import categoriesReducer from "../Features/Difficulties/Reducer/categories";
import unitsReducer from "../Features/Units/Reducer/unitsSlice";
import evaluationsReducer from "../Features/Units/Reducer/evaluationsSlice";
import quizzesReducer from "../Features/Units/Reducer/quizzesSlice";
import examsReducer from "../Features/Units/Reducer/examsSlice";
import readingsReducer from "../Features/Units/Reducer/readingsSlice";
import userUnitsReducer from "../Features/Units/Reducer/userUnitsSlice";
import evaluationsQuestionsReducer from "../Features/Evaluations/Reducer/evaluationsQuestions";
import questionLinkReducer from "../Features/Evaluations/Reducer/questionsLink";
import userEvaluationsReducer from "../Features/Evaluations/Reducer/userEvaluations";
import userExamsReducer from "../Features/Exams/Reducer/userExams";
import examsQuestionsReducer from "../Features/Exams/Reducer/examsQuestions";
import quizQuestionsReducer from "../Features/Quizzess/Reducer/quizQuestions";
import userQuizzesReducer from "../Features/Quizzess/Reducer/userQuizzes";
import userSurveysReducer from "../Features/Survey/Reducer/userSurveys";
import questionsSurveyReducer from "../Features/Survey/Reducer/questionsSurvey";
import testExamsReducer from "../Features/Survey/Reducer/testExams";
import questionsTestReducer  from "../Features/Survey/Reducer/questionsTest";
import userTestReducer from "../Features/Survey/Reducer/userTest";

// Import thunks
import {
  refreshAccessToken,
  fetchLogout,
} from "../Features/Auth/Reducer/loginSlice";
import { use } from "react";

// Buat store
export const store = configureStore({
  reducer: {
    register: registerReducer,
    login: loginReducer,
    modal: modalReducer,
    forgotPassword: forgotPasswordReducer,
    difficulties: difficultiesReducer,
    subcategory: subcategoryReducer,
    categories: categoriesReducer,
    units: unitsReducer,
    evaluations: evaluationsReducer,
    quizzes: quizzesReducer,
    exams: examsReducer,
    readings: readingsReducer,
    userUnits: userUnitsReducer,
    evaluationsQuestions: evaluationsQuestionsReducer,
    questionsLink: questionLinkReducer,
    userEvaluations: userEvaluationsReducer,
    userExams: userExamsReducer,
    examsQuestions: examsQuestionsReducer,
    quizQuestions: quizQuestionsReducer,
    userQuizzes: userQuizzesReducer,
    userSurveys: userSurveysReducer,
    questionsSurvey: questionsSurveyReducer,
    testExams: testExamsReducer,
    questionsTest: questionsTestReducer,
    userTest: userTestReducer

  },
});

// Siapkan interceptor autentikasi setelah membuat store
setupAxiosInterceptors(
  api,
  () => store.dispatch(refreshAccessToken()).unwrap(),
  () => store.dispatch(fetchLogout())
);

// Ekspor api untuk digunakan di seluruh aplikasi
export { api };

export default store;
