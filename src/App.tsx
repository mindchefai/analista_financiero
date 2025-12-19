import { useState, useEffect } from 'react'
import BankAnalyzer from './components/BankAnalyzer'
import BankAnalyzerLanding from './components/BankAnalyzerLanding'
import './App.css'

function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'analyzer'>('landing');

  useEffect(() => {
    // Verificar la ruta actual al cargar
    const checkPath = () => {
      const path = window.location.pathname;
      if (path === '/analyzer' || path === '/analyzer/') {
        setCurrentView('analyzer');
      } else {
        setCurrentView('landing');
      }
    };

    checkPath();

    // Escuchar cambios en la URL
    const handlePopState = () => {
      checkPath();
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  if (currentView === 'analyzer') {
    return <BankAnalyzer />;
  }

  return <BankAnalyzerLanding />;
}

export default App