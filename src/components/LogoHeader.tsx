// components/LogoHeader.tsx
import React from 'react';

interface LogoHeaderProps {
  onLogout?: () => void;
}

export const LogoHeader: React.FC<LogoHeaderProps> = ({ onLogout }) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1 }}>
      <div style={{ 
        backgroundColor: 'rgba(255,255,255,0.1)', 
        padding: '0.5rem', 
        borderRadius: '0.4rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <img 
          src="/MindChef_white.png" 
          alt="MindChef Logo" 
          style={{ 
            width: '36px', 
            height: '36px',
            objectFit: 'contain'
          }}
          onError={(e) => {
            e.currentTarget.style.display = 'none';
            e.currentTarget.parentElement!.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M18 20V10M12 20V4M6 20v-6"></path></svg>';
          }}
        />
      </div>
      <div>
        <h1 style={{ 
          fontSize: 'clamp(1.125rem, 3vw, 1.5rem)', 
          fontWeight: 700, 
          color: 'white', 
          margin: 0, 
          lineHeight: 1.2 
        }}>
          MindChef
        </h1>
        <p style={{ 
          color: 'white', 
          fontSize: 'clamp(0.75rem, 2vw, 0.875rem)', 
          opacity: 0.8, 
          fontWeight: 300, 
          margin: '0.125rem 0 0 0' 
        }}>
          Análisis de gastos e ingresos
        </p>
      </div>
    </div>
    
    {onLogout && (
      <button
        onClick={onLogout}
        style={{
          padding: '0.5rem 1rem',
          borderRadius: '0.5rem',
          border: '1px solid rgba(255,255,255,0.3)',
          backgroundColor: 'rgba(255,255,255,0.1)',
          color: 'white',
          fontSize: '0.875rem',
          fontWeight: 500,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          transition: 'all 0.2s ease',
          backdropFilter: 'blur(10px)',
          whiteSpace: 'nowrap'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)';
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
          <polyline points="16 17 21 12 16 7"></polyline>
          <line x1="21" y1="12" x2="9" y2="12"></line>
        </svg>
        Salir
      </button>
    )}
  </div>
);