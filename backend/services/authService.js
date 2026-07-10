import { Usuario } from '../models/index.js';
import bcrypt from 'bcryptjs';

// Valida las credenciales del usuario (HU1 + HU-SEC1).
// - Usa el ORM (Usuario.findOne), que ya evita inyección SQL (HU-SEC3).
// - Compara la contraseña con bcrypt.compare (nunca en texto plano).
// Devuelve los datos del usuario (sin la contraseña) o null si falla.
export const authenticate = async (username, password) => {
    const user = await Usuario.findOne({ where: { username } });

    // No existe el usuario
    if (!user) {
        return null;
    }

    // Comparar la contraseña ingresada contra el hash guardado
    const passwordOk = await bcrypt.compare(password, user.password);
    if (!passwordOk) {
        return null;
    }

    // Devolvemos el usuario SIN la contraseña
    return { id: user.id, username: user.username, role: user.role };
};
