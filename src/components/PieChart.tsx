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

  // Separar costes del beneficio
  const costItems = [
    { 
      label: 'Materia Prima', 
      color: '#7c2d12',
      value: stats.materiaPrima, 
      percentVentas: materiaPercentVentas, 
      key: 'materia', 
      bg: '#fef2f2' 
    },
    { 
      label: 'Personal', 
      color: '#991b1b',
      value: stats.personal, 
      percentVentas: personalPercentVentas, 
      key: 'personal', 
      bg: '#fee2e2' 
    },
    { 
      label: 'Gastos Generales', 
      color: '#dc2626',
      value: stats.gastosGenerales, 
      percentVentas: gastosPercentVentas, 
      key: 'gastos', 
      bg: '#fecaca' 
    },
    { 
      label: 'Otros Gastos', 
      color: '#f87171',
      value: stats.otrosGastos, 
      percentVentas: otrosPercentVentas, 
      key: 'otros', 
      bg: '#fee2e2' 
    }
  ];

  const beneficioItem = { 
    label: 'Beneficio', 
    color: stats.beneficio >= 0 ? '#10b981' : '#ef4444',
    value: stats.beneficio, 
    percentVentas: beneficioPercentVentas, 
    key: 'beneficio', 
    bg: stats.beneficio >= 0 ? '#d1fae5' : '#fee2e2'
  };

  const allItems = [...costItems, beneficioItem];

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
        color: '#203c42',
        margin: '0 0 0.5rem 0'
      }}>
        Desglose de Ventas
      </h4>
      <p style={{ 
        fontSize: '0.75rem', 
        color: '#6b7280',
        margin: '0 0 1rem 0',
        fontStyle: 'italic'
      }}>
        Porcentajes calculados sobre ventas totales
      </p>
      
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
        <svg width="140" height="140" viewBox="0 0 200 200">
          {allItems.map((item) => {
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
          <text x="100" y="95" textAnchor="middle" style={{ fontSize: '10px', fill: '#6b7280', fontWeight: 500 }}>
            Ventas
          </text>
          <text x="100" y="110" textAnchor="middle" style={{ fontSize: '12px', fill: '#111827', fontWeight: 700 }}>
            {formatCurrency(stats.ventas)}
          </text>
        </svg>
      </div>

      {/* Sección de COSTES */}
      <div style={{ marginBottom: '1rem' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0.5rem 0.25rem',
          borderBottom: '2px solid #e5e7eb',
          marginBottom: '0.5rem'
        }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#dc2626', textTransform: 'uppercase' }}>
            Costes Totales
          </span>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#dc2626' }}>
              {formatCurrency(stats.totalCostes)}
            </span>
            <span style={{ fontSize: '0.7rem', color: '#6b7280', marginLeft: '0.375rem' }}>
              ({((stats.totalCostes / stats.ventas) * 100).toFixed(1)}%)
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem', paddingLeft: '0.5rem' }}>
          {costItems.map((item) => (
            <div 
              key={item.key}
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                padding: '0.25rem 0.375rem',
                borderRadius: '0.3rem',
                backgroundColor: hoveredSegment === item.key ? item.bg : 'transparent',
                transition: 'background-color 0.2s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={() => setHoveredSegment(item.key)}
              onMouseLeave={() => setHoveredSegment(null)}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                <div style={{ width: '6px', height: '6px', backgroundColor: item.color, borderRadius: '2px' }}></div>
                <span style={{ fontSize: '0.75rem', color: '#4b5563', fontWeight: hoveredSegment === item.key ? 600 : 400 }}>
                  {item.label}
                </span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#111827' }}>
                  {formatCurrency(item.value)}
                </span>
                <span style={{ fontSize: '0.675rem', color: '#9ca3af', marginLeft: '0.25rem' }}>
                  ({item.percentVentas.toFixed(1)}%)
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sección de BENEFICIO */}
      <div 
        style={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0.5rem 0.375rem',
          borderRadius: '0.375rem',
          backgroundColor: hoveredSegment === beneficioItem.key ? beneficioItem.bg : '#f0fdf4',
          border: '2px solid ' + (stats.beneficio >= 0 ? '#86efac' : '#fca5a5'),
          transition: 'all 0.2s ease',
          cursor: 'pointer'
        }}
        onMouseEnter={() => setHoveredSegment(beneficioItem.key)}
        onMouseLeave={() => setHoveredSegment(null)}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ 
            width: '10px', 
            height: '10px', 
            backgroundColor: beneficioItem.color, 
            borderRadius: '2px',
            boxShadow: '0 0 0 2px white, 0 0 0 3px ' + beneficioItem.color
          }}></div>
          <span style={{ fontSize: '0.875rem', color: '#111827', fontWeight: 700 }}>
            {beneficioItem.label}
          </span>
        </div>
        <div style={{ textAlign: 'right' }}>
          <span style={{ fontSize: '0.875rem', fontWeight: 700, color: beneficioItem.color }}>
            {formatCurrency(beneficioItem.value)}
          </span>
          <span style={{ fontSize: '0.75rem', color: '#6b7280', marginLeft: '0.375rem' }}>
            ({beneficioItem.percentVentas.toFixed(1)}%)
          </span>
        </div>
      </div>
    </div>
  );
};