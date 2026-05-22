import { BrowserRouter, Routes, Route } from "react-router";
import Login from "../pages/login";
import Home from "../pages/home";

const router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<Home />} />
            </Routes>
        </BrowserRouter>
    );
};