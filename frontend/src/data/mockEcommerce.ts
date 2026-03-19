export const ecommerceKPIs = {
  faturamento: 164307.58,
  investimento: 64171.84,
  impostos: 16430.76,
  lucro: 64556.33,
  faturamentoTrend: 0,
  investimentoTrend: 0,
  impostosTrend: 0,
  lucroTrend: 2.39,
};

export const netValueData = [
  { day: "01", value: 16400 },
  { day: "02", value: 14100 },
  { day: "03", value: 13500 },
  { day: "04", value: 12800 },
  { day: "05", value: 11200 },
  { day: "06", value: 10700 },
  { day: "07", value: 9800 },
  { day: "08", value: 7700 },
  { day: "09", value: 7200 },
  { day: "10", value: 7100 },
  { day: "11", value: 6800 },
  { day: "12", value: 6400 },
  { day: "13", value: 6200 },
  { day: "14", value: 6000 },
  { day: "15", value: 5900 },
  { day: "16", value: 5800 },
  { day: "17", value: 5700 },
  { day: "18", value: 5600 },
  { day: "19", value: 5500 },
  { day: "20", value: 5400 },
  { day: "21", value: 5300 },
  { day: "22", value: 5200 },
  { day: "23", value: 5100 },
  { day: "24", value: 5000 },
  { day: "25", value: 4900 },
  { day: "26", value: 4800 },
  { day: "27", value: 4700 },
  { day: "28", value: 4600 },
  { day: "29", value: 4500 },
  { day: "30", value: 4400 },
  { day: "31", value: 4300 },
];

export const ageData = [
  { name: "05-14", value: 2.8 },
  { name: "15-24", value: 12.4 },
  { name: "25-34", value: 22.1 },
  { name: "35-44", value: 18.6 },
  { name: "45-54", value: 16.5 },
  { name: "55-64", value: 14.2 },
  { name: "65+", value: 8.3 },
  { name: "Unknown", value: 5.1 },
];

export const genderData = [
  { name: "male", value: 48.6 },
  { name: "female", value: 39.4 },
  { name: "unknown", value: 12.0 },
];

export const weekdayData = [
  { name: "segunda", value: 16.1 },
  { name: "terça", value: 13.9 },
  { name: "quarta", value: 15.3 },
  { name: "quinta", value: 14.8 },
  { name: "sexta", value: 15.3 },
  { name: "sábado", value: 14.5 },
  { name: "domingo", value: 10.1 },
];

export const adMetrics = {
  alcance: 728603,
  alcanceTrend: 7.6,
  impressoes: 2135599,
  impressoesTrend: 0,
  cliquesLink: 16871,
  cliquesLinkTrend: 3.2,
  custoPorClique: 2.47,
  custoTrend: -22.3,
};

export const funnelData = [
  { name: "Landing Page Views", value: 11607, rate: null },
  { name: "Checkouts Initiated", value: 2327, rate: 20.05 },
  { name: "Vendas Totais (Qtde)", value: 1744, rate: 41.0 },
];

export const funnelCosts = {
  costCheckoutInitiated: 27.58,
  costCheckoutTrend: -20.1,
  costPageviewCheckout: 20.05,
  costPageviewTrend: -3.6,
  costCheckoutCompras: 41.0,
  costCheckoutComprasTrend: -64.3,
  costPageViewCompras: 8.22,
  costPageViewComprasTrend: -29.5,
};

export const salesMetrics = {
  vendasTotais: 1744,
  cpa: 19.0,
  ticketMedio: 92.91,
  reembolso: 4962.40,
  reembolsoPercent: 2.43,
  taxaPlataforma: -54848.89,
  vendasPix: 747,
  vendasCartao: 899,
  vendasBoleto: 34,
  orderBump1: 19.47,
  orderBump2: 26.52,
  orderBump3: 10.15,
};

export const profitChartData = Array.from({ length: 30 }, (_, i) => ({
  day: String(i + 1).padStart(2, "0"),
  lucro: Math.floor(Math.random() * 3000) + 1500,
}));

export const AGE_COLORS = ["#3b82f6", "#8b5cf6", "#10b981", "#f59e0b", "#ef4444", "#06b6d4", "#ec4899", "#6b7280"];
export const GENDER_COLORS = ["#3b82f6", "#ec4899", "#6b7280"];
export const WEEKDAY_COLORS = ["#ef4444", "#f59e0b", "#10b981", "#3b82f6", "#8b5cf6", "#06b6d4", "#ec4899"];
