import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { DecodedToken, AuthContextType } from '../types/AuthTypes';

const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    user: null,
    login: () => { },
    logout: () => { },
    refreshToken: () => { },
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<DecodedToken | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwtDecode<DecodedToken>(token);
                console.log(decoded)
                const currentTime = Math.floor(Date.now() / 1000);
                if (decoded.exp > currentTime) {
                    setUser(decoded);
                    setIsAuthenticated(true);
                } else {
                    localStorage.removeItem('token');
                    setIsAuthenticated(false);
                }
            } catch (error) {
                console.log(error);
                localStorage.removeItem('token');
            }
        }
    }, []);

    const login = (token: string) => {
        localStorage.setItem('token', token);
        const decoded = jwtDecode<DecodedToken>(token);
        setUser(decoded);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        setIsAuthenticated(false);
    };

    const refreshToken = () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwtDecode<DecodedToken>(token);
                const currentTime = Math.floor(Date.now() / 1000);
                if (decoded.exp > currentTime) {
                    setUser(decoded);
                    setIsAuthenticated(true);
                } else {
                    localStorage.removeItem('token');
                    setIsAuthenticated(false);
                }
            } catch (error) {
                console.log(error);
                localStorage.removeItem('token');
            }
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout, refreshToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
