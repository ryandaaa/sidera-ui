import { Code, CodeBlock } from '@/components/ui/CodeBlock'
import { ComponentDoc, type PropSpec } from '../ComponentDoc'

const propsSpec: PropSpec[] = [
  {
    name: 'code',
    type: 'string',
    default: '-',
    description: 'Raw string content to display and copy.',
  },
  {
    name: 'filename',
    type: 'string',
    default: '-',
    description: 'Header title or path label.',
  },
  {
    name: 'showLineNumbers',
    type: 'boolean',
    default: 'false',
    description: 'Renders tabular muted line numbers in the gutter.',
  },
  {
    name: 'language',
    type: 'string',
    default: '-',
    description: 'Language label displayed in the top bar.',
  },
]

const sampleJson = `{\n  "name": "sidera-worker",\n  "compatibility_date": "2026-03-01",\n  "assets": {\n    "directory": "./dist",\n    "binding": "ASSETS"\n  }\n}`

const usageCode = `import { Code, CodeBlock } from '@/components/ui/CodeBlock'

export function Example() {
  return (
    <div>
      <p>Configure your <Code>wrangler.jsonc</Code> configuration file:</p>
      <CodeBlock
        filename="wrangler.jsonc"
        code="${sampleJson.replace(/\n/g, '\\n')}"
        showLineNumbers
      />
    </div>
  )
}`

const codeToc = [
  { id: 'overview', label: 'Overview' },
  { id: 'inline', label: 'Inline Code' },
  { id: 'multi-line', label: 'Code Block with Line Numbers' },
  { id: 'usage', label: 'Usage Snippet' },
  { id: 'props', label: 'Props Specification' },
]

export function CodeBlockPreview() {
  return (
    <ComponentDoc
      title="Code & Code Block"
      description="Monospace inline badges and syntax containers with one-click clipboard copying, file title headers, and tabular line numbering."
      componentPath="src/components/ui/CodeBlock"
      propsSpec={propsSpec}
      usageCode={usageCode}
      tocItems={codeToc}
    >
      {/* 1. Inline */}
      <div id="inline" className="space-y-3 scroll-mt-24">
        <span className="text-xs font-mono font-semibold text-[var(--text)] uppercase tracking-wider block">
          Inline Code Badges
        </span>
        <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
          Use the <Code>npm run deploy</Code> script to synchronize static build artifacts to{' '}
          <Code>workers.dev</Code> with zero downtime.
        </p>
      </div>

      {/* 2. Code Block */}
      <div id="multi-line" className="space-y-3 pt-6 border-t border-[var(--border)] scroll-mt-24">
        <span className="text-xs font-mono font-semibold text-[var(--text)] uppercase tracking-wider block">
          Code Block with Header & Copy
        </span>
        <CodeBlock
          filename="wrangler.jsonc"
          language="json"
          code={sampleJson}
          showLineNumbers
        />
      </div>
    </ComponentDoc>
  )
}
