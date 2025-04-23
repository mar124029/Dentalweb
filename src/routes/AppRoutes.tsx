import React from 'react';
import { Routes, Route } from 'react-router-dom';

import ErrorPage from '../pages/ErrorPage.tsx';
import ProtectedRoute from './ProtectedRoute.tsx';
import Login from '../pages/Login';
import Home from '../pages/Home';
import Roles from '../pages/Roles';
import Descuentos from '../pages/Descuentos.tsx';

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route
                path="/home"
                element={
                    <ProtectedRoute>
                        <Home />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/roles"
                element={
                    <ProtectedRoute>
                        <Roles />
                    </ProtectedRoute>
                }
            />
            <Route
                path='/descuentos'
                element={
                    <ProtectedRoute>
                        <Descuentos />
                    </ProtectedRoute>
                }
            />
            <Route path="*" element={<ErrorPage />} />
        </Routes>
    );
};

export default AppRoutes;
