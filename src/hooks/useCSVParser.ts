// hooks/useCSVParser.ts - VERSIÓN MEJORADA CON CORRECCIÓN DE ENCODING

import { useState } from 'react';
import { Transaction } from '../types/types';
import { showError, autoCategorize, parseImporte, fixEncoding } from '../utils';

export const useCSVParser = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const parseCSV = (text: string) => {
    const lines = text.split('\n').filter(line => line.trim());
    
    // Buscar la línea de encabezados
    let headerLineIndex = lines.findIndex(line => {
      const lower = line.toLowerCase();
      return lower.includes('concepto') && 
             (lower.includes('fecha') || lower.includes('date')) &&
             (lower.includes('importe') || lower.includes('amount'));
    });

    // Si no encuentra headers explícitos, buscar línea con tabuladores
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

    // Parsear headers
    const headers = lines[headerLineIndex].toLowerCase().split(/[\t,;]/);
    
    // Buscar índices de columnas necesarias
    const conceptoIdx = headers.findIndex(h => 
      h.includes('concepto') || h.includes('descripcion') || h.includes('description')
    );
    const fechaIdx = headers.findIndex(h => 
      h.includes('fecha') || h.includes('date')
    );
    const importeIdx = headers.findIndex(h => 
      h.includes('importe') || h.includes('cantidad') || h.includes('amount')
    );

    // Validar que existen las columnas necesarias
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

    // Parsear las transacciones
    const parsed: Transaction[] = lines
      .slice(headerLineIndex + 1)
      .filter(line => line.trim())
      .map((line, idx) => {
        // Detectar el separador (tab, coma o punto y coma)
        const separator = line.includes('\t') ? '\t' : /[,;]/;
        const values = line.split(separator).map(v => v.trim());

        // Extraer y parsear el importe
        const importeStr = values[importeIdx] || '0';
        const importe = parseImporte(importeStr);
        
        // 🔧 CORRECCIÓN DE ENCODING - Aplicar aquí para el concepto
        const conceptoRaw = values[conceptoIdx]?.trim() || '';
        const concepto = fixEncoding(conceptoRaw);
        
        // Auto-categorizar con el concepto corregido
        const categoria = autoCategorize(concepto, importe);

        return {
          id: idx,
          fecha: values[fechaIdx]?.trim() || '',
          concepto: concepto,  // Ya viene con encoding corregido
          importe: importe,
          categoria: categoria,
          autoCategoria: categoria !== null
        };
      })
      .filter(t => t.concepto || t.importe !== 0);

    // Log para debugging (puedes comentar en producción)
    console.log(`✅ Parseadas ${parsed.length} transacciones`);
    const autoCategorizedCount = parsed.filter(t => t.autoCategoria).length;
    console.log(`🤖 Auto-categorizadas: ${autoCategorizedCount} (${Math.round(autoCategorizedCount/parsed.length*100)}%)`);

    setTransactions(parsed);
  };

  return {
    transactions,
    setTransactions,
    parseCSV
  };
};