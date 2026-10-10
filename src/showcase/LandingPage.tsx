import Silk from './Silk';
import { EXTERNAL_LINKS } from '../config/links';
import { GithubIcon } from './icons/GithubIcon';
import { ArrowRight, ExternalLink } from 'lucide-react';

interface LandingPageProps {
  onEnter: () => void;
}

export function LandingPage({ onEnter }: LandingPageProps) {
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

      {/* Hero content — centered, minimal, full lowercase */}
      <main className="relative z-10 flex flex-col items-center justify-center h-full gap-5 px-6 text-center select-none">
        {/* Wordmark — full lowercase sidera-ui */}
        <h1
          className="font-mono font-light tracking-[0.25em] lowercase"
          style={{
            fontSize: 'clamp(2.2rem, 6vw, 3.8rem)',
            color: 'rgba(255,255,255,0.95)',
            letterSpacing: '0.25em',
          }}
        >
          sidera-ui
        </h1>

        {/* Tagline */}
        <p
          className="font-sans font-light max-w-sm leading-relaxed"
          style={{ fontSize: 'clamp(0.8rem, 1.5vw, 0.9rem)', color: 'rgba(255,255,255,0.5)' }}
        >
          A minimal, opinionated UI component library
          <br />
          built with React and Tailwind CSS.
        </p>

        {/* CTA buttons */}
        <div className="flex items-center gap-3 mt-1">
          <button
            onClick={onEnter}
            className="flex items-center gap-2 rounded-md font-medium transition-all duration-150 cursor-pointer"
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
            className="flex items-center gap-2 rounded-md font-medium transition-all duration-150"
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
          className="font-sans mt-2"
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
