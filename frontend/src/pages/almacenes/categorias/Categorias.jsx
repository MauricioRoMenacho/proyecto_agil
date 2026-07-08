import React, { useState, useEffect } from 'react';
import './Categorias.css';
import { getCategorias, addCategoria } from '../../../services/api.js';

const initialCategories = [
  { id: 1, name: 'Electrónica', description: 'Dispositivos como laptops, monitores, etc.', itemCount: 15 },
  { id: 2, name: 'Periféricos', description: 'Teclados, ratones, cables.', itemCount: 42 },
  { id: 3, name: 'Mobiliario', description: 'Sillas, escritorios, estantes.', itemCount: 10 },
  { id: 4, name: 'Licencias de Software', description: 'Licencias anuales o perpetuas', itemCount: 5 }
];

const Categorias = () => {
  const [categories, setCategories] = useState(initialCategories);

  useEffect(() => {
    // Obtener categorías desde el backend
    getCategorias()
      .then(res => {
        console.log("Categorías obtenidas del backend:", res);
        // Si el backend tuviera la base de datos conectada con datos, los cargaríamos:
        // if (res.data && res.data.length > 0) setCategories(res.data);
      })
      .catch(err => {
        console.warn("Fallo al conectar con backend para Categorías. Cargando mock data offline:", err);
      });
  }, []);

  const handleTestAddCategory = () => {
    // Ejemplo de llamada para guardar una nueva categoría
    const testCategory = { name: "Nueva Categoría", description: "Descripción de prueba", itemCount: 0 };
    addCategoria(testCategory)
      .then(res => console.log("Categoría enviada al backend:", res))
      .catch(err => console.error("Error al guardar categoría en el backend:", err));
  };

  return (
    <div className="categories-container">
      <header className="categories-header">
        <h2>Categorías de Activos</h2>
        <button className="btn btn-primary" onClick={handleTestAddCategory}>+ Nueva Categoría</button>
      </header>

      <div className="table-container">
        <table className="categories-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Total Ítems</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat.id}>
                <td>#{cat.id}</td>
                <td className="fw-500">{cat.name}</td>
                <td className="text-muted">{cat.description}</td>
                <td>
                  <span className="count-badge">{cat.itemCount}</span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="btn-icon text-blue">Editar</button>
                    <button className="btn-icon text-red">Borrar</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Categorias;
