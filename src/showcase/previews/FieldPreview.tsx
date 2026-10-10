import * as React from 'react'
import { Field } from '@/components/ui/Field'
import { Input } from '@/components/ui/Input'
import { ComponentDoc, type PropSpec } from '../ComponentDoc'

const propsSpec: PropSpec[] = [
  {
    name: 'label',
    type: 'React.ReactNode',
    default: '-',
    description: 'Field label rendered above control, associated via htmlFor.',
  },
  {
    name: 'hint',
    type: 'React.ReactNode',
    default: '-',
    description: 'Informational message below control, linked via aria-describedby.',
  },
  {
    name: 'error',
    type: 'React.ReactNode',
    default: '-',
    description: 'Error alert message below control with role="alert". Overrides hint.',
  },
  {
    name: 'required',
    type: 'boolean',
    default: 'false',
    description: 'Displays a danger asterisk indicator.',
  },
  {
    name: 'optional',
    type: 'boolean',
    default: 'false',
    description: 'Displays a muted "Optional" indicator on the right.',
  },
]

const usageCode = `import { Field } from '@/components/ui/Field'
import { Input } from '@/components/ui/Input'

export function Example() {
  return (
    <Field
      label="Subdomain Name"
      hint="Must be between 3 and 32 characters."
      required
    >
      <Input placeholder="my-service" />
    </Field>
  )
}`

const fieldToc = [
  { id: 'overview', label: 'Overview' },
  { id: 'examples', label: 'Field State Examples' },
  { id: 'usage', label: 'Usage Snippet' },
  { id: 'props', label: 'Props Specification' },
]

export function FieldPreview() {
  const [val, setVal] = React.useState('production-db')

  return (
    <ComponentDoc
      title="Field"
      description="Accessible form field container. Handles label association, optional/required flags, hints, and error messaging."
      componentPath="src/components/ui/Field"
      propsSpec={propsSpec}
      usageCode={usageCode}
      tocItems={fieldToc}
    >
      <div id="examples" className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl scroll-mt-24">
        <Field
          label="Database Cluster Name"
          hint="Internal identifier for your production database instance."
          required
        >
          <Input value={val} onChange={(e) => setVal(e.target.value)} />
        </Field>

        <Field
          label="Custom Domain"
          optional
          hint="Leave blank if using automatic workers.dev domain."
        >
          <Input placeholder="api.company.com" />
        </Field>

        <Field
          label="Secret Encryption Key"
          error="Key must be 32 bytes hex-encoded."
          required
        >
          <Input defaultValue="short-key" hasError />
        </Field>

        <Field label="Deployment Region">
          <Input defaultValue="apac-southeast (Singapore)" disabled />
        </Field>
      </div>
    </ComponentDoc>
  )
}
