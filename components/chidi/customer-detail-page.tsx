"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Edit, Phone, Mail, MapPin, Calendar, TrendingUp, Clock, Star, ShoppingBag, MessageSquare, Brain } from "lucide-react"

interface Customer {
  id: number
  name: string
  phone: string
  email?: string
  location?: string
  totalOrders: number
  totalSpent: string
  lastOrder: string
  status: "active" | "inactive" | "vip"
  notes?: string
  joinDate: string
  image?: string
  preferences?: {
    categories: string[]
    priceRange: string
    communicationMethod: "whatsapp" | "instagram" | "phone" | "email"
    preferredTime: string
  }
  behavior?: {
    avgOrderValue: number
    orderFrequency: string
    seasonalPattern: string[]
    responseTime: string
    satisfactionScore: number
  }
}

interface Order {
  id: number
  date: string
  items: string[]
  total: string
  status: "completed" | "pending" | "cancelled"
}

interface CustomerDetailPageProps {
  customer: Customer
  onBack: () => void
  onEditCustomer: (customer: Customer) => void
}

export function CustomerDetailPage({ customer, onBack, onEditCustomer }: CustomerDetailPageProps) {
  const [activeTab, setActiveTab] = useState("overview")

  // Enhanced customer data with AI insights
  const customerOrders: Order[] = [
    {
      id: 1,
      date: "2024-01-15",
      items: ["Blue Ankara Dress", "Leather Handbag"],
      total: "₦50,000",
      status: "completed",
    },
    {
      id: 2,
      date: "2024-01-10",
      items: ["Casual Sneakers"],
      total: "₦25,000",
      status: "completed",
    },
    {
      id: 3,
      date: "2024-01-05",
      items: ["Wireless Earbuds"],
      total: "₦18,000",
      status: "pending",
    },
    {
      id: 4,
      date: "2023-12-20",
      items: ["Red Ankara Dress", "Gold Earrings"],
      total: "₦45,000",
      status: "completed",
    },
    {
      id: 5,
      date: "2023-12-05",
      items: ["Designer Handbag"],
      total: "₦65,000",
      status: "completed",
    },
  ]

  // AI Analysis Data
  const aiInsights = {
    customerType: customer.status === "vip" ? "High-Value Customer" : "Regular Customer",
    purchasePattern: "Fashion-focused buyer with preference for Ankara styles",
    nextPurchasePrediction: "Likely to purchase in next 2-3 weeks",
    recommendedProducts: ["Blue Ankara Dress (Size L)", "Leather Handbag (Black)", "Gold Accessories"],
    communicationPreference: "Prefers WhatsApp for quick responses",
    satisfactionLevel: "High - 4.8/5 based on conversation sentiment",
    riskLevel: customer.status === "inactive" ? "At Risk - No recent activity" : "Low Risk",
    lifetimeValue: "₦285,000",
    averageOrderValue: "₦40,600",
    orderFrequency: "Every 2-3 weeks",
    seasonalTrends: ["Peaks during holidays", "Prefers bright colors in summer", "Buys accessories in December"]
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "vip":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "active":
        return "bg-green-100 text-green-800 border-green-200"
      case "inactive":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getOrderStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="flex items-center justify-between px-4 py-3 max-w-md mx-auto">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back
          </Button>
          <Button size="sm" onClick={() => onEditCustomer(customer)}>
            <Edit className="w-4 h-4 mr-1" />
            Edit
          </Button>
        </div>
      </header>

      <main className="px-4 py-4 max-w-md mx-auto pb-20">
        <div className="space-y-4">

      {/* Customer Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <Avatar className="w-16 h-16">
              {customer.image ? (
                <AvatarImage src={customer.image} alt={customer.name} />
              ) : null}
              <AvatarFallback className="text-lg">
                {customer.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-xl font-semibold">{customer.name}</h1>
                <Badge className={`${getStatusColor(customer.status)}`}>{customer.status.toUpperCase()}</Badge>
              </div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>{customer.phone}</span>
                </div>
                {customer.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span>{customer.email}</span>
                  </div>
                )}
                {customer.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{customer.location}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Customer since {customer.joinDate}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary">{customer.totalSpent}</div>
              <div className="text-sm text-muted-foreground">Total Spent</div>
              <div className="text-sm text-muted-foreground">{customer.totalOrders} orders</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{customer.totalOrders}</div>
            <div className="text-xs text-muted-foreground">Total Orders</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{customer.totalSpent}</div>
            <div className="text-xs text-muted-foreground">Total Spent</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">4.8</div>
            <div className="text-xs text-muted-foreground">Avg Rating</div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="ai-insights">AI Insights</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Customer Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <label className="text-sm font-medium">Last Order</label>
                <p className="text-sm text-muted-foreground">{customer.lastOrder}</p>
              </div>
              {customer.notes && (
                <div>
                  <label className="text-sm font-medium">Notes</label>
                  <p className="text-sm text-muted-foreground">{customer.notes}</p>
                </div>
              )}
              <div>
                <label className="text-sm font-medium">Preferred Contact</label>
                <p className="text-sm text-muted-foreground">WhatsApp</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders" className="space-y-3">
          {customerOrders.map((order) => (
            <Card key={order.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">Order #{order.id}</span>
                      <Badge className={`text-xs ${getOrderStatusColor(order.status)}`}>{order.status}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{order.date}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{order.total}</div>
                  </div>
                </div>
                <div className="text-sm">
                  <span className="text-muted-foreground">Items: </span>
                  {order.items.join(", ")}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="ai-insights" className="space-y-4">
          {/* AI Analysis Overview */}
          <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Brain className="w-4 h-4 text-primary" />
                CHIDI AI Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-sm mb-2">Customer Type</h4>
                  <Badge className="bg-primary/10 text-primary border-primary/20">
                    {aiInsights.customerType}
                  </Badge>
                </div>
                <div>
                  <h4 className="font-medium text-sm mb-2">Risk Level</h4>
                  <Badge className={customer.status === "inactive" ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"}>
                    {aiInsights.riskLevel}
                  </Badge>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-sm mb-2">Purchase Pattern</h4>
                <p className="text-sm text-muted-foreground">{aiInsights.purchasePattern}</p>
              </div>
              
              <div>
                <h4 className="font-medium text-sm mb-2">Next Purchase Prediction</h4>
                <p className="text-sm text-muted-foreground">{aiInsights.nextPurchasePrediction}</p>
              </div>
            </CardContent>
          </Card>

          {/* Customer Behavior Analytics */}
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Financial Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Lifetime Value</span>
                  <span className="text-sm font-medium">{aiInsights.lifetimeValue}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Avg Order Value</span>
                  <span className="text-sm font-medium">{aiInsights.averageOrderValue}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Order Frequency</span>
                  <span className="text-sm font-medium">{aiInsights.orderFrequency}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  Satisfaction
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Satisfaction Score</span>
                  <span className="text-sm font-medium">{aiInsights.satisfactionLevel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Communication</span>
                  <span className="text-sm font-medium">{aiInsights.communicationPreference}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recommended Products */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <ShoppingBag className="w-4 h-4" />
                AI Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {aiInsights.recommendedProducts.map((product, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-muted rounded-lg">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-sm">{product}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Seasonal Trends */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Seasonal Patterns
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {aiInsights.seasonalTrends.map((trend, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-muted rounded-lg">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <span className="text-sm">{trend}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="messages" className="space-y-3">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="text-xs">
                    {customer.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm">"Do you have this in size M?"</p>
                  <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-xs text-primary-foreground">AI</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm">"Yes! We have size M in stock. Would you like to place an order?"</p>
                  <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
        </div>
      </main>
    </div>
  )
}
