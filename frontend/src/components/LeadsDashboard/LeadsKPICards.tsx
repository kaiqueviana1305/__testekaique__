import { leadsKPIs } from "../../data/mockLeads";

const fmtCur = (v: number) =>
  "R$ " + v.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const fmtNum = (v: number) => v.toLocaleString("pt-BR");

export function LeadsKPICards() {
  const cards = [
    { label: "Amount Spent", value: fmtCur(leadsKPIs.amountSpent), trend: leadsKPIs.amountTrend, accent: "border-t-green-400" },
    { label: "Leads", value: fmtNum(leadsKPIs.leads), trend: leadsKPIs.leadsTrend, accent: "border-t-blue-400" },
    { label: "Custo/Lead", value: fmtCur(leadsKPIs.custoLead), trend: leadsKPIs.custoLeadTrend, accent: "border-t-orange-400" },
    { label: "Link Clicks", value: fmtNum(leadsKPIs.linkClicks), trend: leadsKPIs.linkClicksTrend, accent: "border-t-pink-400" },
    { label: "Clicks (All)", value: fmtNum(leadsKPIs.clicksAll), trend: leadsKPIs.clicksAllTrend, accent: "border-t-cyan-400" },
    { label: "CPC (All)", value: fmtCur(leadsKPIs.cpc), trend: leadsKPIs.cpcTrend, accent: "border-t-purple-400" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
      {cards.map((c) => (
        <div
          key={c.label}
          className={`bg-[#161b22] border border-[#21262d] border-t-2 ${c.accent} rounded-xl p-3 relative overflow-hidden`}
        >
          <p className="text-xs text-[#8b949e] mb-1">{c.label}</p>
          <p className="text-lg font-bold text-white leading-tight">{c.value}</p>
          <p className={`text-xs mt-1 font-medium ${c.trend >= 0 ? "text-green-400" : "text-red-400"}`}>
            {c.trend >= 0 ? "▲" : "▼"} {Math.abs(c.trend).toFixed(1)}%
          </p>
          {/* Mini sparkline placeholder bar */}
          <div className="mt-2 h-8 flex items-end">
            <div className="w-full h-1 rounded-full bg-[#21262d]">
              <div
                className="h-full rounded-full bg-current opacity-40"
                style={{ width: `${Math.min(100, c.trend)}%` }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
