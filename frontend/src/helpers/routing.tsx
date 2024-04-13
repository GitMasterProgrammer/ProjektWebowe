import React from "react";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Report from "../pages/Report";


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
        path: "/report",
        element: <Report  />,
        label: "Report",
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
    },
    {
        path: "/profile",
        element: <Profile />,
        label: "Profile",
    }
]