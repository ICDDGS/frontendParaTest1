import { useEffect, useState } from "react";
import api from "../../lib/api";
import { Button, Card, CardContent, CircularProgress, Stack, Typography, Grid } from "@mui/material";
import { useNavigate, Link as RouterLink } from "react-router-dom";

type Truck = { _id: string; plates: string };
type Location = { _id: string; address: string };
type Order = {
    _id: string;
    status: 'created' | 'in transit' | 'completed';
    truck: Truck;
    pickup: Location;
    dropoff: Location;
};

export default function OrdersList() {
    const nav = useNavigate();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    const load = async () => {
    try {
        setLoading(true);
        const { data } = await api.get("/orders/getAllOrders");
        setOrders(Array.isArray(data) ? data : (data.orders || []));
    } finally {
        setLoading(false);
    }
    };

    const remove = async (id: string) => {
    await api.delete(`/orders/deleteOrder/${id}`);
    load();
    };

    useEffect(() => { load(); }, []);

    return (
        <Stack spacing={2}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">Órdenes</Typography>
            <Button variant="contained" onClick={() => nav("/orders/new")}>
            Nueva orden
            </Button>
        </Stack>

        {loading ? (
            <CircularProgress />
        ) : (
            <Grid container spacing={2}>
            {orders.map(o => (
                <Grid item xs={12} md={6} key={o._id}>
                <Card>
                    <CardContent>
                    <Typography fontWeight={600}>
                        {o.truck?.plates} — {o.status}
                    </Typography>
                    <Typography color="text.secondary" sx={{ mt: 1 }}>
                        <b>Pickup:</b> {o.pickup?.address} — <b>Dropoff:</b> {o.dropoff?.address}
                    </Typography>
                    <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                        <Button component={RouterLink} to={`/orders/${o._id}`} size="small">
                        Detalle
                        </Button>
                        <Button color="error" size="small" onClick={() => remove(o._id)}>
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

