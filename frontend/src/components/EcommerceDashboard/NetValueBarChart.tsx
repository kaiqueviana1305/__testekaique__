import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { netValueData } from "../../data/mockEcommerce";
import { SectionCard } from "../shared/SectionCard";

const fmt = (v: number) => "R$ " + (v / 1000).toFixed(1) + "k";

export function NetValueBarChart() {
  return (
    <SectionCard title="Valor Líquido">
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={netValueData} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
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
            itemStyle={{ color: "#3b82f6" }}
            formatter={(v: number) => [fmt(v), "Valor Líquido"]}
          />
          <Bar dataKey="value" fill="#3b82f6" radius={[3, 3, 0, 0]} maxBarSize={16} />
        </BarChart>
      </ResponsiveContainer>
    </SectionCard>
  );
}
