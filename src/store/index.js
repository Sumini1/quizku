import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "../Features/Auth/Reducer/registerSlice"; // Import your reducer 
import loginReducer from "../Features/Auth/Reducer/loginSlice";
import modalReducer from "../pages/QuestionStatic/Reducer/modalSlice";

export const store = configureStore({
    reducer: {
        register: registerReducer, // Register your reducer here
        login: loginReducer,
        modal: modalReducer
    },
});