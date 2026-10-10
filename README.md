# Sidera UI

Dense, utilitarian, formally restrained design system and component kit built with **React 19**, **TypeScript**, **Tailwind CSS v4**, and **Radix UI Primitives**, deployable directly to **Cloudflare Workers**.

---

## 📐 Design Direction & Principles

- **Strict Monochrome Base**: Off-white and near-black canvas with a neutral gray scale. Emphasis comes exclusively from contrast, weight, borders, and inversion (primary button = near-black fill on light / off-white fill on dark)—never from decorative hues.
- **Boxless, Borderless & Edge-to-Edge**: Avoids "box soup" (nested bordered cards). Relies on continuous dividers, high-contrast typography, and full-bleed layout.
- **Muted Semantic Status Colors**: Success, warning, danger, and info colors exist strictly for status communication (alerts, badges, validation). They are never used for decoration or primary actions.
- **Compact Geometry**: Control heights 28px (sm), 32px (md), 36px (lg). Tight padding, 2-4px radius max (`--radius-xs`, `--radius-sm`, `--radius-md`), zero drop shadows except on floating overlay layers.
- **Typography**: Self-hosted Satoshi font (`.woff2`) for UI text, monospace font for code and numeric/tabular data.

---

## 📦 Component Inventory

| Category | Components |
| :--- | :--- |
| **Foundation** | `Button`, `Input`, `Textarea`, `Select` (Radix), `Checkbox`, `Radio`, `Switch`, `Label`, `Field` |
| **Display** | `Badge`, `Tag`, `Avatar`, `Card`, `Table` (dense, sortable, sticky), `DescriptionList`, `CodeBlock`, `Code`, `Kbd`, `Separator`, `Skeleton`, `EmptyState` |
| **Feedback** | `Alert`, `Toast` (with `useToast` & `ToastProvider`), `Progress`, `Spinner`, `Tooltip` (Radix) |
| **Overlay** | `Dialog` (Radix), `Popover` (Radix), `DropdownMenu` (Radix) |
| **Navigation** | `Tabs` (Radix), `Breadcrumb`, `Pagination`, `SidebarNavItem`, `CommandSearch` |
| **Layout** | `Stack`, `Inline`, `Container`, `PageHeader` |

---

## 🚀 Copying Components into Another Project

Components in Sidera UI are strictly **copy-pasteable** and have **zero global state dependencies**.

### Step 1: Copy Core Dependencies
Install the peer dependencies in your target project:
```bash
pnpm add class-variance-authority clsx tailwind-merge lucide-react @radix-ui/react-slot
```
*(Install specific Radix packages as needed, e.g. `@radix-ui/react-dialog`, `@radix-ui/react-select`, etc.)*

### Step 2: Copy Token Architecture & CN Helper
Copy these files into your target project:
1. `src/styles/primitives.css` (raw scales)
2. `src/styles/tokens.css` (semantic CSS variable tokens)
3. `src/lib/cn.ts`:
```ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

Import them in your global CSS (`globals.css` or `index.css`):
```css
@import './styles/primitives.css';
@import './styles/tokens.css';
```

### Step 3: Copy the Desired Component Folder
Copy the folder from `src/components/ui/<Component>/` directly into your project. For example:
```text
src/components/ui/Button/
├── Button.tsx
└── index.ts
```
Import and use immediately:
```tsx
import { Button } from '@/components/ui/Button'

export function Action() {
  return <Button variant="primary" size="md">Deploy Revision</Button>
}
```

---

## 🎨 Creating a New Client Theme

Themes are defined **purely by overriding semantic tokens**; you never have to touch component code or add per-component `dark:` classes.

### 1. Create a Theme File
Create `src/themes/<client>.css`. For example, for a client wanting an electric blue primary accent:

```css
/* src/themes/client-cyber.css */
[data-brand="cyber"] {
  --primary: #0284c7;
  --primary-foreground: #ffffff;
  --focus-ring: #0284c7;
  --radius-xs: 0px;
  --radius-sm: 0px;
  --radius-md: 0px;
}

[data-brand="cyber"][data-theme="dark"] {
  --primary: #38bdf8;
  --primary-foreground: #08090b;
  --focus-ring: #38bdf8;
}
```

### 2. Import into `globals.css`
```css
@import './themes/client-cyber.css';
```

### 3. Activate the Brand Theme
Set the `data-brand` attribute on `<html>` or any container:
```html
<html data-brand="cyber" data-theme="dark">
```
All buttons, focus rings, switches, and active indicators automatically adapt while retaining strict contrast standards.

---

## 🛠️ Adding a New Component

Follow these rules when contributing new components:

1. **Dedicated Directory**: Place in `src/components/ui/<Component>/` with `<Component>.tsx` and `index.ts`.
2. **Standard API**:
   - Always wrap in `React.forwardRef<ElementType, Props>()`.
   - Spread native props (`...props`).
   - Merge class names via `cn(variants({ ... }), className)`.
3. **CVA Variants**: Type variants using `VariantProps<typeof componentVariants>`.
4. **Token Binding**: Never hardcode colors or sizes (`#fff`, `rgb(...)`, `h-[32px]`). Consume semantic tokens:
   - Backgrounds: `var(--surface)`, `var(--surface-raised)`, `var(--surface-hover)`
   - Borders: `var(--border)`, `var(--border-strong)`
   - Text: `var(--text)`, `var(--text-secondary)`, `var(--text-muted)`
   - Focus ring: `focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]`
   - Controls: `var(--control-h-sm)`, `var(--control-h-md)`, `var(--control-h-lg)`
5. **Accessibility**: Full keyboard support, correct ARIA roles, and WCAG AA contrast in both light and dark themes.

---

## ☁️ Cloudflare Workers Deployment

This repository uses Cloudflare Workers Static Assets (`wrangler.jsonc`):

```bash
# 1. Build and dry-run bundle
pnpm build

# 2. Local Worker isolate simulation
pnpm worker:dev

# 3. Direct deployment to Cloudflare edge
pnpm deploy
```
