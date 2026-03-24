import type { Campaign } from "../../types";

const PLATFORM_BADGE: Record<string, { bg: string; color: string; dot: string }> = {
  meta:       { bg: "rgba(99,102,241,0.08)",  color: "#6366f1", dot: "#6366f1" },
  linkedin:   { bg: "rgba(10,102,194,0.08)",  color: "#0A66C2", dot: "#0A66C2" },
  google_ads: { bg: "rgba(244,63,94,0.08)",   color: "#f43f5e", dot: "#f43f5e" },
};

const STATUS_BADGE: Record<string, { bg: string; color: string }> = {
  ACTIVE:   { bg: "rgba(16,185,129,0.08)", color: "#10b981" },
  PAUSED:   { bg: "rgba(245,158,11,0.08)", color: "#f59e0b" },
  ARCHIVED: { bg: "rgba(100,116,139,0.08)", color: "#64748b" },
  DELETED:  { bg: "rgba(239,68,68,0.08)",  color: "#ef4444" },
};

interface CampaignTableProps {
  campaigns: Campaign[];
  loading?: boolean;
}

function fmt(value: number | null | undefined, type: "currency" | "number" | "percent" = "number") {
  if (value == null || isNaN(value)) return <span className="text-slate-300">—</span>;
  if (type === "currency") return `R$ ${value.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  if (type === "percent") return `${Number(value).toFixed(2)}%`;
  return Number(value).toLocaleString("pt-BR");
}

const columns = [
  { key: "name",         label: "Campanha" },
  { key: "platform",     label: "Plataforma" },
  { key: "status",       label: "Status" },
  { key: "spend",        label: "Investimento",  align: "right" },
  { key: "impressions",  label: "Impressões",    align: "right" },
  { key: "clicks",       label: "Cliques",       align: "right" },
  { key: "leads",        label: "Leads",         align: "right" },
  { key: "ctr",          label: "CTR",           align: "right" },
  { key: "cpc",          label: "CPC",           align: "right" },
  { key: "cpl",          label: "CPL",           align: "right" },
];

export function CampaignTable({ campaigns, loading }: CampaignTableProps) {
  if (loading) {
    return (
      <div
        className="bg-white rounded-2xl overflow-hidden"
        style={{ border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 1px 3px rgba(0,0,0,0.07)" }}
      >
        <div className="px-5 py-3.5 border-b border-slate-100 flex gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-3.5 bg-slate-100 rounded animate-pulse" style={{ width: `${60 + i * 20}px` }} />
          ))}
        </div>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="px-5 py-4 border-b border-slate-50 flex gap-4 items-center">
            <div className="h-3 bg-slate-100 rounded animate-pulse flex-1" />
            <div className="h-3 bg-slate-100 rounded animate-pulse w-16" />
            <div className="h-3 bg-slate-100 rounded animate-pulse w-12" />
          </div>
        ))}
      </div>
    );
  }

  if (!campaigns.length) {
    return (
      <div
        className="bg-white rounded-2xl py-16 text-center"
        style={{ border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 1px 3px rgba(0,0,0,0.07)" }}
      >
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4"
          style={{ background: "rgba(99,102,241,0.08)" }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="7" height="7" rx="1" />
          </svg>
        </div>
        <p className="font-semibold text-slate-700">Nenhuma campanha encontrada</p>
        <p className="text-sm text-slate-400 mt-1">Sincronize suas conexões para importar campanhas.</p>
      </div>
    );
  }

  return (
    <div
      className="bg-white rounded-2xl overflow-hidden"
      style={{ border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 1px 3px rgba(0,0,0,0.07)" }}
    >
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead>
            <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-4 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-400 bg-slate-50 ${col.align === "right" ? "text-right" : ""}`}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {campaigns.map((c, i) => {
              const m = c.latest_metrics;
              const platformStyle = PLATFORM_BADGE[c.platform] ?? { bg: "rgba(100,116,139,0.08)", color: "#64748b", dot: "#64748b" };
              const statusStyle = STATUS_BADGE[c.status] ?? { bg: "rgba(100,116,139,0.08)", color: "#64748b" };

              return (
                <tr
                  key={c.id}
                  className="transition-colors"
                  style={{ borderBottom: i < campaigns.length - 1 ? "1px solid #f8fafc" : "none" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#fafbff"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = ""; }}
                >
                  <td className="px-4 py-3.5 max-w-xs">
                    <span className="font-medium text-slate-800 truncate block">{c.name}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span
                      className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold"
                      style={{ background: platformStyle.bg, color: platformStyle.color }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: platformStyle.dot }} />
                      {c.platform_display}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span
                      className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold"
                      style={{ background: statusStyle.bg, color: statusStyle.color }}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-right font-medium text-slate-700">{fmt(m?.spend, "currency")}</td>
                  <td className="px-4 py-3.5 text-right text-slate-600">{fmt(m?.impressions)}</td>
                  <td className="px-4 py-3.5 text-right text-slate-600">{fmt(m?.clicks)}</td>
                  <td className="px-4 py-3.5 text-right text-slate-600">{fmt(m?.leads)}</td>
                  <td className="px-4 py-3.5 text-right text-slate-600">{fmt(m?.ctr, "percent")}</td>
                  <td className="px-4 py-3.5 text-right text-slate-600">{fmt(m?.cpc, "currency")}</td>
                  <td className="px-4 py-3.5 text-right text-slate-600">{fmt(m?.cpl, "currency")}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
