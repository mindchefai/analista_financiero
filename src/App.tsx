import { useState, useEffect } from 'react'
import BankAnalyzer from './components/BankAnalyzer'
import BankAnalyzerLanding from './components/BankAnalyzerLanding'
import './App.css'

function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'analyzer'>('landing');

  useEffect(() => {
    // Verificar si el usuario está en la ruta del analizador
    if (window.location.pathname === '/analyzer') {
      setCurrentView('analyzer');
    }
  }, []);

  // Simular navegación básica
  useEffect(() => {
    const handlePopState = () => {
      if (window.location.pathname === '/analyzer') {
        setCurrentView('analyzer');
      } else {
        setCurrentView('landing');
      }
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