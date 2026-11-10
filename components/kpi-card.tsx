'use client'

import { Card } from '@/components/ui/card'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { Line, LineChart, ResponsiveContainer } from 'recharts'

interface KPICardProps {
  label: string
  value: string
  change: number
  changeLabel: string
  sparkline: number[]
}

export function KPICard({ label, value, change, changeLabel, sparkline }: KPICardProps) {
  const isPositive = change > 0
  const isNeutral = change === 0

  const data = sparkline.map((v, i) => ({ i, value: v }))

  return (
    <Card className="relative overflow-hidden border-border bg-card p-5 transition-colors hover:bg-card/80">
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 space-y-1">
            <p className="truncate text-sm font-medium text-muted-foreground">{label}</p>
            <p className="font-display text-2xl font-semibold tracking-tight tabular-nums">
              {value}
            </p>
          </div>
          {data.length > 1 && (
            <div className="h-10 w-20 shrink-0 text-primary opacity-60">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <Line type="monotone" dataKey="value" stroke="currentColor" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          {!isNeutral && (
            <div
              className={`flex items-center gap-1 rounded-md px-1.5 py-0.5 text-xs font-medium tabular-nums ${
                isPositive ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'
              }`}
            >
              {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
              <span>
                {isPositive ? '+' : ''}
                {change.toFixed(1)}%
              </span>
            </div>
          )}
          <span className="truncate text-xs text-muted-foreground">{changeLabel}</span>
        </div>
      </div>
    </Card>
  )
}
