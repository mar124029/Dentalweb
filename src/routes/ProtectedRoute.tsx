import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';

interface ProtectedRouteProps {
    children: React.ReactNode;
    roles?: string[]; // Roles permitidos
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, roles }) => {
    const { isAuthenticated, user } = useAuth();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const validateToken = async () => {
            await new Promise(resolve => setTimeout(resolve, 500));
            setIsLoading(false);
        };

        validateToken();
    }, []);

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (roles && (!user || !roles.includes(user.rol))) {
        return <Navigate to="/unauthorized" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
