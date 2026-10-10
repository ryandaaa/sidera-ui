import { useToc, type TocItem } from './TableOfContents'

interface TokenSwatch {
  token: string
  label: string
  bgVar: string
  borderVar?: string
}

const semanticColors: TokenSwatch[] = [
  { token: '--bg', label: 'Canvas Background', bgVar: 'var(--bg)', borderVar: 'var(--border)' },
  { token: '--surface', label: 'Surface (Level 1)', bgVar: 'var(--surface)', borderVar: 'var(--border)' },
  { token: '--surface-raised', label: 'Surface Raised (Level 2)', bgVar: 'var(--surface-raised)', borderVar: 'var(--border)' },
  { token: '--surface-overlay', label: 'Surface Overlay (Floating)', bgVar: 'var(--surface-overlay)', borderVar: 'var(--border-strong)' },
  { token: '--border', label: 'Hairline Border', bgVar: 'var(--border)' },
  { token: '--border-strong', label: 'Strong Hairline', bgVar: 'var(--border-strong)' },
  { token: '--text', label: 'Primary Text (Ink)', bgVar: 'var(--text)' },
  { token: '--text-secondary', label: 'Secondary Text', bgVar: 'var(--text-secondary)' },
  { token: '--text-muted', label: 'Muted Text / Placeholder', bgVar: 'var(--text-muted)' },
  { token: '--primary', label: 'Primary Accent (Inversion)', bgVar: 'var(--primary)', borderVar: 'var(--border-strong)' },
  { token: '--focus-ring', label: 'Focus Ring Color', bgVar: 'var(--focus-ring)' },
  { token: '--success', label: 'Status Success (Muted)', bgVar: 'var(--success)' },
  { token: '--warning', label: 'Status Warning (Muted)', bgVar: 'var(--warning)' },
  { token: '--danger', label: 'Status Danger (Muted)', bgVar: 'var(--danger)' },
  { token: '--info', label: 'Status Info (Muted)', bgVar: 'var(--info)' },
]

const rawGrays = [
  { name: 'white', color: '#ffffff' },
  { name: 'gray-50', color: '#f8f9fa' },
  { name: 'gray-100', color: '#f1f3f5' },
  { name: 'gray-200', color: '#e2e4e8' },
  { name: 'gray-300', color: '#cfd3d8' },
  { name: 'gray-400', color: '#9da3ae' },
  { name: 'gray-500', color: '#6b7280' },
  { name: 'gray-600', color: '#4b525d' },
  { name: 'gray-700', color: '#333842' },
  { name: 'gray-800', color: '#22262d' },
  { name: 'gray-850', color: '#1a1d23' },
  { name: 'gray-900', color: '#121417' },
  { name: 'gray-950', color: '#08090a' },
  { name: 'black', color: '#050607' },
]

const typeScale = [
  { token: '--raw-text-2xs', size: '11px', leading: '14px', sample: 'Micro labels, badges, status counters' },
  { token: '--raw-text-xs', size: '12px', leading: '16px', sample: 'Secondary metadata, table footers, hints' },
  { token: '--raw-text-sm', size: '13px', leading: '18px', sample: 'Table data, code annotations, dense inputs' },
  { token: '--raw-text-base', size: '14px', leading: '20px', sample: 'Standard body text across UI components' },
  { token: '--raw-text-md', size: '15px', leading: '22px', sample: 'Form labels, emphasized card titles' },
  { token: '--raw-text-lg', size: '18px', leading: '24px', sample: 'Section headers, page subtitles' },
  { token: '--raw-text-xl', size: '22px', leading: '28px', sample: 'Page primary titles, modal headers' },
  { token: '--raw-text-2xl', size: '28px', leading: '34px', sample: 'Dashboard summary headers, display text' },
]

const tokensToc: TocItem[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'semantic-tokens', label: '1. Semantic Tokens' },
  { id: 'raw-primitives', label: '2. Raw Primitives' },
  { id: 'typography', label: '3. Typography Scale' },
  { id: 'radius-scale', label: '4. Radius Scale' },
  { id: 'density-scale', label: '5. Density Scale' },
]

export function TokensPage() {
  useToc(tokensToc)

  return (
    <div className="w-full max-w-4xl min-w-0 max-w-full space-y-14 text-left">
        {/* Intro */}
        <div id="overview" className="space-y-2 border-b border-[var(--border)] pb-6 scroll-mt-20">
          <h1 className="text-2xl font-bold tracking-tight text-[var(--text)]">
            Design Tokens Architecture
          </h1>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-2xl">
            Two-tier token design: raw scales in <code className="text-[var(--text)] font-mono text-xs">primitives.css</code> are mapped to semantic tokens in <code className="text-[var(--text)] font-mono text-xs">tokens.css</code>. Components consume exclusively semantic tokens.
          </p>
        </div>

        {/* 1. Live Semantic Tokens (Boxless & Edge-to-Edge List) */}
        <section id="semantic-tokens" className="space-y-4 scroll-mt-20">
          <div>
            <h2 className="text-base font-semibold tracking-tight text-[var(--text)]">
              1. Semantic Tokens (Current Theme Live Values)
            </h2>
            <p className="text-xs text-[var(--text-secondary)] mt-1">
              Dynamically updated when switching Light/Dark, Compact/Comfortable, or Brand.
            </p>
          </div>

          <div className="border-y border-[var(--border)] divide-y divide-[var(--border)]">
            {semanticColors.map((item) => (
              <div
                key={item.token}
                className="flex items-center justify-between py-2.5 px-1 hover:bg-[var(--surface-hover)] transition-colors group"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div
                    className="h-4 w-4 rounded-full border border-[var(--border-strong)] shrink-0 shadow-2xs"
                    style={{ backgroundColor: item.bgVar }}
                  />
                  <span className="font-mono text-xs font-semibold text-[var(--text)] tracking-tight">
                    {item.token}
                  </span>
                </div>
                <div className="text-xs text-[var(--text-secondary)] font-medium text-right">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 2. Raw Grayscale Primitives (Edge-to-Edge Continuous Ramp) */}
        <section id="raw-primitives" className="space-y-4 scroll-mt-20">
          <div>
            <h2 className="text-base font-semibold tracking-tight text-[var(--text)]">
              2. Raw Grayscale Primitives (primitives.css)
            </h2>
            <p className="text-xs text-[var(--text-secondary)] mt-1">
              Strict monochrome neutral ramp. Components never import these directly.
            </p>
          </div>

          <div className="space-y-2.5">
            {/* Seamless edge-to-edge spectrum bar */}
            <div className="h-12 w-full flex rounded-[var(--radius-xs)] overflow-hidden border border-[var(--border)] shadow-2xs">
              {rawGrays.map((g) => (
                <div
                  key={g.name}
                  className="flex-1 h-full transition-transform hover:scale-y-110 relative group"
                  style={{ backgroundColor: g.color }}
                  title={`${g.name}: ${g.color}`}
                />
              ))}
            </div>

            {/* Seamless labels below */}
            <div className="flex justify-between gap-1 text-[10px] sm:text-[11px] font-mono text-[var(--text-secondary)] px-1 overflow-x-auto">
              <span>white (#ffffff)</span>
              <span>gray-300</span>
              <span>gray-600</span>
              <span>gray-850</span>
              <span>black (#050607)</span>
            </div>
          </div>
        </section>

        {/* 3. Typography Scale (Edge-to-Edge Table) */}
        <section id="typography" className="space-y-4 scroll-mt-20">
          <div>
            <h2 className="text-base font-semibold tracking-tight text-[var(--text)]">
              3. Typography Scale (Satoshi Self-Hosted)
            </h2>
            <p className="text-xs text-[var(--text-secondary)] mt-1">
              Dense, tight scale with negative letter-spacing for high-density tools.
            </p>
          </div>

          <div className="border-y border-[var(--border)] overflow-x-auto w-full max-w-full">
            <table className="w-full min-w-[520px] text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[var(--border)] text-xs text-[var(--text)] font-semibold font-mono">
                  <th className="py-2.5 px-2 font-medium">Token</th>
                  <th className="py-2.5 px-2 font-medium">Size / Leading</th>
                  <th className="py-2.5 px-2 font-medium">Visual Sample</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)] text-xs">
                {typeScale.map((t) => (
                  <tr key={t.token} className="hover:bg-[var(--surface-hover)]">
                    <td className="py-2.5 px-2 font-mono font-semibold text-[var(--text)]">
                      {t.token}
                    </td>
                    <td className="py-2.5 px-2 font-mono text-[var(--text-secondary)]">
                      {t.size} / {t.leading}
                    </td>
                    <td
                      className="py-2.5 px-2 text-[var(--text)] tracking-tight"
                      style={{ fontSize: t.size, lineHeight: t.leading }}
                    >
                      {t.sample}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 4. Radius Scale (Boxless Edge-to-Edge) */}
        <section id="radius-scale" className="space-y-4 scroll-mt-20">
          <div>
            <h2 className="text-base font-semibold tracking-tight text-[var(--text)]">
              4. Radius Scale (Restrained 0-4px)
            </h2>
            <p className="text-xs text-[var(--text-secondary)] mt-1">
              Strictly compact, non-pill structural corners.
            </p>
          </div>

          <div className="border-y border-[var(--border)] divide-y divide-[var(--border)]">
            {[
              { token: '--radius-none', px: '0px', desc: 'Square raw corners' },
              { token: '--radius-xs', px: '2px', desc: 'Badges, small status dots' },
              { token: '--radius-sm', px: '3px', desc: 'Buttons, Inputs, Cards' },
              { token: '--radius-md', px: '4px', desc: 'Dialogs, floating menus' },
            ].map((r) => (
              <div
                key={r.token}
                className="flex items-center justify-between py-2.5 px-1 text-xs hover:bg-[var(--surface-hover)] transition-colors gap-2 min-w-0"
              >
                <div className="flex items-center gap-3 min-w-0 shrink-0">
                  <div
                    className="h-4 w-4 border border-[var(--text)] bg-[var(--surface-raised)] shrink-0"
                    style={{ borderRadius: r.px }}
                  />
                  <span className="font-mono text-xs font-semibold text-[var(--text)]">
                    {r.token}
                  </span>
                </div>
                <div className="text-xs text-[var(--text-secondary)] font-mono text-right truncate">
                  {r.px} &bull; {r.desc}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Density & Control Heights (Boxless Edge-to-Edge) */}
        <section id="density-scale" className="space-y-4 scroll-mt-20">
          <div>
            <h2 className="text-base font-semibold tracking-tight text-[var(--text)]">
              5. Density & Control Heights
            </h2>
            <p className="text-xs text-[var(--text-secondary)] mt-1">
              Controlled via <code className="font-mono text-xs">[data-density="compact|comfortable"]</code>.
            </p>
          </div>

          <div className="border-y border-[var(--border)] divide-y divide-[var(--border)]">
            {[
              { token: '--control-h-sm', desc: '28px compact / 32px comfortable' },
              { token: '--control-h-md', desc: '32px compact / 36px comfortable' },
              { token: '--control-h-lg', desc: '36px compact / 40px comfortable' },
              { token: '--space-unit', desc: '4px compact / 6px comfortable' },
            ].map((d) => (
              <div
                key={d.token}
                className="flex items-center justify-between py-2.5 px-1 text-xs hover:bg-[var(--surface-hover)] transition-colors gap-2 min-w-0"
              >
                <span className="font-mono text-xs font-semibold text-[var(--text)] shrink-0">
                  {d.token}
                </span>
                <span className="text-xs text-[var(--text-secondary)] font-mono text-right truncate">
                  {d.desc}
                </span>
              </div>
            ))}
          </div>
        </section>
    </div>
  )
}
