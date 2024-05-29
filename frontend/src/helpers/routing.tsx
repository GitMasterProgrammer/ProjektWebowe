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
import ReportDetails from "../components/ReportDetails";


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
        label: "Strona główna",
        requireAuth: false,
        hidden: true,
    },
    {
        path: "/report",
        element: <Report  />,
        label: "Zgłoś",
        requireAuth: true
    },
    {
        path: "/reports",
        element: <Reports  />,
        label: "Zgłoszenia",
        requireAuth: false
    },
    {
        path: "/reports/:reportId",
        element: <ReportDetails  />,
        label: "Szczegóły zgłoszenia",
        requireAuth: true,
        hidden: true
    },
    {
        path: "/targets",
        element: <Targets  />,
        label: "Osoby",
        requireAuth: true
    },
    {
        path: "/targets/:targetId",
        element: <TargetDetails  />,
        label: "Szczegóły osób",
        requireAuth: false,
        hidden: true
    },
    {
        path: "/login",
        element: <Login />,
        label: "Logowanie",
        requireAuth: false,
        hidden: true
    },
    {
        path: "/register",
        element: <Register />,
        label: "Rejestracja",
        requireAuth: false,
        hidden: true
    },
    {
        path: "/profile",
        element: <Profile />,
        label: "Profil",
        requireAuth: true
    },
    {
        path: "/createTarget",
        element: <CreateTarget  />,
        label: "Utwórz osobę",
        hidden: true,
        requireAuth: true
    },
]