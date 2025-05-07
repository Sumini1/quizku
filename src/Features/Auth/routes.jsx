import React from "react";
import RegisterEmail from "./Users/RegisterEmail";
import Login from "./Users/Login"
import SecurityQuestion from "./Users/SecurityQuestion";
import LoginGoogle from "./Users/LoginGoogle";

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
        path: "/login-google",
        element: <LoginGoogle />,
    }
];