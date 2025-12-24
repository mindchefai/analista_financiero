// components/ResultsView.tsx
import React, { useState } from 'react';
import { TrendingUp, TrendingDown, PieChart as PieChartIcon, EuroIcon, Sparkles } from 'lucide-react';
import { Stats, DailySales , AnalysisResponse } from '../types/types';
import { CompactKPI } from './CompactKPI';
import { DashboardTitle } from './BankAnalyzerStyled';
import { PieChart, LineChart } from './BankAnalyzerComponents';
import { AIAnalysis } from './AIAnalysis';

interface ResultsViewProps {
  stats: Stats;
  dailySales: DailySales[];
  formatCurrency: (amount: number) => string;
  analysisUsed: boolean;
  onAnalysisUsed: () => void;
  analysisResult: AnalysisResponse | null;
  onAnalysisComplete: (result: AnalysisResponse) => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({ 
  stats, 
  dailySales, 
  formatCurrency,
  analysisUsed,
  onAnalysisUsed,
  analysisResult, // ✨ NUEVO
  onAnalysisComplete // ✨ NUEVO
}) => {
  const [showAnalysis, setShowAnalysis] = useState(false);

  const handleShowAnalysis = () => {
    setShowAnalysis(true);
    onAnalysisUsed();
  };

  return (
    <div>
      <DashboardTitle>Dashboard Financiero</DashboardTitle>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 150px), 1fr))',
        gap: '0.75rem',
        marginBottom: '1.5rem'
      }}>
        <CompactKPI
          title="Ventas Totales"
          value={formatCurrency(stats.ventas)}
          icon={<TrendingUp />}
          variant="success"
          tooltip="Ingresos"
        />
        <CompactKPI
          title="Costes Totales"
          value={formatCurrency(stats.totalCostes)}
          icon={<TrendingDown />}
          variant="danger"
          tooltip="Costes operativos"
        />
        <CompactKPI
          title="Beneficio operativo"
          value={formatCurrency(stats.beneficio)}
          icon={<EuroIcon />}
          variant={stats.beneficio >= 0 ? 'success' : 'danger'}
          tooltip="Dinero que te queda"
        />
        <CompactKPI
          title="Margen operativo"
          value={`${stats.ratios.margen}%`}
          icon={<PieChartIcon />}
          variant={parseFloat(stats.ratios.margen) >= 0 ? 'success' : 'danger'}
          tooltip="Rentabilidad"
        />
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
        gap: '1.25rem',
        marginBottom: '1.5rem'
      }}>
        <PieChart stats={stats} formatCurrency={formatCurrency} />
        <LineChart data={dailySales} formatCurrency={formatCurrency} />
      </div>

      {/* Botón de Análisis con IA - Solo si NO se ha usado */}
      {!showAnalysis && !analysisUsed && (
        <div style={{ 
          marginTop: '2rem',
          textAlign: 'center'
        }}>
          <button
            onClick={handleShowAnalysis}
            style={{
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              padding: '1rem 2rem',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              boxShadow: '0 4px 6px rgba(99, 102, 241, 0.25)',
              transition: 'all 0.3s ease',
              transform: 'translateY(0)'
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
            <Sparkles size={20} />
            Analizar con IA
          </button>
          <p style={{ 
            fontSize: '0.875rem', 
            color: '#6b7280', 
            marginTop: '0.75rem',
            fontStyle: 'italic'
          }}>
            Obtén recomendaciones personalizadas para mejorar tu rentabilidad
          </p>
        </div>
      )}

      {/* Componente de Análisis con IA - O muestra el componente nuevo O el resultado guardado */}
      {(showAnalysis || analysisResult) && (
        <div style={{ marginTop: '2rem' }}>
          <AIAnalysis 
            stats={stats} 
            formatCurrency={formatCurrency}
            onClose={() => setShowAnalysis(false)}
            savedResult={analysisResult} // ✨ PASAR resultado guardado
            onAnalysisComplete={onAnalysisComplete} // ✨ PASAR callback
          />
        </div>
      )}
    </div>
  );
};