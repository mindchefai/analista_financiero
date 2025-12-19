// components/CompactKPI.tsx
import React, { useState } from 'react';

interface CompactKPIProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  variant: 'success' | 'danger';
  tooltip?: string;
}

export const CompactKPI: React.FC<CompactKPIProps> = ({ 
  title, 
  value, 
  icon, 
  variant, 
  tooltip 
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  
  return (
    <div 
      style={{ 
        border: '1px solid #e5e7eb',
        padding: 'clamp(0.625rem, 2vw, 0.875rem)',
        borderRadius: '0.5rem',
        backgroundColor: 'white',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        transition: 'transform 0.2s ease',
        position: 'relative',
        minWidth: 0
      }}
      className="hover-lift"
    >
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        marginBottom: '0.375rem', 
        gap: '0.25rem' 
      }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.25rem', 
          minWidth: 0, 
          flex: 1 
        }}>
          <h4 style={{ 
            fontSize: 'clamp(0.625rem, 1.5vw, 0.7rem)', 
            fontWeight: 600, 
            textTransform: 'uppercase', 
            letterSpacing: '0.05em',
            color: '#6b7280',
            margin: 0,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>
            {title}
          </h4>
          {tooltip && (
            <div 
              style={{ position: 'relative', display: 'inline-flex', flexShrink: 0 }}
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              <svg 
                width="12" 
                height="12" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="#9ca3af" 
                strokeWidth="2"
                style={{ cursor: 'help' }}
              >
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
              {showTooltip && (
                <div style={{
                  position: 'absolute',
                  bottom: 'calc(100% + 0.5rem)',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  backgroundColor: '#1f2937',
                  color: 'white',
                  padding: '0.5rem 0.75rem',
                  borderRadius: '0.375rem',
                  fontSize: '0.75rem',
                  whiteSpace: 'nowrap',
                  zIndex: 1000,
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  animation: 'fadeIn 0.2s ease'
                }}>
                  {tooltip}
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 0,
                    height: 0,
                    borderLeft: '5px solid transparent',
                    borderRight: '5px solid transparent',
                    borderTop: '5px solid #1f2937'
                  }}></div>
                </div>
              )}
            </div>
          )}
        </div>
        <div style={{ 
          padding: '0.25rem', 
          borderRadius: '0.3rem',
          backgroundColor: variant === 'success' ? '#dcfce7' : '#fee2e2',
          flexShrink: 0
        }}>
          {React.cloneElement(icon as React.ReactElement, { 
            size: 14, 
            style: { color: variant === 'success' ? '#059669' : '#dc2626' } 
          })}
        </div>
      </div>
      <p style={{ 
        fontSize: 'clamp(1rem, 3vw, 1.25rem)', 
        fontWeight: 700,
        color: variant === 'success' ? '#059669' : '#dc2626',
        margin: 0,
        wordBreak: 'break-word'
      }}>
        {value}
      </p>
    </div>
  );
};