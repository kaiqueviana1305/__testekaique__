import { Link } from "react-router-dom";
import type { Client } from "../../types";

interface ClientCardProps {
  client: Client;
}

const PLATFORM_LABELS: Record<string, string> = {
  meta: "Meta",
  google_ads: "Google Ads",
  linkedin: "LinkedIn",
  google_sheets: "Sheets",
};

export function ClientCard({ client }: ClientCardProps) {
  const typeLabel = client.dashboardType === "ecommerce" ? "E-commerce" : "Leads";
  const typeColor = client.dashboardType === "ecommerce" ? "text-blue-400 bg-blue-600/20" : "text-green-400 bg-green-600/20";

  const fmtDate = (d?: string) => {
    if (!d) return "Nunca";
    return new Date(d).toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" });
  };

  return (
    <div className="bg-[#161b22] border border-[#21262d] rounded-xl p-5 flex flex-col gap-4 hover:border-[#30363d] transition-colors">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
            style={{ backgroundColor: client.color }}
          >
            {client.name.charAt(0)}
          </div>
          <div>
            <h3 className="font-semibold text-white">{client.name}</h3>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${typeColor}`}>
              {typeLabel}
            </span>
          </div>
        </div>
        <Link
          to={`/clients/${client.id}/settings`}
          className="text-[#6b7280] hover:text-white transition-colors p-1"
          title="Configurações"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </Link>
      </div>

      {/* KPI Preview */}
      {client.kpiPreview && (
        <div className="grid grid-cols-3 gap-2">
          {client.kpiPreview.map((kpi) => (
            <div key={kpi.label} className="bg-[#0d1117] rounded-lg p-2.5">
              <p className="text-[10px] text-[#6b7280] mb-0.5">{kpi.label}</p>
              <p className="text-sm font-bold text-white">{kpi.value}</p>
              {kpi.trend !== undefined && kpi.trend !== 0 && (
                <p className={`text-[10px] font-medium ${kpi.trend >= 0 ? "text-green-400" : "text-red-400"}`}>
                  {kpi.trend >= 0 ? "▲" : "▼"} {Math.abs(kpi.trend).toFixed(1)}%
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Platforms */}
      <div className="flex items-center gap-1.5 flex-wrap">
        {client.platforms.map((p) => (
          <span key={p} className="text-[10px] px-2 py-0.5 rounded bg-[#21262d] text-[#8b949e]">
            {PLATFORM_LABELS[p] || p}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-1 border-t border-[#21262d]">
        <span className="text-[11px] text-[#6b7280]">Sync: {fmtDate(client.lastSync)}</span>
        <Link
          to={`/clients/${client.id}`}
          className="text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1"
        >
          Ver dashboard
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
