import { useEffect, useState } from "react";
import api from "../../lib/api";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Paper, Stack, Typography } from "@mui/material";

type Truck = { _id:string; year:string; color:string; plates:string };

export default function TruckDetail(){
    const { id } = useParams();
    const nav = useNavigate();
    const [t,setT] = useState<Truck | null>(null);

    useEffect(()=>{ (async()=>{ const { data } = await api.get(`/trucks/getTruckById/${id}`); setT(data); })(); },[id]);

    if(!t) return <Typography>Cargando…</Typography>;

    return (
    <Paper sx={{ p:3, maxWidth: 480 }}>
        <Typography variant="h6">Detalle de camión</Typography>
        <Stack spacing={1} sx={{ mt: 2 }}>
        <Typography><b>Año:</b> {t.year}</Typography>
        <Typography><b>Color:</b> {t.color}</Typography>
        <Typography><b>Placas:</b> {t.plates}</Typography>
        <Button onClick={()=>nav(-1)}>Volver</Button>
        </Stack>
    </Paper>
    );
}

