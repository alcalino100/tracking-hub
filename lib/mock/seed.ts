// lib/mock/seed.ts
import type { Site, TrackEvent, CampaignMetrics, Lead } from '../types';

const SEED = 42;

function seededRandom(seed: number) {
  let value = seed;
  return () => {
    value = (value * 9301 + 49297) % 233280;
    return value / 233280;
  };
}

const rand = seededRandom(SEED);

export const MOCK_SITES: Site[] = [
  {
    id: 'site_1',
    domain: 'lp.alfa.com.br',
    name: 'Lançamento Alfa',
    pixel_id: '1234567890123456',
    created_at: '2024-01-15T10:00:00Z',
  },
  {
    id: 'site_2',
    domain: 'beta.com.br',
    name: 'Clínica Beta',
    pixel_id: '6543210987654321',
    created_at: '2024-02-01T10:00:00Z',
  },
];

export const MOCK_CAMPAIGNS = [
  '[CONV] Lookalike 1% Compradores',
  '[CONV] Interesses Quente',
  '[TOPO] Vídeo Prova Social',
  '[REMK] Visitantes 30d',
  '[CONV] Aberto Advantage+',
];

export const EVENT_NAMES = [
  'PageView',
  'ViewContent',
  'Lead',
  'QualifiedLead',
  'Schedule',
  'Purchase',
  'AddToCart',
  'InitiateCheckout',
  'ScrollDepth75',
];

// Gera 30 dias de dados para o site Alfa
export function generateMockData(siteId: string = 'site_1', days: number = 30) {
  const now = new Date();
  const data: any = {
    dailyMetrics: [],
    events: [],
    campaigns: [],
    leads: [],
  };

  // Totais esperados para site Alfa em 30 dias
  const TOTALS = {
    visitors: 48200,
    leads: 1920,
    qualified: 610,
    sales: 138,
    revenue: 193200,
    spend: 41500,
  };

  // Gera métricas diárias
  for (let i = 0; i < days; i++) {
    const date = new Date(now);
    date.setDate(date.getDate() - (days - i - 1));
    date.setHours(0, 0, 0, 0);

    const dayFactor = 0.8 + rand() * 0.4; // Variação diária
    
    const visitors = Math.round((TOTALS.visitors / days) * dayFactor);
    const leads = Math.round((TOTALS.leads / days) * dayFactor);
    const qualified = Math.round((TOTALS.qualified / days) * dayFactor);
    const sales = Math.round((TOTALS.sales / days) * dayFactor);
    const revenue = Math.round((TOTALS.revenue / days) * dayFactor);
    const spend = Math.round((TOTALS.spend / days) * dayFactor);

    data.dailyMetrics.push({
      date: date.toISOString().split('T')[0],
      visitors,
      leads,
      qualified,
      sales,
      revenue,
      spend,
      cpl: leads > 0 ? spend / leads : 0,
      cpa: sales > 0 ? spend / sales : 0,
      roas: spend > 0 ? revenue / spend : 0,
      conversion_rate: visitors > 0 ? (sales / visitors) * 100 : 0,
    });
  }

  // Gera campanhas
  MOCK_CAMPAIGNS.forEach((campaignName, idx) => {
    const campaignSpend = TOTALS.spend / MOCK_CAMPAIGNS.length;
    const campaignLeads = Math.round(TOTALS.leads / MOCK_CAMPAIGNS.length * (0.8 + rand() * 0.4));
    const campaignSales = Math.round(TOTALS.sales / MOCK_CAMPAIGNS.length * (0.8 + rand() * 0.4));
    const campaignRevenue = Math.round(TOTALS.revenue / MOCK_CAMPAIGNS.length * (0.8 + rand() * 0.4));

    data.campaigns.push({
      campaign_id: `campaign_${idx + 1}`,
      campaign_name: campaignName,
      spend: campaignSpend,
      impressions: Math.round(campaignSpend * 100 * (8 + rand() * 4)),
      clicks: Math.round(campaignSpend * (15 + rand() * 10)),
      ctr: 0,
      leads: campaignLeads,
      qualified: Math.round(campaignLeads * 0.32),
      sales: campaignSales,
      revenue: campaignRevenue,
      cpl: campaignLeads > 0 ? campaignSpend / campaignLeads : 0,
      cost_per_qualified: 0,
      cac: campaignSales > 0 ? campaignSpend / campaignSales : 0,
      roas: campaignSpend > 0 ? campaignRevenue / campaignSpend : 0,
      roas_meta: campaignSpend > 0 ? (campaignRevenue / campaignSpend) * (0.85 + rand() * 0.15) : 0,
    } as CampaignMetrics);
  });

  // Calcula CTR e cost_per_qualified
  data.campaigns.forEach((c: CampaignMetrics) => {
    c.ctr = c.impressions > 0 ? (c.clicks / c.impressions) * 100 : 0;
    c.cost_per_qualified = c.qualified > 0 ? c.spend / c.qualified : 0;
  });

  // Gera eventos recentes (últimas 24h)
  const recentEventCount = 500;
  for (let i = 0; i < recentEventCount; i++) {
    const eventTime = new Date(now.getTime() - rand() * 24 * 60 * 60 * 1000);
    const eventName = EVENT_NAMES[Math.floor(rand() * EVENT_NAMES.length)];
    const status = rand() > 0.98 ? 'failed' : rand() > 0.95 ? 'pending' : 'sent';

    data.events.push({
      event_id: `evt_${Date.now()}_${i}`,
      event_name: eventName,
      event_time: eventTime.toISOString(),
      event_source_url: '/produtos' + (rand() > 0.5 ? '/oferta' : '/vsl'),
      utm_source: ['facebook', 'instagram', 'google'][Math.floor(rand() * 3)],
      channel: rand() > 0.3 ? 'Pixel + Servidor' : 'Servidor',
      status,
    });
  }

  // Ordena eventos por tempo (mais recente primeiro)
  data.events.sort((a: any, b: any) => 
    new Date(b.event_time).getTime() - new Date(a.event_time).getTime()
  );

  // Gera 40 leads
  for (let i = 0; i < 40; i++) {
    const stage = rand() > 0.7 ? 'customer' : rand() > 0.5 ? 'qualified' : 'lead';
    const score = Math.round(30 + rand() * 70);
    const expectedValue = stage === 'customer' ? 1400 : Math.round(500 + rand() * 2000);

    data.leads.push({
      id: `lead_${i + 1}`,
      name: `Lead ${i + 1}`,
      email: `lead${i + 1}@example.com`,
      stage,
      score,
      expected_value: expectedValue,
      first_origin_source: ['facebook', 'instagram', 'google'][Math.floor(rand() * 3)],
      last_origin_source: ['facebook', 'instagram', 'google'][Math.floor(rand() * 3)],
      created_at: new Date(now.getTime() - rand() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    } as Lead);
  }

  return data;
}

export const MOCK_DATA = generateMockData('site_1', 30);
