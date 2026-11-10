'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  BarChart3, 
  Filter, 
  Target, 
  Route, 
  Users, 
  Activity, 
  GitCompare, 
  UserCircle, 
  Settings,
  ChevronLeft,
  ChevronRight,
  Menu
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const ROUTES = [
  {
    group: 'Análise',
    items: [
      { href: '/', label: 'Visão geral', icon: BarChart3 },
      { href: '/funil', label: 'Funil', icon: Filter },
      { href: '/campanhas', label: 'Campanhas e criativos', icon: Target },
      { href: '/jornada', label: 'Jornada do lead', icon: Route },
      { href: '/perfil', label: 'Perfil do cliente ideal', icon: Users },
    ],
  },
  {
    group: 'Operação',
    items: [
      { href: '/saude', label: 'Saúde do tracking', icon: Activity },
      { href: '/comparacao', label: 'Comparação com a Meta', icon: GitCompare },
      { href: '/publicos', label: 'Públicos', icon: UserCircle },
    ],
  },
  {
    group: 'Sistema',
    items: [
      { href: '/configuracoes', label: 'Configurações', icon: Settings },
    ],
  },
];

function SidebarContent({ collapsed, onToggle }: { collapsed: boolean; onToggle: () => void }) {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center justify-between border-b border-border px-4">
        {!collapsed && (
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-primary/20 flex items-center justify-center">
              <BarChart3 className="h-5 w-5 text-primary" />
            </div>
            <span className="font-display text-lg font-semibold">Tracking Hub</span>
          </Link>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="h-8 w-8"
          aria-label={collapsed ? 'Expandir sidebar' : 'Recolher sidebar'}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      <nav className="flex-1 space-y-6 overflow-y-auto p-4">
        {ROUTES.map((group) => (
          <div key={group.group}>
            {!collapsed && (
              <h3 className="mb-2 px-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {group.group}
              </h3>
            )}
            <div className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                const link = (
                  <Link
                    href={item.href}
                    className={cn(
                      'flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors relative',
                      'hover:bg-card hover:text-foreground',
                      isActive
                        ? 'bg-card text-foreground before:absolute before:left-0 before:top-0 before:h-full before:w-0.5 before:bg-primary'
                        : 'text-muted-foreground'
                    )}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    {!collapsed && <span>{item.label}</span>}
                  </Link>
                );

                if (collapsed) {
                  return (
                    <Tooltip key={item.href} delay={0}>
                      <TooltipTrigger render={link} />
                      <TooltipContent side="right">{item.label}</TooltipContent>
                    </Tooltip>
                  );
                }

                return <div key={item.href}>{link}</div>;
              })}
            </div>
          </div>
        ))}
      </nav>
    </div>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          'hidden lg:flex flex-col border-r border-border bg-background transition-all duration-300',
          collapsed ? 'w-16' : 'w-60'
        )}
      >
        <SidebarContent collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      </aside>

      {/* Mobile Sidebar */}
      <Sheet>
        <SheetTrigger
          className="fixed left-4 top-4 z-50 flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground lg:hidden"
          aria-label="Abrir menu"
        >
          <Menu className="h-5 w-5" />
        </SheetTrigger>
        <SheetContent side="left" className="w-60 p-0">
          <SidebarContent collapsed={false} onToggle={() => {}} />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
