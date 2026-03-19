import { funnelData, funnelCosts } from "../../data/mockEcommerce";
import { SectionCard } from "../shared/SectionCard";

const fmtNum = (v: number) => v.toLocaleString("pt-BR");
const fmtCur = (v: number) =>
  "R$ " + v.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const FUNNEL_COLORS = ["#3b82f6", "#2563eb", "#1d4ed8"];
const FUNNEL_WIDTHS = ["100%", "75%", "55%"];

export function SalesFunnel() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Funnel Visual */}
      <SectionCard title="Funil de Conversão">
        <div className="flex flex-col items-center gap-1 py-2">
          {funnelData.map((step, i) => (
            <div key={step.name} className="w-full flex flex-col items-center gap-0.5">
              <div
                className="flex items-center justify-center rounded-lg py-3 transition-all"
                style={{
                  width: FUNNEL_WIDTHS[i],
                  backgroundColor: FUNNEL_COLORS[i],
                }}
              >
                <span className="text-white text-xs font-medium text-center px-2">{step.name}</span>
              </div>
              <span className="text-white font-bold text-lg">{fmtNum(step.value)}</span>
              {step.rate !== null && (
                <span className="text-xs text-[#8b949e]">Conv: {step.rate}%</span>
              )}
              {i < funnelData.length - 1 && (
                <div className="text-[#6b7280] text-xs my-1">↓</div>
              )}
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Cost metrics */}
      <SectionCard title="Custos de Conversão">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-[#0d1117] rounded-lg p-3">
            <p className="text-[10px] text-[#8b949e] mb-1">Cost Checkout Initiated</p>
            <p className="text-base font-bold text-white">{fmtCur(funnelCosts.costCheckoutInitiated)}</p>
            <p className={`text-xs font-medium ${funnelCosts.costCheckoutTrend >= 0 ? "text-green-400" : "text-red-400"}`}>
              {funnelCosts.costCheckoutTrend >= 0 ? "▲" : "▼"} {Math.abs(funnelCosts.costCheckoutTrend).toFixed(1)}%
            </p>
          </div>
          <div className="bg-[#0d1117] rounded-lg p-3">
            <p className="text-[10px] text-[#8b949e] mb-1">Conv. Pageview × Checkout</p>
            <p className="text-base font-bold text-white">{funnelCosts.costPageviewCheckout.toFixed(2)}%</p>
            <p className={`text-xs font-medium ${funnelCosts.costPageviewTrend >= 0 ? "text-green-400" : "text-red-400"}`}>
              {funnelCosts.costPageviewTrend >= 0 ? "▲" : "▼"} {Math.abs(funnelCosts.costPageviewTrend).toFixed(1)}%
            </p>
          </div>
          <div className="bg-[#0d1117] rounded-lg p-3">
            <p className="text-[10px] text-[#8b949e] mb-1">Conv. Checkout × Compras</p>
            <p className="text-base font-bold text-white">{funnelCosts.costCheckoutCompras.toFixed(2)}%</p>
            <p className={`text-xs font-medium ${funnelCosts.costCheckoutComprasTrend >= 0 ? "text-green-400" : "text-red-400"}`}>
              {funnelCosts.costCheckoutComprasTrend >= 0 ? "▲" : "▼"} {Math.abs(funnelCosts.costCheckoutComprasTrend).toFixed(1)}%
            </p>
          </div>
          <div className="bg-[#0d1117] rounded-lg p-3">
            <p className="text-[10px] text-[#8b949e] mb-1">Cost. Page View × Compras</p>
            <p className="text-base font-bold text-white">{funnelCosts.costPageViewCompras.toFixed(2)}%</p>
            <p className={`text-xs font-medium ${funnelCosts.costPageViewComprasTrend >= 0 ? "text-green-400" : "text-red-400"}`}>
              {funnelCosts.costPageViewComprasTrend >= 0 ? "▲" : "▼"} {Math.abs(funnelCosts.costPageViewComprasTrend).toFixed(1)}%
            </p>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
