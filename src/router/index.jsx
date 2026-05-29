import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/login/index.jsx";
import Home from "../pages/home/home.jsx";
import Layout from "../components/layout/Layout.jsx";

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
                <Route path="reportes/general" element={<div style={{ padding: '20px' }}><h2>Estadísticas Generales</h2><p>Contenido de Estadísticas Generales en desarrollo.</p></div>} />
                <Route path="reportes/historial" element={<div style={{ padding: '20px' }}><h2>Historial de Cambios</h2><p>Contenido de Historial de Cambios en desarrollo.</p></div>} />
                <Route path="almacenes/stock" element={<div style={{ padding: '20px' }}><h2>Stock de Activos</h2><p>Contenido de Stock de Activos en desarrollo.</p></div>} />
                <Route path="almacenes/categorias" element={<div style={{ padding: '20px' }}><h2>Categorías</h2><p>Contenido de Categorías en desarrollo.</p></div>} />
            </Route>

            {/* Redirección por defecto */}
            <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
    );
};