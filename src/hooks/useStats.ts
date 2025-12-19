// hooks/useStats.ts
import { useMemo } from 'react';
import { Transaction, Stats, DailySales } from '../types/types';

export const useStats = (transactions: Transaction[], validated: boolean) => {
  const stats = useMemo<Stats | null>(() => {
    if (!validated) return null;

    const relevantTransactions = transactions.filter(t => t.categoria !== 'no-aplica');

    const ventas = relevantTransactions
      .filter(t => t.categoria === 'venta')
      .reduce((sum, t) => sum + Math.abs(t.importe), 0);

    const gastosGenerales = relevantTransactions
      .filter(t => t.categoria === 'gastos')
      .reduce((sum, t) => sum + Math.abs(t.importe), 0);

    const personal = relevantTransactions
      .filter(t => t.categoria === 'personal')
      .reduce((sum, t) => sum + Math.abs(t.importe), 0);

    const materiaPrima = relevantTransactions
      .filter(t => t.categoria === 'materia')
      .reduce((sum, t) => sum + Math.abs(t.importe), 0);

    const otrosGastos = relevantTransactions
      .filter(t => t.categoria === 'otros')
      .reduce((sum, t) => sum + Math.abs(t.importe), 0);

    const totalCostes = gastosGenerales + personal + materiaPrima + otrosGastos;
    const beneficio = ventas - totalCostes;

    const gastosPercent = totalCostes > 0 ? (gastosGenerales / totalCostes) * 100 : 0;
    const personalPercent = totalCostes > 0 ? (personal / totalCostes) * 100 : 0;
    const materiaPercent = totalCostes > 0 ? (materiaPrima / totalCostes) * 100 : 0;
    const otrosPercent = totalCostes > 0 ? (otrosGastos / totalCostes) * 100 : 0;

    let gastosRounded = Math.round(gastosPercent);
    let personalRounded = Math.round(personalPercent);
    let materiaRounded = Math.round(materiaPercent);
    let otrosRounded = Math.round(otrosPercent);

    if (totalCostes > 0) {
      const sum = gastosRounded + personalRounded + materiaRounded + otrosRounded;
      if (sum !== 100) {
        const diff = 100 - sum;
        const max = Math.max(gastosPercent, personalPercent, materiaPercent, otrosPercent);
        if (gastosPercent === max) {
          gastosRounded += diff;
        } else if (personalPercent === max) {
          personalRounded += diff;
        } else if (materiaPercent === max) {
          materiaRounded += diff;
        } else {
          otrosRounded += diff;
        }
      }
    }

    return {
      ventas,
      gastosGenerales,
      personal,
      materiaPrima,
      otrosGastos,
      totalCostes,
      beneficio,
      ratios: {
        gastosVentas: gastosRounded,
        personalVentas: personalRounded,
        materiaVentas: materiaRounded,
        otrosVentas: otrosRounded,
        margen: ventas > 0 ? (beneficio / ventas * 100).toFixed(1) : '0.0'
      }
    };
  }, [transactions, validated]);

  const dailySales = useMemo<DailySales[]>(() => {
    if (!validated) return [];

    const salesByDate = new Map<string, number>();
    
    transactions
      .filter(t => t.categoria === 'venta')
      .forEach(t => {
        const current = salesByDate.get(t.fecha) || 0;
        salesByDate.set(t.fecha, current + Math.abs(t.importe));
      });

    return Array.from(salesByDate.entries())
      .map(([fecha, ventas]) => ({ fecha, ventas }))
      .sort((a, b) => {
        const dateA = a.fecha.split('/').reverse().join('');
        const dateB = b.fecha.split('/').reverse().join('');
        return dateA.localeCompare(dateB);
      });
  }, [transactions, validated]);

  return { stats, dailySales };
};