// hooks/useCSVParser.ts
import { useState } from 'react';
import { Transaction } from '../types/types';
import { showError, autoCategorize, parseImporte } from '../utils';

export const useCSVParser = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const parseCSV = (text: string) => {
    const lines = text.split('\n').filter(line => line.trim());
    
    let headerLineIndex = lines.findIndex(line => {
      const lower = line.toLowerCase();
      return lower.includes('concepto') && 
             (lower.includes('fecha') || lower.includes('date')) &&
             (lower.includes('importe') || lower.includes('amount'));
    });

    if (headerLineIndex === -1) {
      headerLineIndex = lines.findIndex(line => line.includes('\t'));
    }

    if (headerLineIndex === -1) {
      showError(
        'No encontramos las columnas necesarias',
        'Tu archivo debe contener estas columnas: <strong>Fecha</strong>, <strong>Concepto</strong> e <strong>Importe</strong>. Por favor, revisa el archivo o descarga el extracto completo desde tu banco.'
      );
      return;
    }

    const headers = lines[headerLineIndex].toLowerCase().split(/[\t,;]/);
    
    const conceptoIdx = headers.findIndex(h => 
      h.includes('concepto') || h.includes('descripcion') || h.includes('description')
    );
    const fechaIdx = headers.findIndex(h => 
      h.includes('fecha') || h.includes('date')
    );
    const importeIdx = headers.findIndex(h => 
      h.includes('importe') || h.includes('cantidad') || h.includes('amount')
    );

    if (conceptoIdx === -1 || fechaIdx === -1 || importeIdx === -1) {
      const missingColumns = [];
      if (fechaIdx === -1) missingColumns.push('Fecha');
      if (conceptoIdx === -1) missingColumns.push('Concepto');
      if (importeIdx === -1) missingColumns.push('Importe');
      
      showError(
        'Faltan columnas obligatorias',
        `No encontramos: <strong>${missingColumns.join(', ')}</strong>. Por favor, revisa el archivo o descarga el extracto completo desde tu banco.`
      );
      return;
    }

    const parsed: Transaction[] = lines
      .slice(headerLineIndex + 1)
      .filter(line => line.trim())
      .map((line, idx) => {
        const separator = line.includes('\t') ? '\t' : /[,;]/;
        const values = line.split(separator).map(v => v.trim());

        const importeStr = values[importeIdx] || '0';
        const importe = parseImporte(importeStr);
        const concepto = values[conceptoIdx]?.trim() || '';
        const categoria = autoCategorize(concepto, importe);

        return {
          id: idx,
          fecha: values[fechaIdx]?.trim() || '',
          concepto: concepto,
          importe: importe,
          categoria: categoria,
          autoCategoria: categoria !== null
        };
      })
      .filter(t => t.concepto || t.importe !== 0);

    setTransactions(parsed);
  };

  return {
    transactions,
    setTransactions,
    parseCSV
  };
};