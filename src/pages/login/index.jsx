import { useEffect } from "react";


const Login = () => {
    useEffect(() => {
        console.log("Login page");
    }, []);

    return (
        <div className="form-container">
            <h1>Login</h1>
            <form action="">
                <label htmlFor="username">Username</label>
                <input type="text" id="username" />
                <label htmlFor="password">Password</label>
                <input type="password" id="password" />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
