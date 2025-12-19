// components/TransactionRow.tsx
import React from 'react';
import { Sparkles } from 'lucide-react';
import { Transaction } from '../types/types';

interface TransactionRowProps {
  transaction: Transaction;
  index: number;
  total: number;
  onCategoryChange: (id: number, categoria: string) => void;
  formatCurrency: (amount: number) => string;
}

const getCategoryIcon = (cat: string | null): string => {
  const iconMap: Record<string, string> = {
    venta: '%3Cpolyline points=\'23 6 13.5 15.5 8.5 10.5 1 18\'%3E%3C/polyline%3E%3Cpolyline points=\'17 6 23 6 23 12\'%3E%3C/polyline%3E',
    gastos: '%3Cpath d=\'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z\'%3E%3C/path%3E%3Cpolyline points=\'9 22 9 12 15 12 15 22\'%3E%3C/polyline%3E',
    personal: '%3Cpath d=\'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2\'%3E%3C/path%3E%3Ccircle cx=\'9\' cy=\'7\' r=\'4\'%3E%3C/circle%3E%3Cpath d=\'M23 21v-2a4 4 0 0 0-3-3.87\'%3E%3C/path%3E%3Cpath d=\'M16 3.13a4 4 0 0 1 0 7.75\'%3E%3C/path%3E',
    materia: '%3Cline x1=\'16.5\' y1=\'9.4\' x2=\'7.5\' y2=\'4.21\'%3E%3C/line%3E%3Cpath d=\'M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z\'%3E%3C/path%3E%3Cpolyline points=\'3.27 6.96 12 12.01 20.73 6.96\'%3E%3C/polyline%3E%3Cline x1=\'12\' y1=\'22.08\' x2=\'12\' y2=\'12\'%3E%3C/line%3E',
    'no-aplica': '%3Ccircle cx=\'12\' cy=\'12\' r=\'10\'%3E%3C/circle%3E%3Cline x1=\'4.93\' y1=\'4.93\' x2=\'19.07\' y2=\'19.07\'%3E%3C/line%3E'
  };
  return iconMap[cat || ''] || '';
};

const getCategoryColor = (cat: string | null): string => {
  const colorMap: Record<string, string> = {
    venta: '%23059669',
    gastos: '%23dc2626',
    personal: '%23f97316',
    materia: '%23ec4899',
    'no-aplica': '%236b7280'
  };
  return colorMap[cat || ''] || '%239ca3af';
};

export const TransactionRow: React.FC<TransactionRowProps> = ({ 
  transaction, 
  index, 
  total, 
  onCategoryChange, 
  formatCurrency 
}) => {
  return (
    <tr 
      style={{ 
        borderBottom: index < total - 1 ? '1px solid #f3f4f6' : 'none',
        transition: 'background-color 0.2s ease'
      }}
      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
    >
      <td style={{ 
        padding: '0.75rem 1rem',
        fontSize: '0.8125rem',
        whiteSpace: 'nowrap',
        color: '#6b7280'
      }}>
        {transaction.fecha}
      </td>
      <td style={{ 
        padding: '0.75rem 1rem',
        fontSize: '0.8125rem',
        color: '#111827'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {transaction.concepto}
          {transaction.autoCategoria && (
            <Sparkles size={12} style={{ color: '#6b7280', flexShrink: 0 }} />
          )}
        </div>
      </td>
      <td style={{ 
        padding: '0.75rem 1rem',
        fontSize: '0.8125rem',
        textAlign: 'right',
        fontWeight: 600,
        whiteSpace: 'nowrap',
        color: transaction.importe >= 0 ? '#059669' : '#dc2626'
      }}>
        {formatCurrency(transaction.importe)}
      </td>
      <td style={{ padding: '0.75rem 1rem' }}>
        <select
          value={transaction.categoria || ''}
          onChange={(e) => onCategoryChange(transaction.id, e.target.value)}
          style={{ 
            width: '100%',
            padding: '0.4rem 0.75rem',
            paddingLeft: '2rem',
            border: transaction.categoria ? '1px solid #e5e7eb' : '2px solid #fbbf24',
            borderRadius: '0.375rem',
            fontSize: '0.8125rem',
            outline: 'none',
            backgroundColor: 'white',
            cursor: 'pointer',
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='${getCategoryColor(transaction.categoria)}' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E${getCategoryIcon(transaction.categoria)}%3C/svg%3E")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: '0.625rem center',
            backgroundSize: '14px 14px'
          }}
          onFocus={(e) => e.target.style.borderColor = '#e5b45f'}
          onBlur={(e) => {
            e.target.style.borderColor = transaction.categoria ? '#e5e7eb' : '#fbbf24';
          }}
        >
          <option value="">Seleccionar...</option>
          <option value="venta">Venta</option>
          <option value="gastos">Gastos Generales</option>
          <option value="personal">Personal</option>
          <option value="materia">Materia Prima</option>
          <option value="otros">Otros Gastos</option>
          <option value="no-aplica">No Aplica</option>
        </select>
      </td>
    </tr>
  );
};