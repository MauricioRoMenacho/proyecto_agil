import { useEffect } from "react";
import { useNavigate } from "react-router-dom"

const Home = () => {
    const navigate = useNavigate();

    const handHomeRedirect = () => {
        navigate('/login');
    }

    return (
        <div className="form-container">
            <h1>Home</h1>
            <button onClick={handHomeRedirect}>Login</button>
        </div>
    );
};

export default Home;