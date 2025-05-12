import React from "react";
import RegisterEmail from "./Users/RegisterEmail";
import Login from "./Users/Login"
import SecurityQuestion from "./Users/SecurityQuestion";
import ForgotPassword from "./Users/ForgotPassword";
import PertanyaanKeamanan from "./Users/PertanyaanKeamanan";
import NewPassword from "./Users/NewPassword";

export const authRoutes = [
    {
        path: "/register-email",
        element: <RegisterEmail />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/security-question/register-email",
        element: <SecurityQuestion />,
    },
    {
        path: "/forgot-password",
        element: <ForgotPassword />
    },
    {
        path: "/pertanyaan-keamanan/forgot-password",
        element: <PertanyaanKeamanan />
    },
    {
        path: "/new-password",
        element: <NewPassword />
    }

];