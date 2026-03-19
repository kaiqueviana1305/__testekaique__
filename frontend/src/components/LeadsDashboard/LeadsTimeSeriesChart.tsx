import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { leadsTimeseriesData } from "../../data/mockLeads";
import { SectionCard } from "../shared/SectionCard";

export function LeadsTimeSeriesChart() {
  return (
    <SectionCard title="Leads vs Custo/Lead">
      <div className="flex items-center gap-4 mb-3">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-0.5 bg-green-400 inline-block rounded" />
          <span className="text-xs text-[#8b949e]">Leads</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-0.5 bg-cyan-400 inline-block rounded" />
          <span className="text-xs text-[#8b949e]">Custo/Lead</span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={leadsTimeseriesData} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#21262d" vertical={false} />
          <XAxis
            dataKey="date"
            tick={{ fill: "#6b7280", fontSize: 10 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            yAxisId="leads"
            tick={{ fill: "#6b7280", fontSize: 10 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            yAxisId="custo"
            orientation="right"
            tick={{ fill: "#6b7280", fontSize: 10 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `R$${v}`}
          />
          <Tooltip
            contentStyle={{ backgroundColor: "#21262d", border: "1px solid #30363d", borderRadius: 8 }}
            labelStyle={{ color: "#8b949e", fontSize: 11 }}
            itemStyle={{ fontSize: 11 }}
          />
          <Line
            yAxisId="leads"
            type="monotone"
            dataKey="leads"
            stroke="#10b981"
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 4 }}
            name="Leads"
          />
          <Line
            yAxisId="custo"
            type="monotone"
            dataKey="custoLead"
            stroke="#06b6d4"
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 4 }}
            name="Custo/Lead"
          />
        </LineChart>
      </ResponsiveContainer>
    </SectionCard>
  );
}
