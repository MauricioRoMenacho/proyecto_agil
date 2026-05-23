import React from 'react';
import { NavLink } from 'react-router-dom';
import './layout.css';

const Layout = ({ children }) => {
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
                    <NavLink to="/login" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                        Cerrar Sesión
                    </NavLink>
                </nav>
            </aside>
            <main className="layout-content">
                {children}
            </main>
        </div>
    );
};

export default Layout;
