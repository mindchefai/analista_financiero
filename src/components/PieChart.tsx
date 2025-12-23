// components/PieChart.tsx
import React, { useState } from 'react';
import { Stats } from '../types/types';

interface PieChartProps {
  stats: Stats;
  formatCurrency: (amount: number) => string;
}

export const PieChart: React.FC<PieChartProps> = ({ stats, formatCurrency }) => {
  const [hoveredSegment, setHoveredSegment] = useState<string | null>(null);
  
  // Porcentajes sobre VENTAS (para el gráfico)
  const gastosPercentVentas = stats.ventas > 0 ? (stats.gastosGenerales / stats.ventas) * 100 : 0;
  const personalPercentVentas = stats.ventas > 0 ? (stats.personal / stats.ventas) * 100 : 0;
  const materiaPercentVentas = stats.ventas > 0 ? (stats.materiaPrima / stats.ventas) * 100 : 0;
  const otrosPercentVentas = stats.ventas > 0 ? (stats.otrosGastos / stats.ventas) * 100 : 0;
  const beneficioPercentVentas = stats.ventas > 0 ? (stats.beneficio / stats.ventas) * 100 : 0;

  if (stats.ventas === 0) {
    return (
      <div style={{ 
        border: '1px solid #e5e7eb',
        padding: '1.25rem',
        borderRadius: '0.5rem',
        backgroundColor: 'white',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#9ca3af'
      }}>
        No hay datos de ventas
      </div>
    );
  }

  const legendItems = [
    { 
      label: 'Materia Prima', 
      color: '#7c2d12', // Marrón oscuro
      value: stats.materiaPrima, 
      percentVentas: materiaPercentVentas, 
      key: 'materia', 
      bg: '#fef2f2' 
    },
    { 
      label: 'Personal', 
      color: '#991b1b', // Rojo oscuro
      value: stats.personal, 
      percentVentas: personalPercentVentas, 
      key: 'personal', 
      bg: '#fee2e2' 
    },
    { 
      label: 'Gastos Generales', 
      color: '#dc2626', // Rojo medio
      value: stats.gastosGenerales, 
      percentVentas: gastosPercentVentas, 
      key: 'gastos', 
      bg: '#fecaca' 
    },
    { 
      label: 'Otros Gastos', 
      color: '#f87171', // Rojo claro
      value: stats.otrosGastos, 
      percentVentas: otrosPercentVentas, 
      key: 'otros', 
      bg: '#fee2e2' 
    },
    { 
      label: 'Beneficio', 
      color: stats.beneficio >= 0 ? '#10b981' : '#ef4444', // Verde si positivo, rojo si negativo
      value: stats.beneficio, 
      percentVentas: beneficioPercentVentas, 
      key: 'beneficio', 
      bg: stats.beneficio >= 0 ? '#d1fae5' : '#fee2e2'
    }
  ];

  // Calcular offsets acumulativos
  let accumulatedOffset = 0;

  return (
    <div style={{ 
      border: '1px solid #e5e7eb',
      padding: '1.25rem',
      borderRadius: '0.5rem',
      backgroundColor: 'white',
      height: '100%'
    }}>
      <h4 style={{ 
        fontSize: '1rem', 
        fontWeight: 700, 
        marginBottom: '1rem',
        color: '#203c42',
        margin: '0 0 1rem 0'
      }}>
        Distribución sobre Ventas
      </h4>
      
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
        <svg width="140" height="140" viewBox="0 0 200 200">
          {legendItems.map((item) => {
            const circumference = 502.65;
            const segmentLength = (item.percentVentas / 100) * circumference;
            const offset = -(accumulatedOffset / 100) * circumference;
            accumulatedOffset += item.percentVentas;

            return (
              <circle
                key={item.key}
                cx="100" cy="100" r="80"
                fill="transparent" 
                stroke={item.color} 
                strokeWidth="40"
                strokeDasharray={`${segmentLength} ${circumference}`}
                strokeDashoffset={offset}
                transform="rotate(-90 100 100)"
                style={{ 
                  cursor: 'pointer',
                  opacity: hoveredSegment === item.key || !hoveredSegment ? 1 : 0.5,
                  transition: 'opacity 0.2s ease'
                }}
                onMouseEnter={() => setHoveredSegment(item.key)}
                onMouseLeave={() => setHoveredSegment(null)}
              />
            );
          })}
          
          {/* Centro blanco con texto */}
          <circle cx="100" cy="100" r="60" fill="white" />
          <text x="100" y="92" textAnchor="middle" style={{ fontSize: '10px', fill: '#6b7280', fontWeight: 500 }}>
            Total Ventas
          </text>
          <text x="100" y="108" textAnchor="middle" style={{ fontSize: '13px', fill: '#111827', fontWeight: 700 }}>
            {formatCurrency(stats.ventas)}
          </text>
        </svg>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {legendItems.map((item) => (
          <div 
            key={item.key}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              padding: '0.375rem',
              borderRadius: '0.3rem',
              backgroundColor: hoveredSegment === item.key ? item.bg : 'transparent',
              transition: 'background-color 0.2s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={() => setHoveredSegment(item.key)}
            onMouseLeave={() => setHoveredSegment(null)}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
              <div style={{ width: '8px', height: '8px', backgroundColor: item.color, borderRadius: '2px' }}></div>
              <span style={{ fontSize: '0.8125rem', color: '#374151', fontWeight: hoveredSegment === item.key ? 600 : 400 }}>
                {item.label}
              </span>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#111827' }}>
                {formatCurrency(item.value)}
              </span>
              <span style={{ fontSize: '0.7rem', color: '#6b7280', marginLeft: '0.375rem' }}>
                ({item.percentVentas.toFixed(1)}%)
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};