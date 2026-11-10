import { Suspense } from 'react'
import { AppShell } from '@/components/app-shell'
import { Topbar } from '@/components/topbar'
import { Skeleton } from '@/components/ui/skeleton'

function TopbarFallback() {
  return (
    <header className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b border-border bg-background/95 px-6 backdrop-blur">
      <Skeleton className="h-8 w-[280px]" />
      <div className="flex-1" />
      <Skeleton className="h-8 w-[180px]" />
      <div className="flex gap-1">
        <Skeleton className="h-8 w-16" />
        <Skeleton className="h-8 w-16" />
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-8 w-28" />
      </div>
      <Skeleton className="h-8 w-8 rounded-full" />
    </header>
  )
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AppShell>
      <div className="flex min-h-full flex-col">
        <Suspense fallback={<TopbarFallback />}>
          <Topbar />
        </Suspense>
        <div className="flex-1 p-6">{children}</div>
      </div>
    </AppShell>
  )
}
