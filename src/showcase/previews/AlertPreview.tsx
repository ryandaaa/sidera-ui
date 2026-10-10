import * as React from 'react'
import { Alert } from '@/components/ui/Alert'
import { ComponentDoc, type PropSpec } from '../ComponentDoc'

const propsSpec: PropSpec[] = [
  {
    name: 'variant',
    type: "'default' | 'info' | 'success' | 'warning' | 'danger'",
    default: "'default'",
    description: 'Muted status indicator hue.',
  },
  {
    name: 'title',
    type: 'React.ReactNode',
    default: '-',
    description: 'Header title of the alert banner.',
  },
  {
    name: 'icon',
    type: 'React.ReactNode',
    default: '-',
    description: 'Optional custom icon override.',
  },
  {
    name: 'onClose',
    type: '() => void',
    default: '-',
    description: 'Renders dismiss X button and invokes callback on click.',
  },
]

const usageCode = `import { Alert } from '@/components/ui/Alert'

export function Example() {
  return (
    <Alert variant="warning" title="Asset Bundle Size Warning">
      Initial bundle size exceeds 250kB. Consider dynamic import chunking.
    </Alert>
  )
}`

const alertToc = [
  { id: 'overview', label: 'Overview' },
  { id: 'variants', label: 'Semantic Status Variants' },
  { id: 'dismissible', label: 'Dismissible Alerts' },
  { id: 'usage', label: 'Usage Snippet' },
  { id: 'props', label: 'Props Specification' },
]

export function AlertPreview() {
  const [showDismissible, setShowDismissible] = React.useState(true)

  return (
    <ComponentDoc
      title="Alert"
      description="Contextual notification banners. Uses low-saturation status tokens strictly for communication, never for decoration."
      componentPath="src/components/ui/Alert"
      propsSpec={propsSpec}
      usageCode={usageCode}
      tocItems={alertToc}
    >
      {/* 1. Variants */}
      <div id="variants" className="space-y-3 scroll-mt-24">
        <span className="text-xs font-mono font-semibold text-[var(--text)] uppercase tracking-wider block">
          Status Variants
        </span>
        <div className="flex flex-col gap-3">
          <Alert
            variant="default"
            title="System Maintenance Window"
          >
            Scheduled database migrations will take place on Sunday at 03:00 UTC.
          </Alert>

          <Alert
            variant="info"
            title="Edge Caching Enabled"
          >
            Dynamic SSR responses are currently cached across 300+ global PoPs.
          </Alert>

          <Alert
            variant="success"
            title="Worker Deployment Succeeded"
          >
            Version v1.8.4 was successfully distributed to all edge isolates in 420ms.
          </Alert>

          <Alert
            variant="warning"
            title="Rate Limit Threshold Approaching"
          >
            Current API quota has reached 87% of monthly allocation.
          </Alert>

          <Alert
            variant="danger"
            title="Health Check Probe Failed"
          >
            Upstream origin service returned HTTP 502 Bad Gateway for 3 consecutive checks.
          </Alert>
        </div>
      </div>

      {/* 2. Dismissible */}
      <div id="dismissible" className="space-y-3 pt-6 border-t border-[var(--border)] scroll-mt-24">
        <span className="text-xs font-mono font-semibold text-[var(--text)] uppercase tracking-wider block">
          Dismissible Alert
        </span>
        {showDismissible ? (
          <Alert
            variant="info"
            title="New CLI version available"
            onClose={() => setShowDismissible(false)}
          >
            Run `wrangler update` to get latest isolate tracing features.
          </Alert>
        ) : (
          <button
            type="button"
            onClick={() => setShowDismissible(true)}
            className="text-xs font-mono text-[var(--text-muted)] hover:text-[var(--text)] underline"
          >
            Reset dismissed alert
          </button>
        )}
      </div>
    </ComponentDoc>
  )
}
