import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/login/index.jsx";
import Home from "../pages/home/home.jsx";
import Layout from "../components/layout/Layout.jsx";
import Stock from "../pages/almacenes/stock/Stock.jsx";
import Categorias from "../pages/almacenes/categorias/Categorias.jsx";
import General from "../pages/reportes/General.jsx";
import Historial from "../pages/reportes/Historial.jsx";

// Lo declaramos con mayúscula inicial como un componente de React real
export const AppRoutes = () => {
    return (
        <Routes>
            {/* Ruta de Login sin Layout */}
            <Route path="/login" element={<Login />} />
            
            {/* Rutas con Layout */}
            <Route path="/" element={<Layout />}>
                <Route index element={<Navigate to="/home" replace />} />
                <Route path="home" element={<Home />} />
                <Route path="reportes/general" element={<General />} />
                <Route path="reportes/historial" element={<Historial />} />
                <Route path="almacenes/stock" element={<Stock />} />
                <Route path="almacenes/categorias" element={<Categorias />} />
                <Route path="movimientos/entradas" element={<div style={{ padding: '20px'}}><h2>Entradas</h2>Contenido de entradas en desarrollo</div>}/>
                <Route path="movimientos/salidas" element={<div style={{ padding: '20px' }}><h2>Salidas</h2><p>Contenido de Salidas en desarrollo.</p></div>} />
            </Route>

            {/* Redirección por defecto */}
            <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
    );
};