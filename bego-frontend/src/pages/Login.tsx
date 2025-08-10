import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { Box, Paper, TextField, Button, Typography, Alert, Stack, Link } from "@mui/material";

export default function Login(){
    const { login } = useAuth();
    const nav = useNavigate();
    const [email, setEmail] = useState("daniel@example.com");
    const [password, setPassword] = useState("123456");
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState("");

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); setErr(""); setLoading(true);
        try { await login(email, password); nav("/"); }
        catch (e:any) { setErr(e.message || "Error"); }
        finally { setLoading(false); }
    };

    return (
        <Box display="grid" justifyContent="center" alignItems="center" minHeight="70vh">
        <Paper sx={{ p: 4, width: 360 }}>
            <Stack component="form" spacing={2} onSubmit={onSubmit}>
            <Typography variant="h6">Iniciar sesión</Typography>
            <TextField label="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
            <TextField label="Password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
            <Button type="submit" variant="contained" disabled={loading}>{loading ? "Entrando..." : "Entrar"}</Button>
            {err && <Alert severity="error">{err}</Alert>}
            <Typography variant="body2">
                ¿No tienes cuenta? <Link component={RouterLink} to="/register">Regístrate</Link>
            </Typography>
            </Stack>
        </Paper>
        </Box>
    );
}
