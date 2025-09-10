"use client"

import { useState } from "react"
import { Button } from "@/features/shared/ui/button"
import { Input } from "@/features/shared/ui/input"
import { Card, CardContent } from "@/features/shared/ui/card"
import { Badge } from "@/features/shared/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/features/shared/ui/avatar"
import { Search, Plus, Filter, Phone, Mail, MapPin, ShoppingBag } from "lucide-react"

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
}

interface CustomersTabProps {
  customers: Customer[]
  onAddCustomer: () => void
  onViewCustomer: (customer: Customer) => void
  onEditCustomer: (customer: Customer) => void
}

export function CustomersTab({ customers, onAddCustomer, onViewCustomer, onEditCustomer }: CustomersTabProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterLastOrder, setFilterLastOrder] = useState("all")
  const [showFilters, setShowFilters] = useState(false)

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery) ||
      (customer.email && customer.email.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesStatusFilter = filterStatus === "all" || customer.status === filterStatus

    const matchesLastOrderFilter = (() => {
      if (filterLastOrder === "all") return true
      const lastOrderDate = new Date(customer.lastOrder)
      const now = new Date()
      const daysDiff = Math.floor((now.getTime() - lastOrderDate.getTime()) / (1000 * 60 * 60 * 24))
      
      switch (filterLastOrder) {
        case "recent": return daysDiff <= 7
        case "month": return daysDiff <= 30
        case "quarter": return daysDiff <= 90
        case "old": return daysDiff > 90
        default: return true
      }
    })()

    return matchesSearch && matchesStatusFilter && matchesLastOrderFilter
  })

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

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Customers</h2>
          <p className="text-sm text-muted-foreground">{customers.length} total customers</p>
          <p className="text-xs text-muted-foreground">✨ Synced from WhatsApp & Instagram</p>
        </div>
        <Button onClick={onAddCustomer} size="sm" variant="outline">
          <Plus className="w-4 h-4 mr-1" />
          Add Manually
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search customers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)}>
            <Filter className="w-4 h-4 mr-1" />
            Filter
          </Button>
          {filterStatus !== "all" && (
            <Badge variant="secondary" className="capitalize">
              {filterStatus}
            </Badge>
          )}
          {filterLastOrder !== "all" && (
            <Badge variant="secondary" className="capitalize">
              {filterLastOrder} orders
            </Badge>
          )}
        </div>

        {showFilters && (
          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium mb-2">Status</p>
              <div className="flex gap-2 flex-wrap">
                <Button
                  variant={filterStatus === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterStatus("all")}
                >
                  All
                </Button>
                <Button
                  variant={filterStatus === "active" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterStatus("active")}
                >
                  Active
                </Button>
                <Button
                  variant={filterStatus === "vip" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterStatus("vip")}
                >
                  VIP
                </Button>
                <Button
                  variant={filterStatus === "inactive" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterStatus("inactive")}
                >
                  Inactive
                </Button>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium mb-2">Last Order</p>
              <div className="flex gap-2 flex-wrap">
                <Button
                  variant={filterLastOrder === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterLastOrder("all")}
                >
                  All
                </Button>
                <Button
                  variant={filterLastOrder === "recent" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterLastOrder("recent")}
                >
                  Last 7 days
                </Button>
                <Button
                  variant={filterLastOrder === "month" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterLastOrder("month")}
                >
                  Last month
                </Button>
                <Button
                  variant={filterLastOrder === "quarter" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterLastOrder("quarter")}
                >
                  Last 3 months
                </Button>
                <Button
                  variant={filterLastOrder === "old" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterLastOrder("old")}
                >
                  Older
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Customer List */}
      <div className="space-y-3">
        {!customers || customers.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center">
              <p className="text-muted-foreground">No customers available</p>
              <Button onClick={onAddCustomer} className="mt-2" size="sm">
                Add Your First Customer
              </Button>
            </CardContent>
          </Card>
        ) : filteredCustomers.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center">
              <p className="text-muted-foreground">No customers found</p>
              <Button onClick={onAddCustomer} className="mt-2" size="sm">
                Add Your First Customer
              </Button>
            </CardContent>
          </Card>
        ) : (
          filteredCustomers.map((customer) => (
            <Card
              key={customer.id}
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onViewCustomer(customer)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <Avatar className="w-10 h-10">
                      {customer.image ? (
                        <AvatarImage src={customer.image} alt={customer.name} />
                      ) : null}
                      <AvatarFallback>
                        {customer.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium truncate">{customer.name}</h3>
                        {customer.status === "vip" && (
                          <Badge className={`text-xs ${getStatusColor(customer.status)}`}>
                            VIP
                          </Badge>
                        )}
                      </div>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          <span>{customer.phone}</span>
                        </div>
                        {customer.email && (
                          <div className="flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            <span className="truncate">{customer.email}</span>
                          </div>
                        )}
                        {customer.location && (
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            <span className="truncate">{customer.location}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-right text-sm">
                    <div className="font-medium">{customer.totalSpent}</div>
                    <div className="text-muted-foreground flex items-center gap-1">
                      <ShoppingBag className="w-3 h-3" />
                      {customer.totalOrders} orders
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">Last: {customer.lastOrder}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
