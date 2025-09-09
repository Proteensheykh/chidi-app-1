"use client"

import { useState } from "react"
import { Button } from "@/features/shared/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/features/shared/ui/card"
import { Switch } from "@/features/shared/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/features/shared/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/features/shared/ui/dialog"
import {
  User,
  Bell,
  Smartphone,
  HelpCircle,
  LogOut,
  Edit,
  ExternalLink,
  MessageSquare,
  Clock,
  Zap,
  Download,
} from "lucide-react"

interface SettingsTabProps {
  userProfile: any
  onEditProfile: () => void
  onSignOut?: () => void
  onManageTemplates?: () => void
  onManageBusinessHours?: () => void
  onManageIntegrations?: () => void
  onDataExport?: () => void // Added data export callback
}

export function SettingsTab({
  userProfile,
  onEditProfile,
  onSignOut,
  onManageTemplates,
  onManageBusinessHours,
  onManageIntegrations,
  onDataExport, // Added data export prop
}: SettingsTabProps) {
  const [notificationSettings, setNotificationSettings] = useState({
    stockAlerts: true,
    newMessages: true,
    dailySummary: false,
  })

  const [showHelpModal, setShowHelpModal] = useState(false)
  const [showConnectModal, setShowConnectModal] = useState(false)
  const [connectingService, setConnectingService] = useState("")

  const handleNotificationChange = (setting: string, value: boolean) => {
    setNotificationSettings((prev) => ({ ...prev, [setting]: value }))
    // In a real app, this would save to backend
    console.log(`${setting} notifications ${value ? "enabled" : "disabled"}`)
  }

  const handleConnectService = (service: string) => {
    setConnectingService(service)
    setShowConnectModal(true)
  }

  const handleSignOut = () => {
    if (onSignOut) {
      onSignOut()
    } else {
      // Default sign out behavior
      if (confirm("Are you sure you want to sign out?")) {
        window.location.reload()
      }
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Settings</h2>

      {/* Profile Section */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <User className="w-4 h-4" />
            Profile
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-3">
            <Avatar className="w-12 h-12">
              {userProfile?.image ? (
                <AvatarImage src={userProfile.image} alt={userProfile.ownerName} />
              ) : null}
              <AvatarFallback>
                {userProfile?.ownerName
                  ?.split(" ")
                  .map((n: string) => n[0])
                  .join("")
                  .toUpperCase() || "BO"}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="font-medium">{userProfile?.ownerName || "Business Owner"}</p>
              <p className="text-sm text-muted-foreground">{userProfile?.email || "businessowner@email.com"}</p>
              {userProfile?.businessName && <p className="text-xs text-muted-foreground">{userProfile.businessName}</p>}
            </div>
            <Button variant="ghost" size="sm" onClick={onEditProfile}>
              <Edit className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* AI Assistant Section */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            AI Assistant
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Template Responses</p>
              <p className="text-sm text-muted-foreground">Quick replies for common questions</p>
            </div>
            <Button variant="ghost" size="sm" onClick={onManageTemplates}>
              Manage
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Business Hours</p>
              <p className="text-sm text-muted-foreground">Set when you're available</p>
            </div>
            <Button variant="ghost" size="sm" onClick={onManageBusinessHours}>
              <Clock className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Integrations Section */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Integrations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Connected Services</p>
              <p className="text-sm text-muted-foreground">Manage integrations and simulations</p>
            </div>
            <Button variant="ghost" size="sm" onClick={onManageIntegrations}>
              Manage
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Data Management Section */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Download className="w-4 h-4" />
            Data Management
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Export Data</p>
              <p className="text-sm text-muted-foreground">Backup your business information</p>
            </div>
            <Button variant="ghost" size="sm" onClick={onDataExport}>
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Bell className="w-4 h-4" />
            Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Stock Alerts</p>
              <p className="text-sm text-muted-foreground">Get notified when items are low</p>
            </div>
            <Switch
              checked={notificationSettings.stockAlerts}
              onCheckedChange={(checked) => handleNotificationChange("stockAlerts", checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">New Messages</p>
              <p className="text-sm text-muted-foreground">Customer inquiries and orders</p>
            </div>
            <Switch
              checked={notificationSettings.newMessages}
              onCheckedChange={(checked) => handleNotificationChange("newMessages", checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Daily Summary</p>
              <p className="text-sm text-muted-foreground">Daily business performance</p>
            </div>
            <Switch
              checked={notificationSettings.dailySummary}
              onCheckedChange={(checked) => handleNotificationChange("dailySummary", checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Social Media */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Smartphone className="w-4 h-4" />
            Connected Accounts
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">WhatsApp Business</p>
              <p className="text-sm text-green-600">Connected</p>
            </div>
            <Button variant="ghost" size="sm" onClick={() => handleConnectService("WhatsApp")}>
              Manage
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Instagram</p>
              <p className="text-sm text-muted-foreground">Not connected</p>
            </div>
            <Button variant="ghost" size="sm" onClick={() => handleConnectService("Instagram")}>
              Connect
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Support */}
      <Card>
        <CardContent className="p-4 space-y-2">
          <Button variant="ghost" className="w-full justify-start" size="sm" onClick={() => setShowHelpModal(true)}>
            <HelpCircle className="w-4 h-4 mr-2" />
            Help & Support
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-red-600 hover:text-red-700"
            size="sm"
            onClick={handleSignOut}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </CardContent>
      </Card>

      {/* Help Modal */}
      <Dialog open={showHelpModal} onOpenChange={setShowHelpModal}>
        <DialogContent className="max-w-md mx-auto">
          <DialogHeader>
            <DialogTitle>Help & Support</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start bg-transparent"
                onClick={() => window.open("mailto:support@chidi.app")}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Email Support
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start bg-transparent"
                onClick={() => window.open("https://chidi.app/docs", "_blank")}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Documentation
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start bg-transparent"
                onClick={() => window.open("https://chidi.app/faq", "_blank")}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                FAQ
              </Button>
            </div>
            <div className="text-center text-sm text-muted-foreground">
              <p>CHIDI v1.0.0</p>
              <p>Your AI Business Assistant</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Connect Service Modal */}
      <Dialog open={showConnectModal} onOpenChange={setShowConnectModal}>
        <DialogContent className="max-w-md mx-auto">
          <DialogHeader>
            <DialogTitle>Connect {connectingService}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Connect your {connectingService} account to sync messages and manage customer interactions directly from
              CHIDI.
            </p>
            <div className="space-y-2">
              <Button className="w-full">Connect {connectingService} Account</Button>
              <Button variant="outline" className="w-full bg-transparent" onClick={() => setShowConnectModal(false)}>
                Cancel
              </Button>
            </div>
            <div className="text-xs text-muted-foreground">
              <p>By connecting, you agree to our Terms of Service and Privacy Policy.</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
