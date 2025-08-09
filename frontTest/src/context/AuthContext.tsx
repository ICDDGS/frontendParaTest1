import React, { createContext, useContext, useState } from "react";

type AuthContextType ={
    token: string | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType>({} as any);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));

    const login = async (email: string, password: string) => {
        const res = await fetch(`${import.meta.env.VITE_API_BASE}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        if (!res.ok || !data.token) throw new Error(data.message || "Error al iniciar sesión");
        localStorage.setItem("token", data.token);
        setToken(data.token);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
        {children}
        </AuthContext.Provider>
    );
};



export const useAuth = () => useContext(AuthContext);