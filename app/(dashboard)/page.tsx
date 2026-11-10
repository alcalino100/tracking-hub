import { getOverview } from '@/lib/data/overview'
import { KPICard } from '@/components/kpi-card'
import { RevenueChart } from '@/components/revenue-chart'
import { LiveEvents } from '@/components/live-events'
import { HealthSummary } from '@/components/health-summary'
import { TopCampaigns } from '@/components/top-campaigns'
import { format } from '@/lib/format'
import type { KPI } from '@/lib/types'

function formatKpiValue(kpi: KPI): string {
  const value = typeof kpi.value === 'number' ? kpi.value : Number(kpi.value)
  switch (kpi.format) {
    case 'currency':
      return format.currency(value)
    case 'percentage':
      return format.percent(value)
    case 'decimal':
      return `${format.decimal(value)}x`
    default:
      return format.number(value)
  }
}

export default async function OverviewPage() {
  // Range fixo de 30 dias para dados mock
  const data = await getOverview('site_1', {
    from: new Date('2024-01-01'),
    to: new Date('2024-01-30'),
  })

  const mainKpis = [
    data.kpis.revenue,
    data.kpis.spend,
    data.kpis.roas,
    data.kpis.sales,
    data.kpis.leads,
    data.kpis.visitors,
  ]

  const compactKpis = [
    { label: 'CPL (Custo por Lead)', kpi: data.kpis.cpl },
    { label: 'CPA (Custo por Aquisição)', kpi: data.kpis.cpa },
    { label: 'Taxa de Conversão', kpi: data.kpis.conversionRate },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-display text-3xl font-semibold">Visão geral</h1>
        <p className="text-sm text-muted-foreground">Últimos 30 dias • Site Alfa</p>
      </div>

      {/* KPIs Principais */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {mainKpis.map((kpi) => (
          <KPICard
            key={kpi.label}
            label={kpi.label}
            value={formatKpiValue(kpi)}
            change={kpi.change}
            changeLabel="vs período anterior"
            sparkline={kpi.sparkline ?? []}
          />
        ))}
      </div>

      {/* KPIs Compactos */}
      <div className="grid gap-4 sm:grid-cols-3">
        {compactKpis.map(({ label, kpi }) => (
          <div key={label} className="rounded-lg border border-border bg-card p-4">
            <p className="text-sm font-medium text-muted-foreground">{label}</p>
            <p className="mt-1 font-display text-2xl font-semibold">
              {formatKpiValue(kpi)}
              <span
                className={`ml-2 text-sm font-medium ${
                  kpi.change >= 0 ? 'text-success' : 'text-destructive'
                }`}
              >
                {kpi.change >= 0 ? '+' : ''}
                {format.decimal(kpi.change, 1)}%
              </span>
            </p>
          </div>
        ))}
      </div>

      {/* Gráfico + Eventos ao Vivo */}
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RevenueChart data={data.dailySeries} />
        </div>
        <div>
          <LiveEvents />
        </div>
      </div>

      {/* Saúde + Top Campanhas */}
      <div className="grid gap-4 lg:grid-cols-3">
        <div>
          <HealthSummary summary={data.healthSummary} />
        </div>
        <div className="lg:col-span-2">
          <TopCampaigns campaigns={data.topCampaigns} />
        </div>
      </div>
    </div>
  )
}
