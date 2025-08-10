import { useEffect, useState } from "react";
import api from "../../lib/api";
import { Button, MenuItem, Paper, Stack, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

type Truck = {_id:string; plates:string};
type Location = {_id:string; address:string};

export default function OrderForm(){
    const nav = useNavigate();
    const [trucks,setTrucks]=useState<Truck[]>([]);
    const [locs,setLocs]=useState<Location[]>([]);
    const [truck,setTruck]=useState(""); const [pickup,setPickup]=useState(""); const [dropoff,setDropoff]=useState("");

    useEffect(()=>{ (async()=>{
        const [t,l] = await Promise.all([api.get("/trucks/getAlltrucks"), api.get("/locations/getAllLocations")]);
        setTrucks(t.data); setLocs(l.data);
    })(); },[]);

    const submit = async (e:React.FormEvent)=>{
        e.preventDefault();
        await api.post("/orders/createOrder", { truck, pickup, dropoff });
        nav("/orders");
    };

    return (
        <Paper sx={{ p:3, maxWidth: 520 }}>
        <Typography variant="h6">Nueva orden</Typography>
        <Stack component="form" spacing={2} sx={{ mt: 2 }} onSubmit={submit}>
            <TextField select label="Camión" value={truck} onChange={(e)=>setTruck(e.target.value)}>
            {trucks.map(t=><MenuItem key={t._id} value={t._id}>{t.plates}</MenuItem>)}
            </TextField>
            <TextField select label="Pickup" value={pickup} onChange={(e)=>setPickup(e.target.value)}>
            {locs.map(l=><MenuItem key={l._id} value={l._id}>{l.address}</MenuItem>)}
            </TextField>
            <TextField select label="Dropoff" value={dropoff} onChange={(e)=>setDropoff(e.target.value)}>
            {locs.map(l=><MenuItem key={l._id} value={l._id}>{l.address}</MenuItem>)}
            </TextField>
            <Stack direction="row" spacing={1}>
            <Button type="submit" variant="contained">Crear</Button>
            <Button onClick={()=>nav(-1)}>Cancelar</Button>
            </Stack>
        </Stack>
        </Paper>
    );
}
