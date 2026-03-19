import type { Client } from "../types";

export const mockClients: Client[] = [
  {
    id: "seppala-ecommerce",
    name: "Seppala Store",
    dashboardType: "ecommerce",
    color: "#3b82f6",
    platforms: ["meta", "google_ads"],
    lastSync: "2024-10-31T23:59:00Z",
    kpiPreview: [
      { label: "Faturamento", value: "R$ 164.307", trend: 0 },
      { label: "Investimento", value: "R$ 64.171", trend: 0 },
      { label: "Lucro", value: "R$ 64.556", trend: 2.39 },
    ],
  },
  {
    id: "seppala-leads",
    name: "Seppala Imóveis",
    dashboardType: "leads",
    color: "#10b981",
    platforms: ["meta"],
    lastSync: "2025-03-05T23:59:00Z",
    kpiPreview: [
      { label: "Leads", value: "170", trend: 70.0 },
      { label: "Custo/Lead", value: "R$ 12,26", trend: 54.8 },
      { label: "Gasto Total", value: "R$ 2.083", trend: 163.1 },
    ],
  },
];
