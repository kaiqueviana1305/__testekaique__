import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import type { PlatformKPI } from "../../types";

const PLATFORM_COLORS: Record<string, string> = { meta: "#1877F2", linkedin: "#0A66C2", google_ads: "#EA4335" };
const PLATFORM_LABELS: Record<string, string> = { meta: "Meta Ads", linkedin: "LinkedIn", google_ads: "Google Ads" };
const METRIC_LABELS: Record<string, string> = { total_spend: "Investimento (R$)", total_clicks: "Cliques", total_leads: "Leads", cpl: "CPL (R$)", cpc: "CPC (R$)" };

interface PlatformBarChartProps {
  data: PlatformKPI[];
  metric?: "total_spend" | "total_clicks" | "total_leads" | "cpl" | "cpc";
  loading?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payload, metric }: any) => {
  if (!active || !payload?.length) return null;
  const isCurrency = ["total_spend", "cpl", "cpc"].includes(metric);
  return (
    <div className="rounded-xl px-3 py-2.5 text-xs shadow-lg" style={{ background: "#0D0D0D", border: "1px solid #2a2a2a", minWidth: 120 }}>
      <p className="font-semibold mb-1" style={{ color: "#666" }}>{payload[0].payload.name}</p>
      <p className="font-bold" style={{ color: "#fff" }}>
        {isCurrency ? `R$ ${Number(payload[0].value).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : Number(payload[0].value).toLocaleString("pt-BR")}
      </p>
    </div>
  );
};

export function PlatformBarChart({ data, metric = "total_spend", loading }: PlatformBarChartProps) {
  if (loading) return (
    <div className="bg-white rounded-2xl p-5 h-56 flex flex-col gap-3" style={{ border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 1px 3px rgba(0,0,0,0.07)" }}>
      <div className="h-4 w-40 bg-slate-100 rounded animate-pulse" />
      <div className="flex-1 bg-slate-50 rounded-xl animate-pulse" />
    </div>
  );

  const chartData = data.map((d) => ({ name: PLATFORM_LABELS[d.platform] ?? d.platform, value: d[metric], platform: d.platform }));

  return (
    <div className="bg-white rounded-2xl p-5" style={{ border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 1px 3px rgba(0,0,0,0.07)" }}>
      <p className="text-sm font-semibold text-slate-700 mb-4">{METRIC_LABELS[metric]} por plataforma</p>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={chartData} layout="vertical" margin={{ top: 0, right: 12, left: 4, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
          <XAxis type="number" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
          <YAxis type="category" dataKey="name" tick={{ fontSize: 12, fill: "#64748b" }} width={85} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip metric={metric} />} cursor={{ fill: "rgba(227,30,36,0.04)" }} />
          <Bar dataKey="value" radius={[0, 6, 6, 0]} maxBarSize={28}>
            {chartData.map((entry, i) => (
              <Cell key={i} fill={PLATFORM_COLORS[entry.platform] ?? "#E31E24"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
