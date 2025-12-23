// components/AIAnalysis.tsx
import React, { useState } from 'react';
import { 
  Send, 
  Loader2, 
  AlertTriangle, 
  Lightbulb, 
  TrendingUp, 
  Target, 
  BarChart3,
  CheckCircle2,
  XCircle,
  X
} from 'lucide-react';
import { Stats } from '../types/types';

interface AIAnalysisProps {
  stats: Stats;
  formatCurrency: (amount: number) => string;
  onClose?: () => void;
}

interface AnalysisResponse {
  resumenGeneral: string;
  puntosClave: string[];
  alertas: {
    tipo: 'warning' | 'danger' | 'info';
    titulo: string;
    descripcion: string;
  }[];
  recomendaciones: {
    categoria: string;
    titulo: string;
    descripcion: string;
    impactoEstimado: string;
    prioridad: 'alta' | 'media' | 'baja';
  }[];
  metricasObjetivo: {
    metrica: string;
    valorActual: string;
    valorObjetivo: string;
    gap: string;
  }[];
}

export const AIAnalysis: React.FC<AIAnalysisProps> = ({ stats, onClose }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    setError(null);

    try {
      // Calcular métricas adicionales
      const margenValue = parseFloat(stats.ratios.margen);
      
      // Preparar los datos para enviar a Make.com
      const payload = {
        stats: {
          ventas: stats.ventas,
          gastosGenerales: stats.gastosGenerales,
          personal: stats.personal,
          materiaPrima: stats.materiaPrima,
          otrosGastos: stats.otrosGastos,
          totalCostes: stats.totalCostes,
          beneficio: stats.beneficio,
          margen: margenValue
        },
        ratios: {
          gastosGeneralesPercent: ((stats.gastosGenerales / stats.ventas) * 100).toFixed(1),
          personalPercent: ((stats.personal / stats.ventas) * 100).toFixed(1),
          materiaPrimaPercent: ((stats.materiaPrima / stats.ventas) * 100).toFixed(1),
          otrosGastosPercent: ((stats.otrosGastos / stats.ventas) * 100).toFixed(1)
        },
        contexto: 'restaurante',
        idioma: 'es',
        timestamp: new Date().toISOString()
      };

      // TODO: Reemplaza esta URL con tu webhook de Make.com
      const WEBHOOK_URL = import.meta.env.VITE_MAKE_WEBHOOK_URL || 'https://hook.eu2.make.com/xhs0duaf2453z6xtbzv4i15s0us1y1yi';
      
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      setAnalysisResult(data);

    } catch (err) {
      console.error('Error al analizar:', err);
      setError('Error al procesar el análisis. Por favor, intenta de nuevo.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'alta': return '#dc2626';
      case 'media': return '#f59e0b';
      case 'baja': return '#3b82f6';
      default: return '#6b7280';
    }
  };

  const getPriorityBg = (priority: string) => {
    switch (priority) {
      case 'alta': return '#fee2e2';
      case 'media': return '#fef3c7';
      case 'baja': return '#dbeafe';
      default: return '#f3f4f6';
    }
  };

  const getAlertColor = (tipo: string) => {
    switch (tipo) {
      case 'danger': return { bg: '#fee2e2', border: '#dc2626', icon: '#dc2626' };
      case 'warning': return { bg: '#fef3c7', border: '#f59e0b', icon: '#f59e0b' };
      case 'info': return { bg: '#dbeafe', border: '#3b82f6', icon: '#3b82f6' };
      default: return { bg: '#f3f4f6', border: '#9ca3af', icon: '#6b7280' };
    }
  };

  return (
    <div style={{ 
      background: 'white',
      borderRadius: '12px',
      padding: '1.5rem',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      border: '2px solid #e5e7eb',
      position: 'relative'
    }}>
      {/* Botón de cerrar */}
      {onClose && (
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '0.5rem',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#f3f4f6';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
          }}
        >
          <X size={20} style={{ color: '#6b7280' }} />
        </button>
      )}

      {/* Título */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ 
          fontSize: '1.5rem', 
          fontWeight: 700, 
          color: '#1e293b',
          margin: '0 0 0.5rem 0',
          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          Análisis con IA
        </h3>
        <p style={{ 
          color: '#64748b', 
          fontSize: '0.875rem',
          margin: 0
        }}>
          Recomendaciones personalizadas basadas en tus datos financieros
        </p>
      </div>

      {/* Botón de análisis inicial */}
      {!analysisResult && !isAnalyzing && (
        <div style={{ textAlign: 'center', padding: '2rem 0' }}>
          <button
            onClick={handleAnalyze}
            style={{
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              padding: '1rem 2rem',
              fontSize: '1.125rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              boxShadow: '0 4px 6px rgba(99, 102, 241, 0.25)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 12px rgba(99, 102, 241, 0.35)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 6px rgba(99, 102, 241, 0.25)';
            }}
          >
            <Send size={24} />
            Iniciar Análisis
          </button>
        </div>
      )}

      {/* Estado de carga */}
      {isAnalyzing && (
        <div style={{ 
          textAlign: 'center', 
          padding: '3rem 1rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem'
        }}>
          <Loader2 
            size={48} 
            style={{ 
              color: '#6366f1',
              animation: 'spin 1s linear infinite'
            }} 
          />
          <div>
            <p style={{ 
              fontSize: '1.125rem', 
              fontWeight: 600, 
              color: '#1e293b',
              margin: '0 0 0.5rem 0'
            }}>
              Analizando tus datos...
            </p>
            <p style={{ 
              fontSize: '0.875rem', 
              color: '#64748b',
              margin: 0
            }}>
              Esto puede tardar unos segundos
            </p>
          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div style={{ 
          padding: '1rem',
          borderRadius: '8px',
          background: '#fee2e2',
          border: '1px solid #dc2626',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          marginBottom: '1rem'
        }}>
          <XCircle size={24} style={{ color: '#dc2626', flexShrink: 0 }} />
          <div>
            <p style={{ 
              fontSize: '0.875rem', 
              color: '#dc2626',
              margin: 0,
              fontWeight: 600
            }}>
              {error}
            </p>
          </div>
        </div>
      )}

      {/* Resultados del análisis */}
      {analysisResult && (
        <div style={{ 
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          animation: 'fadeIn 0.5s ease-in'
        }}>
          {/* Resumen General */}
          <div style={{ 
            padding: '1.25rem',
            borderRadius: '8px',
            background: '#f0f9ff',
            border: '1px solid #bae6fd'
          }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.75rem', 
              marginBottom: '0.75rem' 
            }}>
              <CheckCircle2 size={24} style={{ color: '#0284c7' }} />
              <h4 style={{ 
                fontSize: '1.125rem', 
                fontWeight: 600, 
                color: '#0c4a6e',
                margin: 0
              }}>
                Resumen General
              </h4>
            </div>
            <p style={{ 
              color: '#0c4a6e', 
              lineHeight: '1.6',
              margin: 0,
              fontSize: '0.9375rem'
            }}>
              {analysisResult.resumenGeneral}
            </p>
          </div>

          {/* Puntos Clave */}
          <div>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.75rem', 
              marginBottom: '1rem' 
            }}>
              <TrendingUp size={24} style={{ color: '#10b981' }} />
              <h4 style={{ 
                fontSize: '1.125rem', 
                fontWeight: 600, 
                color: '#1e293b',
                margin: 0
              }}>
                Puntos Clave
              </h4>
            </div>
            <ul style={{ 
              listStyle: 'none', 
              padding: 0, 
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem'
            }}>
              {analysisResult.puntosClave.map((punto, idx) => (
                <li key={idx} style={{ 
                  display: 'flex', 
                  gap: '0.75rem',
                  alignItems: 'flex-start',
                  padding: '0.75rem',
                  background: '#f9fafb',
                  borderRadius: '6px'
                }}>
                  <div style={{ 
                    width: '6px', 
                    height: '6px', 
                    borderRadius: '50%', 
                    background: '#10b981',
                    marginTop: '0.5rem',
                    flexShrink: 0
                  }} />
                  <span style={{ 
                    color: '#475569', 
                    lineHeight: '1.6',
                    fontSize: '0.9375rem'
                  }}>
                    {punto}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Alertas */}
          {analysisResult.alertas.length > 0 && (
            <div>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.75rem', 
                marginBottom: '1rem' 
              }}>
                <AlertTriangle size={24} style={{ color: '#f59e0b' }} />
                <h4 style={{ 
                  fontSize: '1.125rem', 
                  fontWeight: 600, 
                  color: '#1e293b',
                  margin: 0
                }}>
                  Alertas Importantes
                </h4>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {analysisResult.alertas.map((alerta, idx) => {
                  const colors = getAlertColor(alerta.tipo);
                  return (
                    <div key={idx} style={{ 
                      padding: '1rem',
                      borderRadius: '8px',
                      background: colors.bg,
                      border: `1px solid ${colors.border}`
                    }}>
                      <h5 style={{ 
                        fontSize: '1rem', 
                        fontWeight: 600, 
                        color: colors.icon,
                        margin: '0 0 0.5rem 0'
                      }}>
                        {alerta.titulo}
                      </h5>
                      <p style={{ 
                        color: '#475569', 
                        margin: 0,
                        fontSize: '0.875rem',
                        lineHeight: '1.5'
                      }}>
                        {alerta.descripcion}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Recomendaciones */}
          <div>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.75rem', 
              marginBottom: '1rem' 
            }}>
              <Lightbulb size={24} style={{ color: '#f59e0b' }} />
              <h4 style={{ 
                fontSize: '1.125rem', 
                fontWeight: 600, 
                color: '#1e293b',
                margin: 0
              }}>
                Recomendaciones
              </h4>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {analysisResult.recomendaciones.map((rec, idx) => (
                <div key={idx} style={{ 
                  padding: '1.25rem',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  background: '#fafafa'
                }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '0.75rem',
                    flexWrap: 'wrap',
                    gap: '0.5rem'
                  }}>
                    <div>
                      <span style={{ 
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        color: '#6b7280',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                      }}>
                        {rec.categoria}
                      </span>
                      <h5 style={{ 
                        fontSize: '1rem', 
                        fontWeight: 600, 
                        color: '#1e293b',
                        margin: '0.25rem 0 0 0'
                      }}>
                        {rec.titulo}
                      </h5>
                    </div>
                    <span style={{ 
                      padding: '0.25rem 0.75rem',
                      borderRadius: '12px',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      background: getPriorityBg(rec.prioridad),
                      color: getPriorityColor(rec.prioridad),
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}>
                      {rec.prioridad}
                    </span>
                  </div>
                  
                  <p style={{ 
                    color: '#475569', 
                    margin: '0 0 0.75rem 0',
                    fontSize: '0.875rem',
                    lineHeight: '1.6'
                  }}>
                    {rec.descripcion}
                  </p>
                  
                  <div style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.75rem',
                    borderRadius: '6px',
                    background: '#f0fdf4',
                    border: '1px solid #bbf7d0'
                  }}>
                    <Target size={16} style={{ color: '#15803d', flexShrink: 0 }} />
                    <span style={{ 
                      fontSize: '0.875rem', 
                      fontWeight: 600,
                      color: '#15803d'
                    }}>
                      {rec.impactoEstimado}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Métricas Objetivo */}
          {analysisResult.metricasObjetivo.length > 0 && (
            <div>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.75rem', 
                marginBottom: '1rem' 
              }}>
                <BarChart3 size={24} style={{ color: '#8b5cf6' }} />
                <h4 style={{ 
                  fontSize: '1.125rem', 
                  fontWeight: 600, 
                  color: '#1e293b',
                  margin: 0
                }}>
                  Objetivos de Mejora
                </h4>
              </div>
              
              <div style={{ 
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '1rem'
              }}>
                {analysisResult.metricasObjetivo.map((metrica, idx) => (
                  <div key={idx} style={{ 
                    padding: '1rem',
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0',
                    background: '#fafafa'
                  }}>
                    <h5 style={{ 
                      fontSize: '0.875rem', 
                      fontWeight: 600, 
                      color: '#1e293b',
                      margin: '0 0 0.75rem 0'
                    }}>
                      {metrica.metrica}
                    </h5>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>Actual:</span>
                        <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#ef4444' }}>
                          {metrica.valorActual}
                        </span>
                      </div>
                      
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>Objetivo:</span>
                        <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#10b981' }}>
                          {metrica.valorObjetivo}
                        </span>
                      </div>
                      
                      <div style={{ 
                        marginTop: '0.5rem',
                        padding: '0.5rem',
                        borderRadius: '4px',
                        background: '#eff6ff',
                        border: '1px solid #bfdbfe'
                      }}>
                        <span style={{ fontSize: '0.75rem', color: '#1e40af', fontWeight: 500 }}>
                          📊 {metrica.gap}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Botón para nuevo análisis */}
          <div style={{ textAlign: 'center', paddingTop: '1rem', borderTop: '1px solid #e5e7eb' }}>
            <button
              onClick={() => {
                setAnalysisResult(null);
                setError(null);
              }}
              style={{
                background: 'transparent',
                color: '#6366f1',
                border: '2px solid #6366f1',
                borderRadius: '8px',
                padding: '0.75rem 1.5rem',
                fontSize: '1rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#6366f1';
                e.currentTarget.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#6366f1';
              }}
            >
              Realizar Nuevo Análisis
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};