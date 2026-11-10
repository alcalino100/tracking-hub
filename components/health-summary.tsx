'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, AlertTriangle, Activity } from 'lucide-react'

interface HealthData {
  purchaseEmq: number
  leadEmq: number
  sentPercentage: number
  pendingQueue: number
}

function emqStatus(value: number): 'ok' | 'warning' {
  return value >= 7 ? 'ok' : 'warning'
}

function emqLabel(value: number): string {
  if (value >= 8) return 'Excelente'
  if (value >= 7) return 'Bom'
  if (value >= 5) return 'Atenção'
  return 'Crítico'
}

export function HealthSummary({ summary }: { summary: HealthData }) {
  const purchaseStatus = emqStatus(summary.purchaseEmq)
  const leadStatus = emqStatus(summary.leadEmq)
  const overallStatus =
    purchaseStatus === 'warning' || leadStatus === 'warning' ? 'warning' : 'ok'

  const badgeClass =
    overallStatus === 'ok'
      ? 'border-success/20 bg-success/10 text-success'
      : 'border-yellow-500/20 bg-yellow-500/10 text-yellow-500'

  const items = [
    {
      label: 'Event Match Quality (Purchase)',
      value: `${summary.purchaseEmq.toFixed(1)}/10`,
      status: purchaseStatus,
      hint: emqLabel(summary.purchaseEmq),
    },
    {
      label: 'Event Match Quality (Lead)',
      value: `${summary.leadEmq.toFixed(1)}/10`,
      status: leadStatus,
      hint: emqLabel(summary.leadEmq),
    },
    {
      label: 'CAPI enviados',
      value: `${summary.sentPercentage.toFixed(1)}%`,
      status: summary.sentPercentage >= 95 ? 'ok' : 'warning',
      hint: 'Taxa de envio em tempo',
    },
    {
      label: 'Fila pendente',
      value: `${summary.pendingQueue} eventos`,
      status: summary.pendingQueue < 50 ? 'ok' : 'warning',
      hint: 'Aguardando envio à Meta',
    },
  ]

  return (
    <Card className="border-border bg-card p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-display text-lg font-semibold">Saúde do tracking</h3>
            <p className="text-sm text-muted-foreground">Qualidade dos sinais enviados</p>
          </div>
          <Badge variant="outline" className={badgeClass}>
            <Activity className="mr-1.5 h-3 w-3" />
            {overallStatus === 'ok' ? 'Operacional' : 'Atenção'}
          </Badge>
        </div>

        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-3 rounded-lg border border-border bg-background/50 p-3"
            >
              {item.status === 'ok' ? (
                <CheckCircle2 className="h-4 w-4 shrink-0 text-success" />
              ) : (
                <AlertTriangle className="h-4 w-4 shrink-0 text-yellow-500" />
              )}
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.hint}</p>
              </div>
              <span className="font-mono text-sm font-semibold tabular-nums">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}
