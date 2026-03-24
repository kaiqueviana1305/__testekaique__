import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { campaignsApi } from "../services/api";
import { KPIGrid } from "../components/KPICards/KPIGrid";
import { SpendChart } from "../components/Charts/SpendChart";
import { PlatformBarChart } from "../components/Charts/PlatformBarChart";
import { CampaignTable } from "../components/CampaignTable/CampaignTable";
import { DateRangePicker } from "../components/Dashboard/DateRangePicker";
import { PlatformFilter } from "../components/Dashboard/PlatformFilter";
import { useDateRange } from "../hooks/useDateRange";
import type { Platform } from "../types";

const R = "#E31E24";

type MetricKey = "spend" | "clicks" | "impressions" | "leads";
const METRIC_OPTIONS: { key: MetricKey; label: string }[] = [
  { key: "spend",       label: "Investimento" },
  { key: "clicks",      label: "Cliques" },
  { key: "impressions", label: "Impressões" },
  { key: "leads",       label: "Leads" },
];

export function DashboardPage() {
  const { preset, range, setPreset } = useDateRange("last_30_days");
  const [platform, setPlatform] = useState<Platform | "all">("all");
  const [chartMetric, setChartMetric] = useState<MetricKey>("spend");

  const params: Record<string, string> = { date_from: range.date_from, date_to: range.date_to };
  if (platform !== "all") params.platform = platform;

  const { data: kpiData,      isLoading: kpiLoading }      = useQuery({ queryKey: ["kpi-summary",    params], queryFn: () => campaignsApi.kpiSummary(params).then((r) => r.data) });
  const { data: platformData, isLoading: platformLoading } = useQuery({ queryKey: ["kpi-by-platform", range],  queryFn: () => campaignsApi.kpiByPlatform({ date_from: range.date_from, date_to: range.date_to }).then((r) => r.data) });
  const { data: timeseriesData, isLoading: tsLoading }     = useQuery({ queryKey: ["timeseries",      params], queryFn: () => campaignsApi.timeseries({ ...params, group_by: "date" }).then((r) => r.data) });
  const { data: campaignsData, isLoading: campaignsLoading } = useQuery({ queryKey: ["campaigns",    params], queryFn: () => campaignsApi.list(params).then((r) => r.data.results ?? r.data) });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Dashboard de Campanhas</h1>
          <p className="text-sm text-slate-400 mt-0.5">Visão geral da performance de mídia paga</p>
        </div>
        <PlatformFilter selected={platform} onChange={setPlatform} />
      </div>

      {/* Date range */}
      <DateRangePicker preset={preset} dateFrom={range.date_from} dateTo={range.date_to}
        onChange={(p, from, to) => setPreset(p as Parameters<typeof setPreset>[0], from && to ? { date_from: from, date_to: to } : undefined)} />

      {/* KPIs */}
      <KPIGrid data={kpiData ?? null} loading={kpiLoading} />

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 flex flex-col gap-3">
          <div className="flex items-center gap-1 self-start bg-white rounded-xl p-1"
            style={{ border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}>
            {METRIC_OPTIONS.map(({ key, label }) => (
              <button key={key} onClick={() => setChartMetric(key)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150"
                style={chartMetric === key ? { background: R, color: "white" } : { color: "#64748b" }}>
                {label}
              </button>
            ))}
          </div>
          <SpendChart data={timeseriesData ?? []} metric={chartMetric} loading={tsLoading} />
        </div>
        <PlatformBarChart data={platformData ?? []} metric="total_spend" loading={platformLoading} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <PlatformBarChart data={platformData ?? []} metric="cpl" loading={platformLoading} />
        <PlatformBarChart data={platformData ?? []} metric="cpc" loading={platformLoading} />
      </div>

      {/* Table */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-semibold text-slate-800">Campanhas</h2>
          {campaignsData?.length > 0 && (
            <span className="text-xs font-medium px-2.5 py-1 rounded-full" style={{ background: `${R}10`, color: R }}>
              {campaignsData.length} campanhas
            </span>
          )}
        </div>
        <CampaignTable campaigns={campaignsData ?? []} loading={campaignsLoading} />
      </div>
    </div>
  );
}
