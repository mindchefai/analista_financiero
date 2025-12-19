// components/AutoCategorizeBanner.tsx
import React from 'react';
import { Sparkles } from 'lucide-react';

interface AutoCategorizeBannerProps {
  count: number;
}

export const AutoCategorizeBanner: React.FC<AutoCategorizeBannerProps> = ({ count }) => (
  <div style={{
    background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
    border: '2px solid #60a5fa',
    borderRadius: '0.75rem',
    padding: '1rem 1.25rem',
    marginBottom: '1.5rem',
    boxShadow: '0 4px 6px rgba(96, 165, 250, 0.2)'
  }}>
    <div style={{
      display: 'flex',
      alignItems: 'start',
      gap: '1rem'
    }}>
      <div style={{
        backgroundColor: '#3b82f6',
        borderRadius: '0.5rem',
        padding: '0.5rem',
        flexShrink: 0
      }}>
        <Sparkles size={20} style={{ color: 'white' }} />
      </div>
      <div style={{ flex: 1 }}>
        <h4 style={{
          fontSize: '0.9375rem',
          fontWeight: 600,
          color: '#1e3a8a',
          margin: '0 0 0.375rem 0'
        }}>
          Categorización automática aplicada
        </h4>
        <p style={{
          fontSize: '0.8125rem',
          color: '#1e40af',
          margin: 0,
          lineHeight: '1.5'
        }}>
          Hemos categorizado <strong>{count} transacciones</strong> automáticamente basándonos en el concepto. 
          Por favor, <strong>revisa y ajusta</strong> si es necesario antes de validar.
        </p>
      </div>
    </div>
  </div>
);