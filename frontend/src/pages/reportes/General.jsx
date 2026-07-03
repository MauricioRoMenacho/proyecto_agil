import React from 'react';
import './General.css';

const summaryData = {
  totalAssets: 154,
  criticalAssets: 8,
  totalValue: '$45,200',
  inUseAssets: 62
};

const categoryData = [
  { name: 'Electrónica', total: 60 },
  { name: 'Periféricos', total: 40 },
  { name: 'Mobiliario', total: 35 },
  { name: 'Software', total: 19 },
];

const statusData = [
  { name: 'Disponible', value: 92 },
  { name: 'En uso', value: 62 },
];

const COLORS = ['#10b981', '#f59e0b']; // Verde para Disponible, Naranja para En uso

const General = () => {
  return (
    <div className="report-container">
      <header className="report-header">
        <h2>Estadísticas Generales</h2>
        <p className="text-muted">Resumen del estado del inventario actual</p>
      </header>

      <div className="summary-cards">
        <div className="summary-card">
          <h4>Total Activos</h4>
          <p className="stat-number">{summaryData.totalAssets}</p>
        </div>
        <div className="summary-card">
          <h4>En Uso</h4>
          <p className="stat-number text-orange">{summaryData.inUseAssets}</p>
        </div>
        <div className="summary-card">
          <h4>Nivel Crítico</h4>
          <p className="stat-number text-red">{summaryData.criticalAssets}</p>
        </div>
        <div className="summary-card">
          <h4>Valor Est.</h4>
          <p className="stat-number text-blue">{summaryData.totalValue}</p>
        </div>
      </div>

      <div className="charts-container">
        <div className="chart-box">
          <h3>Distribución por Estado</h3>
          <div className="simple-pie">
            {statusData.map((item, index) => (
              <div key={index} className="pie-item" style={{width: `${(item.value / 154) * 100}%`, backgroundColor: COLORS[index]}}>
                <span className="pie-label">{item.name}: {item.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="chart-box">
          <h3>Distribución por Categoría</h3>
          <div className="simple-bars">
            {categoryData.map((item, index) => (
              <div key={index} className="bar-item">
                <label>{item.name}</label>
                <div className="bar-container">
                  <div className="bar" style={{width: `${(item.total / 60) * 100}%`, backgroundColor: '#3b82f6'}}>
                    <span className="bar-value">{item.total}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default General;
