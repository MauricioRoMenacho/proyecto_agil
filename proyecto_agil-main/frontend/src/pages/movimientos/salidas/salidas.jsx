import React, { useState, useEffect } from 'react';
import './salidas.css';
import { getStock, addSalida } from '../../../services/api.js';

// HU9: registrar una SALIDA de stock (resta unidades a un activo).
// El backend valida que no quede stock negativo.
const Salidas = () => {
  const [activos, setActivos] = useState([]);
  const [activoId, setActivoId] = useState('');
  const [cantidad, setCantidad] = useState(1);
  const [detalle, setDetalle] = useState('');
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    getStock()
      .then(res => setActivos(res))
      .catch(err => console.warn('No se pudo cargar la lista de activos:', err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');
    try {
      const res = await addSalida({
        activo_id: parseInt(activoId),
        quantity: parseInt(cantidad),
        details: detalle,
      });
      setMensaje(`✅ Salida registrada. Nuevo stock: ${res.activo.quantity}`);
      setCantidad(1);
      setDetalle('');
    } catch (err) {
      // Aquí llega el error "Stock insuficiente" del backend
      setMensaje('❌ ' + err.message);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Registrar Salida</h2>
      <p className="text-muted">Descuenta unidades del stock de un activo.</p>

      <form onSubmit={handleSubmit} style={{ maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
        <label>Activo
          <select required value={activoId} onChange={(e) => setActivoId(e.target.value)} style={{ width: '100%' }}>
            <option value="">-- Selecciona un activo --</option>
            {activos.map(a => (
              <option key={a.id} value={a.id}>{a.name} (stock: {a.quantity})</option>
            ))}
          </select>
        </label>

        <label>Cantidad a retirar
          <input type="number" min="1" required value={cantidad}
            onChange={(e) => setCantidad(e.target.value)} style={{ width: '100%' }} />
        </label>

        <label>Detalle (opcional)
          <input type="text" value={detalle}
            onChange={(e) => setDetalle(e.target.value)} style={{ width: '100%' }} />
        </label>

        <button type="submit" className="btn btn-primary">Registrar Salida</button>
      </form>

      {mensaje && <p style={{ marginTop: '16px' }}>{mensaje}</p>}
    </div>
  );
};

export default Salidas;
