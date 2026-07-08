import React, { useState, useEffect } from 'react';
import './Categorias.css';
import {
  getCategorias,
  addCategoria,
  updateCategoria,
  deleteCategoria,
} from '../../../services/api.js';

// Datos de respaldo (solo si el backend no responde)
const initialCategories = [
  { id: 1, name: 'Electrónica', description: 'Dispositivos como laptops, monitores, etc.', itemCount: 15 },
  { id: 2, name: 'Periféricos', description: 'Teclados, ratones, cables.', itemCount: 42 },
  { id: 3, name: 'Mobiliario', description: 'Sillas, escritorios, estantes.', itemCount: 10 },
  { id: 4, name: 'Licencias de Software', description: 'Licencias anuales o perpetuas', itemCount: 5 }
];

const emptyForm = { id: null, name: '', description: '' };

const Categorias = () => {
  const [categories, setCategories] = useState(initialCategories);
  const [form, setForm] = useState(emptyForm);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    cargarCategorias();
  }, []);

  const cargarCategorias = () => {
    getCategorias()
      .then(res => setCategories(res)) // datos reales de la BD
      .catch(err => console.warn('Fallo al conectar con backend. Mostrando respaldo:', err));
  };

  const handleNueva = () => {
    setForm(emptyForm);
    setShowForm(true);
  };

  const handleEditar = (cat) => {
    setForm({ id: cat.id, name: cat.name, description: cat.description || '' });
    setShowForm(true);
  };

  const handleGuardar = async (e) => {
    e.preventDefault();
    const payload = { name: form.name, description: form.description };
    try {
      if (form.id) {
        await updateCategoria(form.id, payload); // HU7 editar
      } else {
        await addCategoria(payload); // HU4 crear
      }
      setShowForm(false);
      setForm(emptyForm);
      cargarCategorias();
    } catch (err) {
      alert('Error al guardar: ' + err.message);
    }
  };

  const handleBorrar = async (id) => {
    if (!window.confirm('¿Seguro que deseas eliminar esta categoría?')) return;
    try {
      await deleteCategoria(id); // HU7 eliminar
      cargarCategorias();
    } catch (err) {
      alert('Error al eliminar: ' + err.message);
    }
  };

  return (
    <div className="categories-container">
      <header className="categories-header">
        <h2>Categorías de Activos</h2>
        <button className="btn btn-primary" onClick={handleNueva}>+ Nueva Categoría</button>
      </header>

      {/* Formulario crear / editar */}
      {showForm && (
        <form onSubmit={handleGuardar} style={{ background: '#f9fafb', padding: '16px', borderRadius: '8px', marginBottom: '16px', display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'flex-end' }}>
          <div>
            <label>Nombre<br />
              <input type="text" required value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </label>
          </div>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <label>Descripción<br />
              <input type="text" style={{ width: '100%' }} value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })} />
            </label>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button type="submit" className="btn btn-primary">{form.id ? 'Guardar cambios' : 'Crear'}</button>
            <button type="button" className="btn btn-outline" onClick={() => setShowForm(false)}>Cancelar</button>
          </div>
        </form>
      )}

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
                    <button className="btn-icon text-blue" onClick={() => handleEditar(cat)}>Editar</button>
                    <button className="btn-icon text-red" onClick={() => handleBorrar(cat.id)}>Borrar</button>
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
