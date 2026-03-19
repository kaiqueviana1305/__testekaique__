import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { ageData, genderData, weekdayData, AGE_COLORS, GENDER_COLORS, WEEKDAY_COLORS } from "../../data/mockEcommerce";
import { SectionCard } from "../shared/SectionCard";

function MiniPie({ data, colors, title }: { data: { name: string; value: number }[]; colors: string[]; title: string }) {
  return (
    <SectionCard title={title}>
      <ResponsiveContainer width="100%" height={180}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={45}
            outerRadius={70}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((_, i) => (
              <Cell key={i} fill={colors[i % colors.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ backgroundColor: "#21262d", border: "1px solid #30363d", borderRadius: 8, fontSize: 11 }}
            formatter={(v: number) => [`${v.toFixed(1)}%`]}
          />
          <Legend
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ fontSize: 10, color: "#8b949e" }}
            formatter={(value) => <span style={{ color: "#8b949e" }}>{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </SectionCard>
  );
}

export function DemographicsSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <MiniPie data={ageData} colors={AGE_COLORS} title="Faixa Etária" />
      <MiniPie data={genderData} colors={GENDER_COLORS} title="Gênero" />
      <MiniPie data={weekdayData} colors={WEEKDAY_COLORS} title="Dia da Semana" />
    </div>
  );
}
