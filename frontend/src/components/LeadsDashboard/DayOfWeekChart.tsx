import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { weekdayLeadsData, WEEKDAY_COLORS } from "../../data/mockLeads";
import { SectionCard } from "../shared/SectionCard";

export function DayOfWeekChart() {
  return (
    <SectionCard title="Distribuição por Dia da Semana">
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={weekdayLeadsData}
            cx="50%"
            cy="48%"
            innerRadius={55}
            outerRadius={80}
            paddingAngle={2}
            dataKey="value"
          >
            {weekdayLeadsData.map((_, i) => (
              <Cell key={i} fill={WEEKDAY_COLORS[i % WEEKDAY_COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ backgroundColor: "#21262d", border: "1px solid #30363d", borderRadius: 8, fontSize: 11 }}
            formatter={(v: number) => [`${v.toFixed(1)}%`]}
          />
          <Legend
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ fontSize: 10 }}
            formatter={(value) => <span style={{ color: "#8b949e" }}>{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </SectionCard>
  );
}
