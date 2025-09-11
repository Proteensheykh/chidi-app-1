"use client"

import { useState, useEffect } from "react"
import { Button, Avatar, AvatarFallback } from "@/features/shared/ui"
import { WifiOff, Bell } from "lucide-react"
// Import from feature folders
import { BottomNav } from "@/features/shared/layout"
import { HomeTab } from "@/features/home/components"
import { CatalogTab, AddProductPage, ProductDetailPage, QuickEditPage } from "@/features/catalogue/components"
import { ConversationsPage } from "@/features/chat/components"
import { NotificationsPage } from "@/features/notifications/components"
import { SettingsTab, BusinessHoursPage, TemplateResponsesPage, IntegrationSimulationPage, DataExportPage } from "@/features/settings/components"
import { Onboarding, ProfileEditPage } from "@/features/user/components"

// Feature flag system
import { useFeatureFlags } from "@/features/shared/hooks/use-feature-flags"

// Import types from feature modules
import { Notification } from "@/features/notifications/types"
import { useNotifications } from "@/features/notifications/hooks/useNotifications"
import { createNotification } from "@/features/notifications/services/notification-service"
import { Product, INITIAL_PRODUCTS } from "@/features/catalogue/types"
import { useProducts } from "@/features/catalogue/hooks/useProducts"
import { INITIAL_CONVERSATIONS } from "@/features/chat/types"

// TODO: These features are shelved for v2
// Import shelved features conditionally
import type { Customer as CustomerType, Order as OrderType } from "@/features/shared/types/shelved-types"

// Lazy load shelved feature components
// TODO: These features are shelved for v2
const SalesTab = ({ ...props }: any) => {
  const { isEnabled } = useFeatureFlags();
  if (!isEnabled('SALES')) return null;
  
  // We're using dynamic import with require to avoid bundling these components
  // when the feature flag is disabled
  try {
    const SalesTabComponent = require('@/features/sales/components').SalesTab;
    return <SalesTabComponent {...props} />;
  } catch (e) {
    return null;
  }
};

const RevenueDashboardPage = ({ ...props }: any) => {
  const { isEnabled } = useFeatureFlags();
  if (!isEnabled('SALES')) return null;
  
  try {
    const RevenueDashboardPageComponent = require('@/features/sales/components').RevenueDashboardPage;
    return <RevenueDashboardPageComponent {...props} />;
  } catch (e) {
    return null;
  }
};

const OrdersTab = ({ ...props }: any) => {
  const { isEnabled } = useFeatureFlags();
  if (!isEnabled('ORDERS')) return null;
  
  try {
    const OrdersTabComponent = require('@/features/orders/components').OrdersTab;
    return <OrdersTabComponent {...props} />;
  } catch (e) {
    return null;
  }
};

const OrderDetailPage = ({ ...props }: any) => {
  const { isEnabled } = useFeatureFlags();
  if (!isEnabled('ORDERS')) return null;
  
  try {
    const OrderDetailPageComponent = require('@/features/orders/components').OrderDetailPage;
    return <OrderDetailPageComponent {...props} />;
  } catch (e) {
    return null;
  }
};

const CreateOrderPage = ({ ...props }: any) => {
  const { isEnabled } = useFeatureFlags();
  if (!isEnabled('ORDERS')) return null;
  
  try {
    const CreateOrderPageComponent = require('@/features/orders/components').CreateOrderPage;
    return <CreateOrderPageComponent {...props} />;
  } catch (e) {
    return null;
  }
};

const CustomersTab = ({ ...props }: any) => {
  const { isEnabled } = useFeatureFlags();
  if (!isEnabled('CUSTOMERS')) return null;
  
  try {
    const CustomersTabComponent = require('@/features/customers/components').CustomersTab;
    return <CustomersTabComponent {...props} />;
  } catch (e) {
    return null;
  }
};

const AddCustomerPage = ({ ...props }: any) => {
  const { isEnabled } = useFeatureFlags();
  if (!isEnabled('CUSTOMERS')) return null;
  
  try {
    const AddCustomerPageComponent = require('@/features/customers/components').AddCustomerPage;
    return <AddCustomerPageComponent {...props} />;
  } catch (e) {
    return null;
  }
};

const CustomerDetailPage = ({ ...props }: any) => {
  const { isEnabled } = useFeatureFlags();
  if (!isEnabled('CUSTOMERS')) return null;
  
  try {
    const CustomerDetailPageComponent = require('@/features/customers/components/customer-detail-page').CustomerDetailPage;
    return <CustomerDetailPageComponent {...props} />;
  } catch (e) {
    return null;
  }
};




export default function ChidiApp() {
  // Use feature flags to conditionally load shelved features
  const { isEnabled } = useFeatureFlags();
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
  const [selectedCustomer, setSelectedCustomer] = useState<any | null>(null)
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null)
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
  
  // Initialize state for shelved features with empty defaults
  const [customers, setCustomers] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  
  // Initialize handler functions with empty defaults
  const addCustomer = (_newCustomer: any) => {};
  const updateCustomerOrderStats = (_customerId: any, _stats: any) => {};
  const createOrder = (_order: any) => {};
  const updateOrderStatus = (_orderId: any, _status: any) => {};

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
    
    // Reset shelved features to empty arrays
    setCustomers([])
    setOrders([])
  }

  const handleShowConversations = () => {
    setCurrentPage("conversations")
  }

  const handleShowAddProduct = () => {
    setCurrentPage("add-product")
  }

  const handleAddCustomer = (newCustomer: any) => {
    // This is a no-op when the CUSTOMERS feature is disabled
    if (isEnabled('CUSTOMERS')) {
      addCustomer(newCustomer);
    }
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
    // This is a no-op when the ORDERS feature is disabled
    if (isEnabled('ORDERS')) {
      // Ensure the status is compatible with the app's expected types
      const formattedOrder = {
        ...newOrder,
        status: newOrder.status as any
      }
      createOrder(formattedOrder);
    }
  }

  const handleUpdateOrderStatus = (orderId: number, status: string) => {
    // This is a no-op when the ORDERS feature is disabled
    if (isEnabled('ORDERS')) {
      // This will automatically create a notification when the feature is enabled
      updateOrderStatus(orderId, status as any);
    }
  }

  const handleBackToOrders = () => {
    setCurrentView("main")
    setSelectedOrder(null)
  }

  const handleShowCreateOrder = () => {
    setCurrentPage("create-order")
  }
  
  const handleViewOrder = (order: any) => {
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

  if (currentPage === "add-customer" && isEnabled('CUSTOMERS')) {
    return <AddCustomerPage onBack={handleBackToMain} onAddCustomer={addCustomer} />
  }

  if (currentPage === "create-order" && isEnabled('ORDERS')) {
    return (
      <CreateOrderPage
        onBack={handleBackToMain}
        onCreateOrder={createOrder}
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
        {/* TODO: Sales feature shelved for v2 */}
        {activeTab === "sales" && isEnabled('SALES') && (
          <>
            {currentView === "main" ? (
              <SalesTab
                orders={orders}
                customers={customers}
                products={products}
                onViewOrders={() => setCurrentView("orders")}
                onViewCustomers={() => setCurrentView("customers")}
                onViewRevenue={() => setCurrentView("revenue")}
                onAddOrder={handleShowCreateOrder}
                onViewOrder={handleViewOrder}
                onUpdateOrderStatus={updateOrderStatus}
                onAddCustomer={handleShowAddCustomer}
                onViewCustomer={handleViewCustomer}
                onEditCustomer={handleEditCustomer}
              />
            ) : currentView === "orders" ? (
              <OrdersTab
                orders={orders}
                customers={customers}
                products={products}
                onAddOrder={handleShowCreateOrder}
                onViewOrder={handleViewOrder}
                onUpdateOrderStatus={updateOrderStatus}
              />
            ) : currentView === "customers" ? (
              <CustomersTab
                customers={customers}
                onAddCustomer={handleShowAddCustomer}
                onViewCustomer={handleViewCustomer}
                onEditCustomer={handleEditCustomer}
              />
            ) : currentView === "revenue" ? (
              <RevenueDashboardPage
                orders={orders}
                customers={customers}
                products={products}
                onBack={() => setCurrentView("main")}
              />
            ) : currentView === "customer-detail" ? (
              <CustomerDetailPage
                customer={selectedCustomer}
                orders={orders.filter((order) => order.customerId === selectedCustomer?.id)}
                onBack={handleBackToCustomers}
                onCreateOrder={() => {
                  setCurrentView("main")
                  handleShowCreateOrder()
                }}
              />
            ) : currentView === "order-detail" ? (
              <OrderDetailPage
                order={selectedOrder}
                onBack={handleBackToOrders}
                onUpdateStatus={updateOrderStatus}
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
