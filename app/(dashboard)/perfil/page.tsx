import { PlaceholderCard } from '../funil/page'

export default function PerfilPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-semibold">Perfil do cliente ideal</h1>
        <p className="text-sm text-muted-foreground">Características dos leads que mais convertem</p>
      </div>
      <PlaceholderCard />
    </div>
  )
}
