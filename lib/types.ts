// lib/types.ts

export type EventStatus = 'pending' | 'sent' | 'failed';
export type ActionSource = 'website' | 'email' | 'phone_call' | 'chat' | 'physical_store' | 'system_generated' | 'other';
export type ConsentStatus = 'granted' | 'denied' | 'pending';
export type UserRole = 'admin' | 'analyst' | 'viewer';

export interface Site {
  id: string;
  domain: string;
  name: string;
  pixel_id: string;
  created_at: string;
}

export interface Visitor {
  id: string;
  site_id: string;
  external_id?: string;
  fbp?: string;
  fbc?: string;
  ip_address?: string;
  user_agent?: string;
  first_seen_at: string;
  last_seen_at: string;
}

export interface Session {
  id: string;
  visitor_id: string;
  site_id: string;
  landing_page: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  started_at: string;
  ended_at?: string;
}

export interface Lead {
  id: string;
  visitor_id: string;
  site_id: string;
  email_hash?: string;
  phone_hash?: string;
  name_hash?: string;
  stage: 'lead' | 'qualified' | 'scheduled' | 'customer';
  score: number;
  expected_value: number;
  first_origin_source?: string;
  first_origin_campaign?: string;
  last_origin_source?: string;
  last_origin_campaign?: string;
  created_at: string;
  converted_at?: string;
  days_to_conversion?: number;
}

export interface TrackEvent {
  id: string;
  event_id: string;
  site_id: string;
  visitor_id: string;
  session_id?: string;
  event_name: string;
  event_time: string;
  action_source: ActionSource;
  event_source_url?: string;
  user_data: Record<string, any>;
  custom_data: Record<string, any>;
  status: EventStatus;
  created_at: string;
}

export interface Order {
  id: string;
  visitor_id: string;
  site_id: string;
  order_id: string;
  value: number;
  currency: string;
  items: any[];
  created_at: string;
}

export interface CapiDelivery {
  id: string;
  event_id: string;
  attempt: number;
  status_code: number;
  events_received: number;
  events_dropped: number;
  fbtrace_id?: string;
  error_message?: string;
  payload: Record<string, any>;
  sent_at: string;
}

export interface AdCost {
  id: string;
  site_id: string;
  date: string;
  campaign_id: string;
  campaign_name: string;
  adset_id: string;
  adset_name: string;
  ad_id: string;
  ad_name: string;
  spend: number;
  impressions: number;
  clicks: number;
  conversions_meta: number;
  revenue_meta: number;
}

export interface Consent {
  id: string;
  visitor_id: string;
  site_id: string;
  marketing_consent: ConsentStatus;
  analytics_consent: ConsentStatus;
  updated_at: string;
}

// Helper types
export interface DateRange {
  from: Date;
  to: Date;
}

export interface KPI {
  label: string;
  value: number | string;
  change: number;
  sparkline?: number[];
  format: 'currency' | 'number' | 'percentage' | 'decimal';
}

export interface CampaignMetrics {
  campaign_name: string;
  campaign_id: string;
  adset_name?: string;
  adset_id?: string;
  ad_name?: string;
  ad_id?: string;
  spend: number;
  impressions: number;
  clicks: number;
  ctr: number;
  leads: number;
  qualified: number;
  sales: number;
  revenue: number;
  cpl: number;
  cost_per_qualified: number;
  cac: number;
  roas: number;
  roas_meta?: number;
}
