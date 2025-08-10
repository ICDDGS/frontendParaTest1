import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { Box, Paper, TextField, Button, Typography, Alert, Stack, Link } from "@mui/material";

export default function Register(){
    const { register } = useAuth();
    const nav = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading,setLoading] = useState(false);
    const [msg,setMsg] = useState("");
    const [err,setErr] = useState("");

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); setErr(""); setMsg(""); setLoading(true);
        try { await register(email, password); setMsg("Registro exitoso. Redirigiendo a login..."); setTimeout(()=>nav("/login"), 900); }
        catch (e:any) { setErr(e.message || "Error"); }
        finally { setLoading(false); }
    };

    return (
        <Box display="grid" justifyContent="center" alignItems="center" minHeight="70vh">
        <Paper sx={{ p: 4, width: 360 }}>
            <Stack component="form" spacing={2} onSubmit={onSubmit}>
            <Typography variant="h6">Registro</Typography>
            <TextField label="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
            <TextField label="Password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
            <Button type="submit" variant="contained" disabled={loading}>{loading ? "Creando..." : "Crear cuenta"}</Button>
            {msg && <Alert severity="success">{msg}</Alert>}
            {err && <Alert severity="error">{err}</Alert>}
            <Typography variant="body2">
                ¿Ya tienes cuenta? <Link component={RouterLink} to="/login">Inicia sesión</Link>
            </Typography>
            </Stack>
        </Paper>
        </Box>
    );
}
