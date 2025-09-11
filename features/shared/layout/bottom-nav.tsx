"use client"

import { Home, Package, TrendingUp, Settings } from "lucide-react"
import { useFeatureFlags } from "../hooks/use-feature-flags"

interface BottomNavProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  // Use feature flags to conditionally render navigation items
  const { isEnabled } = useFeatureFlags();
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
      <div className="flex items-center justify-around py-1 px-1 max-w-md mx-auto">
        <button
          onClick={() => onTabChange("home")}
          className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
            activeTab === "home" ? "text-primary bg-primary/10" : "text-muted-foreground"
          }`}
        >
          <Home className="w-4 h-4" />
          <span className="text-xs font-medium">Home</span>
        </button>
        <button
          onClick={() => onTabChange("catalog")}
          className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
            activeTab === "catalog" ? "text-primary bg-primary/10" : "text-muted-foreground"
          }`}
        >
          <Package className="w-4 h-4" />
          <span className="text-xs font-medium">Catalog</span>
        </button>
        {/* TODO: Sales feature shelved for v2 */}
        {isEnabled('SALES') && (
          <button
            onClick={() => onTabChange("sales")}
            className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
              activeTab === "sales" ? "text-primary bg-primary/10" : "text-muted-foreground"
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span className="text-xs font-medium">Sales</span>
          </button>
        )}
        <button
          onClick={() => onTabChange("settings")}
          className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
            activeTab === "settings" ? "text-primary bg-primary/10" : "text-muted-foreground"
          }`}
        >
          <Settings className="w-4 h-4" />
          <span className="text-xs font-medium">Settings</span>
        </button>
      </div>
    </div>
  )
}
