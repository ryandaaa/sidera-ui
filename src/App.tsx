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

  // 5. Sidebar Collapsed State (Default: false)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState<boolean>(() => {
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

  // Persist sidebar width and collapsed state
  React.useEffect(() => {
    localStorage.setItem('sidera-sidebar-width', String(sidebarWidth))
  }, [sidebarWidth])

  React.useEffect(() => {
    localStorage.setItem('sidera-sidebar-collapsed', String(isSidebarCollapsed))
  }, [isSidebarCollapsed])

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
    setRoute(newRoute)
    window.location.hash = newRoute
  }

  return (
    <ToastProvider>
      <TocProvider>
        {/* Landing Page (shown when hash is empty / root URL) */}
        {route === '' && (
          <LandingPage onEnter={() => handleRouteChange('tokens')} />
        )}

        {/* Docs layout (shown for all component routes) */}
        {route !== '' && (
          <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] flex flex-col font-sans select-text">
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
            <div className="flex-1 flex w-full items-start">
              <Sidebar
                currentRoute={route}
                onRouteChange={handleRouteChange}
                width={sidebarWidth}
                onWidthChange={setSidebarWidth}
                isCollapsed={isSidebarCollapsed}
                onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              />

              <main className="flex-1 min-w-0 p-8 lg:p-10">
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
