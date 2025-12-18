import React from 'react';

// Tipos para las props de los componentes estilizados
interface TabButtonProps {
  active: boolean;
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

interface KPICardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  variant?: 'default' | 'success' | 'profit' | 'loss' | 'gradient';
}

interface ProgressBarProps {
  label: string;
  percentage: string;
  amount: string;
  color: string;
}

// Estilos globales
export const GlobalStyles: React.FC = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
    
    * {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      box-sizing: border-box;
    }
    
    body {
      margin: 0;
      padding: 0;
    }
    
    .hover-lift:hover {
      transform: translateY(-2px);
      transition: all 0.3s ease;
    }
    
    .transition-all {
      transition: all 0.2s ease;
    }
  `}</style>
);

// Contenedor principal
export const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
    {children}
  </div>
);

// Wrapper del contenido
export const ContentWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ backgroundColor: 'white', minHeight: '100vh' }}>
    {children}
  </div>
);

// Header
export const Header: React.FC<{ icon: React.ReactNode; title: string; subtitle: string }> = ({ 
  icon, 
  title, 
  subtitle 
}) => (
  <div style={{ 
    background: '#203c42',
    padding: '1.5rem 1rem'
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <div style={{ 
        backgroundColor: 'rgba(255,255,255,0.1)', 
        padding: '0.75rem', 
        borderRadius: '0.5rem',
        flexShrink: 0
      }}>
        {icon}
      </div>
      <div style={{ minWidth: 0 }}>
        <h1 style={{ 
          fontSize: 'clamp(1.25rem, 5vw, 1.875rem)',
          fontWeight: 700,
          color: 'white',
          margin: 0,
          lineHeight: 1.2
        }}>
          {title}
        </h1>
        <p style={{ 
          color: 'white',
          marginTop: '0.25rem',
          opacity: 0.8,
          fontWeight: 300,
          fontSize: 'clamp(0.8rem, 3vw, 1rem)',
          margin: '0.25rem 0 0 0'
        }}>
          {subtitle}
        </p>
      </div>
    </div>
  </div>
);

// Tabs Container
export const TabsContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ 
    display: 'flex', 
    borderBottom: '1px solid #e5e7eb', 
    backgroundColor: '#f9fafb' 
  }}>
    {children}
  </div>
);

// Tab Button
export const TabButton: React.FC<TabButtonProps> = ({ active, disabled, onClick, children }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    style={{
      flex: 1,
      padding: 'clamp(0.75rem, 3vw, 1rem) clamp(0.5rem, 2vw, 1.5rem)',
      fontWeight: 500,
      transition: 'all 0.2s ease',
      position: 'relative',
      color: active ? '#203c42' : disabled ? '#d1d5db' : '#6b7280',
      backgroundColor: active ? 'white' : 'transparent',
      cursor: disabled ? 'not-allowed' : 'pointer',
      border: 'none',
      fontSize: 'clamp(0.8rem, 2.5vw, 1rem)'
    }}
  >
    {active && (
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '2px',
        backgroundColor: '#e5b45f'
      }}></div>
    )}
    {children}
  </button>
);

// Content Area
export const ContentArea: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ padding: 'clamp(1rem, 3vw, 2rem)' }}>{children}</div>
);

// Upload Area
export const UploadArea: React.FC<{ 
  icon: React.ReactNode; 
  title: string; 
  description: string;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ icon, title, description, onFileChange }) => (
  <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
    <div style={{ 
      marginBottom: '1.5rem', 
      display: 'inline-block', 
      padding: '1.5rem', 
      borderRadius: '9999px',
      backgroundColor: '#f9fafb' 
    }}>
      {icon}
    </div>
    <h3 style={{ 
      fontSize: 'clamp(1.25rem, 4vw, 1.5rem)',
      fontWeight: 600,
      marginBottom: '0.75rem',
      color: '#203c42',
      margin: '0 0 0.75rem 0'
    }}>
      {title}
    </h3>
    <p style={{ 
      marginBottom: '2rem',
      maxWidth: '28rem',
      marginLeft: 'auto',
      marginRight: 'auto',
      color: '#6b7280',
      fontSize: 'clamp(0.875rem, 2.5vw, 1rem)',
      margin: '0 auto 2rem auto',
      padding: '0 1rem'
    }}>
      {description}
    </p>
    <label 
      style={{ 
        display: 'inline-block',
        color: 'white',
        padding: 'clamp(0.75rem, 2vw, 1rem) clamp(1.5rem, 4vw, 2rem)',
        borderRadius: '0.5rem',
        cursor: 'pointer',
        fontWeight: 500,
        backgroundColor: '#203c42',
        fontSize: 'clamp(0.875rem, 2.5vw, 1rem)',
        transition: 'all 0.2s ease'
      }}
    >
      Seleccionar archivo
      <input
        type="file"
        accept=".csv"
        onChange={onFileChange}
        style={{ display: 'none' }}
      />
    </label>
  </div>
);

// Section Header
export const SectionHeader: React.FC<{ 
  title: string; 
  subtitle: string;
  children?: React.ReactNode;
}> = ({ title, subtitle, children }) => (
  <div style={{ 
    display: 'flex', 
    flexDirection: 'column',
    gap: '1rem',
    marginBottom: '1.5rem'
  }}>
    <div>
      <h3 style={{ 
        fontSize: 'clamp(1.125rem, 3vw, 1.25rem)',
        fontWeight: 600,
        marginBottom: '0.25rem',
        margin: '0 0 0.25rem 0',
        color: '#203c42'
      }}>
        {title}
      </h3>
      <p style={{ 
        fontSize: 'clamp(0.8rem, 2vw, 0.875rem)',
        color: '#6b7280',
        margin: 0
      }}>
        {subtitle}
      </p>
    </div>
    {children && (
      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap',
        gap: '0.5rem'
      }}>
        {children}
      </div>
    )}
  </div>
);

// Primary Button
export const PrimaryButton: React.FC<{ 
  onClick: () => void; 
  icon?: React.ReactNode;
  children: React.ReactNode;
}> = ({ onClick, icon, children }) => (
  <button
    onClick={onClick}
    style={{ 
      color: 'white',
      padding: 'clamp(0.5rem, 2vw, 0.625rem) clamp(1rem, 3vw, 1.5rem)',
      borderRadius: '0.5rem',
      fontWeight: 500,
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontSize: 'clamp(0.8rem, 2vw, 0.875rem)',
      background: '#e5b45f',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.2s ease'
    }}
  >
    {icon}
    {children}
  </button>
);

// Secondary Button
export const SecondaryButton: React.FC<{ 
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  children: React.ReactNode;
}> = ({ onFileChange, children }) => (
  <label 
    style={{ 
      padding: 'clamp(0.5rem, 2vw, 0.625rem) clamp(1rem, 3vw, 1.25rem)',
      borderRadius: '0.5rem',
      cursor: 'pointer',
      fontWeight: 500,
      fontSize: 'clamp(0.8rem, 2vw, 0.875rem)',
      transition: 'all 0.2s ease',
      backgroundColor: '#f3f4f6',
      color: '#374151',
      display: 'inline-block'
    }}
  >
    {children}
    <input
      type="file"
      accept=".csv"
      onChange={onFileChange}
      style={{ display: 'none' }}
    />
  </label>
);

// Table Container
export const TableContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ 
    overflowX: 'auto',
    border: '1px solid #e5e7eb',
    borderRadius: '0.5rem',
    WebkitOverflowScrolling: 'touch'
  }}>
    <table style={{ width: '100%', minWidth: '600px' }}>{children}</table>
  </div>
);

// Table Header
export const TableHeader: React.FC<{ columns: string[] }> = ({ columns }) => (
  <thead>
    <tr style={{ 
      borderBottom: '1px solid #e5e7eb',
      backgroundColor: '#f9fafb'
    }}>
      {columns.map((col, idx) => (
        <th 
          key={idx}
          style={{ 
            padding: 'clamp(0.75rem, 2vw, 1rem)',
            textAlign: idx === 2 ? 'right' : 'left',
            fontSize: 'clamp(0.65rem, 1.5vw, 0.75rem)',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: '#6b7280'
          }}
        >
          {col}
        </th>
      ))}
    </tr>
  </thead>
);

// KPI Card
export const KPICard: React.FC<KPICardProps> = ({ title, value, icon, variant = 'default' }) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'success':
        return {
          bg: '#dcfce7',
          iconColor: '#16a34a',
          textColor: '#111827'
        };
      case 'default':
        return {
          bg: '#dbeafe',
          iconColor: '#2563eb',
          textColor: '#111827'
        };
      case 'profit':
        return {
          cardBg: '#d1fae5',
          borderColor: '#a7f3d0',
          bg: '#a7f3d0',
          iconColor: '#059669',
          titleColor: '#047857',
          textColor: '#064e3b'
        };
      case 'loss':
        return {
          cardBg: '#fee2e2',
          borderColor: '#fecaca',
          bg: '#fecaca',
          iconColor: '#dc2626',
          titleColor: '#b91c1c',
          textColor: '#7f1d1d'
        };
      case 'gradient':
        return {
          cardBg: 'linear-gradient(135deg, #fef3c7 0%, #fed7aa 100%)',
          borderColor: '#fcd34d',
          bg: '#fde68a',
          iconColor: '#d97706',
          titleColor: '#92400e',
          textColor: '#78350f'
        };
      default:
        return {
          bg: '#dcfce7',
          iconColor: '#16a34a',
          textColor: '#111827'
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <div 
      style={{ 
        border: '1px solid',
        padding: 'clamp(1rem, 3vw, 1.5rem)',
        borderRadius: '0.5rem',
        backgroundColor: variant === 'default' || variant === 'success' ? 'white' : styles.cardBg,
        borderColor: styles.borderColor || '#e5e7eb',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        background: variant === 'gradient' ? styles.cardBg : undefined,
        transition: 'all 0.2s ease'
      }}
    >
      <div style={{ 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1rem'
      }}>
        <h4 
          style={{ 
            fontSize: 'clamp(0.65rem, 1.5vw, 0.75rem)',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: styles.titleColor || '#6b7280',
            margin: 0
          }}
        >
          {title}
        </h4>
        <div style={{ 
          padding: '0.5rem',
          borderRadius: '0.5rem',
          backgroundColor: styles.bg 
        }}>
          {React.cloneElement(icon as React.ReactElement, { 
            size: 20, 
            style: { color: styles.iconColor } 
          })}
        </div>
      </div>
      <p style={{ 
        fontSize: 'clamp(1.5rem, 4vw, 1.875rem)',
        fontWeight: 700,
        color: styles.textColor,
        margin: 0
      }}>
        {value}
      </p>
    </div>
  );
};

// Progress Bar
export const ProgressBar: React.FC<ProgressBarProps> = ({ label, percentage, amount, color }) => (
  <div>
    <div style={{ 
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '0.5rem',
      flexWrap: 'wrap',
      gap: '0.5rem'
    }}>
      <span style={{ 
        fontWeight: 500,
        color: '#374151',
        fontSize: 'clamp(0.875rem, 2vw, 1rem)'
      }}>
        {label}
      </span>
      <div style={{ textAlign: 'right' }}>
        <span style={{ 
          fontWeight: 700,
          fontSize: 'clamp(1rem, 2.5vw, 1.125rem)',
          color 
        }}>
          {percentage}%
        </span>
        <span style={{ 
          fontSize: 'clamp(0.8rem, 2vw, 0.875rem)',
          marginLeft: '0.5rem',
          color: '#6b7280' 
        }}>
          {amount}
        </span>
      </div>
    </div>
    <div style={{ 
      width: '100%',
      borderRadius: '9999px',
      height: '0.5rem',
      overflow: 'hidden',
      backgroundColor: '#e5e7eb' 
    }}>
      <div
        style={{ 
          height: '0.5rem',
          borderRadius: '9999px',
          width: `${Math.min(parseFloat(percentage), 100)}%`,
          backgroundColor: color,
          background: color.includes('gradient') ? color : undefined,
          transition: 'width 0.6s ease'
        }}
      />
    </div>
  </div>
);

// Cost Structure Card
export const CostStructureCard: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ 
    border: '1px solid #e5e7eb',
    padding: 'clamp(1.5rem, 4vw, 2rem)',
    borderRadius: '0.5rem',
    marginBottom: '2rem',
    backgroundColor: '#f9fafb'
  }}>
    <h4 style={{ 
      fontSize: 'clamp(1rem, 3vw, 1.125rem)',
      fontWeight: 700,
      marginBottom: '1.5rem',
      color: '#203c42',
      margin: '0 0 1.5rem 0'
    }}>
      Estructura de Costes
    </h4>
    <div style={{ 
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem'
    }}>
      {children}
    </div>
  </div>
);

// Executive Summary Card
export const ExecutiveSummaryCard: React.FC<{ 
  items: Array<{ label: string; value: string }> 
}> = ({ items }) => (
  <div style={{
    padding: 'clamp(1.5rem, 4vw, 2rem)',
    borderRadius: '0.5rem',
    color: 'white',
    background: '#203c42'
  }}>
    <h4 style={{ 
      fontSize: 'clamp(1.125rem, 3vw, 1.25rem)',
      fontWeight: 700,
      marginBottom: '1.5rem',
      margin: '0 0 1.5rem 0'
    }}>
      Resumen Ejecutivo
    </h4>
    <div style={{ 
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '2rem'
    }}>
      {items.map((item, idx) => (
        <div key={idx}>
          <p style={{ 
            fontSize: 'clamp(0.8rem, 2vw, 0.875rem)',
            marginBottom: '0.5rem',
            fontWeight: 500,
            color: 'rgba(255,255,255,0.7)',
            margin: '0 0 0.5rem 0'
          }}>
            {item.label}
          </p>
          <p style={{ 
            fontSize: 'clamp(1.5rem, 4vw, 1.875rem)',
            fontWeight: 700,
            margin: 0
          }}>
            {item.value}
          </p>
        </div>
      ))}
    </div>
  </div>
);

// Dashboard Title
export const DashboardTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h3 style={{ 
    fontSize: 'clamp(1.5rem, 4vw, 2rem)',
    fontWeight: 700,
    marginBottom: '2rem',
    color: '#203c42',
    margin: '0 0 2rem 0'
  }}>
    {children}
  </h3>
);

// Grid Layout
export const GridLayout: React.FC<{ 
  children: React.ReactNode;
  columns?: number;
}> = ({ children, columns = 4 }) => (
  <div style={{ 
    display: 'grid',
    gridTemplateColumns: `repeat(auto-fit, minmax(${columns === 4 ? '200px' : '250px'}, 1fr))`,
    gap: 'clamp(1rem, 2vw, 1.5rem)',
    marginBottom: '2.5rem'
  }}>
    {children}
  </div>
);