// BankAnalyzerComponents.tsx
// Este archivo mantiene la compatibilidad con el código existente
// Re-exporta todos los componentes desde su nueva ubicación

export { LogoHeader } from './LogoHeader';
export { FileRequirements, SecurityBadge, FAQ } from './UIComponents';
export { HelpModal } from './HelpModal';
export { UploadScreen } from './UploadScreen';
export { AutoCategorizeBanner } from './AutoCategorizeBanner';
export { TransactionRow } from './TransactionRow';
export { CompactKPI } from './CompactKPI';
export { PieChart } from './PieChart';
export { LineChart } from './LineChart';
export { DataView } from './DataView';
export { ResultsView } from './ResultsView';

// También exportamos los tipos necesarios
export type { Transaction, Stats, DailySales } from '../types/types';