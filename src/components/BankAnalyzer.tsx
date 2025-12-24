// BankAnalyzer.tsx (REFACTORIZADO)
import React, { useState, useEffect } from 'react';
import { Upload, PieChart as PieChartIcon } from 'lucide-react';
import { TabType , AnalysisResponse  } from '../types/types';
import { formatCurrency } from '../utils';
import { useCSVParser } from '../hooks/useCSVParser';
import { useStats } from '../hooks/useStats';
import { DataView } from './DataView';
import { ResultsView } from './ResultsView';
import { PremiumAutoCategorizeModal } from './PremiumAutoCategorizeModal';

import {
  GlobalStyles,
  Container,
  ContentWrapper,
  TabsContainer,
  TabButton,
  ContentArea,
} from './BankAnalyzerStyled';
import { LogoHeader } from './BankAnalyzerComponents';

const BankAnalyzer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('datos');
  const [validated, setValidated] = useState<boolean>(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState<boolean>(false);
  const [isPremiumModalOpen, setIsPremiumModalOpen] = useState(false);
  const [analysisUsed, setAnalysisUsed] = useState(false);
const [analysisResult, setAnalysisResult] = useState<AnalysisResponse | null>(null);

  const { transactions, setTransactions, parseCSV } = useCSVParser();
  const { stats, dailySales } = useStats(transactions, validated);

  // 🔒 PROTECCIÓN DE RUTA - Verificar autenticación
  useEffect(() => {
    const userEmail = sessionStorage.getItem('userEmail');
    if (!userEmail) {
      window.history.pushState({}, '', '/');
      window.location.reload();
    }
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        if (event.target?.result) {
          const text = event.target.result as string;
          parseCSV(text);
          setValidated(false);
          setAnalysisUsed(false); // ✨ RESETEAR análisis al subir nuevo archivo
          setAnalysisResult(null); // ✨ RESETEAR resultado también
        }
      };
      reader.readAsText(file);
    }
  };

  const handleCategoryChange = (id: number, categoria: string) => {
    setTransactions(prev =>
      prev.map(t => t.id === id ? { ...t, categoria, autoCategoria: false } : t)
    );
  };

  const handleAutoCategorize = () => {
    setIsPremiumModalOpen(true);
  };

  const handleValidate = () => {
    const allCategorized = transactions.every(t => t.categoria);
    if (allCategorized) {
      setValidated(true);
      setActiveTab('resultados');
    } else {
      const uncategorized = transactions.filter(t => !t.categoria).length;
      alert(`Por favor, categoriza todas las transacciones. Faltan ${uncategorized} transacciones por categorizar.`);
    }
  };

  const handleLogout = () => {
    // Limpiar sessionStorage
    sessionStorage.removeItem('userEmail');
    sessionStorage.removeItem('userName');
    sessionStorage.removeItem('userCompany');
    
    // Redirigir a la página de inicio
    window.history.pushState({}, '', '/');
    window.location.reload();
  };

  const categorizedCount = transactions.filter(t => t.categoria).length;
  const autoCategorizedCount = transactions.filter(t => t.autoCategoria).length;

  return (
    <>
      <GlobalStyles />
      <Container>
        <ContentWrapper>
          <div style={{ 
            background: '#2a4c53',
            padding: '1rem 1rem'
          }}>
            <LogoHeader onLogout={handleLogout} />
          </div>

          <TabsContainer>
            <TabButton active={activeTab === 'datos'} onClick={() => setActiveTab('datos')}>
              <Upload style={{ display: 'inline', marginRight: '0.5rem', verticalAlign: 'middle' }} size={16} />
              Datos
            </TabButton>
            <TabButton 
              active={activeTab === 'resultados'} 
              disabled={!validated}
              onClick={() => validated && setActiveTab('resultados')}
            >
              <PieChartIcon style={{ display: 'inline', marginRight: '0.5rem', verticalAlign: 'middle' }} size={16} />
              Resultados
            </TabButton>
          </TabsContainer>

          <ContentArea>
            {activeTab === 'datos' && (
              <DataView
                transactions={transactions}
                categorizedCount={categorizedCount}
                autoCategorizedCount={autoCategorizedCount}
                isHelpModalOpen={isHelpModalOpen}
                onFileUpload={handleFileUpload}
                onHelpClick={() => setIsHelpModalOpen(true)}
                onCloseHelp={() => setIsHelpModalOpen(false)}
                onAutoCategorize={handleAutoCategorize}
                onValidate={handleValidate}
                onCategoryChange={handleCategoryChange}
                formatCurrency={formatCurrency}
              />
            )}

            {activeTab === 'resultados' && stats && (
              <ResultsView
                stats={stats}
                dailySales={dailySales}
                formatCurrency={formatCurrency}
                analysisUsed={analysisUsed}
                onAnalysisUsed={() => setAnalysisUsed(true)}
                analysisResult={analysisResult} // ✨ PASAR resultado guardado
                onAnalysisComplete={(result) => setAnalysisResult(result)} // ✨ GUARDAR resultado
              />
            )}
          </ContentArea>
        </ContentWrapper>
        <PremiumAutoCategorizeModal
          isOpen={isPremiumModalOpen}
          onClose={() => setIsPremiumModalOpen(false)}
        />
      </Container>
    </>
  );
};

export default BankAnalyzer;