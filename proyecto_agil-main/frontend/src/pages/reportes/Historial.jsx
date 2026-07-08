import React, { useState, useEffect } from 'react';
import './Historial.css';
import { getMovimientos } from '../../services/api.js';

// Datos de respaldo (solo si el backend no responde)
const historialMock = [
  { id: 1, fecha: '2026-06-01 10:30', action: 'Cambio de Estado', item: 'Laptop Dell XPS 13', user: 'Admin', details: 'De Disponible a En uso' },
  { id: 2, fecha: '2026-06-01 09:15', action: 'Creación', item: 'Silla Ergonómica', user: 'Admin', details: 'Añadido 10 unidades' },
];

const Historial = () => {
  const [historialData, setHistorialData] = useState(historialMock);

  useEffect(() => {
    getMovimientos()
      .then(res => setHistorialData(res)) // datos reales de la BD (HU10)
      .catch(err => console.warn('Fallo al conectar con backend. Mostrando respaldo:', err));
  }, []);

  // Formatea la fecha (viene como timestamp de PostgreSQL)
  const formatFecha = (fecha) => {
    if (!fecha) return '-';
    const d = new Date(fecha);
    return isNaN(d) ? fecha : d.toLocaleString();
  };

  return (
    <div className="historial-container">
      <header className="historial-header">
        <h2>Historial de Movimientos</h2>
        <p className="text-muted">Registro de todas las acciones en el sistema</p>
      </header>

      <div className="table-container">
        <table className="historial-table">
          <thead>
            <tr>
              <th>Fecha y Hora</th>
              <th>Acción</th>
              <th>Ítem</th>
              <th>Usuario</th>
              <th>Detalles</th>
            </tr>
          </thead>
          <tbody>
            {historialData.map((record) => (
              <tr key={record.id}>
                <td className="text-muted">{formatFecha(record.fecha)}</td>
                <td>
                  <span className={`action-badge action-${record.action.split(' ')[0].toLowerCase()}`}>
                    {record.action}
                  </span>
                </td>
                <td className="fw-500">{record.item}</td>
                <td>{record.user}</td>
                <td className="text-muted">{record.details}</td>
              </tr>
            ))}
            {historialData.length === 0 && (
              <tr><td colSpan="5" className="text-center">Sin movimientos registrados.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Historial;
