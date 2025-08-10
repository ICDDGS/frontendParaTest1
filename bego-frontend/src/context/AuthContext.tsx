import React, { createContext, useContext, useState } from "react";

type AuthCtx = {
    token: string | null;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string) => Promise<void>;
    logout: () => void;
    };

    const Ctx = createContext<AuthCtx>({} as any);

    export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));

    const login = async (email: string, password: string) => {
        const res = await fetch(`${import.meta.env.VITE_API_BASE}/users/readUser`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        });

        const text = await res.text();
        const data = text ? JSON.parse(text) : {};

        if (!res.ok || !data.token) {
        throw new Error(data?.message || "Login failed");
        }

        localStorage.setItem("token", data.token);
        setToken(data.token);
    };

    const register = async (email: string, password: string) => {
        const res = await fetch(`${import.meta.env.VITE_API_BASE}/users/createUser`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        });

        const text = await res.text();
        const data = text ? JSON.parse(text) : {};

        if (!res.ok) {
        throw new Error(data?.message || "Register failed");
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
    };

    return <Ctx.Provider value={{ token, login, register, logout }}>{children}</Ctx.Provider>;
};

export const useAuth = () => useContext(Ctx);

