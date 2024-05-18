import React from "react";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Report from "../pages/Report";
import CreateTarget from "../pages/CreateTarget";
import Targets from "../pages/Targets";
import Reports from "../pages/Reports";
import TargetDetails from "../components/TargetDetails";


interface RouteItem {
    path: string
    element: React.JSX.Element
    label: string
    hidden?: boolean,
    requireAuth: boolean
}

export const routes: RouteItem[] = [
    {
        path: "/",
        element: <Home  />,
        label: "Homepage",
        requireAuth: false
    },
    {
        path: "/report",
        element: <Report  />,
        label: "Report",
        requireAuth: true
    },
    {
        path: "/reports",
        element: <Reports  />,
        label: "Reports",
        requireAuth: false
    },
    {
        path: "/targets",
        element: <Targets  />,
        label: "Targets",
        requireAuth: true
    },
    {
        path: "/targets/:targetID",
        element: <TargetDetails  />,
        label: "Targets",
        requireAuth: false,
        hidden: true
    },
    {
        path: "/login",
        element: <Login />,
        label: "Login",
        requireAuth: false,
        hidden: true
    },
    {
        path: "/register",
        element: <Register />,
        label: "Register",
        requireAuth: false,
        hidden: true
    },
    {
        path: "/profile",
        element: <Profile />,
        label: "Profile",
        requireAuth: true
    },
    {
        path: "/createTarget",
        element: <CreateTarget  />,
        label: "Target Form",
        hidden: true,
        requireAuth: true
    },
]