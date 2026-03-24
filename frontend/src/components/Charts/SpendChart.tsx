import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import type { TimeseriesPoint } from "../../types";

const PLATFORM_COLORS: Record<string, string> = {
  meta:       "#6366f1",
  linkedin:   "#0A66C2",
  google_ads: "#f43f5e",
  total:      "#6366f1",
};

interface SpendChartProps {
  data: TimeseriesPoint[];
  metric?: "spend" | "clicks" | "impressions" | "leads";
  loading?: boolean;
}

function formatDate(dateStr: string) {
  try {
    return format(parseISO(dateStr), "dd/MM", { locale: ptBR });
  } catch {
    return dateStr;
  }
}

const METRIC_LABELS: Record<string, string> = {
  spend:       "Investimento (R$)",
  clicks:      "Cliques",
  impressions: "Impressões",
  leads:       "Leads",
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payload, label, metric }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div
      className="rounded-xl px-3 py-2.5 text-xs shadow-lg"
      style={{ background: "#0B1120", border: "1px solid #1e2d47", minWidth: 130 }}
    >
      <p className="font-semibold mb-1.5" style={{ color: "#94a3b8" }}>{formatDate(label)}</p>
      {payload.map((entry: { name: string; value: number; color: string }) => (
        <div key={entry.name} className="flex items-center justify-between gap-4">
          <span className="flex items-center gap-1.5" style={{ color: "#cbd5e1" }}>
            <span className="w-2 h-2 rounded-full inline-block" style={{ background: entry.color }} />
            {entry.name}
          </span>
          <span className="font-semibold" style={{ color: "#f1f5f9" }}>
            {metric === "spend"
              ? `R$ ${Number(entry.value).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`
              : Number(entry.value).toLocaleString("pt-BR")}
          </span>
        </div>
      ))}
    </div>
  );
};

export function SpendChart({ data, metric = "spend", loading }: SpendChartProps) {
  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-5 h-[310px] flex flex-col gap-3" style={{ border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 1px 3px rgba(0,0,0,0.07)" }}>
        <div className="h-4 w-48 bg-slate-100 rounded animate-pulse" />
        <div className="flex-1 bg-slate-50 rounded-xl animate-pulse" />
      </div>
    );
  }

  const hasPlatform = data.length > 0 && "platform" in data[0];

  let chartData: Record<string, unknown>[];

  if (hasPlatform) {
    const byDate: Record<string, Record<string, unknown>> = {};
    for (const point of data) {
      const d = point.date;
      if (!byDate[d]) byDate[d] = { date: d };
      if (point.platform) {
        byDate[d][point.platform] = point[metric] ?? 0;
      }
    }
    chartData = Object.values(byDate).sort((a, b) =>
      String(a.date).localeCompare(String(b.date))
    );
  } else {
    chartData = data.map((p) => ({ ...p, date: p.date }));
  }

  const platforms = hasPlatform
    ? [...new Set(data.map((p) => p.platform).filter(Boolean))]
    : ["total"];

  return (
    <div
      className="bg-white rounded-2xl p-5"
      style={{ border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 1px 3px rgba(0,0,0,0.07)" }}
    >
      <p className="text-sm font-semibold text-slate-700 mb-4">
        {METRIC_LABELS[metric]} ao longo do tempo
      </p>
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={chartData} margin={{ top: 4, right: 4, left: -8, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
          <XAxis
            dataKey="date"
            tickFormatter={formatDate}
            tick={{ fontSize: 11, fill: "#94a3b8" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "#94a3b8" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip metric={metric} />} />
          <Legend
            wrapperStyle={{ fontSize: 12, color: "#64748b" }}
          />
          {platforms.map((p) => (
            <Line
              key={String(p)}
              type="monotone"
              dataKey={String(p) === "total" ? metric : String(p)}
              stroke={PLATFORM_COLORS[String(p)] ?? "#6366f1"}
              dot={false}
              strokeWidth={2.5}
              name={String(p) === "total" ? METRIC_LABELS[metric] : String(p)}
              activeDot={{ r: 5, strokeWidth: 0 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
