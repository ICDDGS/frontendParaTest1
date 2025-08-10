import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../lib/api";
import { Box, Button, Card, CardContent, Stack, TextField, Typography, Divider } from "@mui/material";

type Location = {_id:string; address:string; place_id:string; latitude:number; longitude:number};

export default function LocationDetail(){
    const { id } = useParams();
    const nav = useNavigate();
    const [loc,setLoc] = useState<Location | null>(null);
    const [saving,setSaving] = useState(false);
    const [deleting,setDeleting] = useState(false);

    const load = async () => {
        const { data } = await api.get(`/locations/getLocation/${id}`);
        setLoc(data);
    };

    useEffect(()=>{ load(); },[id]);

    const save = async () => {
        if(!loc) return;
        setSaving(true);
        await api.put(`/locations/updateLocation/${loc._id}`, {
        address: loc.address,
        place_id: loc.place_id,
        latitude: loc.latitude,
        longitude: loc.longitude,
        });
        setSaving(false);
        load();
    };

    const remove = async () => {
        if(!loc) return;
        setDeleting(true);
        await api.delete(`/locations/deleteLocation/${loc._id}`);
        setDeleting(false);
        nav("/locations");
    };

    return (
        <Box sx={{ maxWidth: 800, mx: "auto", mt: 3 }}>
        <Card>
            <CardContent>
            <Typography variant="h6" gutterBottom>Editar ubicación</Typography>

            {loc && (
                <Stack spacing={2}>
                <TextField label="Dirección" value={loc.address} onChange={(e)=>setLoc({...loc, address:e.target.value})} />
                <TextField label="place_id" value={loc.place_id} onChange={(e)=>setLoc({...loc, place_id:e.target.value})} />
                <Stack direction={{xs:"column", sm:"row"}} spacing={2}>
                    <TextField label="Latitude" type="number" value={loc.latitude} onChange={(e)=>setLoc({...loc, latitude:Number(e.target.value)})} />
                    <TextField label="Longitude" type="number" value={loc.longitude} onChange={(e)=>setLoc({...loc, longitude:Number(e.target.value)})} />
                </Stack>

                <Stack direction="row" spacing={1}>
                    <Button variant="contained" onClick={save} disabled={saving}>{saving ? "Guardando..." : "Guardar"}</Button>
                    <Button color="error" variant="outlined" onClick={remove} disabled={deleting}>{deleting ? "Eliminando..." : "Eliminar"}</Button>
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
