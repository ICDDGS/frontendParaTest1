import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import React from "react";

export default function PrivateRoute({ children }: { children: React.JSX.Element }) {
    const { token } = useAuth();
    return token ? children : <Navigate to="/login" replace />;
}
