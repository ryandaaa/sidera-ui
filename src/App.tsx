import * as React from 'react'
import { TopBar } from './showcase/TopBar'
import { Sidebar } from './showcase/Sidebar'
import { TokensPage } from './showcase/TokensPage'
import { ButtonPreview } from './showcase/previews/ButtonPreview'
import { InputPreview } from './showcase/previews/InputPreview'
import { FieldPreview } from './showcase/previews/FieldPreview'
import { BadgePreview } from './showcase/previews/BadgePreview'
import { CardPreview } from './showcase/previews/CardPreview'

export default function App() {
  // 1. Theme State (Default: dark, persisted in localStorage)
  const [theme, setTheme] = React.useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('sidera-theme') as 'dark' | 'light' | null
    if (saved) return saved
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light'
    }
    return 'dark'
  })

  // 2. Density State (Default: compact)
  const [density, setDensity] = React.useState<'compact' | 'comfortable'>(() => {
    return (localStorage.getItem('sidera-density') as 'compact' | 'comfortable') || 'compact'
  })

  // 3. Brand State (Default: default monochrome)
  const [brand, setBrand] = React.useState<'default' | 'linear'>(() => {
    return (localStorage.getItem('sidera-brand') as 'default' | 'linear') || 'default'
  })

  // 4. Hash Routing State
  const [route, setRoute] = React.useState<string>(() => {
    const hash = window.location.hash.replace('#', '')
    return hash || 'tokens'
  })

  // Synchronize DOM attributes with design token layers
  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('sidera-theme', theme)
  }, [theme])

  React.useEffect(() => {
    document.documentElement.setAttribute('data-density', density)
    localStorage.setItem('sidera-density', density)
  }, [density])

  React.useEffect(() => {
    document.documentElement.setAttribute('data-brand', brand)
    localStorage.setItem('sidera-brand', brand)
  }, [brand])

  // Synchronize hash changes
  React.useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '')
      if (hash) setRoute(hash)
    }
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const handleRouteChange = (newRoute: string) => {
    setRoute(newRoute)
    window.location.hash = newRoute
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] flex flex-col font-sans select-text">
      {/* Top Bar with Brand, Density, and Theme Toggles */}
      <TopBar
        theme={theme}
        onThemeChange={setTheme}
        density={density}
        onDensityChange={setDensity}
        brand={brand}
        onBrandChange={setBrand}
      />

      {/* Main Workspace: Left Sidebar + Right Content Area */}
      <div className="flex-1 flex w-full items-start">
        <Sidebar currentRoute={route} onRouteChange={handleRouteChange} />

        <main className="flex-1 min-w-0 p-8 lg:p-10">
          {route === 'tokens' && <TokensPage />}
          {route === 'button' && <ButtonPreview />}
          {route === 'input' && <InputPreview />}
          {route === 'field' && <FieldPreview />}
          {route === 'badge' && <BadgePreview />}
          {route === 'card' && <CardPreview />}
        </main>
      </div>
    </div>
  )
}
