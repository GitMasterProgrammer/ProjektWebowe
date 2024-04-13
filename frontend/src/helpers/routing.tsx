import React from "react";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Report from "../pages/Report";
import CreateTarget from "../pages/CreateTarget";
import Targets from "../pages/Targets";


interface RouteItem {
    path: string
    element: React.JSX.Element
    label: string
    hidden?: boolean
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
        path: "/targets",
        element: <Targets  />,
        label: "Targets",
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
    },
    {
        path: "/createTarget",
        element: <CreateTarget  />,
        label: "Target Form",
        hidden: true,
    },
]