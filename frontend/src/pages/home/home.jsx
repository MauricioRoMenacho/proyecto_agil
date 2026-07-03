import { useNavigate } from "react-router-dom";
import "./home.css";

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="home-container">
            <header className="home-header">
                <h1>Sistema de Gestión de Almacenes</h1>
                <p style={{ color: 'black' }}>¿Qué trabajaremos hoy?</p>
            </header>

            <div className="home-sections">
                <section className="home-section">
                    <h2 className="section-title">Reportes</h2>
                    <div className="home-dashboard">
                        <div className="stat-card" onClick={() => navigate('/reportes/general')}>
                            <h3>Estadísticas Generales</h3>
                            <p>Ver estadísticas de almacenes y movimientos</p>
                        </div>
                        <div className="stat-card" onClick={() => navigate('/reportes/historial')}>
                            <h3>Historial de Cambios</h3>
                            <p>Revisar el registro de todos los cambios</p>
                        </div>
                    </div>
                </section>

                <section className="home-section">
                    <h2 className="section-title">Almacenes</h2>
                    <div className="home-dashboard">
                        <div className="stat-card" onClick={() => navigate('/almacenes/stock')}>
                            <h3>Stock de Activos</h3>
                            <p>Gestionar y visualizar el inventario actual</p>
                        </div>
                        <div className="stat-card" onClick={() => navigate('/almacenes/categorias')}>
                            <h3>Categorías</h3>
                            <p>Administrar las categorías de los activos</p>
                        </div>
                    </div>
                </section>

                <section className="home-section">
                    <h2 className="section-title">Movimientos</h2>
                    <div className="home-dashboard">
                        <div className="stat-card" onClick={() => navigate('/movimientos/entradas')}>
                            <h3>Entradas</h3>
                            <p>Registrar nuevas entradas al almacén</p>
                        </div>
                        <div className="stat-card" onClick={() => navigate('/movimientos/salidas')}>
                            <h3>Salidas</h3>
                            <p>Registrar salidas y despachos del almacén</p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Home;
