import React from "react";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";


interface RouteItem {
    path: string
    element: React.JSX.Element
    label: string
}

export const routes: RouteItem[] = [
    {
        path: "/",
        element: <Home  />,
        label: "Homepage",
    },
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