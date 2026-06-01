import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";

const Home = () => {
    const navigate = useNavigate();

    const handHomeRedirect = () => {
        navigate('/login');
    }


    return (
        <div className="home-container">
            <header className="home-header">
                <h1>Sistema de Gestión de Almacenes</h1>
                <p style={{ color: 'black' }}>¿Qué trabajaremos hoy?</p>
            </header>
        </div>
    );
};

export default Home;
