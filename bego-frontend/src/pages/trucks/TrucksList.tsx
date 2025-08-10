import { useEffect, useState } from "react";
import api from "../../lib/api";
import { Button, Card, CardContent, CircularProgress, Grid, Stack, Typography } from "@mui/material";
import { useNavigate, Link as RouterLink } from "react-router-dom";

type Truck = { _id:string; year:string; color:string; plates:string };

export default function TrucksList(){
    const nav = useNavigate();
    const [list,setList] = useState<Truck[]>([]);
    const [loading,setLoading] = useState(true);

    const load = async () => {
        setLoading(true);
        const { data } = await api.get("/trucks/getAlltrucks");
        setList(data);
        setLoading(false);
    };
    useEffect(()=>{ load(); },[]);

    return (
        <Stack spacing={2}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">Camiones</Typography>
            <Button variant="contained" onClick={()=>nav("/trucks/new")}>Agregar camión</Button>
        </Stack>

        {loading ? <CircularProgress/> : (
            <Grid container spacing={2}>
            {list.map(t => (
                <Grid item xs={12} md={6} key={t._id}>
                <Card>
                    <CardContent>
                    <Typography fontWeight={600}>{t.year} • {t.color} • {t.plates}</Typography>
                    <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                        <Button component={RouterLink} to={`/trucks/${t._id}`} size="small">Detalle</Button>
                        <Button
                        color="error" size="small"
                        onClick={async()=>{ await api.delete(`/trucks/deletetruck/${t._id}`); load(); }}>
                        Eliminar
                        </Button>
                    </Stack>
                    </CardContent>
                </Card>
                </Grid>
            ))}
            </Grid>
        )}
        </Stack>
    );
}
