'use client';

import { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import setAuthToken from '@/utils/setAuthToken';

interface User {
    _id: string;
    name: string;
    email: string;
    profilePicture?: string;
    bio?: string;
}

interface AuthContextType {
    token: string | null;
    isAuthenticated: boolean;
    user: User | null;
    loading: boolean;
    login: (token: string) => void;
    logout: () => void;
    loadUser: (token: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            loadUser(storedToken);
        } else {
            setLoading(false);
        }
    }, []);

    const loadUser = async (token: string) => {
        setAuthToken(token);
        try {
            const res = await axios.get('http://localhost:5000/api/auth/me');
            setUser(res.data);
            setIsAuthenticated(true);
            setToken(token);
        } catch (err) {
            localStorage.removeItem('token');
            setAuthToken(null);
            setToken(null);
            setUser(null);
            setIsAuthenticated(false);
        } finally {
            setLoading(false);
        }
    };

    const login = (newToken: string) => {
        localStorage.setItem('token', newToken);
        loadUser(newToken);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setAuthToken(null);
        setUser(null);
        setIsAuthenticated(false);
        setLoading(false);
    };

    return (
        <AuthContext.Provider value={{ token, isAuthenticated, user, loading, login, logout, loadUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext; 