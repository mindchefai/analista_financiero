// components/BarChart.tsx
import React, { useState } from 'react';
import { DailySales } from '../types/types';

interface BarChartProps {
  data: DailySales[];
  formatCurrency: (amount: number) => string;
}

export const BarChart: React.FC<BarChartProps> = ({ data, formatCurrency }) => {
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  const maxVentas = Math.max(...data.map(d => d.ventas), 0);
  
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
        Ventas por Día
      </h4>

      <div style={{ 
        display: 'flex', 
        alignItems: 'flex-end', 
        justifyContent: 'space-between',
        height: '180px',
        gap: '0.375rem',
        paddingTop: '0.75rem'
      }}>
        {data.length > 0 ? data.map((day, idx) => {
          const height = (day.ventas / maxVentas) * 100;
          const isHovered = hoveredBar === idx;
          
          return (
            <div 
              key={idx} 
              style={{ 
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.375rem'
              }}
              onMouseEnter={() => setHoveredBar(idx)}
              onMouseLeave={() => setHoveredBar(null)}
            >
              <div style={{ 
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                flex: 1,
                justifyContent: 'flex-end'
              }}>
                <span style={{ 
                  fontSize: '0.65rem', 
                  color: '#059669',
                  fontWeight: 600,
                  marginBottom: '0.2rem',
                  opacity: isHovered ? 1 : 0.7,
                  transition: 'opacity 0.2s ease'
                }}>
                  {formatCurrency(day.ventas)}
                </span>
                <div style={{ 
                  width: '100%',
                  minWidth: '28px',
                  maxWidth: '45px',
                  height: `${height}%`,
                  minHeight: '16px',
                  backgroundColor: '#059669',
                  borderRadius: '0.2rem 0.2rem 0 0',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  opacity: isHovered ? 1 : 0.85,
                  transform: isHovered ? 'scaleY(1.05)' : 'scaleY(1)',
                  transformOrigin: 'bottom'
                }}></div>
              </div>
              <span style={{ 
                fontSize: '0.6rem', 
                color: '#6b7280',
                transform: 'rotate(-45deg)',
                whiteSpace: 'nowrap',
                marginTop: '0.625rem',
                fontWeight: isHovered ? 600 : 400,
                transition: 'font-weight 0.2s ease'
              }}>
                {day.fecha.split('/').slice(0, 2).join('/')}
              </span>
            </div>
          );
        }) : (
          <div style={{ 
            width: '100%', 
            height: '100%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            color: '#9ca3af',
            fontSize: '0.875rem'
          }}>
            No hay datos de ventas
          </div>
        )}
      </div>
    </div>
  );
};