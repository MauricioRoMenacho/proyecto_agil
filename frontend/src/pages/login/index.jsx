import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/api.js";
import "./login.css";

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handLoginRedirect = async (e) => {
        e.preventDefault();
        
        try {
            // Llamamos a la API del backend
            const response = await loginUser(username, password);
            console.log("Login respondido por backend:", response);
        } catch (error) {
            console.warn("Fallo al conectar con el backend. Continuando en modo offline:", error);
        }

        navigate('/home');
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
                    <button type="submit" className="login-button">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;

