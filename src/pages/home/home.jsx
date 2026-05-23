import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/layout/Layout.jsx";
import "./home.css";

const Home = () => {
    const navigate = useNavigate();

    const handHomeRedirect = () => {
        navigate('/login');
    }

    useEffect(() => {
        console.log("Home page loaded");
    }, []);

    return (
        <Layout>
            <div className="home-container">
                <header className="home-header">
                    <h1>Inicio</h1>
                    <p>Bienvenido al gestor de tu Proyecto Ágil.</p>
                </header>


                <div className="home-actions">
                    <button className="btn-secondary" onClick={handHomeRedirect}>
                        Volver a Login
                    </button>
                </div>
            </div>
        </Layout>
    );
};

export default Home;
