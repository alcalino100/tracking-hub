'use client'

import { Card } from '@/components/ui/card'
import { format } from '@/lib/format'
import type { CampaignMetrics } from '@/lib/types'

export function TopCampaigns({ campaigns }: { campaigns: CampaignMetrics[] }) {
  return (
    <Card className="border-border bg-card p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-display text-lg font-semibold">Top 5 campanhas</h3>
            <p className="text-sm text-muted-foreground">Por receita gerada no período</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px]">
            <thead>
              <tr className="border-b border-border text-left text-xs text-muted-foreground">
                <th className="pb-3 pr-4 font-medium">Campanha</th>
                <th className="pb-3 pr-4 text-right font-medium">Leads</th>
                <th className="pb-3 pr-4 text-right font-medium">Vendas</th>
                <th className="pb-3 pr-4 text-right font-medium">Receita</th>
                <th className="pb-3 pr-4 text-right font-medium">Gasto</th>
                <th className="pb-3 pr-4 text-right font-medium">CPL</th>
                <th className="pb-3 text-right font-medium">ROAS</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((campaign, index) => (
                <tr
                  key={campaign.campaign_id}
                  className="border-b border-border/50 transition-colors last:border-0 hover:bg-muted/50"
                >
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-2">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-primary/10 font-mono text-xs font-semibold text-primary">
                        {index + 1}
                      </span>
                      <span className="text-sm font-medium">{campaign.campaign_name}</span>
                    </div>
                  </td>
                  <td className="py-3 pr-4 text-right font-mono text-sm tabular-nums text-muted-foreground">
                    {format.number(campaign.leads)}
                  </td>
                  <td className="py-3 pr-4 text-right font-mono text-sm tabular-nums">
                    {format.number(campaign.sales)}
                  </td>
                  <td className="py-3 pr-4 text-right font-mono text-sm font-semibold tabular-nums text-success">
                    {format.currency(campaign.revenue)}
                  </td>
                  <td className="py-3 pr-4 text-right font-mono text-sm tabular-nums text-muted-foreground">
                    {format.currency(campaign.spend)}
                  </td>
                  <td className="py-3 pr-4 text-right font-mono text-sm tabular-nums text-muted-foreground">
                    {format.currency(campaign.cpl)}
                  </td>
                  <td className="py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <span className="font-mono text-sm font-semibold tabular-nums">
                        {campaign.roas.toFixed(2)}x
                      </span>
                      {campaign.roas_meta !== undefined && (
                        <span
                          className="rounded bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground"
                          title="ROAS reportado pela Meta"
                        >
                          Meta: {campaign.roas_meta.toFixed(2)}x
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Card>
  )
}
