import { useEffect } from "react";
import { useNavigate } from "react-router-dom"

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
        <div className="form-container">
            <h1>Login</h1>
            <form onSubmit={handLoginRedirect}>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" /><br />
                <label htmlFor="password">Password</label>
                <input type="password" id="password" /><br />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
