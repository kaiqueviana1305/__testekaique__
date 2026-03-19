import { ecommerceKPIs } from "../../data/mockEcommerce";

const fmt = (v: number) =>
  "R$ " + v.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

interface KPIBox {
  label: string;
  value: string;
  trend?: number;
  accent: string;
}

export function RevenueKPIs() {
  const boxes: KPIBox[] = [
    { label: "Faturamento (R$)", value: fmt(ecommerceKPIs.faturamento), accent: "border-blue-500/30" },
    { label: "Investimento Total", value: fmt(ecommerceKPIs.investimento), accent: "border-purple-500/30" },
    { label: "Impostos", value: fmt(ecommerceKPIs.impostos), accent: "border-amber-500/30" },
    {
      label: "Lucro (R$)",
      value: fmt(ecommerceKPIs.lucro),
      trend: ecommerceKPIs.lucroTrend,
      accent: "border-green-500/30",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {boxes.map((b) => (
        <div
          key={b.label}
          className={`bg-[#161b22] border ${b.accent} rounded-xl p-4`}
        >
          <p className="text-xs text-[#8b949e] font-medium mb-1">{b.label}</p>
          <p className="text-xl font-bold text-white leading-tight">{b.value}</p>
          {b.trend !== undefined ? (
            <p className={`text-xs mt-1 font-medium ${b.trend >= 0 ? "text-green-400" : "text-red-400"}`}>
              {b.trend >= 0 ? "▲" : "▼"} {Math.abs(b.trend).toFixed(2)}%
            </p>
          ) : (
            <p className="text-xs mt-1 text-[#6b7280]">Não há dados</p>
          )}
        </div>
      ))}
    </div>
  );
}
