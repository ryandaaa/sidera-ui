import * as React from 'react'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
} from '@/components/ui/DropdownMenu'
import { Button } from '@/components/ui/Button'
import { MoreHorizontal, Terminal, GitBranch, Trash2, Copy, RefreshCw } from 'lucide-react'
import { ComponentDoc, type PropSpec } from '../ComponentDoc'

const propsSpec: PropSpec[] = [
  {
    name: 'DropdownMenuItem.danger',
    type: 'boolean',
    default: 'false',
    description: 'Applies destructive danger text and subtle hover tint.',
  },
  {
    name: 'DropdownMenuCheckboxItem.checked',
    type: 'boolean',
    default: 'false',
    description: 'Displays a Check indicator on active selection.',
  },
  {
    name: 'DropdownMenuShortcut',
    type: 'string',
    default: '-',
    description: 'Right-aligned monospace keyboard shortcut hint.',
  },
]

const usageCode = `import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/DropdownMenu'
import { Button } from '@/components/ui/Button'

export function Example() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary">Actions</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Duplicate</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem danger>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}`

const menuToc = [
  { id: 'overview', label: 'Overview' },
  { id: 'interactive', label: 'Action Menu' },
  { id: 'checkboxes', label: 'Filter Toggle Menu' },
  { id: 'usage', label: 'Usage Snippet' },
  { id: 'props', label: 'Props Specification' },
]

export function DropdownMenuPreview() {
  const [showLogs, setShowLogs] = React.useState(true)
  const [showMetrics, setShowMetrics] = React.useState(false)

  return (
    <ComponentDoc
      title="Dropdown Menu"
      description="Radix UI primitive for contextual action menus, cascading submenus, checkable items, and shortcut hints. Utilitarian layout with strict monochrome tokens."
      componentPath="src/components/ui/DropdownMenu"
      propsSpec={propsSpec}
      usageCode={usageCode}
      tocItems={menuToc}
    >
      {/* 1. Action Menu */}
      <div id="interactive" className="space-y-3 scroll-mt-24">
        <span className="text-xs font-mono font-semibold text-[var(--text)] uppercase tracking-wider block">
          Deployment Context Menu
        </span>
        <div className="flex gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" variant="secondary" rightIcon={<MoreHorizontal className="h-3.5 w-3.5" />}>
                Deployment Actions
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuLabel>Isolate Management</DropdownMenuLabel>
              <DropdownMenuItem>
                <Terminal className="mr-2 h-3.5 w-3.5 text-[var(--text-muted)]" />
                <span>Open Edge Console</span>
                <DropdownMenuShortcut>⌘O</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Copy className="mr-2 h-3.5 w-3.5 text-[var(--text-muted)]" />
                <span>Copy Deployment URL</span>
                <DropdownMenuShortcut>⌘C</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <RefreshCw className="mr-2 h-3.5 w-3.5 text-[var(--text-muted)]" />
                <span>Rollback to Revision</span>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem danger>
                <Trash2 className="mr-2 h-3.5 w-3.5" />
                <span>Teardown Isolate</span>
                <DropdownMenuShortcut>⌫</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* 2. Checkboxes Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" variant="ghost" leftIcon={<GitBranch className="h-3.5 w-3.5" />}>
                View Options
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              <DropdownMenuLabel>Telemetry Overlays</DropdownMenuLabel>
              <DropdownMenuCheckboxItem checked={showLogs} onCheckedChange={setShowLogs}>
                Real-time Logs
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked={showMetrics} onCheckedChange={setShowMetrics}>
                CPU & Memory Graphs
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </ComponentDoc>
  )
}
