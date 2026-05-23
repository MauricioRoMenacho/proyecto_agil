import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Login = () => {
    const navigate = useNavigate();

    const handLoginRedirect = (e) => {
        e.preventDefault();
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
                        <input type="text" id="username" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" />
                    </div>
                    <button type="submit" className="login-button">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;

