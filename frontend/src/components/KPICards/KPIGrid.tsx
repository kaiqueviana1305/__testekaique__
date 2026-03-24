import { KPICard } from "./KPICard";
import type { KPISummary } from "../../types";

interface KPIGridProps { data: KPISummary | null; loading?: boolean; }

function fmt(value: number, type: "currency" | "number" | "percent" = "number") {
  if (type === "currency") return `R$ ${value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`;
  if (type === "percent") return `${value.toFixed(2)}%`;
  return value.toLocaleString("pt-BR");
}

const SpendIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);
const EyeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
  </svg>
);
const ClickIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);
const LeadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

export function KPIGrid({ data, loading }: KPIGridProps) {
  if (loading) return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="bg-white rounded-2xl p-5 h-28 animate-pulse" style={{ border: "1px solid rgba(0,0,0,0.06)" }} />
      ))}
    </div>
  );
  if (!data) return null;
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <KPICard label="Investimento Total" value={fmt(data.total_spend, "currency")} color="red"    subtext={`${data.campaign_count} campanhas`} icon={<SpendIcon />} />
      <KPICard label="Impressões"         value={fmt(data.total_impressions)}        color="purple" icon={<EyeIcon />} />
      <KPICard label="Cliques"            value={fmt(data.total_clicks)}             color="green"  icon={<ClickIcon />} />
      <KPICard label="Leads"              value={fmt(data.total_leads)}              color="orange" icon={<LeadIcon />} />
      <KPICard label="CPC"  value={fmt(data.cpc,  "currency")} color="red"    subtext="Custo por Clique" />
      <KPICard label="CPM"  value={fmt(data.cpm,  "currency")} color="purple" subtext="por 1.000 impressões" />
      <KPICard label="CTR"  value={fmt(data.ctr,  "percent")}  color="green"  subtext="Click-Through Rate" />
      <KPICard label="CPL"  value={fmt(data.cpl,  "currency")} color="orange" subtext="Custo por Lead" />
    </div>
  );
}
