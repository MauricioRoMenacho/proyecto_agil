import React, { useState, useEffect } from 'react';
import './General.css';
import { getEstadisticas } from '../../services/api.js';

const COLORS = ['#10b981', '#f59e0b', '#3b82f6', '#ef4444']; // colores para el gráfico de estado

// Estado inicial en cero; los valores reales llegan del backend.
const resumenInicial = { totalAssets: 0, criticalAssets: 0, totalUnits: 0, inUseAssets: 0 };

const General = () => {
  const [summary, setSummary] = useState(resumenInicial);
  const [categoryData, setCategoryData] = useState([]);
  const [statusData, setStatusData] = useState([]);

  useEffect(() => {
    getEstadisticas()
      .then(res => {
        setSummary(res.summary || resumenInicial);
        setCategoryData(res.byCategory || []);
        setStatusData(res.byStatus || []);
      })
      .catch(err => console.warn('Fallo al conectar con backend para estadísticas:', err));
  }, []);

  // Totales para calcular los porcentajes de las barras (evitando dividir entre 0)
  const totalEstados = statusData.reduce((acc, s) => acc + s.value, 0) || 1;
  const maxCategoria = Math.max(1, ...categoryData.map(c => c.total));

  return (
    <div className="report-container">
      <header className="report-header">
        <h2>Estadísticas Generales</h2>
        <p className="text-muted">Resumen del estado del inventario actual</p>
      </header>

      <div className="summary-cards">
        <div className="summary-card">
          <h4>Total Activos</h4>
          <p className="stat-number">{summary.totalAssets}</p>
        </div>
        <div className="summary-card">
          <h4>En Uso</h4>
          <p className="stat-number text-orange">{summary.inUseAssets}</p>
        </div>
        <div className="summary-card">
          <h4>Nivel Crítico</h4>
          <p className="stat-number text-red">{summary.criticalAssets}</p>
        </div>
        <div className="summary-card">
          <h4>Unidades Totales</h4>
          <p className="stat-number text-blue">{summary.totalUnits}</p>
        </div>
      </div>

      <div className="charts-container">
        <div className="chart-box">
          <h3>Distribución por Estado</h3>
          <div className="simple-pie">
            {statusData.map((item, index) => (
              <div key={index} className="pie-item" style={{ width: `${(item.value / totalEstados) * 100}%`, backgroundColor: COLORS[index % COLORS.length] }}>
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
                  <div className="bar" style={{ width: `${(item.total / maxCategoria) * 100}%`, backgroundColor: '#3b82f6' }}>
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
