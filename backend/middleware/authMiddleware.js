import { getUserByToken } from '../security/tokens.js';

// Middleware de autenticación (HU-SEC2 / OWASP A01 Broken Access Control).
// Protege los endpoints que crean, editan o eliminan datos.
// Si no llega un token válido, responde 401 y NO deja pasar la petición.
export const requireAuth = (req, res, next) => {
    // Se espera la cabecera:  Authorization: Bearer <token>
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : header;

    const user = token ? getUserByToken(token) : undefined;

    if (!user) {
        return res.status(401).json({ error: 'No autorizado. Inicia sesión.' });
    }

    // Guardamos el usuario en la petición para usarlo en los controladores
    // (por ejemplo, saber quién hizo una entrada o salida).
    req.user = user;
    next();
};
