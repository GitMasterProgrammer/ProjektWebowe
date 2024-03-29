import React from "react";
import Login from "../pages/Login";
import Register from "../pages/Register";


interface RouteItem {
    path: string
    element: React.JSX.Element
    label: string
}

export const routes: RouteItem[] = [
    {
        path: "/login",
        element: <Login />,
        label: "Login",
    },
    {
        path: "/register",
        element: <Register />,
        label: "Register",
    }
]