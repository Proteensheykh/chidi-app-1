"use client"

import { useState, useEffect } from "react"
import { Button, Avatar, AvatarFallback } from "@/features/shared/ui"
import { WifiOff, Bell } from "lucide-react"
// Import from feature folders
import { BottomNav } from "@/features/shared/layout"
import { HomeTab } from "@/features/home/components"
import { CatalogTab, AddProductPage, ProductDetailPage, QuickEditPage } from "@/features/catalogue/components"
import { SalesTab, RevenueDashboardPage } from "@/features/sales/components"
import { ConversationsPage } from "@/features/chat/components"
import { NotificationsPage } from "@/features/notifications/components"
import { OrdersTab, OrderDetailPage, CreateOrderPage } from "@/features/orders/components"
import { CustomersTab, AddCustomerPage } from "@/features/customers/components"
import { CustomerDetailPage } from "@/features/customers/components/customer-detail-page"
import { SettingsTab, BusinessHoursPage, TemplateResponsesPage, IntegrationSimulationPage, DataExportPage } from "@/features/settings/components"
import { Onboarding, ProfileEditPage } from "@/features/user/components"

// Import types from feature modules
import { Notification } from "@/features/notifications/types";
import { useNotifications } from "@/features/notifications/hooks/useNotifications";
import { createNotification } from "@/features/notifications/services/notification-service";
import { Product, INITIAL_PRODUCTS } from "@/features/catalogue/types";
import { useProducts } from "@/features/catalogue/hooks/useProducts";
import { Customer, INITIAL_CUSTOMERS } from "@/features/customers/types";
import { useCustomers } from "@/features/customers/hooks/useCustomers";
import { Order, INITIAL_ORDERS } from "@/features/orders/types";
import { useOrders } from "@/features/orders/hooks/useOrders";
import { INITIAL_CONVERSATIONS } from "@/features/chat/types";




export default function ChidiApp() {
  const [isOnboarded, setIsOnboarded] = useState(false)
  const [userProfile, setUserProfile] = useState({
    ownerName: "Ade Olanrewaju",
    email: "ade@example.com",
    phone: "+234 801 234 5678",
    businessName: "Ade's Fashion",
    businessType: "Fashion Retail",
    location: "Lagos, Nigeria",
    image: "/placeholder-logo.png"
  })
  const [activeTab, setActiveTab] = useState("home")
  const [isOffline] = useState(false)
  const [currentView, setCurrentView] = useState("main")
  const [currentPage, setCurrentPage] = useState("main")
  
  // Selected items state
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  
  // Use the notification hook
  const { notifications, addNotification, markAsRead, markAllAsRead, dismissNotification } = useNotifications()
  
  // Use the product hook
  const { 
    products, 
    addProduct, 
    updateProduct, 
    deleteProducts, 
    setProducts 
  } = useProducts({ addNotification })
  
  // Use the customer hook
  const { 
    customers, 
    addCustomer,  
    updateCustomerOrderStats, 
    setCustomers 
  } = useCustomers({ addNotification })
  
  // Use the order hook
  // Convert order status to match the expected format for the hook
  const formattedInitialOrders = INITIAL_ORDERS.map(order => ({
    ...order,
    // Ensure the status is compatible with the app's expected types
    status: order.status as any
  }))

  const { 
    orders, 
    createOrder, 
    updateOrderStatus, 
    setOrders 
  } = useOrders({ 
    addNotification, 
    updateCustomerStats: updateCustomerOrderStats,
    products,
    updateProducts: setProducts,
    initialOrders: formattedInitialOrders as any
  })

  // Stock level checking is now handled by the useNotifications hook

  const handleEditProduct = (product: any) => {
    setEditingProduct(product)
    setCurrentPage("quick-edit")
  }

  const handleAddProduct = (newProduct: any) => {
    // Use the addProduct function from the product hook
    addProduct(newProduct)
  }

  const handleUpdateProduct = (updatedProduct: any) => {
    // Use the updateProduct function from the product hook
    updateProduct(updatedProduct)
  }

  const handleOnboardingComplete = (userData: any) => {
    setUserProfile(userData)
    setIsOnboarded(true)

    // Use createNotification from the service and addNotification from the hook
    const welcomeNotification = createNotification(
      "system",
      "Welcome to CHIDI!",
      `Hi ${userData.ownerName}! Your AI business assistant is ready to help you manage ${userData.businessName}.`,
      "low",
      `welcome-${Date.now()}`
    )
    addNotification(welcomeNotification)
  }

  const handleViewProduct = (product: any) => {
    setSelectedProduct(product)
    setCurrentView("product-detail")
  }

  const handleBackToProducts = () => {
    setCurrentView("main")
    setSelectedProduct(null)
  }

  const handleMarkNotificationAsRead = (id: string) => {
    // Using markAsRead from the hook
    markAsRead(id)
  }

  const handleMarkAllNotificationsAsRead = () => {
    // Using markAllAsRead from the hook
    markAllAsRead()
  }

  const handleDismissNotification = (id: string) => {
    // Using dismissNotification from the hook
    dismissNotification(id)
  }

  const handleUpdateProfile = (updatedProfile: any) => {
    setUserProfile(updatedProfile)

    // Use createNotification from the service and addNotification from the hook
    const profileNotification = createNotification(
      "system",
      "Profile Updated",
      "Your profile information has been successfully updated",
      "low",
      `profile-${Date.now()}`
    )
    addNotification(profileNotification)
  }

  const handleProfileClick = () => {
    setCurrentPage("profile-edit")
  }

  const handleNotificationClick = () => {
    setCurrentPage("notifications")
  }

  const handleBackToMain = () => {
    setCurrentPage("main")
  }

  // const handleDeleteProducts = (productIds: number[]) => {
  //   // Use the deleteProducts function from the product hook
  //   deleteProducts(productIds)
  // }

  const handleSignOut = () => {
    // Reset app state
    setIsOnboarded(false)
    setUserProfile({
      ownerName: "Ade Olanrewaju",
      email: "ade@example.com",
      phone: "+234 801 234 5678",
      businessName: "Ade's Fashion",
      businessType: "Fashion Retail",
      location: "Lagos, Nigeria",
      image: "/placeholder-logo.png"
    })
    setActiveTab("home")
    
    // Reset feature states using the setters from hooks with imported initial data
    // No need to reset notifications as it's handled by the hook internally
    setProducts(INITIAL_PRODUCTS)
    setCustomers(INITIAL_CUSTOMERS)
    
    // Convert order status to match the expected format
    const formattedOrders = INITIAL_ORDERS.map(order => ({
      ...order,
      // Ensure the status is compatible with the app's expected types
      status: order.status as any
    }))
    setOrders(formattedOrders)
  }

  const handleShowConversations = () => {
    setCurrentPage("conversations")
  }

  const handleShowAddProduct = () => {
    setCurrentPage("add-product")
  }

  const handleAddCustomer = (newCustomer: any) => {
    // Use the addCustomer function from the customer hook
    addCustomer(newCustomer)
  }

  const handleViewCustomer = (customer: any) => {
    setSelectedCustomer(customer)
    setCurrentView("customer-detail")
  }

  const handleEditCustomer = (customer: any) => {
    // For now, just navigate back - edit functionality can be added later
    setCurrentView("main")
  }

  const handleBackToCustomers = () => {
    setCurrentView("main")
    setSelectedCustomer(null)
  }

  const handleShowAddCustomer = () => {
    setCurrentPage("add-customer")
  }

  const handleCreateOrder = (newOrder: any) => {
    // Use the createOrder function from the order hook
    // Ensure the status is compatible with the app's expected types
    const formattedOrder = {
      ...newOrder,
      status: newOrder.status as any
    }
    createOrder(formattedOrder)
  }

  const handleUpdateOrderStatus = (orderId: number, status: string) => {
    // Use the updateOrderStatus function from the order hook
    // This will automatically create a notification
    updateOrderStatus(orderId, status as any)
  }

  const handleBackToOrders = () => {
    setCurrentView("main")
    setSelectedOrder(null)
  }

  const handleShowCreateOrder = () => {
    setCurrentPage("create-order")
  }
  
  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order)
    setCurrentView("order-detail")
  }

  const handleManageTemplates = () => {
    setCurrentPage("template-responses")
  }

  const handleManageBusinessHours = () => {
    setCurrentPage("business-hours")
  }

  const handleManageIntegrations = () => {
    setCurrentPage("integration-simulation")
  }

  const handleDataExport = () => {
    setCurrentPage("data-export")
  }

  const handleBulkExport = () => {
    const csvContent = products.map((p) => `${p.name},${p.price},${p.stock},${p.category}`).join("\n")
    const blob = new Blob([`Name,Price,Stock,Category\n${csvContent}`], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "products-export.csv"
    a.click()
    URL.revokeObjectURL(url)
  }

  if (!isOnboarded) {
    return <Onboarding onComplete={handleOnboardingComplete} />
  }

  if (currentPage === "notifications") {
    return (
      <NotificationsPage
        notifications={notifications}
        onBack={handleBackToMain}
        onMarkAsRead={handleMarkNotificationAsRead}
        onMarkAllAsRead={handleMarkAllNotificationsAsRead}
        onDismiss={handleDismissNotification}
      />
    )
  }

  if (currentPage === "profile-edit") {
    return <ProfileEditPage userProfile={userProfile} onBack={handleBackToMain} onUpdateProfile={handleUpdateProfile} />
  }

  if (currentPage === "add-product") {
    return <AddProductPage onBack={handleBackToMain} onAddProduct={handleAddProduct} />
  }

  if (currentPage === "conversations") {
    // Convert the imported conversations to match the component's expected format
    const formattedConversations = INITIAL_CONVERSATIONS.map(conv => ({
      id: conv.id,
      content: conv.content,
      sender: conv.sender === 'ai' ? 'chidi' : conv.sender, // Map 'ai' to 'chidi'
      timestamp: conv.timestamp instanceof Date ? conv.timestamp : new Date(conv.timestamp),
      topic: conv.topic
    }))
    return <ConversationsPage onBack={handleBackToMain} conversations={formattedConversations} />
  }

  if (currentPage === "quick-edit") {
    return <QuickEditPage onBack={handleBackToMain} product={editingProduct} onUpdateProduct={handleUpdateProduct} />
  }

  if (currentPage === "add-customer") {
    return <AddCustomerPage onBack={handleBackToMain} onAddCustomer={handleAddCustomer} />
  }

  if (currentPage === "create-order") {
    return (
      <CreateOrderPage
        onBack={handleBackToMain}
        onCreateOrder={handleCreateOrder}
        products={products}
        customers={customers}
      />
    )
  }

  if (currentPage === "template-responses") {
    return <TemplateResponsesPage onBack={handleBackToMain} />
  }

  if (currentPage === "business-hours") {
    return <BusinessHoursPage onBack={handleBackToMain} />
  }

  if (currentPage === "integration-simulation") {
    return <IntegrationSimulationPage onBack={handleBackToMain} />
  }

  if (currentPage === "data-export") {
    return <DataExportPage onBack={handleBackToMain} products={products} customers={customers} orders={orders} />
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="flex items-center justify-between px-4 py-3 max-w-md mx-auto">
          <Button variant="ghost" size="sm" onClick={handleShowConversations} className="h-8 w-8 p-0">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </Button>
          <h1 className="text-lg font-semibold">CHIDI</h1>
          <div className="flex items-center gap-2">
            {isOffline && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <WifiOff className="w-3 h-3" />
                <span>Offline</span>
              </div>
            )}
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 relative" onClick={handleNotificationClick}>
              <Bell className="w-4 h-4" />
              {notifications.filter((n) => !n.read).length > 0 && (
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
              )}
            </Button>
            <Avatar className="w-7 h-7 cursor-pointer" onClick={handleProfileClick}>
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

      <main className="px-4 py-4 max-w-md mx-auto pb-20">
        {activeTab === "home" && (
          <HomeTab products={products} onQuickEdit={handleEditProduct} onShowConversations={() => {}} onOpenChat={() => {}} />
        )}
        {activeTab === "catalog" && (
          <>
            {currentView === "main" ? (
              <CatalogTab
                products={products}
                onAddProduct={handleShowAddProduct}
                onEditProduct={handleEditProduct}
                onViewProduct={handleViewProduct}
                onBulkExport={handleBulkExport}
              />
            ) : currentView === "product-detail" ? (
              <ProductDetailPage
                product={selectedProduct}
                onBack={handleBackToProducts}
                onEditProduct={handleEditProduct}
              />
            ) : null}
          </>
        )}
        {activeTab === "sales" && (
          <>
            {currentView === "main" ? (
              <SalesTab
                orders={orders as any}
                customers={customers}
                products={products}
                onViewOrders={() => setCurrentView("orders")}
                onViewCustomers={() => setCurrentView("customers")}
                onViewRevenue={() => setCurrentView("revenue")}
                onAddOrder={handleShowCreateOrder}
                onViewOrder={handleViewOrder}
                onUpdateOrderStatus={handleUpdateOrderStatus}
                onAddCustomer={handleShowAddCustomer}
                onViewCustomer={handleViewCustomer}
                onEditCustomer={handleEditCustomer}
              />
            ) : currentView === "orders" ? (
              <OrdersTab
                orders={orders as any}
                customers={customers}
                products={products}
                onAddOrder={handleShowCreateOrder}
                onViewOrder={handleViewOrder}
                onUpdateOrderStatus={handleUpdateOrderStatus}
              />
            ) : currentView === "customers" ? (
              <CustomersTab
                customers={customers as any}
                onAddCustomer={handleShowAddCustomer}
                onViewCustomer={handleViewCustomer}
                onEditCustomer={handleEditCustomer}
              />
            ) : currentView === "revenue" ? (
              <RevenueDashboardPage
                orders={orders as any}
                customers={customers}
                products={products}
                onBack={() => setCurrentView("main")}
              />
            ) : currentView === "customer-detail" ? (
              <CustomerDetailPage
                customer={selectedCustomer as any}
                orders={orders.filter((order) => order.customerId === selectedCustomer?.id) as any}
                onBack={handleBackToCustomers}
                onCreateOrder={() => {
                  setCurrentView("main")
                  handleShowCreateOrder()
                }}
              />
            ) : currentView === "order-detail" ? (
              <OrderDetailPage
                order={selectedOrder as any}
                onBack={handleBackToOrders}
                onUpdateStatus={handleUpdateOrderStatus}
              />
            ) : null}
          </>
        )}
        {activeTab === "settings" && (
          <SettingsTab
            userProfile={userProfile}
            onEditProfile={handleProfileClick}
            onSignOut={handleSignOut}
            onManageTemplates={handleManageTemplates}
            onManageBusinessHours={handleManageBusinessHours}
            onManageIntegrations={handleManageIntegrations}
            onDataExport={handleDataExport}
          />
        )}
      </main>

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  )
}
