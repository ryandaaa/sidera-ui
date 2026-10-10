import { Kbd } from '@/components/ui/Kbd'
import { Separator } from '@/components/ui/Separator'
import { Skeleton } from '@/components/ui/Skeleton'
import { EmptyState } from '@/components/ui/EmptyState'
import { Button } from '@/components/ui/Button'
import { FolderGit2, Plus, Command } from 'lucide-react'
import { ComponentDoc, type PropSpec } from '../ComponentDoc'

const propsSpec: PropSpec[] = [
  {
    name: 'Kbd',
    type: "size?: 'sm' | 'md'",
    default: "'md'",
    description: 'Hardware key shortcut indicator with mono font.',
  },
  {
    name: 'Separator',
    type: "orientation?: 'horizontal' | 'vertical'",
    default: "'horizontal'",
    description: '1px hairline divider.',
  },
  {
    name: 'Skeleton',
    type: 'className',
    default: '-',
    description: 'Shimmer pulse loader box.',
  },
  {
    name: 'EmptyState',
    type: 'title, description, icon, action',
    default: '-',
    description: 'Container for zero-data states.',
  },
]

const usageCode = `import { Kbd, Separator, Skeleton, EmptyState } from '@/components/ui'

// Kbd: <Kbd>⌘K</Kbd>
// Separator: <Separator />
// Skeleton: <Skeleton className="h-4 w-32" />
// EmptyState: <EmptyState title="No repositories" />`

const utilsToc = [
  { id: 'overview', label: 'Overview' },
  { id: 'kbd', label: 'Keyboard Shortcuts (Kbd)' },
  { id: 'separator', label: 'Separators' },
  { id: 'skeleton', label: 'Skeleton Loaders' },
  { id: 'empty-state', label: 'Empty State' },
  { id: 'usage', label: 'Usage Snippet' },
  { id: 'props', label: 'Props Specification' },
]

export function DisplayUtilitiesPreview() {
  return (
    <ComponentDoc
      title="Display Utilities"
      description="Essential primitives for keyboard hints (Kbd), hairline dividers (Separator), content placeholders (Skeleton), and empty states."
      componentPath="src/components/ui"
      propsSpec={propsSpec}
      usageCode={usageCode}
      tocItems={utilsToc}
    >
      {/* 1. Kbd */}
      <div id="kbd" className="space-y-3 scroll-mt-24">
        <span className="text-xs font-mono font-semibold text-[var(--text)] uppercase tracking-wider block">
          Keyboard Shortcuts (Kbd)
        </span>
        <div className="flex flex-wrap items-center gap-3 text-xs text-[var(--text-secondary)]">
          <div className="flex items-center gap-1.5">
            <span>Quick search:</span>
            <Kbd>
              <Command className="h-3 w-3 stroke-[2]" aria-label="Command" />
            </Kbd>
            <Kbd>K</Kbd>
          </div>
          <div className="flex items-center gap-1.5">
            <span>Command palette:</span>
            <Kbd>Ctrl</Kbd>
            <Kbd>Shift</Kbd>
            <Kbd>P</Kbd>
          </div>
          <div className="flex items-center gap-1.5">
            <span>Compact size:</span>
            <Kbd size="sm">ESC</Kbd>
          </div>
        </div>
      </div>

      {/* 2. Separators */}
      <div id="separator" className="space-y-3 pt-6 border-t border-[var(--border)] scroll-mt-24">
        <span className="text-xs font-mono font-semibold text-[var(--text)] uppercase tracking-wider block">
          Separators
        </span>
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-xs text-[var(--text-secondary)]">
            <span>Left segment</span>
            <Separator orientation="vertical" className="h-4" />
            <span>Middle segment</span>
            <Separator orientation="vertical" className="h-4" />
            <span>Right segment</span>
          </div>
          <Separator />
          <p className="text-xs text-[var(--text-muted)]">Content separated by full-width hairline divider.</p>
        </div>
      </div>

      {/* 3. Skeletons */}
      <div id="skeleton" className="space-y-3 pt-6 border-t border-[var(--border)] scroll-mt-24">
        <span className="text-xs font-mono font-semibold text-[var(--text)] uppercase tracking-wider block">
          Skeleton Loaders
        </span>
        <div className="space-y-2.5 max-w-sm">
          <div className="flex items-center gap-3">
            <Skeleton className="h-8 w-8 rounded-[var(--radius-xs)] shrink-0" />
            <div className="space-y-1.5 flex-1">
              <Skeleton className="h-3 w-3/4" />
              <Skeleton className="h-2.5 w-1/2" />
            </div>
          </div>
          <Skeleton className="h-16 w-full" />
        </div>
      </div>

      {/* 4. Empty State */}
      <div id="empty-state" className="space-y-3 pt-6 border-t border-[var(--border)] scroll-mt-24">
        <span className="text-xs font-mono font-semibold text-[var(--text)] uppercase tracking-wider block">
          Empty State
        </span>
        <EmptyState
          icon={<FolderGit2 className="h-5 w-5" />}
          title="No Git repositories connected"
          description="Link an upstream GitHub or GitLab repository to enable automatic preview builds on git push."
          action={
            <Button size="sm" variant="secondary" leftIcon={<Plus className="h-3.5 w-3.5" />}>
              Connect Repository
            </Button>
          }
        />
      </div>
    </ComponentDoc>
  )
}
