import { Card } from '@/components/ui/card'
import { Construction } from 'lucide-react'

export default function FunnelPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-semibold">Funil</h1>
        <p className="text-sm text-muted-foreground">Análise do funil de conversão</p>
      </div>
      <PlaceholderCard />
    </div>
  )
}

export function PlaceholderCard() {
  return (
    <Card className="flex h-64 flex-col items-center justify-center gap-3 border-dashed border-border bg-card/50">
      <Construction className="h-8 w-8 text-muted-foreground" />
      <p className="text-sm text-muted-foreground">Esta seção está em construção</p>
      <p className="text-xs text-muted-foreground/70">Disponível no próximo prompt</p>
    </Card>
  )
}
