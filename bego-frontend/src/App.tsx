import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import TrucksList from "./pages/trucks/TrucksList";
import TruckForm from "./pages/trucks/TruckForm";
import TruckDetail from "./pages/trucks/TruckDetail";
import OrdersList from "./pages/orders/OrdersList";
import OrderForm from "./pages/orders/OrderForm";
import OrderDetail from "./pages/orders/OrderDetail";
import LocationsList from "./pages/locations//LocationList";
import LocationDetail from "./pages/locations/LocationDetail";

export default function App(){
  return (
    <Layout>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/" element={<PrivateRoute><Dashboard/></PrivateRoute>} />
        <Route path="/trucks" element={<PrivateRoute><TrucksList/></PrivateRoute>} />
        <Route path="/trucks/new" element={<PrivateRoute><TruckForm/></PrivateRoute>} />
        <Route path="/trucks/:id" element={<PrivateRoute><TruckDetail/></PrivateRoute>} />
        <Route path="/orders" element={<PrivateRoute><OrdersList/></PrivateRoute>} />
        <Route path="/orders/new" element={<PrivateRoute><OrderForm/></PrivateRoute>} />
        <Route path="/orders/:id" element={<PrivateRoute><OrderDetail/></PrivateRoute>} />
        <Route path="/locations" element={<PrivateRoute><LocationsList/></PrivateRoute>} />
        <Route path="/locations/:id" element={<PrivateRoute><LocationDetail/></PrivateRoute>} />
      </Routes>
    </Layout>
  );
}
