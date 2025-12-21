// components/LineChart.tsx
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { DailySales } from '../types/types';

interface LineChartProps {
  data: DailySales[];
  formatCurrency: (amount: number) => string;
}


export const LineChart: React.FC<LineChartProps> = ({ data, formatCurrency }) => {
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 300 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Actualizar dimensiones cuando el contenedor cambie de tamaño
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth;
        setDimensions({ width, height: 300 });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const padding = { top: 20, right: 20, bottom: 40, left: 60 };
  const graphWidth = dimensions.width - padding.left - padding.right;
  const graphHeight = dimensions.height - padding.top - padding.bottom;

  // Función para parsear fechas en formato DD/MM/YYYY
  const parseDate = (dateString: string): Date => {
    if (dateString.includes('/')) {
      const parts = dateString.split('/');
      if (parts.length === 3) {
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1; // Meses en JS son 0-11
        const year = parseInt(parts[2], 10);
        const fullYear = year < 100 ? 2000 + year : year;
        return new Date(fullYear, month, day);
      }
    }
    // Fallback: intentar parseo estándar
    return new Date(dateString);
  };

  // Preparar y ordenar datos
  const sortedSales = useMemo(() => {
    return [...data]
      .map(sale => ({
        ...sale,
        parsedDate: parseDate(sale.fecha)
      }))
      .filter(sale => !isNaN(sale.parsedDate.getTime())) // Filtrar fechas inválidas
      .sort((a, b) => a.parsedDate.getTime() - b.parsedDate.getTime());
  }, [data]);

  if (sortedSales.length === 0) {
    return (
      <div style={{ 
        border: '1px solid #e5e7eb',
        padding: '1.25rem',
        borderRadius: '0.5rem',
        backgroundColor: 'white',
        height: '300px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#9ca3af'
      }}>
        No hay datos de ventas
      </div>
    );
  }

  // Calcular valores min y max
  const maxValue = Math.max(...sortedSales.map(s => s.ventas));
  const minValue = 0;

  // Funciones de posicionamiento
  const getY = (value: number) => {
    const percentage = (value - minValue) / (maxValue - minValue);
    return graphHeight - (percentage * graphHeight);
  };

  const getX = (index: number) => {
    if (sortedSales.length === 1) return graphWidth / 2;
    return (index / (sortedSales.length - 1)) * graphWidth;
  };

  // Generar path del line chart
  const linePath = sortedSales.map((sale, i) => {
    const x = getX(i);
    const y = getY(sale.ventas);
    return i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
  }).join(' ');

  // Generar path del área bajo la línea
  const areaPath = `${linePath} L ${getX(sortedSales.length - 1)} ${graphHeight} L 0 ${graphHeight} Z`;

  // Formatear fecha para mostrar (DD/MM)
  const formatDate = (dateString: string): string => {
    const date = parseDate(dateString);
    
    if (isNaN(date.getTime())) {
      console.warn('Fecha inválida:', dateString);
      return '';
    }
    
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    return `${day}/${month}`;
  };

  // Calcular líneas de grid
  const gridLines = Array.from({ length: 5 }, (_, i) => {
    const value = minValue + ((maxValue - minValue) / 4) * i;
    const y = getY(value);
    return { y, value };
  });

  // Determinar cuántas etiquetas mostrar en el eje X
  const labelStep = Math.max(1, Math.floor(sortedSales.length / 8));

  return (
    <div style={{ 
      border: '1px solid #e5e7eb',
      padding: '1.25rem',
      borderRadius: '0.5rem',
      backgroundColor: 'white',
      width: '100%'
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

      <div 
        ref={containerRef}
        style={{ 
          position: 'relative', 
          width: '100%',
          height: `${dimensions.height}px`,
          overflow: 'hidden'
        }}
      >
        <svg 
          width={dimensions.width} 
          height={dimensions.height}
          style={{ display: 'block' }}
        >
          <defs>
            <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#10b981', stopOpacity: 0.3 }} />
              <stop offset="100%" style={{ stopColor: '#10b981', stopOpacity: 0.05 }} />
            </linearGradient>
          </defs>

          <g transform={`translate(${padding.left}, ${padding.top})`}>
            {/* Grid horizontal */}
            {gridLines.map((line, i) => (
              <g key={i}>
                <line
                  x1={0}
                  y1={line.y}
                  x2={graphWidth}
                  y2={line.y}
                  stroke="#e5e7eb"
                  strokeWidth="1"
                  strokeDasharray="3,3"
                />
                <text
                  x={-10}
                  y={line.y + 4}
                  textAnchor="end"
                  fill="#6b7280"
                  fontSize="10px"
                  fontFamily="system-ui, -apple-system, sans-serif"
                >
                  {formatCurrency(line.value)}
                </text>
              </g>
            ))}

            {/* Área bajo la línea */}
            <path
              d={areaPath}
              fill="url(#areaGradient)"
            />

            {/* Línea principal */}
            <path
              d={linePath}
              fill="none"
              stroke="#10b981"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Puntos en la línea (primera pasada - sin tooltips) */}
            {sortedSales.map((sale, i) => {
              const x = getX(i);
              const y = getY(sale.ventas);
              const isHovered = hoveredPoint === i;

              return (
                <g key={`point-${i}`}>
                  {/* Línea vertical al hacer hover */}
                  {isHovered && (
                    <line
                      x1={x}
                      y1={0}
                      x2={x}
                      y2={graphHeight}
                      stroke="#10b981"
                      strokeWidth="1"
                      strokeDasharray="2,2"
                      opacity="0.5"
                    />
                  )}

                  {/* Punto */}
                  <circle
                    cx={x}
                    cy={y}
                    r={isHovered ? 6 : 4}
                    fill="white"
                    stroke="#10b981"
                    strokeWidth={isHovered ? 3 : 2}
                    style={{ 
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={() => setHoveredPoint(i)}
                    onMouseLeave={() => setHoveredPoint(null)}
                  />
                </g>
              );
            })}

            {/* Tooltips (segunda pasada - renderizados al final para z-index correcto) */}
            {sortedSales.map((sale, i) => {
              const x = getX(i);
              const y = getY(sale.ventas);
              const isHovered = hoveredPoint === i;

              if (!isHovered) return null;

              // Determinar si el tooltip debe aparecer arriba o abajo
              const showBelow = y < 70; // Si el punto está en el tercio superior, mostrar abajo
              const tooltipY = showBelow ? y + 15 : y - 65;
              const textY1 = showBelow ? y + 30 : y - 50;
              const textY2 = showBelow ? y + 45 : y - 35;

              return (
                <g key={`tooltip-${i}`} style={{ pointerEvents: 'none' }}>
                  <rect
                    x={x - 45}
                    y={tooltipY}
                    width="90"
                    height="35"
                    fill="#111827"
                    rx="6"
                    opacity="0.95"
                  />
                  <text
                    x={x}
                    y={textY1}
                    textAnchor="middle"
                    fill="#9ca3af"
                    fontSize="11px"
                    fontWeight="500"
                    fontFamily="system-ui, -apple-system, sans-serif"
                  >
                    {formatDate(sale.fecha)}
                  </text>
                  <text
                    x={x}
                    y={textY2}
                    textAnchor="middle"
                    fill="white"
                    fontSize="13px"
                    fontWeight="700"
                    fontFamily="system-ui, -apple-system, sans-serif"
                  >
                    {formatCurrency(sale.ventas)}
                  </text>
                </g>
              );
            })}

            {/* Etiquetas del eje X */}
            {sortedSales.map((sale, i) => {
              if (i % labelStep !== 0 && i !== sortedSales.length - 1) return null;

              const x = getX(i);
              return (
                <text
                  key={i}
                  x={x}
                  y={graphHeight + 20}
                  textAnchor="middle"
                  fill="#6b7280"
                  fontSize="10px"
                  fontFamily="system-ui, -apple-system, sans-serif"
                >
                  {formatDate(sale.fecha)}
                </text>
              );
            })}
          </g>
        </svg>
      </div>

      {/* Estadísticas rápidas */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
        gap: '0.75rem',
        marginTop: '1rem',
        paddingTop: '1rem',
        borderTop: '1px solid #e5e7eb'
      }}>
        <div>
          <div style={{ fontSize: '0.7rem', color: '#6b7280', marginBottom: '0.25rem' }}>
            Promedio
          </div>
          <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#111827' }}>
            {formatCurrency(sortedSales.reduce((sum, s) => sum + s.ventas, 0) / sortedSales.length)}
          </div>
        </div>
        <div>
          <div style={{ fontSize: '0.7rem', color: '#6b7280', marginBottom: '0.25rem' }}>
            Máximo
          </div>
          <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#10b981' }}>
            {formatCurrency(maxValue)}
          </div>
        </div>
        <div>
          <div style={{ fontSize: '0.7rem', color: '#6b7280', marginBottom: '0.25rem' }}>
            Total
          </div>
          <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#111827' }}>
            {formatCurrency(sortedSales.reduce((sum, s) => sum + s.ventas, 0))}
          </div>
        </div>
      </div>
    </div>
  );
};