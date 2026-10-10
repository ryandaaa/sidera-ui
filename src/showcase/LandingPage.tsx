import * as React from 'react';
import Silk from './Silk';
import { EXTERNAL_LINKS } from '../config/links';
import { GithubIcon } from './icons/GithubIcon';
import { ArrowRight, ExternalLink, Copy, Check } from 'lucide-react';

interface LandingPageProps {
  onEnter: () => void;
}

type PkgManager = 'pnpm' | 'npm' | 'curl';

const INSTALL_COMMANDS: Record<PkgManager, string> = {
  pnpm: 'pnpm add sidera-ui',
  npm: 'npm i sidera-ui',
  curl: 'curl -fsSL https://sidera.dev/install.sh | bash',
};

export function LandingPage({ onEnter }: LandingPageProps) {
  const [pkgManager, setPkgManager] = React.useState<PkgManager>('pnpm');
  const [copied, setCopied] = React.useState(false);

  const activeCommand = INSTALL_COMMANDS[pkgManager];

  const handleCopy = async () => {
    await navigator.clipboard.writeText(activeCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 overflow-hidden"
      style={{ background: '#0a0a0f' }}
      data-theme="dark"
    >
      {/* Silk animated canvas background */}
      <div className="absolute inset-0 z-0">
        <Silk
          color="#1a1a2e"
          speed={4}
          scale={1.2}
          noiseIntensity={1.2}
          rotation={0}
          lightMode={false}
        />
      </div>

      {/* Dark overlay for contrast and legibility */}
      <div
        className="absolute inset-0 z-[1]"
        style={{ background: 'rgba(0,0,0,0.32)' }}
      />

      {/* Hero content — centered, minimal, full lowercase, strict optical vertical rhythm */}
      <main className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center select-none">
        {/* Wordmark — full lowercase sidera-ui */}
        <h1
          className="font-mono font-light tracking-[0.25em] lowercase leading-none mb-4 sm:mb-5"
          style={{
            fontSize: 'clamp(2.2rem, 6vw, 3.8rem)',
            color: 'rgba(255,255,255,0.95)',
            letterSpacing: '0.25em',
          }}
        >
          sidera-ui
        </h1>

        {/* Tagline / Slug */}
        <p
          className="font-sans font-light max-w-sm leading-relaxed mb-4 sm:mb-5"
          style={{ fontSize: 'clamp(0.8rem, 1.5vw, 0.9rem)', color: 'rgba(255,255,255,0.5)' }}
        >
          A minimal, opinionated UI component library
          <br />
          built with React and Tailwind CSS.
        </p>

        {/* Quick copy install command box — 2-row terminal card */}
        <div
          className="mb-4 sm:mb-5 w-full max-w-[340px] sm:max-w-[420px] rounded-md border border-white/15 bg-black/45 backdrop-blur-md overflow-hidden text-left transition-colors hover:border-white/25 shadow-lg"
        >
          {/* Row 1: Header with package manager tabs and copy action */}
          <div className="flex items-center justify-between px-3 py-1.5 border-b border-white/[0.08] bg-white/[0.02]">
            <div className="flex items-center gap-1 font-mono text-[10px]">
              {(['pnpm', 'npm', 'curl'] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setPkgManager(tab)}
                  className={`px-2 py-0.5 rounded transition-colors cursor-pointer ${
                    pkgManager === tab
                      ? 'bg-white/15 text-white font-medium'
                      : 'text-white/40 hover:text-white/70'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={handleCopy}
              className="flex items-center gap-1 font-mono text-[10px] text-white/45 hover:text-white transition-colors cursor-pointer px-1.5 py-0.5 rounded hover:bg-white/10"
              title="Copy command"
              aria-label="Copy install command"
            >
              {copied ? (
                <>
                  <Check className="h-3 w-3 text-emerald-400" />
                  <span className="text-emerald-400 font-medium">copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3" />
                  <span>copy</span>
                </>
              )}
            </button>
          </div>

          {/* Row 2: Full width command line */}
          <div className="flex items-center gap-2 px-3.5 py-2.5 font-mono text-[11px] sm:text-xs text-white/90 select-text overflow-x-auto whitespace-nowrap">
            <span className="text-white/30 select-none">$</span>
            <span className="tracking-tight text-white/95">{activeCommand}</span>
          </div>
        </div>

        {/* CTA buttons */}
        <div className="flex items-center gap-3 mb-4 sm:mb-5">
          <button
            onClick={onEnter}
            className="flex items-center gap-2 rounded-md font-medium transition-all duration-150 cursor-pointer active:scale-95"
            style={{
              padding: '0.5rem 1.15rem',
              fontSize: '0.8rem',
              background: 'rgba(255,255,255,0.95)',
              color: '#0a0a0f',
              border: 'none',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,1)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.95)';
            }}
          >
            Browse Components
            <ArrowRight size={13} strokeWidth={2} />
          </button>

          <a
            href={EXTERNAL_LINKS.githubRepo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-md font-medium transition-all duration-150 active:scale-95"
            style={{
              padding: '0.5rem 1.15rem',
              fontSize: '0.8rem',
              background: 'transparent',
              color: 'rgba(255,255,255,0.7)',
              border: '1px solid rgba(255,255,255,0.2)',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.95)';
              (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.45)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.7)';
              (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.2)';
            }}
          >
            <GithubIcon className="h-[13px] w-[13px]" />
            GitHub
            <ExternalLink size={11} strokeWidth={1.5} style={{ opacity: 0.6 }} />
          </a>
        </div>

        {/* Subtle metrics info */}
        <p
          className="font-sans"
          style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.05em' }}
        >
          24 components · Open source
        </p>
      </main>

      {/* Bottom Left — version */}
      <div className="absolute bottom-5 left-6 z-20 font-mono text-[11px] text-white/25 select-none hidden sm:block">
        v0.1.0
      </div>

      {/* Bottom Right — personal github profile link */}
      <div className="absolute bottom-5 right-6 z-20">
        <a
          href={EXTERNAL_LINKS.githubProfile.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 font-mono text-[11px] text-white/40 hover:text-white/85 transition-colors select-none"
          title="GitHub Profile"
        >
          <GithubIcon className="h-3 w-3" />
          <span>{EXTERNAL_LINKS.githubProfile.label}</span>
        </a>
      </div>
    </div>
  );
}
