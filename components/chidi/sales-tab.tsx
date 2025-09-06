"use client"

import { useState } from "react"
import { TrendingUp, Users, ShoppingBag, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { OrdersTab } from "./orders-tab"
import { CustomersTab } from "./customers-tab"
import { RevenueDashboardPage } from "./revenue-dashboard-page"

interface SalesTabProps {
  orders: any[]
  customers: any[]
  products: any[]
  onViewOrders: () => void
  onViewCustomers: () => void
  onViewRevenue: () => void
  onAddOrder: () => void
  onViewOrder: (order: any) => void
  onUpdateOrderStatus: (orderId: number, status: string) => void
  onAddCustomer: () => void
  onViewCustomer: (customer: any) => void
  onEditCustomer: (customer: any) => void
}

export function SalesTab({
  orders,
  customers,
  products,
  onViewOrders,
  onViewCustomers,
  onViewRevenue,
  onAddOrder,
  onViewOrder,
  onUpdateOrderStatus,
  onAddCustomer,
  onViewCustomer,
  onEditCustomer,
}: SalesTabProps) {
  const [activeSection, setActiveSection] = useState("overview")

  const totalRevenue = orders.reduce((sum, order) => sum + (Number(order.total) || 0), 0)
  const totalOrders = orders.length
  const totalCustomers = customers.length
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0

  const sections = [
    { id: "overview", label: "Orders", icon: TrendingUp },
    { id: "customers", label: "Customers", icon: Users },
    { id: "revenue", label: "Revenue", icon: DollarSign },
  ]

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-border bg-card">
        <div className="flex gap-1 bg-muted rounded-lg p-1">
          {sections.map((section) => {
            const Icon = section.icon
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                  activeSection === section.id
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="w-4 h-4" />
                {section.label}
              </button>
            )
          })}
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        {activeSection === "overview" && (
          <div className="p-4 space-y-4">

            {/* Orders Section */}
            <div className="space-y-4">
              <OrdersTab
                orders={orders}
                customers={customers}
                products={products}
                onAddOrder={onAddOrder}
                onViewOrder={onViewOrder}
                onUpdateOrderStatus={onUpdateOrderStatus}
                showStats={false}
              />
            </div>
          </div>
        )}

        {activeSection === "customers" && (
          <div className="p-4">
            <CustomersTab
              customers={customers}
              onAddCustomer={onAddCustomer}
              onViewCustomer={onViewCustomer}
              onEditCustomer={onEditCustomer}
            />
          </div>
        )}

        {activeSection === "revenue" && (
          <RevenueDashboardPage
            onBack={() => setActiveSection("overview")}
            orders={orders}
            customers={customers}
            products={products}
          />
        )}
      </div>
    </div>
  )
}
