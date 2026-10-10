import * as React from 'react'
import { TopBar } from './showcase/TopBar'
import { Sidebar } from './showcase/Sidebar'
import { LandingPage } from './showcase/LandingPage'
import { TokensPage } from './showcase/TokensPage'
import { ButtonPreview } from './showcase/previews/ButtonPreview'
import { InputPreview } from './showcase/previews/InputPreview'
import { TextareaPreview } from './showcase/previews/TextareaPreview'
import { SelectPreview } from './showcase/previews/SelectPreview'
import { CheckboxPreview } from './showcase/previews/CheckboxPreview'
import { RadioPreview } from './showcase/previews/RadioPreview'
import { SwitchPreview } from './showcase/previews/SwitchPreview'
import { FieldPreview } from './showcase/previews/FieldPreview'
import { BadgePreview } from './showcase/previews/BadgePreview'
import { CardPreview } from './showcase/previews/CardPreview'
import { TagPreview } from './showcase/previews/TagPreview'
import { AvatarPreview } from './showcase/previews/AvatarPreview'
import { TablePreview } from './showcase/previews/TablePreview'
import { DescriptionListPreview } from './showcase/previews/DescriptionListPreview'
import { CodeBlockPreview } from './showcase/previews/CodeBlockPreview'
import { DisplayUtilitiesPreview } from './showcase/previews/DisplayUtilitiesPreview'
import { AlertPreview } from './showcase/previews/AlertPreview'
import { ToastPreview } from './showcase/previews/ToastPreview'
import { ProgressSpinnerPreview } from './showcase/previews/ProgressSpinnerPreview'
import { TooltipPreview } from './showcase/previews/TooltipPreview'
import { DialogPreview } from './showcase/previews/DialogPreview'
import { PopoverPreview } from './showcase/previews/PopoverPreview'
import { DropdownMenuPreview } from './showcase/previews/DropdownMenuPreview'
import { TabsPreview } from './showcase/previews/TabsPreview'
import { BreadcrumbPaginationPreview } from './showcase/previews/BreadcrumbPaginationPreview'
import { CommandSearchPreview } from './showcase/previews/CommandSearchPreview'
import { LayoutPreview } from './showcase/previews/LayoutPreview'
import { ToastProvider } from './components/ui/Toast'
import { TocProvider, TableOfContents } from './showcase/TableOfContents'

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

  // 3. UI Zoom State (Default: 110% as preferred by user)
  const [zoom, setZoom] = React.useState<'100%' | '110%' | '125%'>(() => {
    return (localStorage.getItem('sidera-zoom') as '100%' | '110%' | '125%') || '110%'
  })

  // 4. Sidebar Resizable Width State (Default: 256px)
  const [sidebarWidth, setSidebarWidth] = React.useState<number>(() => {
    const saved = localStorage.getItem('sidera-sidebar-width')
    return saved ? Math.min(Math.max(parseInt(saved, 10), 200), 480) : 256
  })

  // 5. Sidebar Collapsed State (Default: true on mobile < 768px, saved setting on desktop)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState<boolean>(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      return true
    }
    return localStorage.getItem('sidera-sidebar-collapsed') === 'true'
  })

  // 6. Hash Routing State
  const [route, setRoute] = React.useState<string>(() => {
    return window.location.hash.replace('#', '') // '' = landing page
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

  // Default Brand Theme (Monochrome)
  React.useEffect(() => {
    document.documentElement.setAttribute('data-brand', 'default')
  }, [])

  // Synchronize UI Zoom (Scale root font-size cleanly to avoid Chromium sticky compositor drift bug)
  React.useEffect(() => {
    // Clear legacy CSS zoom that causes Chromium sticky scroll drift
    ;(document.documentElement.style as unknown as { zoom: string }).zoom = ''
    // Scale root font-size cleanly (100% = 16px, 110% = 17.6px, 125% = 20px)
    document.documentElement.style.fontSize = zoom
    localStorage.setItem('sidera-zoom', zoom)
    window.dispatchEvent(new Event('resize'))
  }, [zoom])

  // Persist sidebar width and collapsed state (only persist collapse preference on desktop)
  React.useEffect(() => {
    localStorage.setItem('sidera-sidebar-width', String(sidebarWidth))
  }, [sidebarWidth])

  React.useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth >= 768) {
      localStorage.setItem('sidera-sidebar-collapsed', String(isSidebarCollapsed))
    }
  }, [isSidebarCollapsed])

  // Collapse sidebar when resizing to mobile viewport
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarCollapsed(true)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Ctrl+B / Cmd+B keyboard shortcut to toggle sidebar collapse
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'b') {
        e.preventDefault()
        setIsSidebarCollapsed((prev) => !prev)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Transition state between landing page and docs workspace
  const [isTransitioning, setIsTransitioning] = React.useState(false)
  const [transitionTarget, setTransitionTarget] = React.useState<string | null>(null)

  // Strict scroll lock when on Landing Page (prevent rubber-banding, pulling, and empty space drag)
  React.useEffect(() => {
    if (route === '') {
      document.documentElement.style.overflow = 'hidden'
      document.documentElement.style.height = '100%'
      document.documentElement.style.overscrollBehavior = 'none'
      document.body.style.overflow = 'hidden'
      document.body.style.height = '100%'
      document.body.style.overscrollBehavior = 'none'
    } else {
      document.documentElement.style.overflow = ''
      document.documentElement.style.height = ''
      document.documentElement.style.overscrollBehavior = ''
      document.body.style.overflow = ''
      document.body.style.height = ''
      document.body.style.overscrollBehavior = ''
    }

    return () => {
      document.documentElement.style.overflow = ''
      document.documentElement.style.height = ''
      document.documentElement.style.overscrollBehavior = ''
      document.body.style.overflow = ''
      document.body.style.height = ''
      document.body.style.overscrollBehavior = ''
    }
  }, [route])

  // Synchronize hash changes
  React.useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '')
      setRoute(hash) // '' is valid — shows landing page
    }
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const handleRouteChange = (newRoute: string) => {
    if (newRoute === route && !isTransitioning) return

    // If crossing boundary between landing page and docs workspace, trigger smooth cinematic crossfade
    const isBoundaryCross = (route === '' && newRoute !== '') || (route !== '' && newRoute === '')

    if (isBoundaryCross) {
      setIsTransitioning(true)
      setTransitionTarget(newRoute)

      setTimeout(() => {
        setRoute(newRoute)
        window.location.hash = newRoute
        setIsTransitioning(false)
        setTransitionTarget(null)
      }, 220)
    } else {
      setRoute(newRoute)
      window.location.hash = newRoute
    }
  }

  return (
    <ToastProvider>
      <TocProvider>
        {/* Sleek top glowing laser progress bar during transition */}
        {isTransitioning && (
          <div className="fixed top-0 left-0 right-0 h-[2px] bg-white z-50 animate-pulse shadow-[0_0_12px_rgba(255,255,255,0.9)]" />
        )}

        {/* Landing Page (shown when hash is empty / root URL) */}
        {route === '' && (
          <LandingPage
            onEnter={() => handleRouteChange('tokens')}
            isExiting={isTransitioning && transitionTarget !== ''}
          />
        )}

        {/* Docs layout (shown for all component routes) — smooth crossfade without fake skeleton */}
        {route !== '' && (
          <div
            className={`min-h-screen w-full max-w-full bg-[var(--bg)] text-[var(--text)] flex flex-col font-sans select-text transition-all duration-300 ease-out ${
              isTransitioning
                ? 'opacity-0 scale-[0.99] filter blur-[1px]'
                : 'opacity-100 scale-100 filter-none animate-in fade-in'
            }`}
          >
            {/* Top Bar with Brand, Zoom, Density, Theme Toggles, Hamburger, and Command Search */}
            <TopBar
              theme={theme}
              onThemeChange={setTheme}
              density={density}
              onDensityChange={setDensity}
              zoom={zoom}
              onZoomChange={setZoom}
              isSidebarCollapsed={isSidebarCollapsed}
              onToggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              onRouteChange={handleRouteChange}
            />

            {/* Main Workspace: Left Resizable Sidebar + Center Content Area + Right TOC */}
            <div className="flex-1 flex w-full max-w-full items-start">
              <Sidebar
                currentRoute={route}
                onRouteChange={handleRouteChange}
                width={sidebarWidth}
                onWidthChange={setSidebarWidth}
                isCollapsed={isSidebarCollapsed}
                onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              />

              <main className="flex-1 min-w-0 max-w-full p-4 sm:p-6 md:p-8 lg:p-10">
                {route === 'tokens' && <TokensPage />}
              {route === 'button' && <ButtonPreview />}
              {route === 'input' && <InputPreview />}
              {route === 'textarea' && <TextareaPreview />}
              {route === 'select' && <SelectPreview />}
              {route === 'checkbox' && <CheckboxPreview />}
              {route === 'radio' && <RadioPreview />}
              {route === 'switch' && <SwitchPreview />}
              {route === 'field' && <FieldPreview />}
              {route === 'badge' && <BadgePreview />}
              {route === 'tag' && <TagPreview />}
              {route === 'avatar' && <AvatarPreview />}
              {route === 'card' && <CardPreview />}
              {route === 'table' && <TablePreview />}
              {route === 'desc-list' && <DescriptionListPreview />}
              {route === 'code-block' && <CodeBlockPreview />}
              {route === 'display-utils' && <DisplayUtilitiesPreview />}
              {route === 'alert' && <AlertPreview />}
              {route === 'toast' && <ToastPreview />}
              {route === 'progress-spinner' && <ProgressSpinnerPreview />}
              {route === 'tooltip' && <TooltipPreview />}
              {route === 'dialog' && <DialogPreview />}
              {route === 'popover' && <PopoverPreview />}
              {route === 'dropdown-menu' && <DropdownMenuPreview />}
              {route === 'tabs' && <TabsPreview />}
              {route === 'breadcrumb-pagination' && <BreadcrumbPaginationPreview />}
              {route === 'command-search' && <CommandSearchPreview />}
              {route === 'layout' && <LayoutPreview />}
            </main>

            {/* Persistent Right Table of Contents (Anchored to workspace, never pushed up) */}
            <TableOfContents />
          </div>
        </div>
        )}
      </TocProvider>
    </ToastProvider>
  )
}
