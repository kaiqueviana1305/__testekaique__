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

type MetricKey = "spend" | "clicks" | "impressions" | "leads";

export function DashboardPage() {
  const { preset, range, setPreset } = useDateRange("last_30_days");
  const [platform, setPlatform] = useState<Platform | "all">("all");
  const [chartMetric, setChartMetric] = useState<MetricKey>("spend");

  const params: Record<string, string> = {
    date_from: range.date_from,
    date_to: range.date_to,
  };
  if (platform !== "all") params.platform = platform;

  const { data: kpiData, isLoading: kpiLoading } = useQuery({
    queryKey: ["kpi-summary", params],
    queryFn: () => campaignsApi.kpiSummary(params).then((r) => r.data),
  });

  const { data: platformData, isLoading: platformLoading } = useQuery({
    queryKey: ["kpi-by-platform", range],
    queryFn: () =>
      campaignsApi.kpiByPlatform({ date_from: range.date_from, date_to: range.date_to }).then((r) => r.data),
  });

  const { data: timeseriesData, isLoading: tsLoading } = useQuery({
    queryKey: ["timeseries", params],
    queryFn: () =>
      campaignsApi.timeseries({ ...params, group_by: platform === "all" ? "date" : "date" }).then((r) => r.data),
  });

  const { data: campaignsData, isLoading: campaignsLoading } = useQuery({
    queryKey: ["campaigns", params],
    queryFn: () => campaignsApi.list(params).then((r) => r.data.results ?? r.data),
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-xl font-bold text-gray-900">Dashboard de Campanhas</h1>
        <div className="flex flex-col sm:flex-row gap-3">
          <PlatformFilter selected={platform} onChange={setPlatform} />
        </div>
      </div>

      {/* Date picker */}
      <DateRangePicker
        preset={preset}
        dateFrom={range.date_from}
        dateTo={range.date_to}
        onChange={(p, from, to) => setPreset(p as Parameters<typeof setPreset>[0], from && to ? { date_from: from, date_to: to } : undefined)}
      />

      {/* KPI Grid */}
      <KPIGrid data={kpiData ?? null} loading={kpiLoading} />

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <div className="flex gap-2 mb-3 flex-wrap">
            {(["spend", "clicks", "impressions", "leads"] as MetricKey[]).map((m) => (
              <button
                key={m}
                onClick={() => setChartMetric(m)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                  chartMetric === m ? "bg-blue-600 text-white" : "bg-white border text-gray-600 hover:border-blue-400"
                }`}
              >
                {m === "spend" ? "Investimento" : m === "clicks" ? "Cliques" : m === "impressions" ? "Impressões" : "Leads"}
              </button>
            ))}
          </div>
          <SpendChart data={timeseriesData ?? []} metric={chartMetric} loading={tsLoading} />
        </div>
        <PlatformBarChart data={platformData ?? []} metric="total_spend" loading={platformLoading} />
      </div>

      {/* Second charts row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <PlatformBarChart data={platformData ?? []} metric="cpl" loading={platformLoading} />
        <PlatformBarChart data={platformData ?? []} metric="cpc" loading={platformLoading} />
      </div>

      {/* Campaign table */}
      <div>
        <h2 className="text-base font-semibold text-gray-800 mb-3">Campanhas</h2>
        <CampaignTable campaigns={campaignsData ?? []} loading={campaignsLoading} />
      </div>
    </div>
  );
}
