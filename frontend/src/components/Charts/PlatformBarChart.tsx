import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell,
} from "recharts";
import type { PlatformKPI } from "../../types";

const PLATFORM_COLORS: Record<string, string> = {
  meta: "#1877F2",
  linkedin: "#0A66C2",
  google_ads: "#EA4335",
};

const PLATFORM_LABELS: Record<string, string> = {
  meta: "Meta Ads",
  linkedin: "LinkedIn Ads",
  google_ads: "Google Ads",
};

interface PlatformBarChartProps {
  data: PlatformKPI[];
  metric?: "total_spend" | "total_clicks" | "total_leads" | "cpl" | "cpc";
  loading?: boolean;
}

const METRIC_LABELS: Record<string, string> = {
  total_spend: "Investimento (R$)",
  total_clicks: "Cliques",
  total_leads: "Leads",
  cpl: "CPL (R$)",
  cpc: "CPC (R$)",
};

export function PlatformBarChart({ data, metric = "total_spend", loading }: PlatformBarChartProps) {
  if (loading) {
    return <div className="h-56 bg-gray-50 rounded-xl animate-pulse" />;
  }

  const chartData = data.map((d) => ({
    name: PLATFORM_LABELS[d.platform] ?? d.platform,
    value: d[metric],
    platform: d.platform,
  }));

  return (
    <div className="bg-white rounded-xl border p-5">
      <h3 className="text-sm font-semibold text-gray-700 mb-4">{METRIC_LABELS[metric]} por plataforma</h3>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={chartData} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis type="number" tick={{ fontSize: 11 }} />
          <YAxis type="category" dataKey="name" tick={{ fontSize: 12 }} width={90} />
          <Tooltip
            formatter={(val: number) =>
              ["total_spend", "cpl", "cpc"].includes(metric)
                ? `R$ ${val.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`
                : val.toLocaleString("pt-BR")
            }
          />
          <Bar dataKey="value" radius={[0, 4, 4, 0]}>
            {chartData.map((entry, i) => (
              <Cell key={i} fill={PLATFORM_COLORS[entry.platform] ?? "#6366f1"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
