import { KPICard } from "./KPICard";
import type { KPISummary } from "../../types";

interface KPIGridProps {
  data: KPISummary | null;
  loading?: boolean;
}

function fmt(value: number, type: "currency" | "number" | "percent" = "number") {
  if (type === "currency") return `R$ ${value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`;
  if (type === "percent") return `${value.toFixed(2)}%`;
  return value.toLocaleString("pt-BR");
}

export function KPIGrid({ data, loading }: KPIGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="rounded-xl border bg-gray-50 p-5 h-24 animate-pulse" />
        ))}
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <KPICard label="Investimento Total" value={fmt(data.total_spend, "currency")} color="blue"
        subtext={`${data.campaign_count} campanhas`} />
      <KPICard label="Impressões" value={fmt(data.total_impressions)} color="purple" />
      <KPICard label="Cliques" value={fmt(data.total_clicks)} color="green" />
      <KPICard label="Leads" value={fmt(data.total_leads)} color="orange" />
      <KPICard label="CPC" value={fmt(data.cpc, "currency")} color="blue"
        subtext="Custo por Clique" />
      <KPICard label="CPM" value={fmt(data.cpm, "currency")} color="purple"
        subtext="Custo por 1.000 impressões" />
      <KPICard label="CTR" value={fmt(data.ctr, "percent")} color="green"
        subtext="Click-Through Rate" />
      <KPICard label="CPL" value={fmt(data.cpl, "currency")} color="orange"
        subtext="Custo por Lead" />
    </div>
  );
}
