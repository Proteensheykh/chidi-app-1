"use client"

import { useState, useEffect } from "react"
import { Button, Avatar, AvatarFallback } from "@/features/shared/ui"
import { Zap, WifiOff, Bell } from "lucide-react"
// Import from feature folders
import { BottomNav } from "@/features/shared/layout"
import { HomeTab } from "@/features/home/components"
import { CatalogTab, AddProductPage, ProductDetailPage, QuickEditPage } from "@/features/catalogue/components"
import { SalesTab, RevenueDashboardPage } from "@/features/sales/components"
import { ConversationsPage } from "@/features/chat/components"
import { NotificationsPage } from "@/features/notifications/components"
import { OrdersTab, OrderDetailPage, CreateOrderPage } from "@/features/orders/components"
import { CustomersTab, AddCustomerPage, CustomerDetailPage } from "@/features/customers/components"
import { SettingsTab, BusinessHoursPage, TemplateResponsesPage, IntegrationSimulationPage, DataExportPage } from "@/features/settings/components"
import { Onboarding, ProfileEditPage } from "@/features/user/components"

// Import types from feature modules
import { Notification } from "@/features/notifications/types";
import { useNotifications } from "@/features/notifications/hooks/useNotifications";
import { createNotification } from "@/features/notifications/services/notification-service";
import { Product } from "@/features/catalogue/types";
import { useProducts } from "@/features/catalogue/hooks/useProducts";
import { Customer } from "@/features/customers/types";
import { useCustomers } from "@/features/customers/hooks/useCustomers";
import { Order, OrderStatus } from "@/features/orders/types";
import { useOrders } from "@/features/orders/hooks/useOrders";
import { AIConversation, INITIAL_CONVERSATIONS } from "@/features/chat/types";

const INITIAL_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Blue Ankara Dress",
    stock: 2,
    price: "₦15,000",
    status: "low" as const,
    category: "clothing",
    image: "/blue-ankara-dress.png",
  },
  {
    id: 2,
    name: "Casual Sneakers",
    stock: 5,
    price: "₦25,000",
    status: "in-stock" as const,
    category: "footwear",
    image: "/casual-sneakers.png",
  },
  {
    id: 3,
    name: "Leather Handbag",
    stock: 3,
    price: "₦35,000",
    status: "in-stock" as const,
    category: "accessories",
    image: "/leather-handbag.png",
  },
  {
    id: 4,
    name: "Wireless Earbuds",
    stock: 0,
    price: "₦18,000",
    status: "out-of-stock" as const,
    category: "electronics",
    image: "/wireless-earbuds.jpg",
  },
  {
    id: 5,
    name: "Wristwatch",
    stock: 1,
    price: "₦22,000",
    status: "low-stock" as const,
    category: "accessories",
    image: "/wristwatch.jpg",
  },
]

const INITIAL_CUSTOMERS: Customer[] = [
  {
    id: 1,
    name: "Jane Adebayo",
    phone: "+234 801 234 5678",
    email: "jane.adebayo@email.com",
    location: "Lagos, Nigeria",
    totalOrders: 5,
    totalSpent: "₦150,000",
    status: "vip" as const,
    notes: "Regular customer, prefers evening deliveries",
    lastOrder: "3 days ago",
    joinDate: "Oct 2023",
    image: "/customers/jane.jpg",
  },
  {
    id: 2,
    name: "Oluwaseun Olatunji",
    phone: "+234 802 345 6789",
    email: "seun.ola@email.com",
    location: "Abuja, Nigeria",
    totalOrders: 3,
    totalSpent: "₦75,000",
    status: "active" as const,
    notes: "New customer, referred by Jane",
    lastOrder: "1 week ago",
    joinDate: "Nov 2023",
    image: "/customers/seun.jpg",
  },
  {
    id: 3,
    name: "Chioma Eze",
    phone: "+234 803 456 7890",
    email: "chioma.eze@email.com",
    location: "Port Harcourt, Nigeria",
    totalOrders: 8,
    totalSpent: "₦230,000",
    status: "vip" as const,
    notes: "Wholesale buyer, always pays on time",
    lastOrder: "3 days ago",
    joinDate: "Dec 2023",
    image: "/customers/chioma.jpg",
  },
  {
    id: 4,
    name: "Emeka Okafor",
    phone: "+234 804 567 8901",
    email: "emeka.o@email.com",
    location: "Enugu, Nigeria",
    totalOrders: 1,
    totalSpent: "₦15,000",
    status: "active" as const,
    notes: "First purchase on January 15",
    lastOrder: "3 months ago",
    joinDate: "Aug 2023",
    image: null,
  },
  {
    id: 5,
    name: "Blessing Okoro",
    phone: "+234 805 678 9012",
    email: "blessing.okoro@email.com",
    location: "Kano, Nigeria",
    totalOrders: 3,
    totalSpent: "₦65,000",
    lastOrder: "5 days ago",
    status: "inactive" as const,
    notes: "Inquired about products but hasn't purchased yet",
    joinDate: "Jan 2024",
    image: null,
  },
  {
    id: 6,
    name: "Chidi Okonkwo",
    phone: "+234 806 789 0123",
    location: "Owerri, Nigeria",
    totalOrders: 8,
    totalSpent: "₦190,000",
    lastOrder: "1 week ago",
    status: "active" as const,
    notes: "Prefers sneakers and casual wear",
    joinDate: "Sep 2023",
    image: "/customers/chidi.jpg",
  },
  {
    id: 7,
    name: "Fatima Aliyu",
    phone: "+234 807 890 1234",
    email: "fatima.aliyu@email.com",
    location: "Kaduna, Nigeria",
    totalOrders: 6,
    totalSpent: "₦145,000",
    lastOrder: "4 days ago",
    status: "active" as const,
    notes: "Fashion blogger. Often orders for content creation.",
    joinDate: "Nov 2023",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 8,
    name: "Tunde Adeyemi",
    phone: "+234 808 901 2345",
    location: "Ibadan, Nigeria",
    totalOrders: 2,
    totalSpent: "₦45,000",
    lastOrder: "2 months ago",
    status: "inactive" as const,
    notes: "Occasional buyer. Price-sensitive customer.",
    joinDate: "Dec 2023",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
  },
]

const INITIAL_ORDERS: Order[] = [
  {
    id: 1,
    orderNumber: "ORD-001234",
    customerId: 1,
    customerName: "Jane Adebayo",
    customerPhone: "+234 801 234 5678",
    items: [
      { productId: 1, productName: "Blue Ankara Dress", quantity: 1, price: "₦15,000" },
      { productId: 3, productName: "Leather Handbag", quantity: 1, price: "₦35,000" },
    ],
    total: "₦50,000",
    status: "delivered" as const,
    paymentStatus: "paid" as const,
    orderDate: "2023-12-15",
    notes: "Gift wrapped",
  },
  {
    id: 2,
    orderNumber: "ORD-001235",
    customerId: 3,
    customerName: "Chioma Eze",
    customerPhone: "+234 803 456 7890",
    items: [
      { productId: 2, productName: "Casual Sneakers", quantity: 3, price: "₦25,000" },
      { productId: 5, productName: "Wristwatch", quantity: 2, price: "₦22,000" },
    ],
    total: "₦119,000",
    status: "shipped" as const,
    paymentStatus: "paid" as const,
    orderDate: "2024-01-05",
    notes: "Express shipping requested",
  },
  {
    id: 3,
    orderNumber: "ORD-001236",
    customerId: 2,
    customerName: "Oluwaseun Olatunji",
    customerPhone: "+234 802 345 6789",
    items: [{ productId: 1, productName: "Blue Ankara Dress", quantity: 1, price: "₦15,000" }],
    total: "₦15,000",
    status: "pending" as const,
    paymentStatus: "pending" as const,
    orderDate: "2024-01-20",
    notes: "Waiting for payment confirmation",
  },
  {
    id: 4,
    orderNumber: "ORD-001237",
    customerId: 1,
    customerName: "Jane Adebayo",
    customerPhone: "+234 801 234 5678",
    items: [
      { productId: 2, productName: "Casual Sneakers", quantity: 2, price: "₦25,000" },
      { productId: 4, productName: "Wireless Earbuds", quantity: 1, price: "₦18,000" },
    ],
    total: "₦70,000",
    status: "delivered" as const,
    paymentStatus: "paid" as const,
    orderDate: "2024-01-10",
    notes: "Bulk order for family",
  },
  {
    id: 5,
    orderNumber: "ORD-001238",
    customerId: 5,
    customerName: "Blessing Okoro",
    customerPhone: "+234 805 678 9012",
    items: [{ productId: 3, productName: "Leather Handbag", quantity: 1, price: "₦35,000" }],
    total: "₦37,000",
    status: "confirmed" as const,
    paymentStatus: "paid" as const,
    orderDate: "2024-01-19",
    notes: "First-time customer",
  },
  {
    id: 6,
    orderNumber: "ORD-001239",
    customerId: 6,
    customerName: "Chidi Okonkwo",
    customerPhone: "+234 806 789 0123",
    items: [
      { productId: 1, productName: "Blue Ankara Dress", quantity: 1, price: "₦15,000" },
      { productId: 2, productName: "Casual Sneakers", quantity: 1, price: "₦25,000" },
    ],
    total: "₦42,000",
    status: "shipped" as const,
    paymentStatus: "paid" as const,
    orderDate: "2024-01-17",
    notes: "Gift for wife",
  },
  {
    id: 7,
    orderNumber: "ORD-001240",
    customerId: 7,
    customerName: "Fatima Aliyu",
    customerPhone: "+234 807 890 1234",
    items: [{ productId: 1, productName: "Blue Ankara Dress", quantity: 2, price: "₦15,000" }],
    total: "₦32,000",
    status: "delivered" as const,
    paymentStatus: "paid" as const,
    orderDate: "2024-01-12",
    notes: "For fashion blog content",
  },
  {
    id: 8,
    orderNumber: "ORD-001241",
    customerId: 4,
    customerName: "David Emeka",
    customerPhone: "+234 804 567 8901",
    items: [
      { productId: 2, productName: "Casual Sneakers", quantity: 3, price: "₦25,000" },
      { productId: 4, productName: "Wireless Earbuds", quantity: 2, price: "₦18,000" },
    ],
    total: "₦113,000",
    status: "cancelled" as const,
    paymentStatus: "refunded" as const,
    orderDate: "2024-01-08",
    notes: "Customer requested cancellation",
  },
  {
    id: 9,
    orderNumber: "ORD-001242",
    customerId: 2,
    customerName: "Mike Johnson",
    customerPhone: "+234 802 345 6789",
    items: [{ productId: 4, productName: "Wireless Earbuds", quantity: 1, price: "₦18,000" }],
    total: "₦20,000",
    status: "processing" as const,
    paymentStatus: "paid" as const,
    orderDate: "2024-01-21",
    notes: "Rush order for business meeting",
  },
  {
    id: 10,
    orderNumber: "ORD-001243",
    customerId: 3,
    customerName: "Sarah Okafor",
    customerPhone: "+234 803 456 7890",
    items: [
      { productId: 1, productName: "Blue Ankara Dress", quantity: 1, price: "₦15,000" },
      { productId: 3, productName: "Leather Handbag", quantity: 1, price: "₦35,000" },
    ],
    total: "₦52,000",
    status: "confirmed" as const,
    paymentStatus: "paid" as const,
    orderDate: "2024-01-16",
    notes: "Special occasion outfit",
  },
]

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
    updateCustomer, 
    updateCustomerStatus, 
    updateCustomerOrderStats, 
    setCustomers 
  } = useCustomers({ addNotification })
  
  // Use the order hook
  const { 
    orders, 
    createOrder, 
    updateOrderStatus, 
    updatePaymentStatus, 
    setOrders 
  } = useOrders({ 
    addNotification, 
    updateCustomerStats: updateCustomerOrderStats,
    products,
    updateProducts: setProducts
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

  const handleDeleteProducts = (productIds: number[]) => {
    // Use the deleteProducts function from the product hook
    deleteProducts(productIds)
  }

  const handleSignOut = () => {
    // Reset app state
    setIsOnboarded(false)
    setUserProfile({} as any) // Using type assertion to avoid TypeScript error
    setActiveTab("home")
    setCurrentView("main")
    setCurrentPage("main")
    
    // Reset selected items
    setSelectedCustomer(null)
    setSelectedOrder(null)
    setSelectedProduct(null)
    setEditingProduct(null)
    
    // Reset feature states using the setters from hooks
    // No need to reset notifications as it's handled by the hook internally
    setProducts(INITIAL_PRODUCTS)
    setCustomers(INITIAL_CUSTOMERS)
    setOrders(INITIAL_ORDERS)
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
    // This will automatically update customer stats and product stock
    createOrder(newOrder)
  }

  const handleUpdateOrderStatus = (orderId: number, status: string) => {
    // Use the updateOrderStatus function from the order hook
    // This will automatically create a notification
    updateOrderStatus(orderId, status as OrderStatus)
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
    return <ConversationsPage onBack={handleBackToMain} conversations={INITIAL_CONVERSATIONS} />
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
                orders={orders}
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
                orders={orders}
                customers={customers}
                products={products}
                onAddOrder={handleShowCreateOrder}
                onViewOrder={handleViewOrder}
                onUpdateOrderStatus={handleUpdateOrderStatus}
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
