import { useEffect, useState } from "react";
import api from "../../lib/api";
import { Box, Button, Card, CardContent, CircularProgress, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography, Grid } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

type Location = {_id:string; address:string; place_id:string; latitude:number; longitude:number};

export default function LocationsList(){
    const [list,setList] = useState<Location[]>([]);
    const [loading,setLoading] = useState(true);
    const [placeId,setPlaceId] = useState("");
    const [creating,setCreating] = useState(false);

    const load = async () => {
    setLoading(true);
    const { data } = await api.get("/locations/getAllLocations");
    setList(data);
    setLoading(false);
    };

    useEffect(()=>{ load(); },[]);

    const create = async (e:React.FormEvent) => {
        e.preventDefault();
        if(!placeId) return;
        setCreating(true);
        await api.post("/locations/createLocation", { place_id: placeId });
        setPlaceId("");
        setCreating(false);
        load();
    };

    const remove = async (id:string) => {
        await api.delete(`/locations/deleteLocation/${id}`);
        load();
    };

    return (
        <Stack spacing={2}>
        <Typography variant="h6">Ubicaciones</Typography>

        <Card component="form" onSubmit={create}>
            <CardContent>
            <Stack direction={{xs:"column", sm:"row"}} spacing={2}>
                <TextField fullWidth label="place_id de Google" value={placeId} onChange={(e)=>setPlaceId(e.target.value)} />
                <Button type="submit" variant="contained" disabled={creating}>{creating ? "Creando..." : "Crear"}</Button>
            </Stack>
            <Typography variant="body2" sx={{mt:1}} color="text.secondary">
                Solo necesitas el <i>place_id</i>; el backend resolverá dirección y coordenadas.
            </Typography>
            </CardContent>
        </Card>

        {loading ? <CircularProgress/> : (
            <Grid container spacing={2}>
            {list.map(l=>(
                <Grid item xs={12} md={6} key={l._id}>
                <Card>
                    <CardContent>
                    <Typography fontWeight={600}>{l.address}</Typography>
                    <Typography color="text.secondary" sx={{mt:0.5}}>({l.latitude}, {l.longitude})</Typography>
                    <Stack direction="row" spacing={1} sx={{mt:1}}>
                        <Button component={RouterLink} to={`/locations/${l._id}`} size="small">Editar</Button>
                        <Button color="error" size="small" onClick={()=>remove(l._id)}>Eliminar</Button>
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
