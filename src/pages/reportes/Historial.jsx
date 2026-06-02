import React from 'react';
import './Historial.css';

const historialData = [
  { id: 1, date: '2026-06-01 10:30', action: 'Cambio de Estado', item: 'Laptop Dell XPS 13', user: 'Admin', details: 'De Disponible a En uso' },
  { id: 2, date: '2026-06-01 09:15', action: 'Creación', item: 'Silla Ergonómica', user: 'Admin', details: 'Añadido 10 unidades' },
  { id: 3, date: '2026-05-31 16:45', action: 'Actualización Stock', item: 'Teclado Mecánico Keychron', user: 'Supervisor', details: 'Stock reducido a 0 (Crítico)' },
  { id: 4, date: '2026-05-30 11:20', action: 'Edición', item: 'Monitor LG 27"', user: 'Admin', details: 'Cambio de categoría a Periféricos' },
];

const Historial = () => {
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
                <td className="text-muted">{record.date}</td>
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
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Historial;
