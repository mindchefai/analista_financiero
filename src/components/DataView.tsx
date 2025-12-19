// components/DataView.tsx
import React from 'react';
import { Upload, Check, WandSparkles } from 'lucide-react';
import { Transaction } from '../types/types';
import {
  SectionHeader,
  TableContainer,
  TableHeader,
} from './BankAnalyzerStyled';
import {
  UploadScreen,
  AutoCategorizeBanner,
  TransactionRow,
  HelpModal,
} from './BankAnalyzerComponents';

interface DataViewProps {
  transactions: Transaction[];
  categorizedCount: number;
  autoCategorizedCount: number;
  isHelpModalOpen: boolean;
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onHelpClick: () => void;
  onCloseHelp: () => void;
  onAutoCategorize: () => void;
  onValidate: () => void;
  onCategoryChange: (id: number, categoria: string) => void;
  formatCurrency: (amount: number) => string;
}

export const DataView: React.FC<DataViewProps> = ({
  transactions,
  categorizedCount,
  autoCategorizedCount,
  isHelpModalOpen,
  onFileUpload,
  onHelpClick,
  onCloseHelp,
  onAutoCategorize,
  onValidate,
  onCategoryChange,
  formatCurrency
}) => {
  if (transactions.length === 0) {
    return (
      <>
        <UploadScreen 
          onFileUpload={onFileUpload}
          onHelpClick={onHelpClick}
        />
        <HelpModal 
          isOpen={isHelpModalOpen}
          onClose={onCloseHelp}
        />
      </>
    );
  }

  return (
    <div>
      <SectionHeader
        title="Categoriza tus transacciones"
        subtitle={`${categorizedCount} de ${transactions.length} categorizadas${autoCategorizedCount > 0 ? ` (${autoCategorizedCount} automáticas)` : ''}`}
      >
        <label 
          style={{ 
            padding: 'clamp(0.5rem, 2vw, 0.625rem) clamp(0.875rem, 3vw, 1.25rem)',
            borderRadius: '0.5rem',
            fontWeight: 500,
            fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
            backgroundColor: '#f9fafb',
            color: '#374151',
            border: '1px solid #e5e7eb',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            transition: 'all 0.2s ease',
            boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#f3f4f6';
            e.currentTarget.style.borderColor = '#d1d5db';
            e.currentTarget.style.transform = 'translateY(-1px)';
            e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#f9fafb';
            e.currentTarget.style.borderColor = '#e5e7eb';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 1px 2px rgba(0,0,0,0.05)';
          }}
        >
          <Upload size={16} style={{ color: '#6b7280' }} />
          <span style={{ whiteSpace: 'nowrap' }}>Cambiar archivo</span>
          <input
            type="file"
            accept=".csv,.xlsx,.xls,.txt"
            onChange={onFileUpload}
            style={{ display: 'none' }}
          />
        </label>

        <button
          onClick={onAutoCategorize}
          style={{
            padding: 'clamp(0.5rem, 2vw, 0.625rem) clamp(0.875rem, 3vw, 1.25rem)',
            borderRadius: '0.5rem',
            fontWeight: 600,
            fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
            background: '#f59e0b',
            color: '#ffffff',
            border: 'none',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 12px rgba(251, 191, 36, 0.35), inset 0 1px 0 rgba(255,255,255,0.2)',
            position: 'relative',
            overflow: 'hidden'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 20px rgba(251, 191, 36, 0.45), inset 0 1px 0 rgba(255,255,255,0.2)';
            e.currentTarget.style.background = '#d97706';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(251, 191, 36, 0.35), inset 0 1px 0 rgba(255,255,255,0.2)';
            e.currentTarget.style.background = '#fbbf24';
          }}
        >
          <WandSparkles size={16} style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.2))' }} />
          <span style={{ textShadow: '0 1px 2px rgba(0,0,0,0.1)', letterSpacing: '0.015em', whiteSpace: 'nowrap' }}>
            Auto-categorizar
          </span>
        </button>

        <button
          onClick={onValidate}
          style={{
            padding: 'clamp(0.5rem, 2vw, 0.625rem) clamp(0.875rem, 3vw, 1.25rem)',
            borderRadius: '0.5rem',
            fontWeight: 600,
            fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
            background: '#047857',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            transition: 'all 0.2s ease',
            boxShadow: '0 2px 8px rgba(5, 150, 105, 0.25), inset 0 1px 0 rgba(255,255,255,0.15)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-1px)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(5, 150, 105, 0.35), inset 0 1px 0 rgba(255,255,255,0.15)';
            e.currentTarget.style.background = '#065f46';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(5, 150, 105, 0.25), inset 0 1px 0 rgba(255,255,255,0.15)';
            e.currentTarget.style.background = '#059669';
          }}
        >
          <Check size={16} />
          <span style={{ whiteSpace: 'nowrap' }}>Validar</span>
        </button>
      </SectionHeader>

      {autoCategorizedCount > 0 && (
        <AutoCategorizeBanner count={autoCategorizedCount} />
      )}

      <TableContainer>
        <TableHeader columns={['Fecha', 'Concepto', 'Importe', 'Categoría']} />
        <tbody style={{ backgroundColor: 'white' }}>
          {transactions.map((transaction, index) => (
            <TransactionRow
              key={transaction.id}
              transaction={transaction}
              index={index}
              total={transactions.length}
              onCategoryChange={onCategoryChange}
              formatCurrency={formatCurrency}
            />
          ))}
        </tbody>
      </TableContainer>
    </div>
  );
};