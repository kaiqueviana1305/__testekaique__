import { videoMetrics } from "../../data/mockLeads";
import { SectionCard } from "../shared/SectionCard";

const fmtNum = (v: number) => v.toLocaleString("pt-BR");

export function VideoEngagement() {
  const items = [
    { label: "Viu Vídeo 25%", value: videoMetrics.viu25, trend: videoMetrics.viu25Trend, color: "bg-green-400", barColor: "bg-green-400" },
    { label: "Viu Vídeo 50%", value: videoMetrics.viu50, trend: videoMetrics.viu50Trend, color: "bg-blue-400", barColor: "bg-blue-400" },
    { label: "Viu Vídeo 95%", value: videoMetrics.viu95, trend: videoMetrics.viu95Trend, color: "bg-purple-400", barColor: "bg-purple-400" },
  ];

  return (
    <SectionCard title="Engajamento de Vídeo">
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.label}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-[#8b949e]">{item.label}</span>
              <span className={`text-xs font-medium ${item.trend >= 0 ? "text-green-400" : "text-red-400"}`}>
                {item.trend >= 0 ? "▲" : "▼"} {Math.abs(item.trend).toFixed(1)}%
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-white w-16 flex-shrink-0">{fmtNum(item.value)}</span>
              <div className="flex-1 h-2 bg-[#21262d] rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${item.barColor}`}
                  style={{ width: `${Math.min(100, (item.value / videoMetrics.viu25) * 100)}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
