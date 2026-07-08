import React, { useState, useMemo, useEffect } from 'react';
import './Stock.css';
import {
  getStock,
  addStockItem,
  updateStockItem,
  deleteStockItem,
  getCategorias,
} from '../../../services/api.js';

// Datos de respaldo (solo se muestran si el backend no responde).
const initialMockData = [
  { id: 1, name: 'Laptop Dell XPS 13', category: 'Electrónica', quantity: 5, status: 'Disponible', tags: ['Nuevo', 'Portátil'] },
  { id: 2, name: 'Monitor LG 27"', category: 'Periféricos', quantity: 2, status: 'En uso', tags: ['4K'] },
  { id: 3, name: 'Teclado Mecánico Keychron', category: 'Periféricos', quantity: 0, status: 'Disponible', tags: ['Inalámbrico'] },
  { id: 4, name: 'Silla Ergonómica', category: 'Mobiliario', quantity: 10, status: 'Disponible', tags: ['Oficina'] },
  { id: 5, name: 'MacBook Pro M2', category: 'Electrónica', quantity: 1, status: 'En uso', tags: ['Premium'] }
];

const CRITICAL_STOCK_LEVEL = 2;

// Estado inicial del formulario (vacío = crear nuevo)
const emptyForm = { id: null, name: '', category_id: '', quantity: 0, status: 'Disponible', tags: '' };

const Stock = () => {
  const [data, setData] = useState(initialMockData);
  const [categorias, setCategorias] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [form, setForm] = useState(emptyForm);
  const [showForm, setShowForm] = useState(false);

  // Cargar stock y categorías desde el backend al iniciar
  useEffect(() => {
    cargarStock();
    getCategorias()
      .then(res => setCategorias(res))
      .catch(err => console.warn('No se pudieron cargar categorías:', err));
  }, []);

  const cargarStock = () => {
    getStock()
      .then(res => setData(res)) // usamos los datos reales de la BD
      .catch(err => console.warn('Fallo al conectar con backend. Mostrando datos de respaldo:', err));
  };

  // Abrir el formulario para CREAR
  const handleNuevo = () => {
    setForm(emptyForm);
    setShowForm(true);
  };

  // Abrir el formulario para EDITAR (rellena con los datos del ítem)
  const handleEditar = (item) => {
    setForm({
      id: item.id,
      name: item.name,
      category_id: item.category_id || '',
      quantity: item.quantity,
      status: item.status,
      tags: (item.tags || []).join(', '), // el array de tags se muestra separado por comas
    });
    setShowForm(true);
  };

  // Guardar (crear o editar según si hay id)
  const handleGuardar = async (e) => {
    e.preventDefault();
    // Convertimos el texto de tags "a, b, c" en un arreglo ['a','b','c']
    const payload = {
      name: form.name,
      category_id: form.category_id ? parseInt(form.category_id) : null,
      quantity: parseInt(form.quantity) || 0,
      status: form.status,
      tags: form.tags ? form.tags.split(',').map(t => t.trim()).filter(t => t) : [],
    };

    try {
      if (form.id) {
        await updateStockItem(form.id, payload); // HU5 editar
      } else {
        await addStockItem(payload); // HU3 crear
      }
      setShowForm(false);
      setForm(emptyForm);
      cargarStock(); // recargamos la tabla con los datos actualizados
    } catch (err) {
      alert('Error al guardar: ' + err.message);
    }
  };

  // Eliminar un ítem (HU6)
  const handleBorrar = async (id) => {
    if (!window.confirm('¿Seguro que deseas eliminar este ítem?')) return;
    try {
      await deleteStockItem(id);
      cargarStock();
    } catch (err) {
      alert('Error al eliminar: ' + err.message);
    }
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const filteredAndSortedData = useMemo(() => {
    let sortableItems = [...data];

    if (searchTerm) {
      sortableItems = sortableItems.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.category || '').toLowerCase().includes(searchTerm.toLowerCase())
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
          <button className="btn btn-primary" onClick={handleNuevo}>+ Añadir Ítem</button>
        </div>
      </header>

      {/* Formulario para crear / editar un activo */}
      {showForm && (
        <form className="stock-form" onSubmit={handleGuardar} style={{ background: '#f9fafb', padding: '16px', borderRadius: '8px', marginBottom: '16px', display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'flex-end' }}>
          <div>
            <label>Nombre<br />
              <input type="text" required value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </label>
          </div>
          <div>
            <label>Categoría<br />
              <select value={form.category_id}
                onChange={(e) => setForm({ ...form, category_id: e.target.value })}>
                <option value="">-- Sin categoría --</option>
                {categorias.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </label>
          </div>
          <div>
            <label>Cantidad<br />
              <input type="number" min="0" value={form.quantity}
                onChange={(e) => setForm({ ...form, quantity: e.target.value })} />
            </label>
          </div>
          <div>
            <label>Estado<br />
              <select value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}>
                <option value="Disponible">Disponible</option>
                <option value="En uso">En uso</option>
              </select>
            </label>
          </div>
          <div>
            <label>Etiquetas (separadas por coma)<br />
              <input type="text" value={form.tags}
                onChange={(e) => setForm({ ...form, tags: e.target.value })} />
            </label>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button type="submit" className="btn btn-primary">{form.id ? 'Guardar cambios' : 'Crear'}</button>
            <button type="button" className="btn btn-outline" onClick={() => setShowForm(false)}>Cancelar</button>
          </div>
        </form>
      )}

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
                <td>{item.category || '-'}</td>
                <td>
                  <div className="tags-container">
                    {(item.tags || []).map(tag => (
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
                  <span className={`status-btn ${item.status === 'Disponible' ? 'status-available' : 'status-inuse'}`}>
                    {item.status}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="btn-icon text-blue" onClick={() => handleEditar(item)}>Editar</button>
                    <button className="btn-icon text-red" onClick={() => handleBorrar(item.id)}>Borrar</button>
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
