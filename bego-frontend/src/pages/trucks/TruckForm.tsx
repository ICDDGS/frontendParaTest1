import { useState } from "react";
import api from "../../lib/api";
import { Button, Paper, Stack, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function TruckForm(){
    const nav = useNavigate();
    const [year,setYear] = useState("");
    const [color,setColor] = useState("");
    const [plates,setPlates] = useState("");

    const submit = async (e:React.FormEvent)=>{
    e.preventDefault();
    await api.post("/trucks/createTruck",{ year, color, plates });
    nav("/trucks");
    };

    return (
        <Paper sx={{ p:3, maxWidth: 480 }}>
        <Typography variant="h6">Nuevo camión</Typography>
        <Stack component="form" spacing={2} sx={{ mt:2 }} onSubmit={submit}>
            <TextField label="Año" value={year} onChange={e=>setYear(e.target.value)} />
            <TextField label="Color" value={color} onChange={e=>setColor(e.target.value)} />
            <TextField label="Placas" value={plates} onChange={e=>setPlates(e.target.value)} />
            <Stack direction="row" spacing={1}>
            <Button type="submit" variant="contained">Guardar</Button>
            <Button onClick={()=>nav(-1)}>Cancelar</Button>
            </Stack>
        </Stack>
        </Paper>
    );
}
