import * as authService from '../services/authService.js';
import { createToken, removeToken } from '../security/tokens.js';

// HU1: iniciar sesión.
export const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'Usuario y contraseña son obligatorios.' });
        }

        const user = await authService.authenticate(username, password);
        if (!user) {
            // Mismo mensaje para usuario o contraseña incorrectos (buena práctica)
            return res.status(401).json({ error: 'Credenciales inválidas.' });
        }

        // Crear token de sesión y devolverlo junto con los datos del usuario
        const token = createToken(user);
        return res.json({ token, user });
    } catch (err) {
        console.error('Error en login:', err.message);
        return res.status(500).json({ error: 'Error interno del servidor.' });
    }
};

// Cerrar sesión: invalida el token enviado.
export const logout = (req, res) => {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : header;
    removeToken(token);
    return res.json({ message: 'Sesión cerrada.' });
};
