// components/HelpModal.tsx (MEJORADO con información completa)
import React from 'react';
import { Shield, HelpCircle, Check } from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const steps = [
  {
    step: '1',
    title: 'Accede a la cuenta del banco',
    description: 'Inicia sesión en CaixaBankNow y accede a la cuenta que quieres analizar',
    image: '/screenshots_bank/1.png'
  },
  {
    step: '2',
    title: 'Abre el menú de funcionalidades',
    description: 'Dentro de la cuenta, pulsa en el menú de funcionalidades (tres puntos) para ver las opciones',
    image: '/screenshots_bank/2.png'
  },
  {
    step: '3',
    title: 'Accede a "Extraer movimientos PDF/Excel"',
    description: 'Selecciona la opción "Extraer movimientos PDF/Excel" del menú desplegable',
    image: '/screenshots_bank/3.png'
  },
  {
    step: '4',
    title: 'Elige las fechas y el formato',
    description: 'Elige las fechas que quieras extraer y el formato (PDF / Excel), recomendamos Excel',
    image: '/screenshots_bank/4.png'
  },
  {
    step: '5',
    title: 'Descarga desde el navegador',
    description: 'Se abrirá el extracto, pero hay que descargarlo. Para ello usa el navegador que tengas instalado (en el caso de la imagen, es Chrome)',
    image: '/screenshots_bank/5.png'
  },
  {
    step: '6',
    title: '¡Guarda y analiza!',
    description: 'Se abrirá un modal para guardar dicho documento y ya lo tendrás listo para subir y analizar',
    image: '/screenshots_bank/6.png'
  }
];

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <>
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 9998,
          animation: 'fadeIn 0.2s ease'
        }}
        onClick={onClose}
      />
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'white',
          borderRadius: '0.75rem',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
          maxWidth: '56rem',
          width: '95%',
          maxHeight: '90vh',
          overflowY: 'auto',
          zIndex: 9999,
          animation: 'slideIn 0.3s ease'
        }}
      >
        {/* Header */}
        <div style={{
          position: 'sticky',
          top: 0,
          backgroundColor: 'white',
          borderBottom: '1px solid #e5e7eb',
          padding: '1rem 1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderRadius: '0.75rem 0.75rem 0 0',
          zIndex: 1
        }}>
          <h3 style={{
            margin: 0,
            fontSize: 'clamp(1rem, 3vw, 1.25rem)',
            fontWeight: 700,
            color: '#203c42'
          }}>
            ¿Cómo descargar tu extracto de CaixaBank?
          </h3>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0.375rem',
              borderRadius: '0.375rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#6b7280',
              transition: 'all 0.2s ease',
              flexShrink: 0
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f3f4f6';
              e.currentTarget.style.color = '#111827';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#6b7280';
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Content - Requisitos primero */}
        <div style={{ padding: 'clamp(1rem, 3vw, 1.5rem)' }}>
          
          {/* Requisitos del archivo */}
          <div style={{
            backgroundColor: '#f0f9ff',
            border: '1px solid #bfdbfe',
            borderRadius: '0.75rem',
            padding: '1.25rem',
            marginBottom: '2rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <Check size={20} style={{ color: '#2563eb' }} />
              <h4 style={{
                margin: 0,
                fontSize: '1rem',
                fontWeight: 600,
                color: '#1e40af'
              }}>
                Requisitos del archivo
              </h4>
            </div>
            <p style={{
              fontSize: '0.875rem',
              color: '#1e40af',
              margin: '0 0 0.75rem 0',
              lineHeight: '1.5'
            }}>
              MindChef solo necesita que el documento contenga tres columnas:
            </p>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem'
            }}>
              {['Fecha', 'Concepto', 'Importe'].map((item) => (
                <li key={item} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.875rem',
                  color: '#1e40af',
                  fontWeight: 500
                }}>
                  <div style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: '#2563eb'
                  }}></div>
                  {item}
                </li>
              ))}
            </ul>
            <p style={{
              fontSize: '0.8125rem',
              color: '#3b82f6',
              margin: '0.75rem 0 0 0',
              fontStyle: 'italic'
            }}>
              Formatos aceptados: Excel (.xlsx, .xls) o CSV
            </p>
          </div>

          {/* Pasos de descarga */}
          <h4 style={{
            fontSize: '1rem',
            fontWeight: 600,
            color: '#203c42',
            margin: '0 0 1.5rem 0'
          }}>
            Pasos para descargar
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {steps.map((step) => (
              <div key={step.step} style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                paddingBottom: step.step !== '6' ? '2rem' : '0',
                borderBottom: step.step !== '6' ? '1px solid #f3f4f6' : 'none'
              }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'start' }}>
                  <div style={{
                    flexShrink: 0,
                    width: '2.5rem',
                    height: '2.5rem',
                    borderRadius: '50%',
                    backgroundColor: '#203c42',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '1rem'
                  }}>
                    {step.step}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h4 style={{
                      margin: '0 0 0.375rem 0',
                      fontSize: 'clamp(0.9375rem, 2.5vw, 1.125rem)',
                      fontWeight: 600,
                      color: '#203c42'
                    }}>
                      {step.title}
                    </h4>
                    <p style={{
                      margin: 0,
                      fontSize: 'clamp(0.8125rem, 2vw, 0.875rem)',
                      color: '#6b7280',
                      lineHeight: '1.5'
                    }}>
                      {step.description}
                    </p>
                  </div>
                </div>
                
                <div style={{
                  borderRadius: '0.5rem',
                  overflow: 'hidden',
                  border: '2px solid #e5e7eb',
                  backgroundColor: '#f9fafb',
                  maxWidth: '220px',
                  margin: '0 auto',
                  width: '100%'
                }}>
                  <img 
                    src={step.image}
                    alt={step.title}
                    style={{
                      width: '100%',
                      height: 'auto',
                      display: 'block'
                    }}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      const parent = e.currentTarget.parentElement;
                      if (parent) {
                        parent.innerHTML = `
                          <div style="padding: 2rem; text-align: center; color: #9ca3af; aspect-ratio: 350/760;">
                            <p style="margin: 0;">Imagen no disponible</p>
                            <p style="margin: 0.5rem 0 0 0; font-size: 0.75rem;">${step.image}</p>
                          </div>
                        `;
                      }
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer con información adicional */}
        <div style={{
          padding: '1.5rem',
          backgroundColor: '#f9fafb',
          borderTop: '1px solid #e5e7eb'
        }}>
          {/* Badge de seguridad */}
          <div style={{
            display: 'flex',
            alignItems: 'start',
            gap: '0.75rem',
            padding: '1rem',
            backgroundColor: '#f0fdf4',
            border: '1px solid #bbf7d0',
            borderRadius: '0.5rem',
            marginBottom: '1rem'
          }}>
            <Shield size={20} style={{ color: '#16a34a', flexShrink: 0, marginTop: '2px' }} />
            <div>
              <p style={{ 
                fontSize: '0.875rem',
                fontWeight: 600,
                color: '#15803d',
                margin: '0 0 0.25rem 0'
              }}>
                Seguridad y privacidad
              </p>
              <p style={{ 
                fontSize: '0.8125rem',
                color: '#166534',
                margin: 0,
                lineHeight: '1.4'
              }}>
                Tus datos son privados y solo se usan para generar tu análisis financiero. No se almacenan ni comparten con terceros.
              </p>
            </div>
          </div>

          {/* FAQ */}
          <details style={{
            padding: '1rem',
            backgroundColor: '#fffbeb',
            border: '1px solid #fde68a',
            borderRadius: '0.5rem',
            cursor: 'pointer'
          }}>
            <summary style={{
              fontSize: '0.875rem',
              fontWeight: 600,
              color: '#92400e',
              cursor: 'pointer',
              listStyle: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <HelpCircle size={16} style={{ color: '#92400e' }} />
              ¿Qué pasa si mi banco añade más columnas?
            </summary>
            <p style={{
              fontSize: '0.8125rem',
              color: '#78350f',
              marginTop: '0.75rem',
              margin: '0.75rem 0 0 0',
              lineHeight: '1.5'
            }}>
              No hay problema. MindChef solo necesita tres columnas: <strong>Fecha</strong>, <strong>Concepto</strong> e <strong>Importe</strong>. Ignoramos automáticamente el resto de la información adicional que pueda contener tu extracto.
            </p>
          </details>
        </div>

        {/* Botón cerrar */}
        <div style={{
          position: 'sticky',
          bottom: 0,
          backgroundColor: 'white',
          borderTop: '1px solid #e5e7eb',
          padding: '1rem 1.5rem',
          display: 'flex',
          justifyContent: 'flex-end',
          borderRadius: '0 0 0.75rem 0.75rem'
        }}>
          <button
            onClick={onClose}
            style={{
              padding: '0.625rem 1.5rem',
              backgroundColor: '#203c42',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              fontWeight: 500,
              fontSize: 'clamp(0.8125rem, 2vw, 0.875rem)',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#2a4c53';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#203c42';
            }}
          >
            Entendido
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translate(-50%, -48%);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%);
          }
        }
      `}</style>
    </>
  );
};