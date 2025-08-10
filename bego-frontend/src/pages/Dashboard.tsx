import { Grid, Paper, Typography, Stack, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Dashboard(){
    const nav = useNavigate();
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
                <Paper sx={{ p:3 }}>
                <Stack spacing={1}>
                    <Typography variant="h6">Camiones</Typography>
                    <Typography color="text.secondary">Ver, agregar, consultar y eliminar camiones.</Typography>
                    <Button variant="contained" onClick={()=>nav("/trucks")}>Ir a Camiones</Button>
                </Stack>
                </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
                <Paper sx={{ p:3 }}>
                <Stack spacing={1}>
                    <Typography variant="h6">Órdenes</Typography>
                    <Typography color="text.secondary">Ver, crear, actualizar estado y eliminar órdenes.</Typography>
                    <Button variant="contained" onClick={()=>nav("/orders")}>Ir a Órdenes</Button>
                </Stack>
                </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
                <Paper sx={{ p:3 }}>
                <Stack spacing={1}>
                    <Typography variant="h6">Localizaciones</Typography>
                    <Typography color="text.secondary">Ver, crear, actualizar estado y eliminar Localizaciones.</Typography>
                    <Button variant="contained" onClick={()=>nav("/locations")}>Ir a Órdenes</Button>
                </Stack>
                </Paper>
            </Grid>
        </Grid>
    );
}
