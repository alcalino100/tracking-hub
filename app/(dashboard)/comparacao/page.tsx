import { PlaceholderCard } from '../funil/page'

export default function ComparacaoPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-semibold">Comparação com a Meta</h1>
        <p className="text-sm text-muted-foreground">Diferenças entre dados do dashboard e da Meta</p>
      </div>
      <PlaceholderCard />
    </div>
  )
}
