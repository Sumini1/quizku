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

// Import thunks
import {
  refreshAccessToken,
  fetchLogout,
} from "../Features/Auth/Reducer/loginSlice";

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