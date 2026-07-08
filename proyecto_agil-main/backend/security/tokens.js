import crypto from 'crypto';

// Almacén simple de sesiones en memoria: token -> datos del usuario.
// Al iniciar sesión se crea un token; el frontend lo guarda y lo reenvía
// en la cabecera Authorization. El middleware lo valida (HU-SEC2).
// Nota: al reiniciar el servidor se pierden los tokens (hay que volver a loguear).
const tokens = new Map();

// Crear un token nuevo para un usuario ya autenticado.
export const createToken = (user) => {
    const token = crypto.randomUUID();
    tokens.set(token, user);
    return token;
};

// Obtener el usuario asociado a un token (o undefined si no existe).
export const getUserByToken = (token) => tokens.get(token);

// Cerrar sesión: eliminar el token.
export const removeToken = (token) => tokens.delete(token);
