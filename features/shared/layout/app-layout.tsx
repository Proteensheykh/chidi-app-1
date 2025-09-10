"use client"

import { ReactNode } from "react"
import { AppHeader, AppHeaderProps } from "./app-header"
import { BottomNav } from "./bottom-nav"

export interface AppLayoutProps extends Omit<AppHeaderProps, 'title'> {
  children: ReactNode
  title?: string
  activeTab: string
  onTabChange: (tab: string) => void
  showBottomNav?: boolean
  showHeader?: boolean
}

export function AppLayout({
  children,
  title = "CHIDI",
  activeTab,
  onTabChange,
  showBottomNav = true,
  showHeader = true,
  ...headerProps
}: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {showHeader && (
        <AppHeader 
          title={title}
          {...headerProps} 
        />
      )}
      
      <main className="px-4 py-4 max-w-md mx-auto pb-20">
        {children}
      </main>

      {showBottomNav && (
        <BottomNav 
          activeTab={activeTab} 
          onTabChange={onTabChange} 
        />
      )}
    </div>
  )
}
