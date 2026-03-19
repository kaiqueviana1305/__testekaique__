import { RevenueKPIs } from "./RevenueKPIs";
import { NetValueBarChart } from "./NetValueBarChart";
import { DemographicsSection } from "./DemographicsSection";
import { AdMetricsRow } from "./AdMetricsRow";
import { SalesFunnel } from "./SalesFunnel";
import { SalesMetrics } from "./SalesMetrics";
import { ProfitChart } from "./ProfitChart";
import { DateRangePicker } from "../shared/DateRangePicker";
import { useDateRange } from "../../hooks/useDateRange";
import type { Client } from "../../types";

interface EcommerceDashboardProps {
  client: Client;
}

export function EcommerceDashboard({ client }: EcommerceDashboardProps) {
  const { preset, range, setPreset } = useDateRange("last_30_days");

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold"
            style={{ backgroundColor: client.color }}
          >
            {client.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">{client.name}</h1>
            <span className="text-xs text-blue-400 font-medium">E-commerce</span>
          </div>
        </div>
        <DateRangePicker
          preset={preset}
          dateFrom={range.date_from}
          dateTo={range.date_to}
          onChange={(p, from, to) =>
            setPreset(p as Parameters<typeof setPreset>[0], from && to ? { date_from: from, date_to: to } : undefined)
          }
        />
      </div>

      {/* KPI Cards */}
      <RevenueKPIs />

      {/* Bar chart + Demographics */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-2">
          <NetValueBarChart />
        </div>
        <div className="lg:col-span-3">
          <DemographicsSection />
        </div>
      </div>

      {/* Ad Metrics */}
      <AdMetricsRow />

      {/* Funnel */}
      <SalesFunnel />

      {/* Sales Metrics */}
      <SalesMetrics />

      {/* Profit Chart */}
      <ProfitChart />
    </div>
  );
}
