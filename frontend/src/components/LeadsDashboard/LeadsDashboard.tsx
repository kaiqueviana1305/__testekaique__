import { LeadsKPICards } from "./LeadsKPICards";
import { LeadsTimeSeriesChart } from "./LeadsTimeSeriesChart";
import { VideoEngagement } from "./VideoEngagement";
import { EngagementMetrics } from "./EngagementMetrics";
import { HighlightBlocks } from "./HighlightBlocks";
import { LeadsCampaignTable } from "./LeadsCampaignTable";
import { DayOfWeekChart } from "./DayOfWeekChart";
import { DateRangePicker } from "../shared/DateRangePicker";
import { useDateRange } from "../../hooks/useDateRange";
import type { Client } from "../../types";

interface LeadsDashboardProps {
  client: Client;
}

export function LeadsDashboard({ client }: LeadsDashboardProps) {
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
            <span className="text-xs text-green-400 font-medium">Leads</span>
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
      <LeadsKPICards />

      {/* Main content: chart + engagement + highlights */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Time series chart */}
        <div className="lg:col-span-5">
          <LeadsTimeSeriesChart />
        </div>

        {/* Video & Engagement metrics */}
        <div className="lg:col-span-4 space-y-4">
          <VideoEngagement />
          <EngagementMetrics />
        </div>

        {/* Highlight blocks */}
        <div className="lg:col-span-3">
          <HighlightBlocks />
        </div>
      </div>

      {/* Bottom: campaign table + day of week */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-8">
          <LeadsCampaignTable />
        </div>
        <div className="lg:col-span-4">
          <DayOfWeekChart />
        </div>
      </div>
    </div>
  );
}
