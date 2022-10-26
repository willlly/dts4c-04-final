import React, { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState();

    useEffect(() => {
        const authenticated = localStorage.getItem('access_token');

        if (user || authenticated) {
            if (window.location.pathname !== '/') {
                window.location.replace('/');
            }
        } else {
            if (window.location.pathname === '/') {
                window.location.replace('/signup');
            }
        }
    }, [user]);

    const onSetUser = (token) => {
        localStorage.setItem('access_token', token);
        setUser(token);
    };

    return (
        <AuthContext.Provider value={{ user, setUser: onSetUser }}>
            {children}
        </AuthContext.Provider>
    );
};
