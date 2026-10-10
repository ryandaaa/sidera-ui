import * as React from 'react'
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/Breadcrumb'
import { Pagination } from '@/components/ui/Pagination'
import { SidebarNavItem } from '@/components/ui/SidebarNavItem'
import { Server, Database, Activity, ShieldAlert } from 'lucide-react'
import { ComponentDoc, type PropSpec } from '../ComponentDoc'

const propsSpec: PropSpec[] = [
  {
    name: 'Breadcrumb',
    type: 'nav wrapper',
    default: '-',
    description: 'Hierarchical navigation trail with monospace path indicators.',
  },
  {
    name: 'Pagination',
    type: 'page, totalPages, onPageChange',
    default: '-',
    description: 'Compact tabular numeric page jumping control.',
  },
  {
    name: 'SidebarNavItem',
    type: 'active, icon, label, badge, count',
    default: '-',
    description: 'Single-row navigation link with active indicator dot and counters.',
  },
]

const usageCode = `import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Pagination,
  SidebarNavItem,
} from '@/components/ui'

// Breadcrumb
<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem><BreadcrumbLink href="#">Org</BreadcrumbLink></BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem><BreadcrumbPage>Workers</BreadcrumbPage></BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>

// Pagination
<Pagination page={1} totalPages={10} onPageChange={setPage} />

// Sidebar Item
<SidebarNavItem active label="Edge Isolates" count={8} />`

const navToc = [
  { id: 'overview', label: 'Overview' },
  { id: 'breadcrumb', label: 'Breadcrumb' },
  { id: 'pagination', label: 'Pagination' },
  { id: 'sidebar-nav', label: 'Sidebar Nav Item' },
  { id: 'usage', label: 'Usage Snippet' },
  { id: 'props', label: 'Props Specification' },
]

export function BreadcrumbPaginationPreview() {
  const [currentPage, setCurrentPage] = React.useState(3)
  const [activeItem, setActiveItem] = React.useState('isolates')

  return (
    <ComponentDoc
      title="Breadcrumb & Pagination"
      description="Hierarchical location navigation (Breadcrumb), tabular page jumping (Pagination), and dense sidebar navigation items (SidebarNavItem)."
      componentPath="src/components/ui"
      propsSpec={propsSpec}
      usageCode={usageCode}
      tocItems={navToc}
    >
      {/* 1. Breadcrumb */}
      <div id="breadcrumb" className="space-y-3 scroll-mt-24">
        <span className="text-xs font-mono font-semibold text-[var(--text)] uppercase tracking-wider block">
          Breadcrumb
        </span>
        <div className="space-y-3">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#tokens">Acme Corp</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#tokens">Cloudflare</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#tokens">Workers & Pages</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>sidera-ui-prod</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* 2. Pagination */}
      <div id="pagination" className="space-y-3 pt-6 border-t border-[var(--border)] scroll-mt-24">
        <span className="text-xs font-mono font-semibold text-[var(--text)] uppercase tracking-wider block">
          Dense Pagination
        </span>
        <div className="space-y-2">
          <Pagination
            page={currentPage}
            totalPages={12}
            onPageChange={setCurrentPage}
          />
          <p className="text-[11px] font-mono text-[var(--text-muted)]">
            Viewing records on page {currentPage} of 12
          </p>
        </div>
      </div>

      {/* 3. Sidebar Nav Item */}
      <div id="sidebar-nav" className="space-y-3 pt-6 border-t border-[var(--border)] scroll-mt-24">
        <span className="text-xs font-mono font-semibold text-[var(--text)] uppercase tracking-wider block">
          Sidebar Nav Items
        </span>
        <div className="max-w-xs space-y-1 p-2 rounded-[var(--radius-sm)] border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--border-hover)] transition-colors duration-200">
          <SidebarNavItem
            active={activeItem === 'isolates'}
            onClick={() => setActiveItem('isolates')}
            icon={<Server className="h-3.5 w-3.5" />}
            label="Isolates"
            count={14}
          />
          <SidebarNavItem
            active={activeItem === 'd1'}
            onClick={() => setActiveItem('d1')}
            icon={<Database className="h-3.5 w-3.5" />}
            label="D1 Databases"
            count={2}
          />
          <SidebarNavItem
            active={activeItem === 'telemetry'}
            onClick={() => setActiveItem('telemetry')}
            icon={<Activity className="h-3.5 w-3.5" />}
            label="Telemetry Stream"
          />
          <SidebarNavItem
            disabled
            icon={<ShieldAlert className="h-3.5 w-3.5" />}
            label="WAF Rules"
            badge="soon"
          />
        </div>
      </div>
    </ComponentDoc>
  )
}
