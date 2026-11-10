'use client';

import { useCallback } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { addDays, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Calendar as CalendarIcon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { MOCK_SITES } from '@/lib/mock/seed';

type DateRange = { from: Date; to: Date };

export function Topbar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const site = searchParams.get('site') || 'site_1';
  const preset = searchParams.get('preset') || '30d';

  const [liveCount, setLiveCount] = useState(38);
  const [datePickerOpen, setDatePickerOpen] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setLiveCount((c) => Math.max(10, Math.min(80, c + Math.round((Math.random() - 0.48) * 6))));
    }, 4000);
    return () => clearInterval(id);
  }, []);

  const updateParams = useCallback(
    (updates: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        params.set(key, value);
      });
      router.push(`${pathname}?${params.toString()}`);
    },
    [router, pathname, searchParams]
  );

  return (
    <header className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b border-border bg-background/95 px-6 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      {/* Site selector */}
      <Select value={site} onValueChange={(v) => updateParams({ site: v })}>
        <SelectTrigger className="h-8 w-[280px] text-sm" aria-label="Selecionar site">
          <SelectValue placeholder="Selecione o site" />
        </SelectTrigger>
        <SelectContent>
          {MOCK_SITES.map((s) => (
            <SelectItem key={s.id} value={s.id}>
              {s.name} · {s.domain}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="flex-1" />

      {/* Live badge */}
      <Badge
        variant="outline"
        className="gap-1.5 rounded-md border-border bg-card px-2 py-1 text-xs"
        aria-live="polite"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75 motion-reduce:animate-none" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
        </span>
        Ao vivo
        <span className="tabular-nums text-muted-foreground">· {liveCount} eventos / 5 min</span>
      </Badge>

      {/* Period selector */}
      <div className="flex items-center gap-1">
        {['today', '7d', '30d'].map((p) => (
          <Button
            key={p}
            variant={preset === p ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => updateParams({ preset: p })}
            className="h-8 px-2.5 text-xs"
          >
            {p === 'today' ? 'Hoje' : p === '7d' ? '7 dias' : '30 dias'}
          </Button>
        ))}
        <Popover open={datePickerOpen} onOpenChange={setDatePickerOpen}>
          <PopoverTrigger render={<Button variant="ghost" size="sm" className="h-8 gap-1.5 px-2.5 text-xs" />}>
            <CalendarIcon className="h-3.5 w-3.5" />
            Personalizado
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <Calendar mode="range" numberOfMonths={2} />
          </PopoverContent>
        </Popover>
      </div>

      {/* User menu */}
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <button
              className="flex items-center gap-2 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label="Menu do usuário"
            >
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary/20 text-primary text-xs font-semibold">
                  GT
                </AvatarFallback>
              </Avatar>
            </button>
          }
        />
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="flex items-center justify-between">
            <span>Gestor de Tráfego</span>
            <Badge variant="secondary" className="rounded text-[10px]">
              Administrador
            </Badge>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Perfil</DropdownMenuItem>
          <DropdownMenuItem>Configurações</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-error">Sair</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
