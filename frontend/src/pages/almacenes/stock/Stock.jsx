import React, { useState, useMemo, useEffect } from 'react';
import './Stock.css';
import { getStock, addStockItem } from '../../../services/api.js';

const initialMockData = [
  { id: 1, name: 'Laptop Dell XPS 13', category: 'Electrónica', quantity: 5, status: 'Disponible', tags: ['Nuevo', 'Portátil'] },
  { id: 2, name: 'Monitor LG 27"', category: 'Periféricos', quantity: 2, status: 'En uso', tags: ['4K'] },
  { id: 3, name: 'Teclado Mecánico Keychron', category: 'Periféricos', quantity: 0, status: 'Disponible', tags: ['Inalámbrico'] },
  { id: 4, name: 'Silla Ergonómica', category: 'Mobiliario', quantity: 10, status: 'Disponible', tags: ['Oficina'] },
  { id: 5, name: 'MacBook Pro M2', category: 'Electrónica', quantity: 1, status: 'En uso', tags: ['Premium'] }
];

const CRITICAL_STOCK_LEVEL = 2;

const Stock = () => {
  const [data, setData] = useState(initialMockData);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  useEffect(() => {
    // Llamamos a la API para obtener stock
    getStock()
      .then(res => {
        console.log("Stock recuperado del backend:", res);
        // Si el backend tuviera la base de datos conectada con datos, los cargaríamos:
        // if (res.data && res.data.length > 0) setData(res.data);
      })
      .catch(err => {
        console.warn("Fallo al conectar con backend para Stock. Cargando mock data offline:", err);
      });
  }, []);

  const handleTestAddItem = () => {
    // Ejemplo de llamada para guardar un nuevo ítem
    const testItem = { name: "Nuevo Activo", category: "General", quantity: 1, status: "Disponible", tags: [] };
    addStockItem(testItem)
      .then(res => console.log("Ítem enviado exitosamente al backend:", res))
      .catch(err => console.error("Error al enviar ítem al backend:", err));
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const handleToggleStatus = (id) => {
    setData(prevData => prevData.map(item => {
      if (item.id === id) {
        return { ...item, status: item.status === 'Disponible' ? 'En uso' : 'Disponible' };
      }
      return item;
    }));
  };

  const filteredAndSortedData = useMemo(() => {
    let sortableItems = [...data];

    if (searchTerm) {
      sortableItems = sortableItems.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [data, searchTerm, sortConfig]);

  return (
    <div className="stock-container">
      <header className="stock-header">
        <h2>Stock de Activos</h2>
        <div className="header-actions">
          <button className="btn btn-outline">Importar CSV</button>
          <button className="btn btn-outline">Exportar CSV</button>
          <button className="btn btn-primary" onClick={handleTestAddItem}>+ Añadir Ítem</button>
        </div>
      </header>

      <div className="stock-toolbar">
        <div className="search-bar">
          <input 
            type="text" 
            placeholder="Buscar por nombre o categoría..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="table-container">
        <table className="stock-table">
          <thead>
            <tr>
              <th onClick={() => handleSort('id')}>ID {sortConfig.key === 'id' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}</th>
              <th onClick={() => handleSort('name')}>Nombre {sortConfig.key === 'name' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}</th>
              <th onClick={() => handleSort('category')}>Categoría {sortConfig.key === 'category' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}</th>
              <th>Etiquetas</th>
              <th onClick={() => handleSort('quantity')}>Stock {sortConfig.key === 'quantity' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}</th>
              <th onClick={() => handleSort('status')}>Estado {sortConfig.key === 'status' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedData.map((item) => (
              <tr key={item.id}>
                <td>#{item.id}</td>
                <td className="fw-500">{item.name}</td>
                <td>{item.category}</td>
                <td>
                  <div className="tags-container">
                    {item.tags.map(tag => (
                      <span key={tag} className="tag-badge">{tag}</span>
                    ))}
                  </div>
                </td>
                <td>
                  <span className={`quantity-badge ${item.quantity <= CRITICAL_STOCK_LEVEL ? 'critical' : 'normal'}`}>
                    {item.quantity}
                  </span>
                </td>
                <td>
                  <button 
                    className={`status-btn ${item.status === 'Disponible' ? 'status-available' : 'status-inuse'}`}
                    onClick={() => handleToggleStatus(item.id)}
                  >
                    {item.status}
                  </button>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="btn-icon text-blue">Editar</button>
                    <button className="btn-icon text-red">Borrar</button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredAndSortedData.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center">No se encontraron ítems.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Stock;
