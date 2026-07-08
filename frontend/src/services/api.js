const API_URL = 'http://localhost:3000'; // Puerto por defecto del backend

/**
 * Función definida para enviar las credenciales de Login al backend.
 * @param {string} username 
 * @param {string} password 
 */
export const loginUser = async (username, password) => {
    // Función definida, la lógica real se hará a mano
    try {
        const response = await fetch(`${API_URL}/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
        if (!response.ok) throw new Error('Error en el login');
        return await response.json();
    } catch (error) {
        console.error("Error en loginUser:", error);
        throw error;
    }
};

/**
 * Función definida para obtener la lista de stock desde el backend.
 */
export const getStock = async () => {
    // Función definida, la lógica real se hará a mano
    try {
        const response = await fetch(`${API_URL}/api/stock`);
        if (!response.ok) throw new Error('Error al obtener el stock');
        return await response.json();
    } catch (error) {
        console.error("Error en getStock:", error);
        throw error;
    }
};

/**
 * Función definida para agregar un nuevo ítem al stock en el backend.
 * @param {Object} item 
 */
export const addStockItem = async (item) => {
    // Función definida, la lógica real se hará a mano
    try {
        const response = await fetch(`${API_URL}/api/stock`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        });
        if (!response.ok) throw new Error('Error al guardar el ítem en el stock');
        return await response.json();
    } catch (error) {
        console.error("Error en addStockItem:", error);
        throw error;
    }
};

/**
 * Función definida para obtener las categorías desde el backend.
 */
export const getCategorias = async () => {
    // Función definida, la lógica real se hará a mano
    try {
        const response = await fetch(`${API_URL}/api/categorias`);
        if (!response.ok) throw new Error('Error al obtener categorías');
        return await response.json();
    } catch (error) {
        console.error("Error en getCategorias:", error);
        throw error;
    }
};

/**
 * Función definida para agregar una nueva categoría en el backend.
 * @param {Object} categoria 
 */
export const addCategoria = async (categoria) => {
    // Función definida, la lógica real se hará a mano
    try {
        const response = await fetch(`${API_URL}/api/categorias`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(categoria)
        });
        if (!response.ok) throw new Error('Error al guardar la categoría');
        return await response.json();
    } catch (error) {
        console.error("Error en addCategoria:", error);
        throw error;
    }
};
