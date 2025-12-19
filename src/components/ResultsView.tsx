// components/ResultsView.tsx
import React from 'react';
import { TrendingUp, TrendingDown, PieChart as PieChartIcon, EuroIcon } from 'lucide-react';
import { Stats, DailySales } from '../types/types';
import { CompactKPI } from './CompactKPI';
import { DashboardTitle } from './BankAnalyzerStyled';
import { PieChart, BarChart } from './BankAnalyzerComponents';

interface ResultsViewProps {
  stats: Stats;
  dailySales: DailySales[];
  formatCurrency: (amount: number) => string;
}

export const ResultsView: React.FC<ResultsViewProps> = ({ 
  stats, 
  dailySales, 
  formatCurrency 
}) => {
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
        gap: '1.25rem'
      }}>
        <PieChart stats={stats} formatCurrency={formatCurrency} />
        <BarChart data={dailySales} formatCurrency={formatCurrency} />
      </div>
    </div>
  );
};