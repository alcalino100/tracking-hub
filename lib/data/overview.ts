// lib/data/overview.ts
import { MOCK_DATA, MOCK_SITES } from '../mock/seed';
import type { KPI, CampaignMetrics, DateRange } from '../types';

export interface OverviewData {
  kpis: {
    revenue: KPI;
    spend: KPI;
    roas: KPI;
    sales: KPI;
    visitors: KPI;
    leads: KPI;
    cpl: KPI;
    cpa: KPI;
    conversionRate: KPI;
  };
  dailySeries: Array<{
    date: string;
    revenue: number;
    spend: number;
    leads: number;
    sales: number;
    roas: number;
  }>;
  topCampaigns: CampaignMetrics[];
  recentEvents: Array<{
    event_id: string;
    event_name: string;
    event_time: string;
    event_source_url: string;
    utm_source: string;
    channel: string;
    status: 'pending' | 'sent' | 'failed';
  }>;
  healthSummary: {
    purchaseEmq: number;
    leadEmq: number;
    sentPercentage: number;
    pendingQueue: number;
  };
}

function calculateSparkline(data: number[], points: number = 30): number[] {
  if (data.length <= points) return data;
  const step = data.length / points;
  const result: number[] = [];
  for (let i = 0; i < points; i++) {
    const idx = Math.floor(i * step);
    result.push(data[idx]);
  }
  return result;
}

function calculateChange(current: number, previous: number): number {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
}

export async function getOverview(
  siteId: string,
  range: DateRange
): Promise<OverviewData> {
  const metrics = MOCK_DATA.dailyMetrics;
  
  // Período atual
  const currentPeriod = metrics.slice(-30);
  const previousPeriod = metrics.slice(-60, -30);

  // Calcula totais
  const currentTotals = currentPeriod.reduce(
    (acc, day) => ({
      revenue: acc.revenue + day.revenue,
      spend: acc.spend + day.spend,
      sales: acc.sales + day.sales,
      visitors: acc.visitors + day.visitors,
      leads: acc.leads + day.leads,
    }),
    { revenue: 0, spend: 0, sales: 0, visitors: 0, leads: 0 }
  );

  const previousTotals = previousPeriod.reduce(
    (acc, day) => ({
      revenue: acc.revenue + day.revenue,
      spend: acc.spend + day.spend,
      sales: acc.sales + day.sales,
      visitors: acc.visitors + day.visitors,
      leads: acc.leads + day.leads,
    }),
    { revenue: 0, spend: 0, sales: 0, visitors: 0, leads: 0 }
  );

  const currentRoas = currentTotals.spend > 0 ? currentTotals.revenue / currentTotals.spend : 0;
  const previousRoas = previousTotals.spend > 0 ? previousTotals.revenue / previousTotals.spend : 0;
  const currentCpl = currentTotals.leads > 0 ? currentTotals.spend / currentTotals.leads : 0;
  const previousCpl = previousTotals.leads > 0 ? previousTotals.spend / previousTotals.leads : 0;
  const currentCpa = currentTotals.sales > 0 ? currentTotals.spend / currentTotals.sales : 0;
  const previousCpa = previousTotals.sales > 0 ? previousTotals.spend / previousTotals.sales : 0;
  const currentConvRate = currentTotals.visitors > 0 ? (currentTotals.sales / currentTotals.visitors) * 100 : 0;
  const previousConvRate = previousTotals.visitors > 0 ? (previousTotals.sales / previousTotals.visitors) * 100 : 0;

  return {
    kpis: {
      revenue: {
        label: 'Receita',
        value: currentTotals.revenue,
        change: calculateChange(currentTotals.revenue, previousTotals.revenue),
        sparkline: calculateSparkline(currentPeriod.map(d => d.revenue)),
        format: 'currency',
      },
      spend: {
        label: 'Gasto',
        value: currentTotals.spend,
        change: calculateChange(currentTotals.spend, previousTotals.spend),
        sparkline: calculateSparkline(currentPeriod.map(d => d.spend)),
        format: 'currency',
      },
      roas: {
        label: 'ROAS',
        value: currentRoas,
        change: calculateChange(currentRoas, previousRoas),
        sparkline: calculateSparkline(currentPeriod.map(d => d.roas)),
        format: 'decimal',
      },
      sales: {
        label: 'Vendas',
        value: currentTotals.sales,
        change: calculateChange(currentTotals.sales, previousTotals.sales),
        sparkline: calculateSparkline(currentPeriod.map(d => d.sales)),
        format: 'number',
      },
      visitors: {
        label: 'Visitantes',
        value: currentTotals.visitors,
        change: calculateChange(currentTotals.visitors, previousTotals.visitors),
        format: 'number',
      },
      leads: {
        label: 'Leads',
        value: currentTotals.leads,
        change: calculateChange(currentTotals.leads, previousTotals.leads),
        format: 'number',
      },
      cpl: {
        label: 'CPL',
        value: currentCpl,
        change: calculateChange(currentCpl, previousCpl),
        format: 'currency',
      },
      cpa: {
        label: 'CPA',
        value: currentCpa,
        change: calculateChange(currentCpa, previousCpa),
        format: 'currency',
      },
      conversionRate: {
        label: 'Taxa de conversão',
        value: currentConvRate,
        change: calculateChange(currentConvRate, previousConvRate),
        format: 'percentage',
      },
    },
    dailySeries: currentPeriod.map(d => ({
      date: d.date,
      revenue: d.revenue,
      spend: d.spend,
      leads: d.leads,
      sales: d.sales,
      roas: d.roas,
    })),
    topCampaigns: MOCK_DATA.campaigns.slice(0, 5),
    recentEvents: MOCK_DATA.events.slice(0, 12),
    healthSummary: {
      purchaseEmq: 7.8,
      leadEmq: 6.4,
      sentPercentage: 98.7,
      pendingQueue: 12,
    },
  };
}

export async function getDailySeries(siteId: string, range: DateRange) {
  const data = await getOverview(siteId, range);
  return data.dailySeries;
}

export async function getTopCampaigns(siteId: string, range: DateRange, attribution: 'first' | 'last' | 'linear' = 'last') {
  const data = await getOverview(siteId, range);
  
  // Simula recálculo por modelo de atribuição
  return data.topCampaigns.map(c => ({
    ...c,
    roas: attribution === 'first' ? c.roas * 0.92 : attribution === 'linear' ? c.roas * 0.96 : c.roas,
  }));
}

export async function getRecentEvents(siteId: string) {
  return MOCK_DATA.events.slice(0, 12);
}
