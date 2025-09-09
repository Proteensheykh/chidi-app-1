"use client"

import { useState } from "react"
import { Button } from "@/features/shared/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/features/shared/ui/card"
import { Badge } from "@/features/shared/ui/badge"
import {
  ArrowLeft,
  MessageSquare,
  Instagram,
  CreditCard,
  Truck,
  Mail,
  CheckCircle,
  AlertCircle,
  User,
} from "lucide-react"

interface Integration {
  id: string
  name: string
  description: string
  icon: any
  category: "messaging" | "payment" | "shipping" | "marketing"
  status: "connected" | "available"
  features: string[]
  simulationData?: {
    messages?: number
    orders?: number
    revenue?: string
  }
}

interface IntegrationSimulationPageProps {
  onBack: () => void
}

export function IntegrationSimulationPage({ onBack }: IntegrationSimulationPageProps) {
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: "whatsapp",
      name: "WhatsApp Business",
      description: "Connect with customers via WhatsApp",
      icon: MessageSquare,
      category: "messaging",
      status: "connected",
      features: ["Auto-replies", "Message templates", "Customer support", "Contact sync", "Conversation history"],
    },
    {
      id: "instagram",
      name: "Instagram Business",
      description: "Manage Instagram DMs and posts",
      icon: Instagram,
      category: "messaging",
      status: "available",
      features: ["DM management", "Story replies", "Product tagging", "Contact sync", "Conversation history"],
    },
    {
      id: "paystack",
      name: "Paystack",
      description: "Accept online payments",
      icon: CreditCard,
      category: "payment",
      status: "available",
      features: ["Card payments", "Bank transfers", "Payment links"],
    },
    {
      id: "flutterwave",
      name: "Flutterwave",
      description: "Payment processing platform",
      icon: CreditCard,
      category: "payment",
      status: "available",
      features: ["Multiple payment methods", "International payments", "Recurring billing"],
    },
    {
      id: "dhl",
      name: "DHL Express",
      description: "International shipping",
      icon: Truck,
      category: "shipping",
      status: "available",
      features: ["Package tracking", "Shipping rates", "Delivery notifications"],
    },
    {
      id: "gig",
      name: "GIG Logistics",
      description: "Local delivery service",
      icon: Truck,
      category: "shipping",
      status: "available",
      features: ["Same-day delivery", "Package tracking", "Bulk shipping"],
    },
    {
      id: "mailchimp",
      name: "Mailchimp",
      description: "Email marketing automation",
      icon: Mail,
      category: "marketing",
      status: "available",
      features: ["Email campaigns", "Customer segmentation", "Analytics"],
    },
  ])

  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const toggleIntegrationStatus = (id: string) => {
    setIntegrations((prev) =>
      prev.map((integration) => {
        if (integration.id === id) {
          const newStatus: "connected" | "available" = integration.status === "available" ? "connected" : "available"
          return { ...integration, status: newStatus }
        }
        return integration
      }),
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "connected":
        return "bg-green-100 text-green-800 border-green-200"
      case "available":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "connected":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "available":
        return <AlertCircle className="w-4 h-4 text-gray-600" />
      default:
        return null
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "messaging":
        return "bg-blue-100 text-blue-800"
      case "payment":
        return "bg-green-100 text-green-800"
      case "shipping":
        return "bg-purple-100 text-purple-800"
      case "marketing":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredIntegrations =
    selectedCategory === "all"
      ? integrations
      : integrations.filter((integration) => integration.category === selectedCategory)

  const connectedCount = integrations.filter((i) => i.status === "connected").length
  const availableCount = integrations.filter((i) => i.status === "available").length

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="flex items-center justify-between px-4 py-3 max-w-md mx-auto">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back
          </Button>
          <h1 className="text-lg font-semibold">Integrations</h1>
          <div className="w-16" />
        </div>
      </header>

      <main className="px-4 py-4 max-w-md mx-auto pb-20">
        <div className="space-y-4">

      {/* Status Overview */}
      <div className="grid grid-cols-2 gap-3">
        <Card>
          <CardContent className="p-3 text-center">
            <div className="text-lg font-bold text-green-600">{connectedCount}</div>
            <div className="text-xs text-muted-foreground">Connected</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 text-center">
            <div className="text-lg font-bold text-gray-600">{availableCount}</div>
            <div className="text-xs text-muted-foreground">Available</div>
          </CardContent>
        </Card>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        <Button
          variant={selectedCategory === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedCategory("all")}
        >
          All
        </Button>
        <Button
          variant={selectedCategory === "messaging" ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedCategory("messaging")}
        >
          Messaging
        </Button>
        <Button
          variant={selectedCategory === "payment" ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedCategory("payment")}
        >
          Payments
        </Button>
        <Button
          variant={selectedCategory === "shipping" ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedCategory("shipping")}
        >
          Shipping
        </Button>
        <Button
          variant={selectedCategory === "marketing" ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedCategory("marketing")}
        >
          Marketing
        </Button>
      </div>



      {/* Integrations List */}
      <div className="space-y-3">
        {filteredIntegrations.map((integration) => {
          const IconComponent = integration.icon
          return (
            <Card key={integration.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium">{integration.name}</h3>
                        <Badge className={`text-xs ${getCategoryColor(integration.category)}`}>
                          {integration.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{integration.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {integration.features.map((feature, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(integration.status)}
                    <Badge className={`text-xs ${getStatusColor(integration.status)}`}>{integration.status}</Badge>
                  </div>
                </div>



                <div className="flex gap-2">
                  <Button
                    variant={integration.status === "connected" ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleIntegrationStatus(integration.id)}
                    className="flex-1"
                  >
                    {integration.status === "available" && "Connect"}
                    {integration.status === "connected" && "Disconnect"}
                  </Button>
                  <Button variant="ghost" size="sm">
                    Learn More
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* AI-Powered Features */}
      <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-primary" />
            AI-Powered Contact & Conversation Sync
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                <CheckCircle className="w-3 h-3 text-green-600" />
              </div>
              <div>
                <h4 className="font-medium text-sm">Automatic Contact Sync</h4>
                <p className="text-xs text-muted-foreground">
                  CHIDI automatically extracts and saves customer contacts from WhatsApp & Instagram conversations
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                <MessageSquare className="w-3 h-3 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium text-sm">Conversation History</h4>
                <p className="text-xs text-muted-foreground">
                  All messages are automatically synced and organized with AI-powered categorization
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mt-0.5">
                <User className="w-3 h-3 text-purple-600" />
              </div>
              <div>
                <h4 className="font-medium text-sm">Smart Customer Profiles</h4>
                <p className="text-xs text-muted-foreground">
                  AI creates comprehensive customer profiles from conversation data and purchase history
                </p>
              </div>
            </div>
          </div>
          <div className="pt-2 border-t">
            <p className="text-xs text-muted-foreground">
              <strong>Note:</strong> No manual customer entry needed! CHIDI learns from your conversations and builds your customer database automatically.
            </p>
          </div>
        </CardContent>
      </Card>
        </div>
      </main>
    </div>
  )
}
