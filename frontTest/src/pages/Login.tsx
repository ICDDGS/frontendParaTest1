import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
    const { login } = useAuth();
    const nav = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState("");

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErr("");
        setLoading(true);
        try {
        await login(email, password);
        nav("/");
        } catch (e: any) {
        setErr(e.message || "Error");
        } finally {
        setLoading(false);
        }
    };

    return (
        <form onSubmit={onSubmit} style={{ maxWidth: 360, margin: "3rem auto", display: "grid", gap: 12 }}>
        <h2>Iniciar sesión</h2>
        <input placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button disabled={loading}>{loading ? "Entrando..." : "Entrar"}</button>
        {err && <small style={{ color: "crimson" }}>{err}</small>}
        </form>
    );
}
