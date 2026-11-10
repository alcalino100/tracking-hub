import { PlaceholderCard } from '../funil/page'

export default function JornadaPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-semibold">Jornada do lead</h1>
        <p className="text-sm text-muted-foreground">Caminho completo do primeiro toque até a conversão</p>
      </div>
      <PlaceholderCard />
    </div>
  )
}
