export interface SearchableItem {
  id: string
  label: string
  group: 'Overview' | 'Foundation' | 'Display' | 'Feedback' | 'Overlay' | 'Navigation' | 'Layout'
  description: string
  aliases: string[]
  subcomponents?: string[]
}

export const searchableItems: SearchableItem[] = [
  // 1. Overview
  {
    id: 'tokens',
    label: 'Design Tokens',
    group: 'Overview',
    description: 'Semantic CSS variables, palettes, surfaces, borders, typography, and density scales.',
    aliases: ['colors', 'palette', 'variables', 'theme', 'typography', 'radius', 'spacing', 'density', 'dark mode', 'light mode'],
    subcomponents: ['--bg', '--surface', '--border', '--text', '--primary', '--focus-ring', '--radius-xs'],
  },

  // 2. Foundation
  {
    id: 'button',
    label: 'Button',
    group: 'Foundation',
    description: 'Interactive button trigger with primary, secondary, ghost, danger, and icon variants.',
    aliases: ['action', 'clickable', 'cta', 'icon button', 'loading button', 'submit', 'press'],
    subcomponents: ['Button', 'buttonVariants', 'leftIcon', 'rightIcon', 'isLoading'],
  },
  {
    id: 'input',
    label: 'Input',
    group: 'Foundation',
    description: 'Underline text field with animated focus line, prefix/suffix icons, and error states.',
    aliases: ['text field', 'form input', 'textbox', 'password', 'search input', 'underline', 'entry'],
    subcomponents: ['Input', 'inputVariants', 'leftElement', 'rightElement', 'hasError'],
  },
  {
    id: 'textarea',
    label: 'Textarea',
    group: 'Foundation',
    description: 'Multi-line plain text editor for longform inputs, prompts, notes, and code snippets.',
    aliases: ['multiline', 'text area', 'notes', 'editor', 'prompt input', 'long text', 'comment'],
    subcomponents: ['Textarea', 'textareaVariants', 'resize'],
  },
  {
    id: 'select',
    label: 'Select',
    group: 'Foundation',
    description: 'Accessible dropdown picker for selecting a single option from a list of values.',
    aliases: ['dropdown', 'picker', 'combobox', 'options', 'choose', 'menu select', 'option list'],
    subcomponents: ['Select', 'SelectTrigger', 'SelectContent', 'SelectItem', 'SelectValue'],
  },
  {
    id: 'checkbox',
    label: 'Checkbox',
    group: 'Foundation',
    description: 'Multi-select toggle control with spring-drawn checkmark animation and indeterminate state.',
    aliases: ['check', 'tick', 'multiselect', 'boolean', 'toggle check', 'checkbox group', 'mark'],
    subcomponents: ['Checkbox', 'checkboxBoxVariants', 'indeterminate'],
  },
  {
    id: 'radio',
    label: 'Radio',
    group: 'Foundation',
    description: 'Mutually exclusive single-selection radio button group with spring pop vector dot.',
    aliases: ['radio button', 'option', 'single select', 'choice', 'radio group', 'circle dot'],
    subcomponents: ['RadioGroup', 'Radio', 'RadioItem'],
  },
  {
    id: 'switch',
    label: 'Switch',
    group: 'Foundation',
    description: 'Instant toggle slider control for binary on/off states and system settings flags.',
    aliases: ['toggle', 'slider', 'on-off', 'boolean toggle', 'setting toggle', 'switch button'],
    subcomponents: ['Switch', 'switchTrackVariants', 'switchThumbVariants'],
  },
  {
    id: 'field',
    label: 'Field',
    group: 'Foundation',
    description: 'Accessible form field wrapper combining label, required asterisk, hint, and error message.',
    aliases: ['form field', 'label', 'validation', 'error message', 'hint', 'required', 'helper text'],
    subcomponents: ['Field', 'label', 'hint', 'error', 'required', 'optional'],
  },

  // 3. Display
  {
    id: 'badge',
    label: 'Badge',
    group: 'Display',
    description: 'Compact status pill indicator with success, warning, danger, neutral, and dot styles.',
    aliases: ['status', 'pill', 'counter', 'tag badge', 'indicator', 'dot badge', 'chip count'],
    subcomponents: ['Badge', 'badgeVariants', 'variant', 'dot'],
  },
  {
    id: 'tag',
    label: 'Tag',
    group: 'Display',
    description: 'Removable metadata tag chip for filters, categories, and keyword labels.',
    aliases: ['chip', 'filter tag', 'removable tag', 'closable', 'pill tag', 'label', 'badge tag'],
    subcomponents: ['Tag', 'tagVariants', 'onClose', 'closable'],
  },
  {
    id: 'avatar',
    label: 'Avatar',
    group: 'Display',
    description: 'User identity thumbnail with image fallback initials and bottom-border presence indicator.',
    aliases: ['user', 'profile photo', 'initials', 'presence', 'online status', 'avatar circle', 'avatar square'],
    subcomponents: ['Avatar', 'avatarVariants', 'fallback', 'status'],
  },
  {
    id: 'card',
    label: 'Card',
    group: 'Display',
    description: 'Surface container panel for grouping related information, forms, and summaries.',
    aliases: ['panel', 'box', 'container card', 'surface', 'board', 'frame', 'card header', 'card content'],
    subcomponents: ['Card', 'CardHeader', 'CardTitle', 'CardDescription', 'CardContent', 'CardFooter'],
  },
  {
    id: 'table',
    label: 'Table',
    group: 'Display',
    description: 'Dense tabular data display with monospace formatting, headers, and hoverable rows.',
    aliases: ['data table', 'grid', 'datagrid', 'rows', 'columns', 'tabular', 'spreadsheet'],
    subcomponents: ['Table', 'TableHeader', 'TableBody', 'TableRow', 'TableHead', 'TableCell'],
  },
  {
    id: 'desc-list',
    label: 'Description List',
    group: 'Display',
    description: 'Structured key-value metadata list for technical specifications and properties.',
    aliases: ['key-value', 'metadata list', 'definition list', 'properties', 'dl', 'dt', 'dd', 'kv list'],
    subcomponents: ['DescriptionList', 'DescriptionListItem', 'Dl', 'Dt', 'Dd'],
  },
  {
    id: 'code-block',
    label: 'Code & Code Block',
    group: 'Display',
    description: 'Syntax-highlighted code block with Prism token coloring, copy button, and line wrapping.',
    aliases: ['syntax highlighting', 'prism', 'snippet', 'code snippet', 'copy code', 'pre', 'inline code'],
    subcomponents: ['Code', 'CodeBlock', 'language', 'showLineNumbers'],
  },
  {
    id: 'display-utils',
    label: 'Kbd, Separator, Empty',
    group: 'Display',
    description: 'Hardware keycaps (Kbd), semantic dividers (Separator), and zero-data states (EmptyState).',
    aliases: ['kbd', 'keyboard shortcut', 'hotkey', 'command key', 'separator', 'divider', 'hr', 'empty state', 'no data'],
    subcomponents: ['Kbd', 'Separator', 'EmptyState'],
  },

  // 4. Feedback
  {
    id: 'alert',
    label: 'Alert',
    group: 'Feedback',
    description: 'Prominent inline callout banner for system warnings, errors, announcements, and info.',
    aliases: ['callout', 'banner', 'warning banner', 'error alert', 'notice', 'notification banner', 'message'],
    subcomponents: ['Alert', 'AlertTitle', 'AlertDescription', 'variant'],
  },
  {
    id: 'toast',
    label: 'Toast',
    group: 'Feedback',
    description: 'Floating transient notifications with programmatic useToast hook and auto-dismissal.',
    aliases: ['snackbar', 'notification', 'push notification', 'toast message', 'popup alert', 'useToast'],
    subcomponents: ['ToastProvider', 'Toast', 'useToast', 'toast()'],
  },
  {
    id: 'progress-spinner',
    label: 'Progress & Spinner',
    group: 'Feedback',
    description: 'Determinate horizontal progress bar and spinning animated loader for async processes.',
    aliases: ['loader', 'loading spinner', 'loading bar', 'progress meter', 'activity indicator', 'spinner'],
    subcomponents: ['Progress', 'Spinner', 'spinnerVariants'],
  },
  {
    id: 'tooltip',
    label: 'Tooltip',
    group: 'Feedback',
    description: 'Floating contextual text hint revealed on pointer hover or keyboard focus.',
    aliases: ['hover hint', 'hint', 'popup hint', 'infotip', 'hover popup', 'tooltip text'],
    subcomponents: ['Tooltip', 'TooltipTrigger', 'TooltipContent', 'TooltipProvider'],
  },

  // 5. Overlay
  {
    id: 'dialog',
    label: 'Dialog',
    group: 'Overlay',
    description: 'Modal window overlay with smooth basic entrance glide, backdrop blur, and focus trapping.',
    aliases: ['modal', 'popup', 'alertdialog', 'confirm modal', 'prompt', 'overlay window', 'dialog box'],
    subcomponents: ['Dialog', 'DialogTrigger', 'DialogContent', 'DialogHeader', 'DialogTitle', 'DialogDescription', 'DialogFooter', 'DialogClose'],
  },
  {
    id: 'popover',
    label: 'Popover',
    group: 'Overlay',
    description: 'Floating rich content card anchored to a trigger button with collision detection.',
    aliases: ['floating card', 'dropdown card', 'popup menu', 'flyout', 'anchored popup', 'popover menu'],
    subcomponents: ['Popover', 'PopoverTrigger', 'PopoverContent', 'PopoverAnchor'],
  },
  {
    id: 'dropdown-menu',
    label: 'Dropdown Menu',
    group: 'Overlay',
    description: 'Contextual actions menu with item selection, dividers, hotkeys, and nested items.',
    aliases: ['context menu', 'action menu', 'menu list', 'options menu', 'more actions', 'dropdown items'],
    subcomponents: ['DropdownMenu', 'DropdownMenuTrigger', 'DropdownMenuContent', 'DropdownMenuItem', 'DropdownMenuSeparator'],
  },

  // 6. Navigation
  {
    id: 'tabs',
    label: 'Tabs',
    group: 'Navigation',
    description: 'Segmented navigation with animated sliding pill highlight and line underline indicator.',
    aliases: ['pill tabs', 'line tabs', 'segmented control', 'navigation tabs', 'tab list', 'sliding indicator'],
    subcomponents: ['Tabs', 'TabsList', 'TabsTrigger', 'TabsContent', 'variant'],
  },
  {
    id: 'breadcrumb-pagination',
    label: 'Breadcrumb & Pages',
    group: 'Navigation',
    description: 'Hierarchical navigation trail (Breadcrumbs) and page sequence navigation (Pagination).',
    aliases: ['breadcrumbs', 'pagination', 'paging', 'trail', 'page numbers', 'page buttons', 'navigate'],
    subcomponents: ['Breadcrumb', 'BreadcrumbItem', 'Pagination', 'PaginationButton'],
  },
  {
    id: 'command-search',
    label: 'Command Search',
    group: 'Navigation',
    description: 'Quick-jump command palette input with keyboard shortcut badge (⌘K / Ctrl+K) and clear button.',
    aliases: ['command palette', 'cmd k', 'ctrl k', 'search bar', 'quick jump', 'omnisearch', 'filter'],
    subcomponents: ['CommandSearch', 'shortcutKey', 'onClear'],
  },

  // 7. Layout
  {
    id: 'layout',
    label: 'Layout Primitives',
    group: 'Layout',
    description: 'Structural building blocks: Box, Flex, Stack (vertical), Inline (horizontal), Grid, and Container.',
    aliases: ['box', 'flex', 'stack', 'inline', 'grid', 'container', 'spacing', 'responsive layout'],
    subcomponents: ['Box', 'Flex', 'Stack', 'Inline', 'Grid', 'Container'],
  },
]

export interface SearchResult {
  item: SearchableItem
  score: number
  matchedReason?: string
}

export function searchComponents(query: string): SearchResult[] {
  const clean = query.toLowerCase().trim()
  if (!clean) return []

  const words = clean.split(/\s+/).filter(Boolean)
  const results: SearchResult[] = []

  for (const item of searchableItems) {
    const labelLower = item.label.toLowerCase()
    const idLower = item.id.toLowerCase()
    const descLower = item.description.toLowerCase()
    const groupLower = item.group.toLowerCase()
    const aliasesLower = item.aliases.map((a) => a.toLowerCase())
    const subLower = (item.subcomponents || []).map((s) => s.toLowerCase())

    let score = 0
    let matchedReason: string | undefined

    // 1. Exact or prefix matches on Title
    if (labelLower === clean) {
      score += 1000
    } else if (labelLower.startsWith(clean)) {
      score += 500
    } else if (labelLower.includes(clean)) {
      score += 250
    }

    // 2. ID match
    if (idLower === clean) {
      score += 300
    } else if (idLower.includes(clean)) {
      score += 150
    }

    // 3. Aliases / Synonyms match (e.g. 'modal' -> Dialog)
    for (const alias of aliasesLower) {
      if (alias === clean) {
        score += 400
        matchedReason = `Alias: "${alias}"`
        break
      } else if (alias.includes(clean)) {
        score += 180
        if (!matchedReason) matchedReason = `Alias: "${alias}"`
      }
    }

    // 4. Subcomponents match
    for (const sub of subLower) {
      if (sub === clean) {
        score += 250
        matchedReason = `Export: <${sub} />`
        break
      } else if (sub.includes(clean)) {
        score += 120
        if (!matchedReason) matchedReason = `Export: <${sub} />`
      }
    }

    // 5. Description match
    if (descLower.includes(clean)) {
      score += 90
      if (!matchedReason) matchedReason = 'Description match'
    }

    // 6. Group match
    if (groupLower.includes(clean)) {
      score += 40
    }

    // 7. Multi-word partial matching
    if (words.length > 1) {
      const allWordsMatch = words.every(
        (w) =>
          labelLower.includes(w) ||
          idLower.includes(w) ||
          descLower.includes(w) ||
          aliasesLower.some((a) => a.includes(w)) ||
          subLower.some((s) => s.includes(w))
      )
      if (allWordsMatch) {
        score += 150
      }
    }

    if (score > 0) {
      results.push({ item, score, matchedReason })
    }
  }

  // Sort by highest score first
  return results.sort((a, b) => b.score - a.score)
}
