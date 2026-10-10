import {
  DescriptionList,
  DescriptionItem,
  DescriptionTerm,
  DescriptionDetails,
} from '@/components/ui/DescriptionList'
import { Badge } from '@/components/ui/Badge'
import { ComponentDoc, type PropSpec } from '../ComponentDoc'

const propsSpec: PropSpec[] = [
  {
    name: 'layout',
    type: "'horizontal' | 'stacked'",
    default: "'horizontal'",
    description: 'Arrangement of metadata terms and detail values.',
  },
]

const usageCode = `import {
  DescriptionList,
  DescriptionItem,
  DescriptionTerm,
  DescriptionDetails,
} from '@/components/ui/DescriptionList'

export function Example() {
  return (
    <DescriptionList>
      <DescriptionItem>
        <DescriptionTerm>Runtime</DescriptionTerm>
        <DescriptionDetails>Cloudflare Workers (workerd)</DescriptionDetails>
      </DescriptionItem>
      <DescriptionItem>
        <DescriptionTerm>Memory</DescriptionTerm>
        <DescriptionDetails>128 MB</DescriptionDetails>
      </DescriptionItem>
    </DescriptionList>
  )
}`

const descToc = [
  { id: 'overview', label: 'Overview' },
  { id: 'metadata', label: 'Edge Configuration Spec' },
  { id: 'usage', label: 'Usage Snippet' },
  { id: 'props', label: 'Props Specification' },
]

export function DescriptionListPreview() {
  return (
    <ComponentDoc
      title="Description List"
      description="Pairwise metadata display with edge-to-edge dividers and monospace keys. Essential for server inspector panels and hardware/deployment metrics."
      componentPath="src/components/ui/DescriptionList"
      propsSpec={propsSpec}
      usageCode={usageCode}
      tocItems={descToc}
    >
      <div id="metadata" className="space-y-3 scroll-mt-24">
        <span className="text-xs font-mono font-semibold text-[var(--text)] uppercase tracking-wider block">
          Deployment Specifications
        </span>
        <DescriptionList>
          <DescriptionItem>
            <DescriptionTerm>Worker ID</DescriptionTerm>
            <DescriptionDetails className="font-mono">wrk_891bc0299f11</DescriptionDetails>
          </DescriptionItem>
          <DescriptionItem>
            <DescriptionTerm>Primary Domain</DescriptionTerm>
            <DescriptionDetails className="font-mono">sidera-ui.pages.dev</DescriptionDetails>
          </DescriptionItem>
          <DescriptionItem>
            <DescriptionTerm>Compatibility Date</DescriptionTerm>
            <DescriptionDetails className="font-mono">2026-03-01 (Node.js compat enabled)</DescriptionDetails>
          </DescriptionItem>
          <DescriptionItem>
            <DescriptionTerm>Memory Allocation</DescriptionTerm>
            <DescriptionDetails className="font-mono">128 MB</DescriptionDetails>
          </DescriptionItem>
          <DescriptionItem>
            <DescriptionTerm>Asset Binding</DescriptionTerm>
            <DescriptionDetails>
              <Badge size="sm" variant="outline">STATIC_ASSETS (HTML5 History)</Badge>
            </DescriptionDetails>
          </DescriptionItem>
          <DescriptionItem>
            <DescriptionTerm>Health Status</DescriptionTerm>
            <DescriptionDetails>
              <Badge size="sm" variant="success" dot>Operational</Badge>
            </DescriptionDetails>
          </DescriptionItem>
        </DescriptionList>
      </div>
    </ComponentDoc>
  )
}
