// utils.ts - VERSION FINAL

import { CATEGORIA_RULES } from './constants';

/**
 * Formatea un número como moneda en euros
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR'
  }).format(amount);
};

/**
 * Muestra un mensaje de error
 */
export const showError = (title: string, message: string) => {
  const errorDiv = document.createElement('div');
  errorDiv.style.cssText = `
    position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
    background: white; padding: 1.5rem; border-radius: 0.75rem;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
    max-width: 28rem; z-index: 9999; border: 2px solid #fbbf24;
  `;
  
  errorDiv.innerHTML = `
    <div style="display: flex; align-items: start; gap: 1rem; margin-bottom: 1rem;">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2" style="flex-shrink: 0;">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
        <line x1="12" y1="9" x2="12" y2="13"></line>
        <line x1="12" y1="17" x2="12.01" y2="17"></line>
      </svg>
      <div>
        <h3 style="margin: 0 0 0.5rem 0; font-size: 1rem; font-weight: 600; color: #92400e;">
          ${title}
        </h3>
        <p style="margin: 0; font-size: 0.8125rem; color: #78350f; line-height: 1.4;">
          ${message}
        </p>
      </div>
    </div>
    <button onclick="this.parentElement.remove()" style="
      width: 100%; padding: 0.5rem; background: #f59e0b; color: white;
      border: none; border-radius: 0.375rem; font-weight: 500; cursor: pointer; font-size: 0.8125rem;
    ">
      Entendido
    </button>
  `;
  
  document.body.appendChild(errorDiv);
};

/**
 * CORRECCIÓN DE ENCODING
 * Corrige caracteres mal codificados en archivos CSV
 */
export const fixEncoding = (text: string): string => {
  if (!text) return text;
  
  const encodingFixes: Record<string, string> = {
    // Caracteres diamante y símbolos mal codificados
    '\u25C6': '', // ◆
    '\uFFFD': '', // �
    
    // Patrones específicos que aparecen en los datos
    'd\u25C6a': 'dia',
    'd\u25C6as': 'dias',
    'tel\u25C6fono': 'telefono',
    'informaci\u25C6n': 'informacion',
    'distribuci\u25C6n': 'distribucion',
    'panader\u25C6a': 'panaderia',
    'carnicer\u25C6a': 'carniceria',
    'pescader\u25C6a': 'pescaderia',
    'alimentaci\u25C6n': 'alimentacion',
    'n\u25C6mina': 'nomina',
    'cotizaci\u25C6n': 'cotizacion',
    'reparaci\u25C6n': 'reparacion',
    'suscripci\u25C6n': 'suscripcion',
    'gestor\u25C6a': 'gestoria',
  };

  let fixed = text;
  
  // Aplicar todas las correcciones
  for (const [wrong, correct] of Object.entries(encodingFixes)) {
    fixed = fixed.replace(new RegExp(wrong, 'g'), correct);
  }
  
  return fixed;
};

/**
 * Parsea un string de importe a número
 */
export const parseImporte = (importeStr: string): number => {
  // Eliminar símbolos de moneda y espacios
  importeStr = importeStr.replace(/[€$£]/g, '').replace(/\s/g, '');
  
  // Manejar diferentes formatos de números
  if (importeStr.includes(',') && importeStr.includes('.')) {
    const lastComma = importeStr.lastIndexOf(',');
    const lastDot = importeStr.lastIndexOf('.');
    
    if (lastComma > lastDot) {
      // Formato europeo: 1.234,56
      importeStr = importeStr.replace(/\./g, '').replace(',', '.');
    } else {
      // Formato americano: 1,234.56
      importeStr = importeStr.replace(/,/g, '');
    }
  } else if (importeStr.includes(',')) {
    const parts = importeStr.split(',');
    if (parts.length === 2 && parts[1].length <= 2) {
      // Decimal europeo: 1234,56
      importeStr = importeStr.replace(',', '.');
    } else {
      // Separador de miles: 1,234
      importeStr = importeStr.replace(/,/g, '');
    }
  } else if (importeStr.includes('.')) {
    const parts = importeStr.split('.');
    if (parts.length === 2 && parts[1].length <= 2) {
      // Ya es decimal americano: 1234.56
    } else {
      // Separador de miles: 1.234
      importeStr = importeStr.replace(/\./g, '');
    }
  }
  
  return parseFloat(importeStr) || 0;
};

/**
 * AUTO-CATEGORIZACIÓN MEJORADA
 * Categoriza automáticamente basándose en el concepto y el importe
 */
export const autoCategorize = (concepto: string, importe: number): string | null => {
  if (!concepto || concepto.trim() === '') return null;

  // 1. CORREGIR ENCODING primero
  const conceptoCorregido = fixEncoding(concepto);
  
  // 2. NORMALIZAR para búsqueda (minúsculas)
  const conceptoLower = conceptoCorregido.toLowerCase();

  // 3. REGLA ESPECIAL: Ventas (importes positivos)
  if (importe > 0) {
    // Buscar patrones de venta
    for (const pattern of CATEGORIA_RULES.venta) {
      if (pattern.test(conceptoLower)) {
        return 'venta';
      }
    }
    // Si es positivo y no encontró patrón específico, asumir que es venta
    return 'venta';
  }

  // 4. CATEGORÍAS PARA GASTOS (importes negativos)
  
  // Orden de prioridad para evitar conflictos
  const categoriasOrdenadas: Array<keyof typeof CATEGORIA_RULES> = [
    'personal',    // Tiene prioridad (nóminas, SS)
    'materia',     // Segunda prioridad (proveedores)
    'gastos',      // Tercera prioridad (más genérica)
    'otros',       // Última opción
  ];

  // Buscar coincidencias en orden de prioridad
  for (const categoria of categoriasOrdenadas) {
    const patterns = CATEGORIA_RULES[categoria];
    if (!patterns) continue;
    
    for (const pattern of patterns) {
      if (pattern.test(conceptoLower)) {
        return categoria;
      }
    }
  }

  // 5. No se pudo categorizar automáticamente
  return null;
};

/**
 * Obtiene estadísticas de categorización
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getCategorizeStats = (transactions: any[]): {
  total: number;
  categorized: number;
  autoCategorized: number;
  percentageAuto: number;
  percentageTotal: number;
} => {
  const total = transactions.length;
  const categorized = transactions.filter(t => t.categoria).length;
  const autoCategorized = transactions.filter(t => t.autoCategoria).length;
  const percentageAuto = total > 0 ? Math.round((autoCategorized / total) * 100) : 0;
  const percentageTotal = total > 0 ? Math.round((categorized / total) * 100) : 0;

  return { 
    total, 
    categorized, 
    autoCategorized, 
    percentageAuto,
    percentageTotal 
  };
};