import { engagementMetrics } from "../../data/mockLeads";
import { SectionCard } from "../shared/SectionCard";

const fmtNum = (v: number) => v.toLocaleString("pt-BR");
const fmtCur = (v: number) =>
  "R$ " + v.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export function EngagementMetrics() {
  const items = [
    { label: "Page Engagement", value: fmtNum(engagementMetrics.pageEngagement), trend: engagementMetrics.pageEngagementTrend },
    { label: "Post Engagement", value: fmtNum(engagementMetrics.postEngagement), trend: engagementMetrics.postEngagementTrend },
    { label: "Post Reactions", value: fmtNum(engagementMetrics.postReactions), trend: engagementMetrics.postReactionsTrend },
    { label: "CPM", value: fmtCur(engagementMetrics.cpm), trend: engagementMetrics.cpmTrend },
    { label: "C/V. View 50%", value: fmtCur(engagementMetrics.cvView50), trend: engagementMetrics.cvView50Trend },
    { label: "Custo/Eng. Post", value: fmtCur(engagementMetrics.custoEngPost), trend: engagementMetrics.custoEngPostTrend },
  ];

  return (
    <SectionCard title="Métricas de Engajamento">
      <div className="grid grid-cols-2 gap-2">
        {items.map((item) => (
          <div key={item.label} className="bg-[#0d1117] rounded-lg p-2.5">
            <p className="text-[10px] text-[#8b949e] mb-0.5">{item.label}</p>
            <p className="text-sm font-bold text-white">{item.value}</p>
            <p className={`text-[10px] font-medium ${item.trend >= 0 ? "text-green-400" : "text-red-400"}`}>
              {item.trend >= 0 ? "▲" : "▼"} {Math.abs(item.trend).toFixed(1)}%
            </p>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
