// URL del backend: se toma del .env (VITE_API_URL). Si no existe, usa localhost:3000.
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// ==========================================================
// Manejo del token de sesión (HU-SEC2)
// Guardamos el token en localStorage para reenviarlo en cada
// petición protegida (crear, editar, eliminar).
// ==========================================================
export const saveToken = (token) => localStorage.setItem('token', token);
export const getToken = () => localStorage.getItem('token');
export const clearToken = () => localStorage.removeItem('token');

// Cabeceras para peticiones protegidas: JSON + Authorization
const authHeaders = () => ({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getToken() || ''}`,
});

// ==========================================================
// AUTENTICACIÓN
// ==========================================================

/**
 * Envía las credenciales de Login al backend y guarda el token.
 */
export const loginUser = async (username, password) => {
    const response = await fetch(`${API_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });
    if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || 'Error en el login');
    }
    const data = await response.json();
    if (data.token) saveToken(data.token); // guardamos la sesión
    return data; // { token, user }
};

/**
 * Cierra la sesión en el backend y borra el token local.
 */
export const logoutUser = async () => {
    try {
        await fetch(`${API_URL}/api/logout`, {
            method: 'POST',
            headers: authHeaders(),
        });
    } catch (error) {
        console.warn('No se pudo avisar al backend del logout:', error);
    }
    clearToken();
};

// ==========================================================
// STOCK (activos)
// ==========================================================

/** Obtener la lista de stock (HU2). */
export const getStock = async () => {
    const response = await fetch(`${API_URL}/api/stock`);
    if (!response.ok) throw new Error('Error al obtener el stock');
    return await response.json();
};

/** Crear un nuevo ítem de stock (HU3). Protegido. */
export const addStockItem = async (item) => {
    const response = await fetch(`${API_URL}/api/stock`, {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify(item),
    });
    if (!response.ok) throw new Error('Error al guardar el ítem en el stock');
    return await response.json();
};

/** Editar un ítem de stock (HU5). Protegido. */
export const updateStockItem = async (id, item) => {
    const response = await fetch(`${API_URL}/api/stock/${id}`, {
        method: 'PUT',
        headers: authHeaders(),
        body: JSON.stringify(item),
    });
    if (!response.ok) throw new Error('Error al actualizar el ítem');
    return await response.json();
};

/** Eliminar un ítem de stock (HU6). Protegido. */
export const deleteStockItem = async (id) => {
    const response = await fetch(`${API_URL}/api/stock/${id}`, {
        method: 'DELETE',
        headers: authHeaders(),
    });
    if (!response.ok) throw new Error('Error al eliminar el ítem');
    return await response.json();
};

// ==========================================================
// CATEGORÍAS
// ==========================================================

/** Obtener las categorías (HU4). */
export const getCategorias = async () => {
    const response = await fetch(`${API_URL}/api/categorias`);
    if (!response.ok) throw new Error('Error al obtener categorías');
    return await response.json();
};

/** Crear una nueva categoría (HU4). Protegido. */
export const addCategoria = async (categoria) => {
    const response = await fetch(`${API_URL}/api/categorias`, {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify(categoria),
    });
    if (!response.ok) throw new Error('Error al guardar la categoría');
    return await response.json();
};

/** Editar una categoría (HU7). Protegido. */
export const updateCategoria = async (id, categoria) => {
    const response = await fetch(`${API_URL}/api/categorias/${id}`, {
        method: 'PUT',
        headers: authHeaders(),
        body: JSON.stringify(categoria),
    });
    if (!response.ok) throw new Error('Error al actualizar la categoría');
    return await response.json();
};

/** Eliminar una categoría (HU7). Protegido. */
export const deleteCategoria = async (id) => {
    const response = await fetch(`${API_URL}/api/categorias/${id}`, {
        method: 'DELETE',
        headers: authHeaders(),
    });
    if (!response.ok) throw new Error('Error al eliminar la categoría');
    return await response.json();
};

// ==========================================================
// MOVIMIENTOS (entradas / salidas / historial)
// ==========================================================

/** Obtener el historial de movimientos (HU10). */
export const getMovimientos = async () => {
    const response = await fetch(`${API_URL}/api/movimientos`);
    if (!response.ok) throw new Error('Error al obtener el historial');
    return await response.json();
};

/** Registrar una entrada de stock (HU8). Protegido. */
export const addEntrada = async (movimiento) => {
    const response = await fetch(`${API_URL}/api/movimientos/entrada`, {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify(movimiento),
    });
    if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || 'Error al registrar la entrada');
    }
    return await response.json();
};

/** Registrar una salida de stock (HU9). Protegido. */
export const addSalida = async (movimiento) => {
    const response = await fetch(`${API_URL}/api/movimientos/salida`, {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify(movimiento),
    });
    if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || 'Error al registrar la salida');
    }
    return await response.json();
};

// ==========================================================
// REPORTES (estadísticas generales)
// ==========================================================

/** Obtener las estadísticas generales calculadas en la BD. */
export const getEstadisticas = async () => {
    const response = await fetch(`${API_URL}/api/reportes`);
    if (!response.ok) throw new Error('Error al obtener las estadísticas');
    return await response.json();
};
