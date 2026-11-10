'use client'

import { useEffect, useRef, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Activity } from 'lucide-react'

interface LiveEvent {
  id: string
  event_name: string
  time: string
  channel: string
  utm_source: string
  status: 'pending' | 'sent' | 'failed'
}

const statusColors = {
  sent: 'bg-success/10 text-success border-success/20',
  pending: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
  failed: 'bg-destructive/10 text-destructive border-destructive/20',
}

const statusLabels = {
  sent: 'Enviado',
  pending: 'Pendente',
  failed: 'Falhou',
}

function randomEvent(): LiveEvent {
  const names = ['PageView', 'ViewContent', 'Lead', 'InitiateCheckout', 'Purchase']
  const channels = ['Pixel + Servidor', 'Servidor', 'Pixel']
  const sources = ['facebook', 'instagram', 'google']
  const statuses: LiveEvent['status'][] = ['sent', 'sent', 'sent', 'pending', 'failed']
  return {
    id: Math.random().toString(36).slice(2),
    event_name: names[Math.floor(Math.random() * names.length)],
    time: new Date().toISOString(),
    channel: channels[Math.floor(Math.random() * channels.length)],
    utm_source: sources[Math.floor(Math.random() * sources.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
  }
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString('pt-BR', { hour12: false })
}

export function LiveEvents({ initialEvents }: { initialEvents?: LiveEvent[] }) {
  const [events, setEvents] = useState<LiveEvent[]>(
    initialEvents ?? Array.from({ length: 8 }, randomEvent).reverse()
  )
  const mountTime = useRef(Date.now())

  useEffect(() => {
    const interval = setInterval(() => {
      setEvents((prev) => [randomEvent(), ...prev].slice(0, 8))
      mountTime.current = Date.now()
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="flex h-full flex-col border-border bg-card p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-display text-lg font-semibold">Eventos ao vivo</h3>
            <p className="text-sm text-muted-foreground">Streaming em tempo real</p>
          </div>
          <div className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75 motion-reduce:animate-none" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-success" />
          </div>
        </div>

        <div aria-live="polite" className="max-h-[320px] space-y-2 overflow-y-auto pr-1">
          {events.map((event) => (
            <div
              key={event.id}
              className="animate-in fade-in slide-in-from-top-1 rounded-lg border border-border bg-background/50 p-3"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-sm font-medium">{event.event_name}</span>
                <span className="font-mono text-xs text-muted-foreground">
                  {formatTime(event.time)}
                </span>
              </div>
              <div className="mt-1.5 flex items-center gap-2">
                <Badge variant="outline" className={`h-5 px-1.5 text-[10px] ${statusColors[event.status]}`}>
                  {statusLabels[event.status]}
                </Badge>
                <span className="truncate text-xs text-muted-foreground">
                  {event.utm_source} · {event.channel}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}
