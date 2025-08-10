import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../lib/api";
import { Box, Card, CardContent, Typography, Stack, FormControl, InputLabel, Select, MenuItem, Button, Divider } from "@mui/material";

type Truck = {_id:string; plates:string};
type Location = {_id:string; address:string};
type Status = 'Pendiente'|'Procesando'|'Enviando'|'Entregado'|'Cancelado';

type Order = {
    _id:string;
    truck:Truck; pickup:Location; dropoff:Location;
    status: Status;
};

const STATUS_OPTIONS: Status[] = ['Pendiente','Procesando','Enviando','Entregado','Cancelado'];

export default function OrderDetail(){
    const { id } = useParams();
    const nav = useNavigate();
    const [order,setOrder]=useState<Order|null>(null);
    const [status,setStatus]=useState<Status>('Pendiente');
    const [saving,setSaving]=useState(false);

    const load = async () => {
        const { data } = await api.get(`/orders/getOrder/${id}`);
        setOrder(data);
        setStatus(data.status);
    };

    useEffect(()=>{ load(); },[id]);

    const save = async () => {
        setSaving(true);
        await api.put(`/orders/changeStatus/${id}/status`, { status });
        await load();
        setSaving(false);
    };

    return (
        <Box sx={{ maxWidth: 800, mx: "auto", mt: 3 }}>
        <Card>
            <CardContent>
            <Typography variant="h6" gutterBottom>Detalle de orden</Typography>
            {order && (
                <Stack spacing={2}>
                <Typography><b>Camión:</b> {order.truck?.plates}</Typography>
                <Typography><b>Pickup:</b> {order.pickup?.address}</Typography>
                <Typography><b>Dropoff:</b> {order.dropoff?.address}</Typography>

                <FormControl fullWidth>
                    <InputLabel>Estado</InputLabel>
                    <Select label="Estado" value={status} onChange={(e)=>setStatus(e.target.value as Status)}>
                    {STATUS_OPTIONS.map(s=> <MenuItem key={s} value={s}>{s}</MenuItem>)}
                    </Select>
                </FormControl>

                <Stack direction="row" spacing={1}>
                    <Button variant="contained" onClick={save} disabled={saving}>{saving?"Guardando...":"Guardar cambios"}</Button>
                </Stack>

                <Divider sx={{ my: 1 }} />

                <Button variant="outlined" color="inherit" onClick={()=>nav(-1)} sx={{ alignSelf:"flex-start" }}>
                    Volver
                </Button>
                </Stack>
            )}
            </CardContent>
        </Card>
        </Box>
    );
}

