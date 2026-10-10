import { Skeleton } from '@/components/ui/Skeleton'

export function DocsSkeleton() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] flex flex-col font-sans select-none animate-in fade-in duration-200">
      {/* Top Bar Skeleton */}
      <div className="h-12 border-b border-[var(--border)] bg-[var(--surface)] px-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Skeleton className="h-6 w-6" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-10" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-20" />
        </div>
      </div>

      {/* Workspace Skeleton: Sidebar + Content */}
      <div className="flex-1 flex w-full items-start">
        {/* Left Sidebar Skeleton */}
        <div className="w-64 border-r border-[var(--border)] bg-[var(--surface)] p-4 flex flex-col gap-4 h-[calc(100vh-3rem)]">
          <Skeleton className="h-8 w-full" />
          <div className="space-y-2 pt-2">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
          </div>
          <div className="space-y-2 pt-2">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
          </div>
        </div>

        {/* Center Content Skeleton */}
        <div className="flex-1 p-8 lg:p-10 space-y-6">
          {/* Page Header */}
          <div className="space-y-2">
            <Skeleton className="h-7 w-48" />
            <Skeleton className="h-4 w-96" />
          </div>

          {/* Cards & Previews */}
          <div className="space-y-4">
            <Skeleton className="h-44 w-full" />
            <div className="grid grid-cols-2 gap-4">
              <Skeleton className="h-36 w-full" />
              <Skeleton className="h-36 w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
