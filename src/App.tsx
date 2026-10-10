import * as React from 'react'
import {
  Sparkles,
  Layers,
  Terminal,
  Cloud,
  CheckCircle2,
  Copy,
  Check,
} from 'lucide-react'
import {
  Button,
  Badge,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Input,
} from '@/components/ui'

export default function App() {
  const [copied, setCopied] = React.useState(false)
  const [btnLoading, setBtnLoading] = React.useState(false)
  const [demoInput, setDemoInput] = React.useState('')

  const copyCommand = (cmd: string) => {
    navigator.clipboard.writeText(cmd)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col antialiased selection:bg-indigo-500/20 selection:text-indigo-300">
      {/* Top Navigation */}
      <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-400 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
              <Layers className="h-5 w-5" />
            </div>
            <div>
              <span className="font-bold tracking-tight text-base sm:text-lg">
                Sidera UI
              </span>
              <span className="ml-2 text-xs font-mono text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded-md border border-slate-700/50">
                v0.1.0
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="success" className="gap-1.5">
              <Cloud className="h-3 w-3" />
              Cloudflare Ready
            </Badge>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-12 space-y-16">
        <section className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-medium">
            <Sparkles className="h-3.5 w-3.5" />
            Template UI Kit Minimalis & Kustom
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-b from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
            Fondasi UI Kit Sendiri
          </h1>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Setup polosan dengan React 19, TypeScript, Tailwind CSS v4, dan siap di-deploy langsung ke Cloudflare Workers dengan 1 perintah.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 border border-slate-800 font-mono text-xs text-slate-300">
              <Terminal className="h-3.5 w-3.5 text-slate-500" />
              <span>pnpm deploy</span>
              <button
                type="button"
                onClick={() => copyCommand('pnpm deploy')}
                className="ml-2 hover:text-white transition-colors"
                title="Copy command"
              >
                {copied ? (
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                ) : (
                  <Copy className="h-3.5 w-3.5 text-slate-500" />
                )}
              </button>
            </div>
          </div>
        </section>

        {/* Components Showcase */}
        <section className="space-y-8">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-xl font-semibold tracking-tight text-white">
              Koleksi Komponen Awal (Starter Kit)
            </h2>
            <p className="text-sm text-slate-400">
              Komponen modular dan clean di folder <code className="text-indigo-300 font-mono text-xs">src/components/ui/</code>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Button Showcase */}
            <Card>
              <CardHeader>
                <CardTitle>Button</CardTitle>
                <CardDescription>
                  Mendukung varian warna (primary, secondary, outline, ghost, danger), ukuran (sm, md, lg), dan status loading.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <Button variant="primary">Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="danger">Danger</Button>
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800/60">
                  <Button size="sm">Small</Button>
                  <Button size="md">Medium</Button>
                  <Button size="lg">Large</Button>
                  <Button
                    variant="outline"
                    isLoading={btnLoading}
                    onClick={() => {
                      setBtnLoading(true)
                      setTimeout(() => setBtnLoading(false), 1500)
                    }}
                  >
                    {btnLoading ? 'Loading...' : 'Click to Load'}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Badge Showcase */}
            <Card>
              <CardHeader>
                <CardTitle>Badge</CardTitle>
                <CardDescription>
                  Label indikator status dengan berbagai varian tema semantik.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="default">Default</Badge>
                  <Badge variant="neutral">Neutral</Badge>
                  <Badge variant="success">Success</Badge>
                  <Badge variant="warning">Warning</Badge>
                  <Badge variant="error">Error</Badge>
                  <Badge variant="outline">Outline</Badge>
                </div>

                <div className="p-4 rounded-lg bg-slate-950/60 border border-slate-800/80 space-y-2">
                  <span className="text-xs text-slate-400 block font-mono">
                    Status Contoh:
                  </span>
                  <div className="flex items-center gap-3">
                    <Badge variant="success" className="gap-1">
                      <CheckCircle2 className="h-3 w-3" />
                      Live in Production
                    </Badge>
                    <span className="text-xs text-slate-400">
                      Cloudflare Worker running
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Input Showcase */}
            <Card>
              <CardHeader>
                <CardTitle>Input Field</CardTitle>
                <CardDescription>
                  Komponen input teks yang dilengkapi label, error state, dan helper text.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  label="Nama Komponen"
                  placeholder="e.g. Modal, Tooltip, Dropdown..."
                  value={demoInput}
                  onChange={(e) => setDemoInput(e.target.value)}
                  helperText="Ketik nama komponen baru yang ingin kamu buat."
                />
                <Input
                  label="Input dengan Error"
                  defaultValue="invalid-format"
                  error="Format nama komponen harus sesuai kaidah naming convention."
                />
              </CardContent>
            </Card>

            {/* Card Showcase */}
            <Card className="flex flex-col justify-between">
              <div>
                <CardHeader>
                  <CardTitle>Card Container</CardTitle>
                  <CardDescription>
                    Wadah fleksibel dengan header, title, description, content, dan footer.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-300">
                    Kamu bisa menyusun CardHeader, CardTitle, CardContent, dan CardFooter secara modular untuk berbagai macam kebutuhan widget atau dashboard.
                  </p>
                </CardContent>
              </div>
              <CardFooter className="justify-between">
                <span className="text-xs text-slate-500">Footer action</span>
                <Button size="sm" variant="secondary">
                  Aksi Card
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* Deploy to Cloudflare Guide */}
        <section className="rounded-2xl border border-indigo-500/20 bg-gradient-to-b from-indigo-950/20 to-slate-900/40 p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Cloud className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-white text-base sm:text-lg">
                Cara Deploy ke Cloudflare Workers
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm">
                Project ini sudah dikonfigurasi dengan <code className="text-indigo-300 font-mono text-xs">wrangler.jsonc</code> memanfaatkan Workers Static Assets.
              </p>
            </div>
          </div>

          <div className="space-y-3 font-mono text-xs">
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-slate-500"># 1. Login Cloudflare (jika belum)</span>
                <p className="text-slate-200 mt-1">pnpm wrangler login</p>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-slate-500"># 2. Build & Deploy ke Cloudflare Workers</span>
                <p className="text-slate-200 mt-1">pnpm deploy</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-6 text-center text-xs text-slate-500">
        <p>Sidera UI &bull; Barebones Starter Kit &bull; Ready for Cloudflare Workers</p>
      </footer>
    </div>
  )
}
