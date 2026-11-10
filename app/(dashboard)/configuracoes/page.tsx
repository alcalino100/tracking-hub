'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Plus,
  Settings,
  Trash2,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Copy,
  Eye,
  EyeOff,
} from 'lucide-react'
import { useState } from 'react'

interface AdAccount {
  id: string
  name: string
  accountId: string
  status: 'active' | 'error' | 'pending'
  lastSync?: string
}

interface PixelConfig {
  id: string
  pixelId: string
  site: string
  status: 'active' | 'error'
  events24h: number
}

interface ApiConfig {
  id: string
  name: string
  type: 'graph' | 'conversions'
  status: 'active' | 'error'
  token: string
}

export default function ConfiguracoesPage() {
  const [showTokens, setShowTokens] = useState<Record<string, boolean>>({})
  
  const [adAccounts] = useState<AdAccount[]>([
    {
      id: '1',
      name: 'Conta Principal',
      accountId: 'act_123456789',
      status: 'active',
      lastSync: '2 min atrás',
    },
  ])

  const [pixels] = useState<PixelConfig[]>([
    {
      id: '1',
      pixelId: '987654321098765',
      site: 'site_1',
      status: 'active',
      events24h: 1247,
    },
  ])

  const [apis] = useState<ApiConfig[]>([
    {
      id: '1',
      name: 'Graph API - Produção',
      type: 'graph',
      status: 'active',
      token: 'EAABwzLix...',
    },
    {
      id: '2',
      name: 'Conversions API - Site Alfa',
      type: 'conversions',
      status: 'active',
      token: 'EAABwzLix...',
    },
  ])

  const toggleToken = (id: string) => {
    setShowTokens((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const copyToken = (token: string) => {
    navigator.clipboard.writeText(token)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-display text-3xl font-semibold">Configurações</h1>
        <p className="text-sm text-muted-foreground">
          Gerencie contas de anúncios, pixels e integrações
        </p>
      </div>

      {/* Contas de Anúncios */}
      <Card className="border-border bg-card p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display text-lg font-semibold">Contas de anúncios</h3>
              <p className="text-sm text-muted-foreground">
                Vincule suas contas do Facebook Ads Manager
              </p>
            </div>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Adicionar conta
            </Button>
          </div>

          <div className="space-y-3">
            {adAccounts.map((account) => (
              <div
                key={account.id}
                className="flex items-center justify-between rounded-lg border border-border bg-background/50 p-4"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                      account.status === 'active'
                        ? 'bg-success/10 text-success'
                        : 'bg-destructive/10 text-destructive'
                    }`}
                  >
                    {account.status === 'active' ? (
                      <CheckCircle2 className="h-5 w-5" />
                    ) : (
                      <AlertCircle className="h-5 w-5" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{account.name}</p>
                    <p className="font-mono text-sm text-muted-foreground">{account.accountId}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {account.lastSync && (
                    <span className="text-xs text-muted-foreground">
                      Sincronizado {account.lastSync}
                    </span>
                  )}
                  <Button variant="ghost" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Meta Pixels */}
      <Card className="border-border bg-card p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display text-lg font-semibold">Meta Pixels</h3>
              <p className="text-sm text-muted-foreground">
                Configure os pixels instalados nos seus sites
              </p>
            </div>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Adicionar pixel
            </Button>
          </div>

          <div className="space-y-3">
            {pixels.map((pixel) => (
              <div
                key={pixel.id}
                className="flex items-center justify-between rounded-lg border border-border bg-background/50 p-4"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                      pixel.status === 'active'
                        ? 'bg-primary/10 text-primary'
                        : 'bg-destructive/10 text-destructive'
                    }`}
                  >
                    <Settings className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">Site: {pixel.site}</p>
                      <Badge
                        variant="outline"
                        className={
                          pixel.status === 'active'
                            ? 'border-success/20 bg-success/10 text-success'
                            : 'border-destructive/20 bg-destructive/10 text-destructive'
                        }
                      >
                        {pixel.status === 'active' ? 'Ativo' : 'Erro'}
                      </Badge>
                    </div>
                    <p className="font-mono text-sm text-muted-foreground">ID: {pixel.pixelId}</p>
                    <p className="text-xs text-muted-foreground">
                      {pixel.events24h.toLocaleString('pt-BR')} eventos nas últimas 24h
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Button variant="ghost" size="sm">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Graph API & Conversions API */}
      <Card className="border-border bg-card p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display text-lg font-semibold">APIs da Meta</h3>
              <p className="text-sm text-muted-foreground">
                Tokens de acesso para Graph API e Conversions API
              </p>
            </div>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Adicionar token
            </Button>
          </div>

          <div className="space-y-3">
            {apis.map((api) => (
              <div
                key={api.id}
                className="flex items-center justify-between rounded-lg border border-border bg-background/50 p-4"
              >
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{api.name}</p>
                    <Badge variant="outline" className="text-xs">
                      {api.type === 'graph' ? 'Graph API' : 'Conversions API'}
                    </Badge>
                    <Badge
                      variant="outline"
                      className={
                        api.status === 'active'
                          ? 'border-success/20 bg-success/10 text-success'
                          : 'border-destructive/20 bg-destructive/10 text-destructive'
                      }
                    >
                      {api.status === 'active' ? 'Ativo' : 'Erro'}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <code className="rounded bg-muted px-2 py-1 font-mono text-xs">
                      {showTokens[api.id] ? api.token : '••••••••••••••••'}
                    </code>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleToken(api.id)}
                      className="h-7 px-2"
                    >
                      {showTokens[api.id] ? (
                        <EyeOff className="h-3.5 w-3.5" />
                      ) : (
                        <Eye className="h-3.5 w-3.5" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToken(api.token)}
                      className="h-7 px-2"
                    >
                      <Copy className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Button variant="ghost" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-lg border border-yellow-500/20 bg-yellow-500/10 p-4">
            <div className="flex gap-3">
              <AlertCircle className="h-5 w-5 shrink-0 text-yellow-500" />
              <div className="space-y-1 text-sm">
                <p className="font-medium text-yellow-500">Segurança dos tokens</p>
                <p className="text-yellow-500/80">
                  Nunca compartilhe seus tokens de acesso. Eles dão acesso completo às suas contas
                  do Facebook. Se suspeitar de vazamento, revogue imediatamente no Business Manager.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Supabase */}
      <Card className="border-border bg-card p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display text-lg font-semibold">Supabase</h3>
              <p className="text-sm text-muted-foreground">
                Configuração do banco de dados e armazenamento
              </p>
            </div>
            <Button size="sm" variant="outline">
              <ExternalLink className="mr-2 h-4 w-4" />
              Abrir painel
            </Button>
          </div>

          <div className="rounded-lg border border-border bg-background/50 p-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">URL do projeto</span>
                <code className="rounded bg-muted px-2 py-1 font-mono text-xs">
                  https://xxxxxxxx.supabase.co
                </code>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Status da conexão</span>
                <Badge
                  variant="outline"
                  className="border-success/20 bg-success/10 text-success"
                >
                  <CheckCircle2 className="mr-1.5 h-3 w-3" />
                  Conectado
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Armazenamento usado</span>
                <span className="font-mono text-sm">124 MB / 500 MB</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
