import { campaignsData } from "../../data/mockLeads";
import { SectionCard } from "../shared/SectionCard";

const fmtCur = (v: number) =>
  "R$ " + v.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const fmtNum = (v: number) => v.toLocaleString("pt-BR");

export function LeadsCampaignTable() {
  const totals = {
    spent: campaignsData.reduce((s, c) => s + c.spent, 0),
    results: campaignsData.reduce((s, c) => s + c.results, 0),
    impressions: campaignsData.reduce((s, c) => s + c.impressions, 0),
    linkClicks: campaignsData.reduce((s, c) => s + c.linkClicks, 0),
  };

  return (
    <SectionCard title="Campanhas">
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-[#21262d]">
              {["Campanhas", "Amount Spent", "Results", "Custo/Result.", "Impressions", "Link Clicks", "CPC", "CPM"].map((h) => (
                <th key={h} className="text-left pb-2 pr-3 text-[#6b7280] font-medium whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {campaignsData.map((c) => (
              <tr key={c.name} className="border-b border-[#21262d]/50 hover:bg-[#161b22]/50 transition-colors">
                <td className="py-2 pr-3 text-white max-w-[220px]">
                  <div className="flex items-center gap-2">
                    {c.statusColor && (
                      <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: c.statusColor }} />
                    )}
                    <span className="truncate">{c.name}</span>
                  </div>
                </td>
                <td className="py-2 pr-3 text-[#8b949e] whitespace-nowrap">{fmtCur(c.spent)}</td>
                <td className="py-2 pr-3 whitespace-nowrap">
                  <span
                    className="px-2 py-0.5 rounded text-white font-medium"
                    style={{ backgroundColor: c.results > 100 ? "#06b6d4" : c.results > 30 ? "#ec4899" : "#6b7280" }}
                  >
                    {fmtNum(c.results)}
                  </span>
                </td>
                <td className="py-2 pr-3 text-[#8b949e] whitespace-nowrap">{fmtCur(c.custoResult)}</td>
                <td className="py-2 pr-3 text-[#8b949e] whitespace-nowrap">{fmtNum(c.impressions)}</td>
                <td className="py-2 pr-3 whitespace-nowrap">
                  {c.linkClicks > 1000 ? (
                    <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 font-medium">
                      {fmtNum(c.linkClicks)}
                    </span>
                  ) : (
                    <span className="text-[#8b949e]">{fmtNum(c.linkClicks)}</span>
                  )}
                </td>
                <td className="py-2 pr-3 text-[#8b949e] whitespace-nowrap">{fmtCur(c.cpc)}</td>
                <td className="py-2 pr-3 text-[#8b949e] whitespace-nowrap">{fmtCur(c.cpm)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t border-[#21262d]">
              <td className="py-2 pr-3 text-[#8b949e] font-medium">Total geral</td>
              <td className="py-2 pr-3 text-white font-bold">{fmtCur(totals.spent)}</td>
              <td className="py-2 pr-3 text-white font-bold">{fmtNum(totals.results)}</td>
              <td className="py-2 pr-3 text-[#8b949e]">—</td>
              <td className="py-2 pr-3 text-white font-bold">{fmtNum(totals.impressions)}</td>
              <td className="py-2 pr-3 text-white font-bold">{fmtNum(totals.linkClicks)}</td>
              <td className="py-2 pr-3 text-[#8b949e]">—</td>
              <td className="py-2 pr-3 text-[#8b949e]">—</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </SectionCard>
  );
}
