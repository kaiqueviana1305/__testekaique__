import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { profitChartData } from "../../data/mockEcommerce";
import { SectionCard } from "../shared/SectionCard";

const fmt = (v: number) => "R$ " + (v / 1000).toFixed(1) + "k";

export function ProfitChart() {
  return (
    <SectionCard title="Lucro (R$)">
      <ResponsiveContainer width="100%" height={160}>
        <LineChart data={profitChartData} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#21262d" vertical={false} />
          <XAxis
            dataKey="day"
            tick={{ fill: "#6b7280", fontSize: 10 }}
            axisLine={false}
            tickLine={false}
            interval={4}
          />
          <YAxis
            tick={{ fill: "#6b7280", fontSize: 10 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={fmt}
          />
          <Tooltip
            contentStyle={{ backgroundColor: "#21262d", border: "1px solid #30363d", borderRadius: 8 }}
            labelStyle={{ color: "#8b949e", fontSize: 11 }}
            formatter={(v: number) => [fmt(v), "Lucro"]}
          />
          <Line
            type="monotone"
            dataKey="lucro"
            stroke="#10b981"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, fill: "#10b981" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </SectionCard>
  );
}
