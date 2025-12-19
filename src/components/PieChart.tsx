// components/PieChart.tsx
import React, { useState } from 'react';
import { Stats } from '../types/types';

interface PieChartProps {
  stats: Stats;
  formatCurrency: (amount: number) => string;
}

export const PieChart: React.FC<PieChartProps> = ({ stats, formatCurrency }) => {
  const [hoveredSegment, setHoveredSegment] = useState<string | null>(null);
  
  const total = stats.gastosGenerales + stats.personal + stats.materiaPrima + stats.otrosGastos;
  const gastosPercent = stats.ratios.gastosVentas;
  const personalPercent = stats.ratios.personalVentas;
  const materiaPercent = stats.ratios.materiaVentas;
  const otrosPercent = stats.ratios.otrosVentas;

  if (total === 0) {
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
        No hay datos de costes
      </div>
    );
  }

  const legendItems = [
    { 
      label: 'Gastos Generales', 
      color: '#dc2626', 
      value: stats.gastosGenerales, 
      percent: gastosPercent, 
      key: 'gastos', 
      bg: '#fef2f2' 
    },
    { 
      label: 'Personal', 
      color: '#f97316', 
      value: stats.personal, 
      percent: personalPercent, 
      key: 'personal', 
      bg: '#fff7ed' 
    },
    { 
      label: 'Materia Prima', 
      color: '#ec4899', 
      value: stats.materiaPrima, 
      percent: materiaPercent, 
      key: 'materia', 
      bg: '#fdf2f8' 
    },
    { 
      label: 'Otros Gastos', 
      color: '#8b5cf6', 
      value: stats.otrosGastos, 
      percent: otrosPercent, 
      key: 'otros', 
      bg: '#faf5ff' 
    }
  ];

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
        Estructura de Costes
      </h4>
      
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
        <svg width="140" height="140" viewBox="0 0 200 200">
          {/* Gastos Generales */}
          <circle
            cx="100" cy="100" r="80"
            fill="transparent" stroke="#dc2626" strokeWidth="40"
            strokeDasharray={`${(gastosPercent / 100) * 502.65} 502.65`}
            transform="rotate(-90 100 100)"
            style={{ 
              cursor: 'pointer',
              opacity: hoveredSegment === 'gastos' || !hoveredSegment ? 1 : 0.5,
              transition: 'opacity 0.2s ease'
            }}
            onMouseEnter={() => setHoveredSegment('gastos')}
            onMouseLeave={() => setHoveredSegment(null)}
          />
          {/* Personal */}
          <circle
            cx="100" cy="100" r="80"
            fill="transparent" stroke="#f97316" strokeWidth="40"
            strokeDasharray={`${(personalPercent / 100) * 502.65} 502.65`}
            strokeDashoffset={-((gastosPercent / 100) * 502.65)}
            transform="rotate(-90 100 100)"
            style={{ 
              cursor: 'pointer',
              opacity: hoveredSegment === 'personal' || !hoveredSegment ? 1 : 0.5,
              transition: 'opacity 0.2s ease'
            }}
            onMouseEnter={() => setHoveredSegment('personal')}
            onMouseLeave={() => setHoveredSegment(null)}
          />
          {/* Materia Prima */}
          <circle
            cx="100" cy="100" r="80"
            fill="transparent" stroke="#ec4899" strokeWidth="40"
            strokeDasharray={`${(materiaPercent / 100) * 502.65} 502.65`}
            strokeDashoffset={-(((gastosPercent + personalPercent) / 100) * 502.65)}
            transform="rotate(-90 100 100)"
            style={{ 
              cursor: 'pointer',
              opacity: hoveredSegment === 'materia' || !hoveredSegment ? 1 : 0.5,
              transition: 'opacity 0.2s ease'
            }}
            onMouseEnter={() => setHoveredSegment('materia')}
            onMouseLeave={() => setHoveredSegment(null)}
          />
          {/* Otros Gastos */}
          <circle
            cx="100" cy="100" r="80"
            fill="transparent" stroke="#8b5cf6" strokeWidth="40"
            strokeDasharray={`${(otrosPercent / 100) * 502.65} 502.65`}
            strokeDashoffset={-(((gastosPercent + personalPercent + materiaPercent) / 100) * 502.65)}
            transform="rotate(-90 100 100)"
            style={{ 
              cursor: 'pointer',
              opacity: hoveredSegment === 'otros' || !hoveredSegment ? 1 : 0.5,
              transition: 'opacity 0.2s ease'
            }}
            onMouseEnter={() => setHoveredSegment('otros')}
            onMouseLeave={() => setHoveredSegment(null)}
          />
          {/* Centro blanco con texto */}
          <circle cx="100" cy="100" r="60" fill="white" />
          <text x="100" y="92" textAnchor="middle" style={{ fontSize: '10px', fill: '#6b7280', fontWeight: 500 }}>
            Total
          </text>
          <text x="100" y="108" textAnchor="middle" style={{ fontSize: '13px', fill: '#111827', fontWeight: 700 }}>
            {formatCurrency(total)}
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
                ({item.percent}%)
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};