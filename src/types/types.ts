// types.ts
export interface Transaction {
  id: number;
  fecha: string;
  concepto: string;
  importe: number;
  categoria: string | null;
  autoCategoria?: boolean;
}

export interface Stats {
  ventas: number;
  gastosGenerales: number;
  personal: number;
  materiaPrima: number;
  otrosGastos: number;
  totalCostes: number;
  beneficio: number;
  ratios: {
    gastosVentas: number;
    personalVentas: number;
    materiaVentas: number;
    otrosVentas: number;
    margen: string;
  };
}

export interface DailySales {
  fecha: string;
  ventas: number;
}

export type TabType = 'datos' | 'resultados';

// ✨ NUEVA INTERFAZ
export interface AnalysisResponse {
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