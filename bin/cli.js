#!/usr/bin/env node

/**
 * sidera-ui CLI
 * A minimal, utilitarian CLI to add Sidera UI components to your project.
 *
 * Usage:
 *   npx sidera-ui add <component>
 *   npx sidera-ui list
 *   npx sidera-ui init
 */

import fs from 'node:fs';
import path from 'node:path';
import https from 'node:https';

const GITHUB_RAW_BASE =
  'https://raw.githubusercontent.com/ryandaaa/sidera-ui/main';

const COMPONENTS = {
  // Foundation
  button: { name: 'Button', deps: ['class-variance-authority', 'lucide-react'] },
  input: { name: 'Input', deps: ['class-variance-authority'] },
  textarea: { name: 'Textarea', deps: ['class-variance-authority'] },
  field: { name: 'Field', deps: [] },
  label: { name: 'Label', deps: [] },
  checkbox: { name: 'Checkbox', deps: ['lucide-react'] },
  radio: { name: 'Radio', deps: [] },
  switch: { name: 'Switch', deps: ['class-variance-authority'] },
  select: { name: 'Select', deps: ['@radix-ui/react-select', 'lucide-react'] },

  // Display
  badge: { name: 'Badge', deps: ['class-variance-authority'] },
  card: { name: 'Card', deps: [] },
  tag: { name: 'Tag', deps: ['class-variance-authority', 'lucide-react'] },
  avatar: { name: 'Avatar', deps: [] },
  table: { name: 'Table', deps: [] },
  'desc-list': { name: 'DescriptionList', deps: [] },
  codeblock: { name: 'CodeBlock', deps: ['prismjs', 'lucide-react'] },
  kbd: { name: 'Kbd', deps: [] },
  separator: { name: 'Separator', deps: [] },
  skeleton: { name: 'Skeleton', deps: [] },
  emptystate: { name: 'EmptyState', deps: ['lucide-react'] },

  // Feedback
  alert: { name: 'Alert', deps: ['class-variance-authority', 'lucide-react'] },
  spinner: { name: 'Spinner', deps: ['lucide-react'] },
  progress: { name: 'Progress', deps: [] },
  tooltip: { name: 'Tooltip', deps: ['@radix-ui/react-tooltip'] },
  toast: { name: 'Toast', deps: ['lucide-react'] },

  // Overlay
  dialog: { name: 'Dialog', deps: ['@radix-ui/react-dialog', 'lucide-react'] },
  popover: { name: 'Popover', deps: ['@radix-ui/react-popover'] },
  dropdown: { name: 'DropdownMenu', deps: ['@radix-ui/react-dropdown-menu', 'lucide-react'] },

  // Navigation
  tabs: { name: 'Tabs', deps: ['@radix-ui/react-tabs', 'class-variance-authority'] },
  breadcrumb: { name: 'Breadcrumb', deps: ['lucide-react'] },
  pagination: { name: 'Pagination', deps: ['lucide-react'] },
  search: { name: 'CommandSearch', deps: ['lucide-react'] },

  // Layout
  stack: { name: 'Stack', deps: ['class-variance-authority'] },
  inline: { name: 'Inline', deps: ['class-variance-authority'] },
  container: { name: 'Container', deps: ['class-variance-authority'] },
  pageheader: { name: 'PageHeader', deps: [] },
};

function printBanner() {
  console.log(`
\x1b[90m┌──────────────────────────────────────────────┐\x1b[0m
\x1b[1m\x1b[37m  sidera-ui\x1b[0m \x1b[90mv0.1.1\x1b[0m
\x1b[90m  Minimalist, utilitarian UI primitives for React\x1b[0m
\x1b[90m└──────────────────────────────────────────────┘\x1b[0m
`);
}

function printHelp() {
  printBanner();
  console.log(`Usage:
  \x1b[36mnpx sidera-ui add <component...>\x1b[0m  Add one or more components
  \x1b[36mnpx sidera-ui list\x1b[0m                List all available components
  \x1b[36mnpx sidera-ui init\x1b[0m                Set up tokens.css and cn helper

Examples:
  npx sidera-ui add button
  npx sidera-ui add button input dialog card
  npx sidera-ui list
`);
}

function fetchFile(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        if (res.statusCode === 301 || res.statusCode === 302) {
          return fetchFile(res.headers.location).then(resolve).catch(reject);
        }
        if (res.statusCode !== 200) {
          return reject(
            new Error(`HTTP ${res.statusCode} fetching ${url}`)
          );
        }
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => resolve(data));
      })
      .on('error', reject);
  });
}

async function addComponent(key) {
  const compKey = key.toLowerCase();
  const info = COMPONENTS[compKey];

  if (!info) {
    console.error(`\x1b[31m✖ Unknown component:\x1b[0m "${key}". Run \x1b[36mnpx sidera-ui list\x1b[0m to view available components.`);
    return false;
  }

  const compName = info.name;
  console.log(`\x1b[90mFetching\x1b[0m \x1b[1m${compName}\x1b[0m...`);

  // Target paths
  const localRepoPath = path.join(
    process.cwd(),
    'src',
    'components',
    'ui',
    compName,
    `${compName}.tsx`
  );

  let content = '';

  // Check if running inside sidera-ui repo locally
  if (fs.existsSync(localRepoPath)) {
    content = fs.readFileSync(localRepoPath, 'utf8');
  } else {
    // Fetch from GitHub
    const url = `${GITHUB_RAW_BASE}/src/components/ui/${compName}/${compName}.tsx`;
    try {
      content = await fetchFile(url);
    } catch (err) {
      console.error(`\x1b[31m✖ Failed to fetch ${compName} from GitHub:\x1b[0m ${err.message}`);
      return false;
    }
  }

  // Determine output directory in user project
  const outDir = path.join(process.cwd(), 'src', 'components', 'ui', compName);
  fs.mkdirSync(outDir, { recursive: true });

  const outFile = path.join(outDir, `${compName}.tsx`);
  fs.writeFileSync(outFile, content, 'utf8');

  console.log(`\x1b[32m✔ Added\x1b[0m ${compName} -> \x1b[90m${path.relative(process.cwd(), outFile)}\x1b[0m`);

  // Print suggested peer dependencies
  if (info.deps.length > 0) {
    console.log(`  \x1b[90mPeer dependencies: ${info.deps.join(', ')}\x1b[0m`);
  }

  return true;
}

async function initProject() {
  printBanner();
  console.log('Initializing Sidera UI into your project...\n');

  // 1. Create src/lib/cn.ts
  const cnDir = path.join(process.cwd(), 'src', 'lib');
  fs.mkdirSync(cnDir, { recursive: true });
  const cnFile = path.join(cnDir, 'cn.ts');

  const cnContent = `import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
`;

  if (!fs.existsSync(cnFile)) {
    fs.writeFileSync(cnFile, cnContent, 'utf8');
    console.log(`\x1b[32m✔ Created\x1b[0m src/lib/cn.ts`);
  } else {
    console.log(`\x1b[90m- src/lib/cn.ts already exists (skipped)\x1b[0m`);
  }

  console.log(`
\x1b[32m✔ Initialized successfully!\x1b[0m
Next steps:
  1. Install core dependencies:
     \x1b[36mpnpm add clsx tailwind-merge class-variance-authority lucide-react\x1b[0m
  2. Add your first component:
     \x1b[36mnpx sidera-ui add button\x1b[0m
`);
}

function listComponents() {
  printBanner();
  console.log('Available components in Sidera UI:\n');

  const keys = Object.keys(COMPONENTS);
  const colWidth = 16;

  for (let i = 0; i < keys.length; i += 3) {
    const row = keys
      .slice(i, i + 3)
      .map((k) => `\x1b[36m${k.padEnd(colWidth)}\x1b[0m`)
      .join(' ');
    console.log(`  ${row}`);
  }

  console.log(`\nTotal: ${keys.length} components`);
  console.log(`Install via: \x1b[36mnpx sidera-ui add <name>\x1b[0m\n`);
}

async function main() {
  const args = process.argv.slice(2);
  const cmd = args[0];

  if (!cmd || cmd === '--help' || cmd === '-h') {
    printHelp();
    return;
  }

  if (cmd === 'list' || cmd === 'ls') {
    listComponents();
    return;
  }

  if (cmd === 'init') {
    await initProject();
    return;
  }

  if (cmd === 'add') {
    const targets = args.slice(1);
    if (targets.length === 0) {
      console.error('\x1b[31m✖ Please specify at least one component to add.\x1b[0m');
      console.log('Example: \x1b[36mnpx sidera-ui add button\x1b[0m');
      return;
    }

    printBanner();
    for (const target of targets) {
      await addComponent(target);
    }
    console.log('\n\x1b[32mDone!\x1b[0m Import from \x1b[90m@/components/ui/<Component>\x1b[0m');
    return;
  }

  console.error(`\x1b[31m✖ Unknown command:\x1b[0m "${cmd}"`);
  printHelp();
}

main().catch((err) => {
  console.error('\x1b[31mFatal error:\x1b[0m', err);
  process.exit(1);
});
