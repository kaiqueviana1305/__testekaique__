import { adMetrics } from "../../data/mockEcommerce";

const fmtNum = (v: number) =>
  v >= 1000000
    ? (v / 1000000).toFixed(2) + "M"
    : v >= 1000
    ? (v / 1000).toFixed(1) + "k"
    : String(v);

const fmtCurrency = (v: number) =>
  "R$ " + v.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export function AdMetricsRow() {
  const items = [
    { label: "Alcance", value: fmtNum(adMetrics.alcance), trend: adMetrics.alcanceTrend },
    { label: "Impressões", value: fmtNum(adMetrics.impressoes), trend: adMetrics.impressoesTrend },
    { label: "Cliques no Link", value: fmtNum(adMetrics.cliquesLink), trend: adMetrics.cliquesLinkTrend },
    { label: "Custo por Clique no Link", value: fmtCurrency(adMetrics.custoPorClique), trend: adMetrics.custoTrend },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map((item) => (
        <div key={item.label} className="bg-[#161b22] border border-[#21262d] rounded-xl p-4">
          <p className="text-xs text-[#8b949e] mb-1">{item.label}</p>
          <p className="text-xl font-bold text-white">{item.value}</p>
          {item.trend !== 0 ? (
            <p className={`text-xs mt-1 font-medium ${item.trend >= 0 ? "text-green-400" : "text-red-400"}`}>
              {item.trend >= 0 ? "▲" : "▼"} {Math.abs(item.trend).toFixed(1)}%
            </p>
          ) : (
            <p className="text-xs mt-1 text-[#6b7280]">Não há dados</p>
          )}
        </div>
      ))}
    </div>
  );
}
