"use client"

import { ReactNode } from "react"
import { Button } from "@/features/shared/ui/button"

export interface FeaturePageLayoutProps {
  children: ReactNode
  title: string
  onBack: () => void
  action?: ReactNode
  headerClassName?: string
  contentClassName?: string
}

export function FeaturePageLayout({ 
  children, 
  title, 
  onBack, 
  action,
  headerClassName = "",
  contentClassName = "space-y-4"
}: FeaturePageLayoutProps) {
  return (
    <div className="space-y-4">
      <div className={`flex items-center justify-between ${headerClassName}`}>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={onBack} className="h-8 w-8 p-0">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Button>
          <h2 className="text-xl font-semibold">{title}</h2>
        </div>
        {action}
      </div>
      <div className={contentClassName}>
        {children}
      </div>
    </div>
  )
}
