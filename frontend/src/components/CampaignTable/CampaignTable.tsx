import type { Campaign } from "../../types";

const PLATFORM_BADGE: Record<string, string> = {
  meta: "bg-blue-100 text-blue-700",
  linkedin: "bg-sky-100 text-sky-700",
  google_ads: "bg-red-100 text-red-700",
};

const STATUS_BADGE: Record<string, string> = {
  ACTIVE: "bg-green-100 text-green-700",
  PAUSED: "bg-yellow-100 text-yellow-700",
  ARCHIVED: "bg-gray-100 text-gray-500",
  DELETED: "bg-red-100 text-red-500",
};

interface CampaignTableProps {
  campaigns: Campaign[];
  loading?: boolean;
}

function fmt(value: number | null | undefined, type: "currency" | "number" | "percent" = "number") {
  if (value == null || isNaN(value)) return "—";
  if (type === "currency") return `R$ ${value.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  if (type === "percent") return `${Number(value).toFixed(2)}%`;
  return Number(value).toLocaleString("pt-BR");
}

export function CampaignTable({ campaigns, loading }: CampaignTableProps) {
  if (loading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-12 bg-gray-50 rounded animate-pulse" />
        ))}
      </div>
    );
  }

  if (!campaigns.length) {
    return (
      <div className="text-center py-12 text-gray-400">
        <p className="text-lg">Nenhuma campanha encontrada.</p>
        <p className="text-sm mt-1">Sincronize suas conexões para importar campanhas.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border">
      <table className="w-full text-sm text-left">
        <thead className="bg-gray-50 text-gray-600 border-b">
          <tr>
            <th className="px-4 py-3 font-semibold">Campanha</th>
            <th className="px-4 py-3 font-semibold">Plataforma</th>
            <th className="px-4 py-3 font-semibold">Status</th>
            <th className="px-4 py-3 font-semibold text-right">Investimento</th>
            <th className="px-4 py-3 font-semibold text-right">Impressões</th>
            <th className="px-4 py-3 font-semibold text-right">Cliques</th>
            <th className="px-4 py-3 font-semibold text-right">Leads</th>
            <th className="px-4 py-3 font-semibold text-right">CTR</th>
            <th className="px-4 py-3 font-semibold text-right">CPC</th>
            <th className="px-4 py-3 font-semibold text-right">CPL</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {campaigns.map((c) => {
            const m = c.latest_metrics;
            return (
              <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 font-medium text-gray-800 max-w-xs truncate">{c.name}</td>
                <td className="px-4 py-3">
                  <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${PLATFORM_BADGE[c.platform] ?? "bg-gray-100 text-gray-600"}`}>
                    {c.platform_display}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${STATUS_BADGE[c.status] ?? "bg-gray-100 text-gray-500"}`}>
                    {c.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">{fmt(m?.spend, "currency")}</td>
                <td className="px-4 py-3 text-right">{fmt(m?.impressions)}</td>
                <td className="px-4 py-3 text-right">{fmt(m?.clicks)}</td>
                <td className="px-4 py-3 text-right">{fmt(m?.leads)}</td>
                <td className="px-4 py-3 text-right">{fmt(m?.ctr, "percent")}</td>
                <td className="px-4 py-3 text-right">{fmt(m?.cpc, "currency")}</td>
                <td className="px-4 py-3 text-right">{fmt(m?.cpl, "currency")}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
