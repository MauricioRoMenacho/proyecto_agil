import React, { useState } from 'react';
import './Categorias.css';

const initialCategories = [
  { id: 1, name: 'Electrónica', description: 'Dispositivos como laptops, monitores, etc.', itemCount: 15 },
  { id: 2, name: 'Periféricos', description: 'Teclados, ratones, cables.', itemCount: 42 },
  { id: 3, name: 'Mobiliario', description: 'Sillas, escritorios, estantes.', itemCount: 10 },
  { id: 4, name: 'Licencias de Software', description: 'Licencias anuales o perpetuas', itemCount: 5 }
];

const Categorias = () => {
  const [categories, setCategories] = useState(initialCategories);

  return (
    <div className="categories-container">
      <header className="categories-header">
        <h2>Categorías de Activos</h2>
        <button className="btn btn-primary">+ Nueva Categoría</button>
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
