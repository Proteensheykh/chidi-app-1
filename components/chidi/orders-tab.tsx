"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Plus, Filter, Calendar, DollarSign, Package, TrendingUp, Clock } from "lucide-react"

interface Order {
  id: number
  orderNumber: string
  customerId: number
  customerName: string
  customerPhone: string
  items: Array<{
    productId: number
    productName: string
    quantity: number
    price: string
  }>
  total: string
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled"
  paymentStatus: "unpaid" | "paid" | "refunded"
  orderDate: string
  deliveryDate?: string
  notes?: string
}

interface OrdersTabProps {
  orders: Order[]
  customers: any[]
  products: any[]
  onAddOrder: () => void
  onViewOrder: (order: Order) => void
  onUpdateOrderStatus: (orderId: number, status: string) => void
  showStats?: boolean
}

export function OrdersTab({
  orders,
  customers,
  products,
  onAddOrder,
  onViewOrder,
  onUpdateOrderStatus,
  showStats = true,
}: OrdersTabProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [showFilters, setShowFilters] = useState(false)

  const safeOrders = orders || []

  const filteredOrders = safeOrders.filter((order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerPhone.includes(searchQuery)

    const matchesFilter = filterStatus === "all" || order.status === filterStatus

    return matchesSearch && matchesFilter
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "confirmed":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "shipped":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "delivered":
        return "bg-green-100 text-green-800 border-green-200"
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800"
      case "unpaid":
        return "bg-red-100 text-red-800"
      case "refunded":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getCustomerData = (customerId: number) => {
    if (!customers || !Array.isArray(customers)) return null
    return customers.find((c) => c.id === customerId) || null
  }

  const getProductData = (productId: number) => {
    if (!products || !Array.isArray(products)) return null
    return products.find((p) => p.id === productId) || null
  }

  const totalRevenue = safeOrders
    .filter((order) => order.paymentStatus === "paid")
    .reduce((sum, order) => sum + Number.parseInt(order.total.replace(/[₦,]/g, "")), 0)

  const pendingOrders = safeOrders.filter((order) => order.status === "pending").length
  const completedOrders = safeOrders.filter((order) => order.status === "delivered").length
  const avgOrderValue = safeOrders.length > 0 ? totalRevenue / safeOrders.length : 0
  const bestSellingProduct = getBestSellingProduct()
  const largestOrder = getLargestOrder()

  function getBestSellingProduct() {
    if (!safeOrders || safeOrders.length === 0) {
      return { name: "N/A", count: 0 }
    }
    const productCounts: { [key: string]: { name: string; count: number } } = {}
    safeOrders.forEach(order => {
      if (order.items && Array.isArray(order.items)) {
        order.items.forEach((item: any) => {
          if (productCounts[item.productId]) {
            productCounts[item.productId].count += item.quantity
          } else {
            productCounts[item.productId] = { name: item.productName, count: item.quantity }
          }
        })
      }
    })
    return Object.values(productCounts).reduce((best, current) => 
      current.count > best.count ? current : best, { name: "N/A", count: 0 }
    )
  }

  function getLargestOrder() {
    if (!safeOrders || safeOrders.length === 0) {
      return { total: "₦0", orderNumber: "N/A" }
    }
    return safeOrders.reduce((largest, current) => {
      const currentTotal = Number.parseInt(current.total.replace(/[₦,]/g, ""))
      const largestTotal = Number.parseInt(largest.total.replace(/[₦,]/g, ""))
      return currentTotal > largestTotal ? current : largest
    }, safeOrders[0])
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      {showStats && (
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Orders</h2>
            <p className="text-sm text-muted-foreground">{safeOrders.length} total orders</p>
          </div>
        </div>
      )}

      {showStats && (
        <>
          {/* Order Status Overview */}
          <div className="grid grid-cols-2 gap-3">
            <Card>
              <CardContent className="p-3 text-center">
                <div className="flex items-center justify-center mb-1">
                  <Package className="w-4 h-4 text-blue-600" />
                </div>
                <div className="text-lg font-bold text-blue-600">{completedOrders}</div>
                <div className="text-xs text-muted-foreground">Completed</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-3 text-center">
                <div className="flex items-center justify-center mb-1">
                  <Calendar className="w-4 h-4 text-orange-600" />
                </div>
                <div className="text-lg font-bold text-orange-600">{pendingOrders}</div>
                <div className="text-xs text-muted-foreground">Pending</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-3 text-center">
                <div className="flex items-center justify-center mb-1">
                  <TrendingUp className="w-4 h-4 text-purple-600" />
                </div>
                <div className="text-lg font-bold text-purple-600">{safeOrders.filter(o => o.status === 'shipped').length}</div>
                <div className="text-xs text-muted-foreground">Shipped</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-3 text-center">
                <div className="flex items-center justify-center mb-1">
                  <Clock className="w-4 h-4 text-yellow-600" />
                </div>
                <div className="text-lg font-bold text-yellow-600">{safeOrders.filter(o => o.status === 'confirmed').length}</div>
                <div className="text-xs text-muted-foreground">Confirmed</div>
              </CardContent>
            </Card>
          </div>

          {/* Order Performance Insights */}
          <div className="grid grid-cols-2 gap-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Best Selling Item</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold">{bestSellingProduct.name}</div>
                <div className="text-xs text-muted-foreground">{bestSellingProduct.count} units sold</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Largest Order</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold">#{largestOrder.orderNumber}</div>
                <div className="text-xs text-muted-foreground">{largestOrder.total}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold">{safeOrders.length > 0 ? Math.round((completedOrders / safeOrders.length) * 100) : 0}%</div>
                <div className="text-xs text-muted-foreground">{completedOrders} of {safeOrders.length} orders</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Avg Items per Order</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold">
                  {safeOrders.length > 0 ? Math.round(safeOrders.reduce((sum, order) => sum + order.items.length, 0) / safeOrders.length) : 0}
                </div>
                <div className="text-xs text-muted-foreground">items per order</div>
              </CardContent>
            </Card>
          </div>

          {/* Order Processing Insights */}
          <div className="grid grid-cols-2 gap-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Avg Processing Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold">2.3 days</div>
                <div className="text-xs text-muted-foreground">order to delivery</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Payment Success Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold">94%</div>
                <div className="text-xs text-muted-foreground">successful payments</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Return Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold">3.2%</div>
                <div className="text-xs text-muted-foreground">orders returned</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Customer Satisfaction</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold">4.7/5</div>
                <div className="text-xs text-muted-foreground">average rating</div>
              </CardContent>
            </Card>
          </div>
        </>
      )}

      {/* Search and Filter */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search orders..."
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
        </div>

        {showFilters && (
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={filterStatus === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterStatus("all")}
            >
              All
            </Button>
            <Button
              variant={filterStatus === "pending" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterStatus("pending")}
            >
              Pending
            </Button>
            <Button
              variant={filterStatus === "confirmed" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterStatus("confirmed")}
            >
              Confirmed
            </Button>
            <Button
              variant={filterStatus === "shipped" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterStatus("shipped")}
            >
              Shipped
            </Button>
            <Button
              variant={filterStatus === "delivered" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterStatus("delivered")}
            >
              Delivered
            </Button>
          </div>
        )}
      </div>

      {/* Orders List */}
      <div className="space-y-3">
        {!safeOrders || safeOrders.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center">
              <p className="text-muted-foreground">No orders available</p>
            </CardContent>
          </Card>
        ) : filteredOrders.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center">
              <p className="text-muted-foreground">No orders found</p>
            </CardContent>
          </Card>
        ) : (
          filteredOrders.map((order) => {
            const customerData = getCustomerData(order.customerId)
            return (
              <Card
                key={order.id}
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => onViewOrder(order)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-3 flex-1">
                      <Avatar className="w-10 h-10">
                        {customerData?.image ? (
                          <AvatarImage src={customerData.image} alt={order.customerName} />
                        ) : null}
                        <AvatarFallback>
                          {order.customerName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium">#{order.orderNumber}</h3>
                          <Badge className={`text-xs ${getStatusColor(order.status)}`}>
                            {order.status.toUpperCase()}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">{order.customerName}</p>
                        <p className="text-xs text-muted-foreground">
                          {order.items.length} item{order.items.length > 1 ? "s" : ""} • {order.orderDate}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-lg">{order.total}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex -space-x-2">
                      {order.items.slice(0, 3).map((item, index) => {
                        const productData = getProductData(item.productId)
                        return (
                          <Avatar key={index} className="w-6 h-6 border-2 border-white">
                            {productData?.image ? (
                              <AvatarImage src={productData.image} alt={item.productName} />
                            ) : null}
                            <AvatarFallback className="text-xs">
                              {item.productName.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                        )
                      })}
                      {order.items.length > 3 && (
                        <div className="w-6 h-6 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center">
                          <span className="text-xs text-gray-600">+{order.items.length - 3}</span>
                        </div>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {order.items.map((item) => `${item.productName} (${item.quantity})`).join(", ")}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })
        )}
      </div>
    </div>
  )
}
