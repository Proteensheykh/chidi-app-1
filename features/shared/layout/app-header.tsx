"use client"

import { Button, Avatar, AvatarFallback } from "@/features/shared/ui"
import { WifiOff, Bell } from "lucide-react"

export interface AppHeaderProps {
  title?: string
  isOffline?: boolean
  userProfile?: {
    ownerName: string
    image?: string
  }
  notificationCount?: number
  onMenuClick: () => void
  onNotificationClick: () => void
  onProfileClick: () => void
}

export function AppHeader({
  title = "CHIDI",
  isOffline = false,
  userProfile,
  notificationCount = 0,
  onMenuClick,
  onNotificationClick,
  onProfileClick
}: AppHeaderProps) {
  return (
    <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-40">
      <div className="flex items-center justify-between px-4 py-3 max-w-md mx-auto">
        <Button variant="ghost" size="sm" onClick={onMenuClick} className="h-8 w-8 p-0">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </Button>
        <h1 className="text-lg font-semibold">{title}</h1>
        <div className="flex items-center gap-2">
          {isOffline && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <WifiOff className="w-3 h-3" />
              <span>Offline</span>
            </div>
          )}
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 relative" onClick={onNotificationClick}>
            <Bell className="w-4 h-4" />
            {notificationCount > 0 && (
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
            )}
          </Button>
          <Avatar className="w-7 h-7 cursor-pointer" onClick={onProfileClick}>
            <AvatarFallback className="text-xs">
              {userProfile?.ownerName
                ?.split(" ")
                .map((n: string) => n[0])
                .join("")
                .toUpperCase() || "BO"}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}
