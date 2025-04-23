import { createBrowserRouter, Navigate } from "react-router-dom";
import Changepassword from "../pages/Changepassword.tsx";
import ErrorPage from "../pages/ErrorPage.tsx";
import Unauthorized from "../pages/Unauthorized.tsx";
import ProtectedRoute from "./ProtectedRoute";
import Home from "../pages/Home.tsx";
import Roles from "../pages/Roles.tsx";
import Login from "../pages/Login.tsx";
import { Layout } from "../pages/Layout";
import Descuentos from "../pages/Descuentos.tsx";

const routes = [
    {
        path: "/",
        element: <Navigate to="/login" replace />, // Redirige a /login
    },
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "home",
                element: (
                    <ProtectedRoute roles={["admin", "Gerente"]}>
                        <Home />
                    </ProtectedRoute>
                ),
            },
            {
                path: "Roles",
                element: (
                    <ProtectedRoute roles={["admin", "Gerente"]}>
                        <Roles />
                    </ProtectedRoute>
                ),
            },
            {
                path: "Descuentos",
                element: (
                    <ProtectedRoute roles={["admin"]}>
                        <Descuentos />
                    </ProtectedRoute>
                )
            }
        ],
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/changepassword",
        element: <Changepassword />,
    },
    {
        path: "/unauthorized",
        element: <Unauthorized />,
    },
    {
        path: "*",
        element: <ErrorPage />,
    },
];

export const router = createBrowserRouter(routes, {
    future: {
        v7_normalizeFormMethod: true,
        v7_partialHydration: true,
        v7_skipActionErrorRevalidation: true,
    },
});
