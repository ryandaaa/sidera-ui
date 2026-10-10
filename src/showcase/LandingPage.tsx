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
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Switch } from '@/components/ui/Switch'
import { Badge } from '@/components/ui/Badge'
import { Tag } from '@/components/ui/Tag'
import { Card } from '@/components/ui/Card'
import { Alert } from '@/components/ui/Alert'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs'
import { Kbd } from '@/components/ui/Kbd'
import { CodeBlock } from '@/components/ui/CodeBlock'

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
      className="min-h-screen bg-[#07070a] text-[#ededed] font-sans antialiased selection:bg-[#2e2e42] selection:text-white relative"
      data-theme="dark"
    >
      {/* 1. Header / Navbar */}
      <header className="sticky top-0 z-40 w-full border-b border-white/[0.08] bg-[#07070a]/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-13 flex items-center justify-between">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <a
              href="#"
              className="flex items-center gap-2 font-mono text-sm tracking-tight font-semibold text-white hover:opacity-80 transition-opacity lowercase"
            >
              <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
              sidera-ui
            </a>
            <span className="font-mono text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded border border-white/10 text-white/40 hidden sm:inline-block">
              v0.1.0
            </span>
          </div>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-6 text-xs text-white/60 font-mono">
            <a
              href="#playground"
              className="hover:text-white transition-colors"
            >
              playground
            </a>
            <a
              href="#principles"
              className="hover:text-white transition-colors"
            >
              principles
            </a>
            <a
              href="#quickstart"
              className="hover:text-white transition-colors"
            >
              quickstart
            </a>
            <button
              onClick={onEnter}
              className="hover:text-white transition-colors cursor-pointer text-left"
            >
              components
            </button>
          </nav>

          {/* External links & Docs CTA */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={EXTERNAL_LINKS.personalSpace.url}
              target="_blank"
              rel="noopener noreferrer"
              className="h-8 px-2.5 rounded border border-white/10 hover:border-white/25 text-white/60 hover:text-white flex items-center gap-1.5 text-xs font-mono transition-colors"
              title={EXTERNAL_LINKS.personalSpace.url}
            >
              <Orbit className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">{EXTERNAL_LINKS.personalSpace.label}</span>
            </a>

            <a
              href={EXTERNAL_LINKS.githubRepo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="h-8 px-2.5 rounded border border-white/10 hover:border-white/25 text-white/60 hover:text-white flex items-center gap-1.5 text-xs font-mono transition-colors"
              title="GitHub Repository"
            >
              <GithubIcon className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">github</span>
              <ExternalLink className="h-2.5 w-2.5 opacity-50" />
            </a>

            <button
              onClick={onEnter}
              className="h-8 px-3 rounded bg-white text-[#07070a] hover:bg-white/90 font-medium text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-sm active:scale-95"
            >
              <span>Explore Docs</span>
              <ArrowRight className="h-3 w-3" />
            </button>
          </div>
        </div>
      </header>

      {/* 2. Hero Section with Silk background */}
      <section className="relative overflow-hidden pt-16 pb-20 sm:pt-24 sm:pb-28 border-b border-white/[0.06]">
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
          {/* Subtle gradient vignette to blend into page */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#07070a]/40 via-[#07070a]/75 to-[#07070a]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center">
          {/* Announcement pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-sm text-xs font-mono text-white/70 mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span>24+ Utilitarian Components</span>
            <span className="text-white/25">|</span>
            <span className="text-white/45">Design Tokens Native</span>
          </div>

          {/* Lowercase Main Title */}
          <h1 className="font-mono text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white lowercase select-none">
            sidera-ui
          </h1>

          {/* Tagline */}
          <p className="mt-5 max-w-xl text-sm sm:text-base text-white/60 leading-relaxed font-sans font-light">
            A minimal, utilitarian UI component library for React. Built on Radix primitives,
            styled with Tailwind CSS v4, and governed by comprehensive design tokens.
          </p>

          {/* CTA & Quick Copy Row */}
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-3 w-full justify-center max-w-md">
            <button
              onClick={onEnter}
              className="w-full sm:w-auto h-10 px-5 rounded bg-white text-[#07070a] hover:bg-white/90 font-medium text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md active:scale-95"
            >
              <span>Browse Components</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>

            {/* Quick terminal command box */}
            <div className="w-full sm:w-auto h-10 px-3 rounded border border-white/15 bg-white/[0.04] backdrop-blur-sm flex items-center justify-between gap-3 text-xs font-mono text-white/80">
              <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
                <Terminal className="h-3.5 w-3.5 text-white/40 shrink-0" />
                <span className="text-white/50 select-none">$</span>
                <span className="text-[11px] text-white/90 truncate">{installCommand}</span>
              </div>
              <button
                type="button"
                onClick={handleCopyInstall}
                className="h-6 w-6 rounded flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors shrink-0 cursor-pointer"
                title="Copy command"
              >
                {copiedInstall ? (
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
              </button>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 pt-8 border-t border-white/[0.08] w-full max-w-2xl font-mono text-center">
            <div>
              <div className="text-lg font-bold text-white">24+</div>
              <div className="text-[11px] text-white/40">Primitives</div>
            </div>
            <div>
              <div className="text-lg font-bold text-white">100%</div>
              <div className="text-[11px] text-white/40">Token Driven</div>
            </div>
            <div>
              <div className="text-lg font-bold text-white">Radix</div>
              <div className="text-[11px] text-white/40">Accessible A11y</div>
            </div>
            <div>
              <div className="text-lg font-bold text-white">v4</div>
              <div className="text-[11px] text-white/40">Tailwind Native</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Live Interactive Playground Section */}
      <section id="playground" className="py-20 sm:py-24 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-4 border-b border-white/[0.08]">
          <div>
            <div className="font-mono text-xs text-white/40 tracking-wider uppercase mb-1">
              // 01 · live playground
            </div>
            <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
              Interactive Primitives
            </h2>
            <p className="text-xs sm:text-sm text-white/50 mt-1 max-w-lg">
              Test real Sidera UI components directly in your browser. Fully functional, keyboard-accessible, and styled through design tokens.
            </p>
          </div>
          <button
            onClick={onEnter}
            className="flex items-center gap-1.5 text-xs font-mono text-white/70 hover:text-white transition-colors cursor-pointer self-start sm:self-auto"
          >
            <span>View all 24 components</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* 3-Column Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Bento Card 1: Form & Input Controls */}
          <Card className="bg-[#0b0b10] border-white/10 hover:border-white/20 transition-all p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-[11px] text-white/40 uppercase">Inputs & Controls</span>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-[11px] font-mono text-white/50 mb-1.5">
                    Underline Search Input
                  </label>
                  <Input
                    placeholder="Search queries..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    leftElement={<Search className="h-3.5 w-3.5 text-white/40" />}
                  />
                  {inputValue && (
                    <span className="block mt-1 font-mono text-[10px] text-white/40">
                      Query: <span className="text-white">{inputValue}</span>
                    </span>
                  )}
                </div>

                <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between">
                  <div>
                    <div className="text-xs font-medium text-white">Telemetry Sync</div>
                    <div className="text-[10px] text-white/40">Real-time trace export</div>
                  </div>
                  <Switch
                    checked={switchChecked}
                    onCheckedChange={setSwitchChecked}
                    size="sm"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center gap-2">
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
            </div>
          </Card>

          {/* Bento Card 2: Badges, Status & Feedback */}
          <Card className="bg-[#0b0b10] border-white/10 hover:border-white/20 transition-all p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-[11px] text-white/40 uppercase">Status & Alerts</span>
                <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
              </div>

              {/* Status Badges */}
              <div className="space-y-3">
                <div className="text-[11px] font-mono text-white/50">Semantic Badges</div>
                <div className="flex flex-wrap gap-1.5">
                  <Badge variant="neutral">neutral</Badge>
                  <Badge variant="outline">outline</Badge>
                  <Badge variant="success">success</Badge>
                  <Badge variant="warning">warning</Badge>
                  <Badge variant="danger">danger</Badge>
                  <Badge variant="info">info</Badge>
                </div>

                <div className="pt-2 border-t border-white/[0.06]">
                  <div className="text-[11px] font-mono text-white/50 mb-2">Compact Tags</div>
                  <div className="flex flex-wrap gap-1.5">
                    <Tag size="sm">react</Tag>
                    <Tag size="sm">radix</Tag>
                    <Tag size="sm">tailwind</Tag>
                    <Tag size="sm">tokens</Tag>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/[0.06]">
                  <Alert variant="info" title="System Notice" className="p-2.5">
                    Tokens update across light & dark themes seamlessly.
                  </Alert>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-white/40">
              <span>Token: var(--surface)</span>
              <span className="text-emerald-400">Synced</span>
            </div>
          </Card>

          {/* Bento Card 3: Tabs & Keybindings */}
          <Card className="bg-[#0b0b10] border-white/10 hover:border-white/20 transition-all p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-[11px] text-white/40 uppercase">Navigation & Keyboard</span>
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
              </div>

              {/* Interactive Tabs */}
              <div className="space-y-4">
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
                    <div className="p-3 rounded bg-white/[0.02] border border-white/[0.06] text-xs text-white/70">
                      Fully navigable via keyboard arrow keys and tab cycling.
                    </div>
                  </TabsContent>
                  <TabsContent value="details" className="pt-3">
                    <div className="p-3 rounded bg-white/[0.02] border border-white/[0.06] text-xs font-mono text-white/60">
                      variant=&quot;pills&quot; | active=&quot;{activeTab}&quot;
                    </div>
                  </TabsContent>
                </Tabs>

                {/* Keyboard Shortcuts */}
                <div className="pt-2 border-t border-white/[0.06] space-y-2">
                  <div className="text-[11px] font-mono text-white/50">Global Shortcuts</div>
                  <div className="flex items-center justify-between text-xs text-white/70">
                    <span>Command Search</span>
                    <div className="flex items-center gap-1">
                      <Kbd>⌘</Kbd>
                      <Kbd>K</Kbd>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-white/70">
                    <span>Toggle Sidebar</span>
                    <div className="flex items-center gap-1">
                      <Kbd>Ctrl</Kbd>
                      <Kbd>B</Kbd>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-white/40">
              <span>WAI-ARIA</span>
              <span className="text-white/70">Compliant</span>
            </div>
          </Card>
        </div>
      </section>

      {/* 4. Core Design Principles Section */}
      <section id="principles" className="py-20 bg-[#09090d] border-y border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="mb-12">
            <div className="font-mono text-xs text-white/40 tracking-wider uppercase mb-1">
              // 02 · design philosophy
            </div>
            <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
              Built with Utilitarian Precision
            </h2>
            <p className="text-xs sm:text-sm text-white/50 mt-1 max-w-xl">
              Engineered for density, clarity, and rapid interface authoring. No bloated decorations or unnecessary visual noise.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Principle 1 */}
            <div className="p-5 rounded-md border border-white/[0.08] bg-white/[0.01] hover:bg-white/[0.03] transition-colors">
              <div className="h-8 w-8 rounded border border-white/10 flex items-center justify-center text-white/70 mb-4 bg-white/[0.02]">
                <Sliders className="h-4 w-4" />
              </div>
              <div className="font-mono text-[11px] text-white/40 mb-1">01 / AESTHETIC</div>
              <h3 className="text-sm font-semibold text-white mb-2">Utilitarian First</h3>
              <p className="text-xs text-white/50 leading-relaxed font-light">
                Zero bloated pill radiuses and giant gradients. Clean borders, tight density, and maximum information clarity.
              </p>
            </div>

            {/* Principle 2 */}
            <div className="p-5 rounded-md border border-white/[0.08] bg-white/[0.01] hover:bg-white/[0.03] transition-colors">
              <div className="h-8 w-8 rounded border border-white/10 flex items-center justify-center text-white/70 mb-4 bg-white/[0.02]">
                <Layers className="h-4 w-4" />
              </div>
              <div className="font-mono text-[11px] text-white/40 mb-1">02 / ARCHITECTURE</div>
              <h3 className="text-sm font-semibold text-white mb-2">Design Tokens Native</h3>
              <p className="text-xs text-white/50 leading-relaxed font-light">
                Every surface, border, and text element is bound to CSS variables. Seamless theme and density switching without CSS recompiles.
              </p>
            </div>

            {/* Principle 3 */}
            <div className="p-5 rounded-md border border-white/[0.08] bg-white/[0.01] hover:bg-white/[0.03] transition-colors">
              <div className="h-8 w-8 rounded border border-white/10 flex items-center justify-center text-white/70 mb-4 bg-white/[0.02]">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <div className="font-mono text-[11px] text-white/40 mb-1">03 / ACCESSIBILITY</div>
              <h3 className="text-sm font-semibold text-white mb-2">Radix UI Primitives</h3>
              <p className="text-xs text-white/50 leading-relaxed font-light">
                Battle-tested accessibility under the hood. Full keyboard focus management, ARIA contracts, and dialog portal lifecycles.
              </p>
            </div>

            {/* Principle 4 */}
            <div className="p-5 rounded-md border border-white/[0.08] bg-white/[0.01] hover:bg-white/[0.03] transition-colors">
              <div className="h-8 w-8 rounded border border-white/10 flex items-center justify-center text-white/70 mb-4 bg-white/[0.02]">
                <Zap className="h-4 w-4" />
              </div>
              <div className="font-mono text-[11px] text-white/40 mb-1">04 / SPEED</div>
              <h3 className="text-sm font-semibold text-white mb-2">Tailwind CSS v4</h3>
              <p className="text-xs text-white/50 leading-relaxed font-light">
                Compiled with the new CSS-first engine. Minimal bundle footprints, instantaneous builds, and zero runtime overhead.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Quickstart & Integration Section */}
      <section id="quickstart" className="py-20 sm:py-24 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="mb-10">
          <div className="font-mono text-xs text-white/40 tracking-wider uppercase mb-1">
            // 03 · quickstart
          </div>
          <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
            Drop Into Any React App
          </h2>
          <p className="text-xs sm:text-sm text-white/50 mt-1 max-w-xl">
            Import components cleanly as pure React elements with full TypeScript prop autocompletion.
          </p>
        </div>

        <div className="rounded-md border border-white/10 bg-[#0a0a0f] overflow-hidden shadow-xl">
          <div className="flex items-center justify-between px-4 py-2.5 bg-white/[0.03] border-b border-white/[0.06]">
            <div className="flex items-center gap-2">
              <Code2 className="h-3.5 w-3.5 text-white/40" />
              <span className="font-mono text-xs text-white/70">src/components/ServiceCard.tsx</span>
            </div>
            <span className="font-mono text-[11px] text-white/40">TSX / React</span>
          </div>
          <div className="p-4 sm:p-5">
            <CodeBlock code={codeExample} language="tsx" />
          </div>
        </div>
      </section>

      {/* 6. Footer */}
      <footer className="border-t border-white/[0.08] bg-[#050508] py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs font-mono text-white/50">
          {/* Left: Brand & copyright */}
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <span className="text-white font-semibold lowercase">sidera-ui</span>
            <span className="hidden sm:inline text-white/20">|</span>
            <span>Crafted by ryanda · Open source under MIT</span>
          </div>

          {/* Right: Links */}
          <div className="flex items-center gap-4">
            <a
              href={EXTERNAL_LINKS.personalSpace.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <Orbit className="h-3.5 w-3.5" />
              <span>{EXTERNAL_LINKS.personalSpace.label}</span>
            </a>

            <a
              href={EXTERNAL_LINKS.githubProfile.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <GithubIcon className="h-3.5 w-3.5" />
              <span>{EXTERNAL_LINKS.githubProfile.label}</span>
            </a>

            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="hover:text-white transition-colors cursor-pointer ml-2 text-white/30 hover:text-white"
            >
              Top ↑
            </button>
          </div>
        </div>
      </footer>
    </div>
  )
}
