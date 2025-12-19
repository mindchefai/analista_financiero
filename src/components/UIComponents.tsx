// components/UIComponents.tsx
import React from 'react';
import { Check } from 'lucide-react';

export const FileRequirements: React.FC = () => (
  <div style={{
    backgroundColor: '#f9fafb',
    border: '1px solid #e5e7eb',
    borderRadius: '0.5rem',
    padding: '1rem',
    maxWidth: '28rem',
    margin: '0 auto 1.5rem auto',
    textAlign: 'left'
  }}>
    <p style={{ 
      fontSize: '0.8125rem',
      fontWeight: 600,
      color: '#374151',
      marginBottom: '0.625rem',
      margin: '0 0 0.625rem 0'
    }}>
      MindChef solo necesita que el documento contenga:
    </p>
    <ul style={{ 
      listStyle: 'none', 
      padding: 0, 
      margin: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: '0.375rem'
    }}>
      {['Fecha', 'Concepto', 'Importe'].map((item) => (
        <li key={item} style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.5rem',
          fontSize: '0.8125rem',
          color: '#6b7280'
        }}>
          <Check size={14} style={{ color: '#059669', flexShrink: 0 }} />
          <span><strong>{item}</strong></span>
        </li>
      ))}
    </ul>
    <p style={{ 
      fontSize: '0.7rem',
      color: '#6b7280',
      marginTop: '0.625rem',
      margin: '0.625rem 0 0 0',
      fontStyle: 'italic'
    }}>
      Formatos: Excel (.xlsx, .xls) o CSV
    </p>
  </div>
);

export const SecurityBadge: React.FC = () => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    padding: '0.625rem 1rem',
    backgroundColor: '#f0fdf4',
    border: '1px solid #bbf7d0',
    borderRadius: '0.5rem',
    maxWidth: '32rem',
    margin: '0 auto 1rem auto'
  }}>
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>
    <p style={{ 
      fontSize: '0.75rem',
      color: '#15803d',
      margin: 0,
      lineHeight: '1.3'
    }}>
      Tus datos son privados y solo se usan para generar tu análisis financiero. No se almacenan ni comparten con terceros.
    </p>
  </div>
);

export const FAQ: React.FC = () => (
  <details style={{
    maxWidth: '32rem',
    margin: '0 auto',
    padding: '0.875rem',
    backgroundColor: '#fffbeb',
    border: '1px solid #fde68a',
    borderRadius: '0.5rem',
    cursor: 'pointer'
  }}>
    <summary style={{
      fontSize: '0.8125rem',
      fontWeight: 500,
      color: '#92400e',
      cursor: 'pointer',
      listStyle: 'none',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    }}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#92400e" strokeWidth="2">
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
        <line x1="12" y1="17" x2="12.01" y2="17"></line>
      </svg>
      ¿Qué pasa si mi banco añade más columnas?
    </summary>
    <p style={{
      fontSize: '0.75rem',
      color: '#78350f',
      marginTop: '0.625rem',
      margin: '0.625rem 0 0 0',
      lineHeight: '1.4'
    }}>
      No hay problema. Ignoramos el resto de la información y solo usamos Fecha, Concepto e Importe.
    </p>
  </details>
);