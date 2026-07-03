import React, { useState } from 'react';
import { NavLink, useLocation, Outlet } from 'react-router-dom';
import './layout.css';

const Layout = () => {

    const location = useLocation();

    const [reportesOpen, setReportesOpen] = useState(location.pathname.startsWith('/reportes'));
    const [almacenesOpen, setAlmacenesOpen] = useState(location.pathname.startsWith('/almacenes'));
    const [movimientosOpen, setMovimientosOpen] = useState(location.pathname.startsWith('/movimientos'));
    return (
        <div className="layout-container">
            <aside className="layout-sidebar">
                <div className="sidebar-brand">
                    <h2>Proyecto Ágil</h2>
                </div>
                <nav className="sidebar-nav">
                    <NavLink to="/home" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                        Inicio
                    </NavLink>


                    <div className="submenu-container">
                        <button 
                            onClick={() => setReportesOpen(!reportesOpen)} 
                            className={`nav-link submenu-trigger ${location.pathname.startsWith('/reportes') ? 'active' : ''}`}
                        >
                            Reportes
                            <span className={`arrow-icon ${reportesOpen ? 'open' : ''}`}>&gt;</span>
                        </button>
                        
                        <div className={`submenu-items ${reportesOpen ? 'show' : ''}`}>
                            <NavLink to="/reportes/general" className={({ isActive }) => isActive ? "sub-nav-link active" : "sub-nav-link"}>
                                Estadísticas Generales
                            </NavLink>
                            <NavLink to="/reportes/historial" className={({ isActive }) => isActive ? "sub-nav-link active" : "sub-nav-link"}>
                                Historial de Cambios
                            </NavLink>
                        </div>
                    </div>

                    <div className="submenu-container">
                        <button 
                            onClick={() => setAlmacenesOpen(!almacenesOpen)} 
                            className={`nav-link submenu-trigger ${location.pathname.startsWith('/almacenes') ? 'active' : ''}`}
                        >
                            Almacenes
                            <span className={`arrow-icon ${almacenesOpen ? 'open' : ''}`}>&gt;</span>
                        </button>
                        
                        <div className={`submenu-items ${almacenesOpen ? 'show' : ''}`}>
                            <NavLink to="/almacenes/stock" className={({ isActive }) => isActive ? "sub-nav-link active" : "sub-nav-link"}>
                                Stock de Activos
                            </NavLink>
                            <NavLink to="/almacenes/categorias" className={({ isActive }) => isActive ? "sub-nav-link active" : "sub-nav-link"}>
                                Categorías
                            </NavLink>
                        </div>
                    </div>

                    <div className="submenu-container">
                        <button
                            onClick={()=> setMovimientosOpen(!movimientosOpen)}
                            className={`nav-link submenu-trigger ${location.pathname.startsWith('/movimientos') ? 'active' : ''}`}
                        >
                            Movimientos
                            <span className={`arrow-icon ${movimientosOpen ? 'open' : ''}`}>&gt;</span>    
                        </button>
                        <div className={`submenu-items ${movimientosOpen ? 'show' : ''}`}>
                            <NavLink to="/movimientos/entradas" className={({ isActive }) => isActive ? "sub-nav-link active" : "sub-nav-link"}>
                                Entradas
                            </NavLink>
                            <NavLink to="/movimientos/salidas" className={({ isActive }) => isActive ? "sub-nav-link active" : "sub-nav-link"}>
                                Salidas
                            </NavLink>
                        </div>    
                    </div>


                    <NavLink to="/login" className={({ isActive }) => 
                        isActive 
                        ? "nav-link logout-link active" 
                        :  "nav-link logout-link"
                        }
                    >
                        Cerrar Sesión
                    </NavLink>
                </nav>
            </aside>
            <main className="layout-content">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
