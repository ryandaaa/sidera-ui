import * as React from 'react'
import Silk from './Silk'
import { EXTERNAL_LINKS } from '../config/links'
import { GithubIcon } from './icons/GithubIcon'
import {
  ArrowRight,
  ExternalLink,
  Copy,
  Check,
  Terminal,
  Orbit,
  Layers,
  Sliders,
  ShieldCheck,
  Zap,
  Search,
  ChevronRight,
  Code2,
} from 'lucide-react'

// Direct dogfooding of Sidera UI Components & Tokens
import {
  Button,
  buttonVariants,
  Input,
  Switch,
  Badge,
  Tag,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Alert,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Kbd,
  CodeBlock,
  Container,
  Stack,
  Inline,
  Separator,
} from '@/components/ui'

interface LandingPageProps {
  onEnter: () => void
}

export function LandingPage({ onEnter }: LandingPageProps) {
  // Playground interactive state
  const [copiedInstall, setCopiedInstall] = React.useState(false)
  const [switchChecked, setSwitchChecked] = React.useState(true)
  const [inputValue, setInputValue] = React.useState('')
  const [activeTab, setActiveTab] = React.useState('preview')
  const [buttonLoading, setButtonLoading] = React.useState(false)

  const installCommand = 'pnpm dlx degit ryandaaa/sidera-ui my-app'

  const handleCopyInstall = async () => {
    await navigator.clipboard.writeText(installCommand)
    setCopiedInstall(true)
    setTimeout(() => setCopiedInstall(false), 2000)
  }

  const triggerButtonAction = () => {
    setButtonLoading(true)
    setTimeout(() => setButtonLoading(false), 1200)
  }

  const codeExample = `import * as React from 'react'
import { Button, Card, Badge, Switch } from 'sidera-ui'

export function ServiceCard() {
  const [enabled, setEnabled] = React.useState(true)

  return (
    <Card className="p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-[var(--text)]">api.internal</span>
          <Badge variant={enabled ? 'success' : 'neutral'}>
            {enabled ? 'active' : 'paused'}
          </Badge>
        </div>
        <Switch checked={enabled} onCheckedChange={setEnabled} size="sm" />
      </div>
      <p className="text-xs text-[var(--text-muted)]">
        High-throughput gRPC routing layer with zero runtime overhead.
      </p>
      <Button variant="primary" size="sm">Deploy Service</Button>
    </Card>
  )
}`

  return (
    <div
      className="min-h-screen bg-[var(--bg)] text-[var(--text)] font-sans antialiased selection:bg-[var(--surface-raised)] selection:text-[var(--text)] relative"
      data-theme="dark"
    >
      {/* 1. Navbar — Fully constructed with Container, Inline, Badge, and Button */}
      <header className="sticky top-0 z-40 w-full border-b border-[var(--border)] bg-[var(--surface)]/85 backdrop-blur-md">
        <Container size="xl">
          <div className="h-12 flex items-center justify-between">
            {/* Brand Title */}
            <Inline gap="sm" align="center">
              <a
                href="#"
                className="flex items-center gap-2 font-mono text-sm tracking-tight font-semibold text-[var(--text)] hover:opacity-80 transition-opacity lowercase"
              >
                <span className="h-2 w-2 rounded-full bg-[var(--text)] animate-pulse" />
                sidera-ui
              </a>
              <Badge variant="neutral" size="sm" className="hidden sm:inline-flex">
                v0.1.0
              </Badge>
            </Inline>

            {/* Nav links */}
            <nav className="hidden md:flex items-center gap-6 text-xs text-[var(--text-secondary)] font-mono">
              <a
                href="#playground"
                className="hover:text-[var(--text)] transition-colors"
              >
                playground
              </a>
              <a
                href="#principles"
                className="hover:text-[var(--text)] transition-colors"
              >
                principles
              </a>
              <a
                href="#quickstart"
                className="hover:text-[var(--text)] transition-colors"
              >
                quickstart
              </a>
              <button
                type="button"
                onClick={onEnter}
                className="hover:text-[var(--text)] transition-colors cursor-pointer text-left"
              >
                components
              </button>
            </nav>

            {/* External Links & Docs CTA using Sidera Button Variants */}
            <Inline gap="xs" align="center">
              <a
                href={EXTERNAL_LINKS.personalSpace.url}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({ variant: 'ghost', size: 'sm' })}
                title={EXTERNAL_LINKS.personalSpace.url}
              >
                <Orbit className="h-3.5 w-3.5" />
                <span className="hidden sm:inline font-mono">{EXTERNAL_LINKS.personalSpace.label}</span>
              </a>

              <a
                href={EXTERNAL_LINKS.githubRepo.url}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({ variant: 'secondary', size: 'sm' })}
                title="GitHub Repository"
              >
                <GithubIcon className="h-3.5 w-3.5" />
                <span className="hidden sm:inline font-mono">github</span>
                <ExternalLink className="h-2.5 w-2.5 opacity-50" />
              </a>

              <Button
                variant="primary"
                size="sm"
                onClick={onEnter}
                rightIcon={<ArrowRight className="h-3 w-3" />}
              >
                Explore Docs
              </Button>
            </Inline>
          </div>
        </Container>
      </header>

      {/* 2. Hero Section with Silk Shader — uses Container, Badge, Button, Separator */}
      <section className="relative overflow-hidden pt-16 pb-20 sm:pt-24 sm:pb-28 border-b border-[var(--border)]">
        {/* Silk canvas container */}
        <div className="absolute inset-0 h-[640px] z-0 overflow-hidden pointer-events-none">
          <Silk
            color="#2a244d"
            speed={4.5}
            scale={1.15}
            noiseIntensity={1.3}
            rotation={0}
            lightMode={false}
          />
          {/* Vignette fading smoothly into Sidera's background token */}
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg)]/40 via-[var(--bg)]/80 to-[var(--bg)]" />
        </div>

        <Container size="lg" className="relative z-10 text-center flex flex-col items-center">
          {/* Announcement pill with Sidera Badge & Separator */}
          <Badge
            variant="outline"
            size="md"
            className="gap-2 mb-6 backdrop-blur-sm bg-[var(--surface)]/70 py-1 px-3"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--success)]" />
            <span>24+ Utilitarian Components</span>
            <span className="text-[var(--text-muted)] select-none">|</span>
            <span className="text-[var(--text-secondary)]">Design Tokens Native</span>
          </Badge>

          {/* Lowercase Main Title */}
          <h1 className="font-mono text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[var(--text)] lowercase select-none">
            sidera-ui
          </h1>

          {/* Tagline */}
          <p className="mt-5 max-w-xl text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed font-sans font-light">
            A minimal, utilitarian UI component library for React. Built on Radix primitives,
            styled with Tailwind CSS v4, and governed by comprehensive design tokens.
          </p>

          {/* CTA & Quick Copy Row using Sidera Button & Control Tokens */}
          <Inline gap="sm" align="center" justify="center" className="mt-8 w-full max-w-md">
            <Button
              variant="primary"
              size="md"
              onClick={onEnter}
              rightIcon={<ArrowRight className="h-3.5 w-3.5" />}
              className="w-full sm:w-auto"
            >
              Browse Components
            </Button>

            {/* Terminal Command Box */}
            <div className="w-full sm:w-auto h-[var(--control-h-md)] px-3 rounded-[var(--radius-sm)] border border-[var(--border-strong)] bg-[var(--surface-raised)]/70 backdrop-blur-sm flex items-center justify-between gap-3 text-xs font-mono text-[var(--text)]">
              <Inline gap="xs" align="center" className="overflow-hidden whitespace-nowrap">
                <Terminal className="h-3.5 w-3.5 text-[var(--text-muted)] shrink-0" />
                <span className="text-[var(--text-muted)] select-none">$</span>
                <span className="text-[11px] text-[var(--text)] truncate">{installCommand}</span>
              </Inline>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={handleCopyInstall}
                title="Copy command"
                aria-label="Copy install command"
              >
                {copiedInstall ? (
                  <Check className="h-3.5 w-3.5 text-[var(--success)]" />
                ) : (
                  <Copy className="h-3.5 w-3.5 text-[var(--text-muted)]" />
                )}
              </Button>
            </div>
          </Inline>

          {/* Quick Metrics Cards using Sidera Card */}
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full max-w-2xl font-mono text-center">
            <Card className="p-3 bg-[var(--surface)]/60 backdrop-blur-sm">
              <div className="text-lg font-bold text-[var(--text)]">24+</div>
              <div className="text-[11px] text-[var(--text-muted)]">Primitives</div>
            </Card>
            <Card className="p-3 bg-[var(--surface)]/60 backdrop-blur-sm">
              <div className="text-lg font-bold text-[var(--text)]">100%</div>
              <div className="text-[11px] text-[var(--text-muted)]">Token Driven</div>
            </Card>
            <Card className="p-3 bg-[var(--surface)]/60 backdrop-blur-sm">
              <div className="text-lg font-bold text-[var(--text)]">Radix</div>
              <div className="text-[11px] text-[var(--text-muted)]">Accessible A11y</div>
            </Card>
            <Card className="p-3 bg-[var(--surface)]/60 backdrop-blur-sm">
              <div className="text-lg font-bold text-[var(--text)]">v4</div>
              <div className="text-[11px] text-[var(--text-muted)]">Tailwind Native</div>
            </Card>
          </div>
        </Container>
      </section>

      {/* 3. Live Interactive Playground Section */}
      <section id="playground" className="py-20 sm:py-24">
        <Container size="xl">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-4 border-b border-[var(--border)]">
            <div>
              <div className="font-mono text-xs text-[var(--text-muted)] tracking-wider uppercase mb-1">
                // 01 · live playground
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold text-[var(--text)] tracking-tight">
                Interactive Primitives
              </h2>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1 max-w-lg">
                Test real Sidera UI components directly in your browser. Fully functional, keyboard-accessible, and styled through design tokens.
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onEnter}
              rightIcon={<ChevronRight className="h-3.5 w-3.5" />}
              className="font-mono self-start sm:self-auto"
            >
              View all 24 components
            </Button>
          </div>

          {/* 3-Column Bento Grid with Sidera Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Bento Card 1: Form & Input Controls */}
            <Card className="flex flex-col justify-between">
              <div>
                <CardHeader>
                  <Inline justify="between" align="center">
                    <CardTitle className="font-mono text-[11px] text-[var(--text-muted)] uppercase">
                      Inputs & Controls
                    </CardTitle>
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--success)]" />
                  </Inline>
                </CardHeader>

                <CardContent className="space-y-4 pt-4">
                  <div>
                    <label className="block text-[11px] font-mono text-[var(--text-secondary)] mb-1.5">
                      Underline Search Input
                    </label>
                    <Input
                      placeholder="Search queries..."
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      leftElement={<Search className="h-3.5 w-3.5 text-[var(--text-muted)]" />}
                    />
                    {inputValue && (
                      <span className="block mt-1.5 font-mono text-[10px] text-[var(--text-muted)]">
                        Query: <span className="text-[var(--text)] font-medium">{inputValue}</span>
                      </span>
                    )}
                  </div>

                  <Separator />

                  <Inline justify="between" align="center">
                    <div>
                      <div className="text-xs font-medium text-[var(--text)]">Telemetry Sync</div>
                      <div className="text-[10px] text-[var(--text-muted)]">Real-time trace export</div>
                    </div>
                    <Switch
                      checked={switchChecked}
                      onCheckedChange={setSwitchChecked}
                      size="sm"
                    />
                  </Inline>
                </CardContent>
              </div>

              <CardFooter className="gap-2">
                <Button
                  variant="primary"
                  size="sm"
                  isLoading={buttonLoading}
                  onClick={triggerButtonAction}
                  className="flex-1"
                >
                  {buttonLoading ? 'Syncing...' : 'Primary Action'}
                </Button>
                <Button variant="secondary" size="sm">
                  Secondary
                </Button>
              </CardFooter>
            </Card>

            {/* Bento Card 2: Badges, Status & Feedback */}
            <Card className="flex flex-col justify-between">
              <div>
                <CardHeader>
                  <Inline justify="between" align="center">
                    <CardTitle className="font-mono text-[11px] text-[var(--text-muted)] uppercase">
                      Status & Alerts
                    </CardTitle>
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--info)]" />
                  </Inline>
                </CardHeader>

                <CardContent className="space-y-3.5 pt-4">
                  <div className="space-y-1.5">
                    <div className="text-[11px] font-mono text-[var(--text-secondary)]">Semantic Badges</div>
                    <Inline gap="xs" wrap>
                      <Badge variant="neutral">neutral</Badge>
                      <Badge variant="outline">outline</Badge>
                      <Badge variant="success">success</Badge>
                      <Badge variant="warning">warning</Badge>
                      <Badge variant="danger">danger</Badge>
                      <Badge variant="info">info</Badge>
                    </Inline>
                  </div>

                  <Separator />

                  <div className="space-y-1.5">
                    <div className="text-[11px] font-mono text-[var(--text-secondary)]">Compact Tags</div>
                    <Inline gap="xs" wrap>
                      <Tag size="sm">react</Tag>
                      <Tag size="sm">radix</Tag>
                      <Tag size="sm">tailwind</Tag>
                      <Tag size="sm">tokens</Tag>
                    </Inline>
                  </div>

                  <Separator />

                  <Alert variant="info" title="System Notice" className="p-2.5">
                    Tokens update across light & dark themes seamlessly.
                  </Alert>
                </CardContent>
              </div>

              <CardFooter>
                <Inline justify="between" align="center" className="w-full text-[11px] font-mono text-[var(--text-muted)]">
                  <span>Token: var(--surface)</span>
                  <span className="text-[var(--success)] font-medium">Synced</span>
                </Inline>
              </CardFooter>
            </Card>

            {/* Bento Card 3: Tabs & Keybindings */}
            <Card className="flex flex-col justify-between">
              <div>
                <CardHeader>
                  <Inline justify="between" align="center">
                    <CardTitle className="font-mono text-[11px] text-[var(--text-muted)] uppercase">
                      Navigation & Keyboard
                    </CardTitle>
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--primary)]" />
                  </Inline>
                </CardHeader>

                <CardContent className="space-y-4 pt-4">
                  {/* Interactive Tabs */}
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList variant="pills" className="w-full grid grid-cols-2">
                      <TabsTrigger value="preview" className="text-[11px]">
                        Overview
                      </TabsTrigger>
                      <TabsTrigger value="details" className="text-[11px]">
                        Config
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="preview" className="pt-3">
                      <div className="p-3 rounded-[var(--radius-xs)] bg-[var(--surface-raised)] border border-[var(--border)] text-xs text-[var(--text-secondary)]">
                        Fully navigable via keyboard arrow keys and tab cycling.
                      </div>
                    </TabsContent>
                    <TabsContent value="details" className="pt-3">
                      <div className="p-3 rounded-[var(--radius-xs)] bg-[var(--surface-raised)] border border-[var(--border)] text-xs font-mono text-[var(--text-secondary)]">
                        variant=&quot;pills&quot; | active=&quot;{activeTab}&quot;
                      </div>
                    </TabsContent>
                  </Tabs>

                  <Separator />

                  {/* Keyboard Shortcuts with Sidera Kbd */}
                  <Stack gap="xs">
                    <div className="text-[11px] font-mono text-[var(--text-secondary)]">Global Shortcuts</div>
                    <Inline justify="between" align="center" className="text-xs text-[var(--text)]">
                      <span>Command Search</span>
                      <Inline gap="xs">
                        <Kbd>⌘</Kbd>
                        <Kbd>K</Kbd>
                      </Inline>
                    </Inline>
                    <Inline justify="between" align="center" className="text-xs text-[var(--text)]">
                      <span>Toggle Sidebar</span>
                      <Inline gap="xs">
                        <Kbd>Ctrl</Kbd>
                        <Kbd>B</Kbd>
                      </Inline>
                    </Inline>
                  </Stack>
                </CardContent>
              </div>

              <CardFooter>
                <Inline justify="between" align="center" className="w-full text-[11px] font-mono text-[var(--text-muted)]">
                  <span>WAI-ARIA</span>
                  <span className="text-[var(--text)] font-medium">Compliant</span>
                </Inline>
              </CardFooter>
            </Card>
          </div>
        </Container>
      </section>

      {/* 4. Core Design Principles Section — uses Container, Card, CardHeader, CardContent */}
      <section id="principles" className="py-20 bg-[var(--surface)]/50 border-y border-[var(--border)]">
        <Container size="xl">
          <div className="mb-12">
            <div className="font-mono text-xs text-[var(--text-muted)] tracking-wider uppercase mb-1">
              // 02 · design philosophy
            </div>
            <h2 className="text-xl sm:text-2xl font-semibold text-[var(--text)] tracking-tight">
              Built with Utilitarian Precision
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1 max-w-xl">
              Engineered for density, clarity, and rapid interface authoring. No bloated decorations or unnecessary visual noise.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Principle 1 */}
            <Card className="hover:border-[var(--border-strong)] transition-colors">
              <CardHeader>
                <div className="h-8 w-8 rounded-[var(--radius-xs)] border border-[var(--border)] flex items-center justify-center text-[var(--text)] bg-[var(--surface-raised)] mb-2">
                  <Sliders className="h-4 w-4" />
                </div>
                <div className="font-mono text-[11px] text-[var(--text-muted)]">01 / AESTHETIC</div>
                <CardTitle className="text-sm font-semibold">Utilitarian First</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Zero bloated pill radiuses and giant gradients. Clean borders, tight density, and maximum information clarity.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Principle 2 */}
            <Card className="hover:border-[var(--border-strong)] transition-colors">
              <CardHeader>
                <div className="h-8 w-8 rounded-[var(--radius-xs)] border border-[var(--border)] flex items-center justify-center text-[var(--text)] bg-[var(--surface-raised)] mb-2">
                  <Layers className="h-4 w-4" />
                </div>
                <div className="font-mono text-[11px] text-[var(--text-muted)]">02 / ARCHITECTURE</div>
                <CardTitle className="text-sm font-semibold">Design Tokens Native</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Every surface, border, and text element is bound to CSS variables. Seamless theme and density switching without CSS recompiles.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Principle 3 */}
            <Card className="hover:border-[var(--border-strong)] transition-colors">
              <CardHeader>
                <div className="h-8 w-8 rounded-[var(--radius-xs)] border border-[var(--border)] flex items-center justify-center text-[var(--text)] bg-[var(--surface-raised)] mb-2">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <div className="font-mono text-[11px] text-[var(--text-muted)]">03 / ACCESSIBILITY</div>
                <CardTitle className="text-sm font-semibold">Radix UI Primitives</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Battle-tested accessibility under the hood. Full keyboard focus management, ARIA contracts, and dialog portal lifecycles.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Principle 4 */}
            <Card className="hover:border-[var(--border-strong)] transition-colors">
              <CardHeader>
                <div className="h-8 w-8 rounded-[var(--radius-xs)] border border-[var(--border)] flex items-center justify-center text-[var(--text)] bg-[var(--surface-raised)] mb-2">
                  <Zap className="h-4 w-4" />
                </div>
                <div className="font-mono text-[11px] text-[var(--text-muted)]">04 / SPEED</div>
                <CardTitle className="text-sm font-semibold">Tailwind CSS v4</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Compiled with the new CSS-first engine. Minimal bundle footprints, instantaneous builds, and zero runtime overhead.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      {/* 5. Quickstart & Integration Section — uses Container, Card, CodeBlock */}
      <section id="quickstart" className="py-20 sm:py-24">
        <Container size="xl">
          <div className="mb-10">
            <div className="font-mono text-xs text-[var(--text-muted)] tracking-wider uppercase mb-1">
              // 03 · quickstart
            </div>
            <h2 className="text-xl sm:text-2xl font-semibold text-[var(--text)] tracking-tight">
              Drop Into Any React App
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1 max-w-xl">
              Import components cleanly as pure React elements with full TypeScript prop autocompletion.
            </p>
          </div>

          <Card className="overflow-hidden">
            <CardHeader className="bg-[var(--surface-raised)]/40">
              <Inline justify="between" align="center">
                <Inline gap="xs" align="center">
                  <Code2 className="h-3.5 w-3.5 text-[var(--text-muted)]" />
                  <span className="font-mono text-xs text-[var(--text)]">src/components/ServiceCard.tsx</span>
                </Inline>
                <span className="font-mono text-[11px] text-[var(--text-muted)]">TSX / React</span>
              </Inline>
            </CardHeader>
            <div className="p-4 sm:p-5 bg-[var(--surface)]">
              <CodeBlock code={codeExample} language="tsx" />
            </div>
          </Card>
        </Container>
      </section>

      {/* 6. Footer — uses Container, Inline, Button */}
      <footer className="border-t border-[var(--border)] bg-[var(--surface)] py-12">
        <Container size="xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-xs font-mono text-[var(--text-secondary)]">
            {/* Left: Brand & copyright */}
            <Inline gap="sm" align="center" className="text-center sm:text-left">
              <span className="text-[var(--text)] font-semibold lowercase">sidera-ui</span>
              <span className="hidden sm:inline text-[var(--text-muted)]">|</span>
              <span>Crafted by ryanda · Open source under MIT</span>
            </Inline>

            {/* Right: External links using Sidera Button Variants */}
            <Inline gap="sm" align="center">
              <a
                href={EXTERNAL_LINKS.personalSpace.url}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({ variant: 'ghost', size: 'sm' })}
              >
                <Orbit className="h-3.5 w-3.5" />
                <span>{EXTERNAL_LINKS.personalSpace.label}</span>
              </a>

              <a
                href={EXTERNAL_LINKS.githubProfile.url}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({ variant: 'ghost', size: 'sm' })}
              >
                <GithubIcon className="h-3.5 w-3.5" />
                <span>{EXTERNAL_LINKS.githubProfile.label}</span>
              </a>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="text-[var(--text-muted)] hover:text-[var(--text)]"
              >
                Top ↑
              </Button>
            </Inline>
          </div>
        </Container>
      </footer>
    </div>
  )
}
