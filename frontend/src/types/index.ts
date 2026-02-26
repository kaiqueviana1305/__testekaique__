export type Platform = "meta" | "linkedin" | "google_ads" | "google_sheets";

export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  company: string;
  timezone: string;
}

export interface PlatformConnection {
  id: number;
  platform: Platform;
  platform_display: string;
  auth_method: "oauth" | "manual";
  auth_method_display: string;
  name: string;
  account_id: string;
  extra_config: Record<string, string>;
  is_active: boolean;
  last_sync_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface CampaignMetric {
  id: number;
  date_from: string;
  date_to: string;
  impressions: number;
  clicks: number;
  reach: number;
  leads: number;
  spend: number;
  ctr: number;
  cpc: number;
  cpm: number;
  cpl: number;
  roas: number;
  synced_at: string;
}

export interface Campaign {
  id: number;
  platform: Platform;
  platform_display: string;
  external_id: string;
  name: string;
  status: string;
  objective: string;
  latest_metrics: CampaignMetric | null;
  created_at: string;
  updated_at: string;
}

export interface KPISummary {
  total_spend: number;
  total_impressions: number;
  total_clicks: number;
  total_reach: number;
  total_leads: number;
  campaign_count: number;
  cpc: number;
  cpm: number;
  ctr: number;
  cpl: number;
}

export interface PlatformKPI {
  platform: Platform;
  total_spend: number;
  total_impressions: number;
  total_clicks: number;
  total_leads: number;
  cpc: number;
  ctr: number;
  cpl: number;
}

export interface TimeseriesPoint {
  date: string;
  spend?: number;
  impressions?: number;
  clicks?: number;
  leads?: number;
  platform?: Platform;
}

export interface Dashboard {
  id: number;
  name: string;
  description: string;
  platforms: Platform[];
  date_preset: string;
  is_default: boolean;
  created_at: string;
  updated_at: string;
}

export interface DateRange {
  date_from: string;
  date_to: string;
}
