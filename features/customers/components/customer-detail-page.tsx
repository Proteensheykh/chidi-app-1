"use client"

import { Button } from "@/features/shared/ui/button"
import { Card, CardContent } from "@/features/shared/ui/card"
import { Badge } from "@/features/shared/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/features/shared/ui/avatar"
import { ArrowLeft, Edit, Phone, Mail, MapPin, ShoppingBag, Calendar, Clock, MessageSquare } from "lucide-react"

interface CustomerDetailPageProps {
  customer: any
  onBack: () => void
  onEdit: (customer: any) => void
}

export function CustomerDetailPage({ customer, onBack, onEdit }: CustomerDetailPageProps) {
  if (!customer) return null

  const getStatusColor = (status: string) => {
    switch (status) {
      case "vip":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "active":
        return "bg-green-100 text-green-800 border-green-200"
      case "inactive":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
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
          <h1 className="text-lg font-semibold">Customer Details</h1>
          <Button variant="ghost" size="sm" onClick={() => onEdit(customer)}>
            <Edit className="w-4 h-4" />
          </Button>
        </div>
      </header>

      <main className="px-4 py-4 max-w-md mx-auto pb-20">
        <div className="space-y-4">
          {/* Customer Profile */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16">
                  {customer.image ? (
                    <AvatarImage src={customer.image} alt={customer.name} />
                  ) : null}
                  <AvatarFallback className="text-lg">
                    {customer.name
                      ?.split(" ")
                      .map((n: string) => n[0])
                      .join("")
                      .toUpperCase() || "C"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">{customer.name}</h2>
                    <Badge className={`${getStatusColor(customer.status)} capitalize`}>{customer.status}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Customer since {customer.joinDate}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardContent className="p-4 space-y-3">
              <h3 className="font-medium">Contact Information</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span>{customer.phone || "No phone number"}</span>
                </div>
                {customer.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span>{customer.email}</span>
                  </div>
                )}
                {customer.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span>{customer.location}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Purchase History */}
          <Card>
            <CardContent className="p-4 space-y-3">
              <h3 className="font-medium">Purchase History</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <ShoppingBag className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">Total Orders</span>
                  </div>
                  <p className="text-lg font-semibold">{customer.totalOrders}</p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">Last Order</span>
                  </div>
                  <p className="text-sm">{customer.lastOrder}</p>
                </div>
                <div className="p-3 bg-muted rounded-lg col-span-2">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">Total Spent</span>
                  </div>
                  <p className="text-lg font-semibold">{customer.totalSpent}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notes */}
          {customer.notes && (
            <Card>
              <CardContent className="p-4 space-y-3">
                <h3 className="font-medium">Notes</h3>
                <p className="text-sm">{customer.notes}</p>
              </CardContent>
            </Card>
          )}

          {/* Actions */}
          <div className="flex gap-2">
            <Button className="flex-1">
              <MessageSquare className="w-4 h-4 mr-1" />
              Message
            </Button>
            <Button variant="outline" className="flex-1">
              <ShoppingBag className="w-4 h-4 mr-1" />
              New Order
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
