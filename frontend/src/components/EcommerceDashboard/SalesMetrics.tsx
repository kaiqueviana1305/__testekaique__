import { salesMetrics } from "../../data/mockEcommerce";

const fmtCur = (v: number) =>
  "R$ " + v.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const fmtNum = (v: number) => v.toLocaleString("pt-BR");

export function SalesMetrics() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {/* Row 1: main sales metrics */}
      <div className="bg-[#161b22] border border-[#21262d] rounded-xl p-4">
        <p className="text-xs text-[#8b949e] mb-1">Vendas Totais (Qtde)</p>
        <p className="text-xl font-bold text-white">{fmtNum(salesMetrics.vendasTotais)}</p>
      </div>
      <div className="bg-[#161b22] border border-[#21262d] rounded-xl p-4">
        <p className="text-xs text-[#8b949e] mb-1">CPA</p>
        <p className="text-xl font-bold text-white">{fmtCur(salesMetrics.cpa)}</p>
      </div>
      <div className="bg-[#161b22] border border-[#21262d] rounded-xl p-4">
        <p className="text-xs text-[#8b949e] mb-1">Ticket Médio</p>
        <p className="text-xl font-bold text-white">{fmtCur(salesMetrics.ticketMedio)}</p>
      </div>
      <div className="bg-[#161b22] border border-[#21262d] rounded-xl p-4">
        <p className="text-xs text-[#8b949e] mb-1">Reembolso (R$)</p>
        <p className="text-xl font-bold text-white">{fmtCur(salesMetrics.reembolso)}</p>
        <p className="text-xs text-[#6b7280] mt-0.5">% Reembolso: {salesMetrics.reembolsoPercent.toFixed(2)}%</p>
      </div>

      {/* Payment breakdown */}
      <div className="bg-[#161b22] border border-[#21262d] rounded-xl p-4 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-green-600/20 flex items-center justify-center text-green-400 flex-shrink-0">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        </div>
        <div>
          <p className="text-xs text-[#8b949e]">Vendas no PIX</p>
          <p className="text-xl font-bold text-white">{fmtNum(salesMetrics.vendasPix)}</p>
        </div>
      </div>
      <div className="bg-[#161b22] border border-[#21262d] rounded-xl p-4 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-blue-600/20 flex items-center justify-center text-blue-400 flex-shrink-0">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
        </div>
        <div>
          <p className="text-xs text-[#8b949e]">Vendas no Cartão</p>
          <p className="text-xl font-bold text-white">{fmtNum(salesMetrics.vendasCartao)}</p>
        </div>
      </div>
      <div className="bg-[#161b22] border border-[#21262d] rounded-xl p-4 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-amber-600/20 flex items-center justify-center text-amber-400 flex-shrink-0">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <div>
          <p className="text-xs text-[#8b949e]">Vendas no Boleto</p>
          <p className="text-xl font-bold text-white">{fmtNum(salesMetrics.vendasBoleto)}</p>
        </div>
      </div>
      <div className="bg-[#161b22] border border-[#21262d] rounded-xl p-4">
        <p className="text-xs text-[#8b949e] mb-1">Taxa de Plataforma</p>
        <p className="text-xl font-bold text-red-400">{fmtCur(salesMetrics.taxaPlataforma)}</p>
      </div>

      {/* Order Bumps */}
      <div className="col-span-2 md:col-span-4 grid grid-cols-3 gap-4">
        {[
          { label: "% de conversão Order Bump 1", value: salesMetrics.orderBump1 },
          { label: "% de conversão Order Bump 2", value: salesMetrics.orderBump2 },
          { label: "% de conversão Order Bump 3", value: salesMetrics.orderBump3 },
        ].map((ob) => (
          <div key={ob.label} className="bg-[#161b22] border border-[#21262d] rounded-xl p-4">
            <p className="text-xs text-[#8b949e] mb-1">{ob.label}</p>
            <p className="text-xl font-bold text-white">{ob.value.toFixed(2)}%</p>
            <p className="text-xs text-[#6b7280] mt-0.5">Não há dados</p>
          </div>
        ))}
      </div>
    </div>
  );
}
