import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import type { TimeseriesPoint } from "../../types";

const PLATFORM_COLORS: Record<string, string> = {
  meta: "#1877F2",
  linkedin: "#0A66C2",
  google_ads: "#EA4335",
  total: "#6366f1",
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
  spend: "Investimento (R$)",
  clicks: "Cliques",
  impressions: "Impressões",
  leads: "Leads",
};

export function SpendChart({ data, metric = "spend", loading }: SpendChartProps) {
  if (loading) {
    return <div className="h-64 bg-gray-50 rounded-xl animate-pulse" />;
  }

  // Detect if data is grouped by platform
  const hasPlatform = data.length > 0 && "platform" in data[0];

  let chartData: Record<string, unknown>[];

  if (hasPlatform) {
    // Group by date, columns per platform
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
    <div className="bg-white rounded-xl border p-5">
      <h3 className="text-sm font-semibold text-gray-700 mb-4">{METRIC_LABELS[metric]} ao longo do tempo</h3>
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="date" tickFormatter={formatDate} tick={{ fontSize: 11 }} />
          <YAxis tick={{ fontSize: 11 }} />
          <Tooltip
            formatter={(val: number) =>
              metric === "spend" ? `R$ ${val.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : val.toLocaleString("pt-BR")
            }
            labelFormatter={formatDate}
          />
          <Legend />
          {platforms.map((p) => (
            <Line
              key={String(p)}
              type="monotone"
              dataKey={String(p) === "total" ? metric : String(p)}
              stroke={PLATFORM_COLORS[String(p)] ?? "#888"}
              dot={false}
              strokeWidth={2}
              name={String(p) === "total" ? METRIC_LABELS[metric] : String(p)}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
