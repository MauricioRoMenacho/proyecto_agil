import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/api.js";
import "./login.css";

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handLoginRedirect = async (e) => {
        e.preventDefault();
        setError("");

        try {
            // Llamamos a la API del backend. Si es correcto, guarda el token
            // y entramos a home. Si falla, mostramos el error (no entramos).
            const response = await loginUser(username, password);
            console.log("Login respondido por backend:", response);
            navigate('/home');
        } catch (error) {
            console.warn("Fallo el login:", error);
            setError(error.message || "No se pudo iniciar sesión.");
        }
    }

    useEffect(() => {
        console.log("Login page");
    }, []);

    return (
        <div className="login-wrapper">
            <div className="form-container">
                <h1>Login</h1>
                <form onSubmit={handLoginRedirect}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input 
                            type="text" 
                            id="username" 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
                    <button type="submit" className="login-button">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;

