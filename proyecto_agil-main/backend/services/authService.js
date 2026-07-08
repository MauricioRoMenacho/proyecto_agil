import pool from '../db.js';
import bcrypt from 'bcryptjs';

// Valida las credenciales del usuario (HU1 + HU-SEC1 + HU-SEC3).
// - Consulta parametrizada ($1) para evitar inyección SQL.
// - Compara la contraseña con bcrypt.compare (nunca en texto plano).
// Devuelve los datos del usuario (sin la contraseña) o null si falla.
export const authenticate = async (username, password) => {
    const result = await pool.query(
        'SELECT id, username, password, role FROM usuarios WHERE username = $1',
        [username]
    );

    // No existe el usuario
    if (result.rows.length === 0) {
        return null;
    }

    const user = result.rows[0];

    // Comparar la contraseña ingresada contra el hash guardado
    const passwordOk = await bcrypt.compare(password, user.password);
    if (!passwordOk) {
        return null;
    }

    // Devolvemos el usuario SIN la contraseña
    return { id: user.id, username: user.username, role: user.role };
};
