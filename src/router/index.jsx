import { Routes, Route } from "react-router"; // Quitamos BrowserRouter de aquí
import Login from "../pages/login/index.jsx";
import Home from "../pages/home/home.jsx";

// Lo declaramos con mayúscula inicial como un componente de React real
export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
        </Routes>
    );
};