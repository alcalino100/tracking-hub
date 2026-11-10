'use client'

import { Card } from '@/components/ui/card'
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { format } from '@/lib/format'

interface DailyPoint {
  date: string
  revenue: number
  spend: number
}

export function RevenueChart({ data }: { data: DailyPoint[] }) {
  const chartData = data.map((d) => ({
    date: new Date(d.date + 'T00:00:00').toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
    }),
    Receita: Math.round(d.revenue),
    Gasto: Math.round(d.spend),
  }))

  return (
    <Card className="border-border bg-card p-6">
      <div className="space-y-4">
        <div>
          <h3 className="font-display text-lg font-semibold">Receita vs Gasto</h3>
          <p className="text-sm text-muted-foreground">Evolução diária do período</p>
        </div>

        <div className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorReceita" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorGasto" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
              <XAxis
                dataKey="date"
                stroke="#71717a"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                interval="preserveStartEnd"
                minTickGap={24}
              />
              <YAxis
                stroke="#71717a"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                width={56}
                tickFormatter={(value: number) => `R$ ${(value / 1000).toFixed(1)}k`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#18181b',
                  border: '1px solid #27272a',
                  borderRadius: '8px',
                }}
                labelStyle={{ color: '#a1a1aa' }}
                formatter={(value: number | string) => format.currency(Number(value))}
              />
              <Legend wrapperStyle={{ paddingTop: '12px' }} iconType="line" />
              <Area
                type="monotone"
                dataKey="Receita"
                stroke="#22d3ee"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorReceita)"
              />
              <Area
                type="monotone"
                dataKey="Gasto"
                stroke="#f97316"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorGasto)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  )
}
