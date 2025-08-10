import { AppBar, Box, Button, Container, Toolbar, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Layout({ children }: { children: React.ReactNode }) {
    const { token, logout } = useAuth();
    return (
        <Box sx={{ minHeight: "100vh", bgcolor: "#f6f7f9" }}>
        <AppBar position="sticky" color="default" elevation={1}>
            <Toolbar>
            <Typography variant="h6" component={RouterLink} to="/" sx={{ textDecoration: "none", color: "inherit" }}>
                Bego Admin
            </Typography>
            {token && (
                <>
                <Button component={RouterLink} to="/trucks" sx={{ ml: 2 }}>Camiones</Button>
                <Button component={RouterLink} to="/orders" sx={{ ml: 1 }}>Órdenes</Button>
                <Button component={RouterLink} to="/locations" sx={{ ml: 1 }}>Localizaciones</Button>
                </>
            )}
            <Box sx={{ flex: 1 }} />
            {!token ? (
                <>
                <Button component={RouterLink} to="/login">Login</Button>
                <Button component={RouterLink} to="/register" variant="contained" sx={{ ml: 1 }}>Registro</Button>
                </>
            ) : (
                <Button color="error" variant="contained" onClick={logout}>Salir</Button>
            )}
            </Toolbar>
        </AppBar>
        <Container sx={{ py: 3 }}>{children}</Container>
        </Box>
    );
}
