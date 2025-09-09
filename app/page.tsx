"use client"

import { useState, useEffect } from "react"
import { Button, Avatar, AvatarFallback } from "@/features/shared/ui"
import { Zap, WifiOff, Bell } from "lucide-react"
// Import from feature folders
import { BottomNav } from "@/features/shared/layout"
import { HomeTab } from "@/features/home/components"
import { CatalogTab, AddProductPage, ProductDetailPage, QuickEditPage } from "@/features/products/components"
import { SalesTab, RevenueDashboardPage } from "@/features/sales/components"
import { ConversationsPage } from "@/features/chat/components"
import { NotificationsPage } from "@/features/notifications/components"
import { OrdersTab, OrderDetailPage, CreateOrderPage } from "@/features/orders/components"
import { CustomersTab, AddCustomerPage, CustomerDetailPage } from "@/features/customers/components"
import { SettingsTab, BusinessHoursPage, TemplateResponsesPage, IntegrationSimulationPage, DataExportPage } from "@/features/settings/components"
import { Onboarding, ProfileEditPage } from "@/features/user/components"

const INITIAL_PRODUCTS = [
  {
    id: 1,
    name: "Blue Ankara Dress",
    stock: 2,
    price: "₦15,000",
    status: "low",
    category: "clothing",
    image: "/blue-ankara-dress.png",
  },
  {
    id: 2,
    name: "Casual Sneakers",
    stock: 15,
    price: "₦25,000",
    status: "good",
    category: "accessories",
    image: "/casual-sneakers.png",
  },
  {
    id: 3,
    name: "Leather Handbag",
    stock: 8,
    price: "₦35,000",
    status: "good",
    category: "accessories",
    image: "/leather-handbag.png",
  },
  {
    id: 4,
    name: "Wireless Earbuds",
    stock: 0,
    price: "₦18,000",
    status: "out",
    category: "electronics",
    image: "/wireless-earbuds.png",
  },
]

const INITIAL_CUSTOMERS = [
  {
    id: 1,
    name: "Jane Adebayo",
    phone: "+234 801 234 5678",
    email: "jane.adebayo@email.com",
    location: "Lagos, Nigeria",
    totalOrders: 12,
    totalSpent: "₦285,000",
    lastOrder: "2 days ago",
    status: "vip" as const,
    notes: "Prefers WhatsApp communication. Regular customer. Loves Ankara styles.",
    joinDate: "Oct 2023",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 2,
    name: "Mike Johnson",
    phone: "+234 802 345 6789",
    email: "mike.j@email.com",
    location: "Abuja, Nigeria",
    totalOrders: 7,
    totalSpent: "₦175,000",
    lastOrder: "1 week ago",
    status: "active" as const,
    notes: "Interested in sneakers and electronics. Corporate buyer.",
    joinDate: "Nov 2023",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 3,
    name: "Sarah Okafor",
    phone: "+234 803 456 7890",
    email: "sarah.okafor@email.com",
    location: "Port Harcourt, Nigeria",
    totalOrders: 4,
    totalSpent: "₦95,000",
    lastOrder: "3 days ago",
    status: "active" as const,
    notes: "Fashion enthusiast. Prefers Instagram communication.",
    joinDate: "Dec 2023",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 4,
    name: "David Emeka",
    phone: "+234 804 567 8901",
    email: "david.emeka@email.com",
    location: "Enugu, Nigeria",
    totalOrders: 15,
    totalSpent: "₦420,000",
    lastOrder: "3 months ago",
    status: "inactive" as const,
    notes: "High-value customer but hasn't ordered recently. Bulk buyer.",
    joinDate: "Aug 2023",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
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
    status: "active" as const,
    notes: "New customer. Interested in accessories.",
    joinDate: "Jan 2024",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
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
    notes: "Repeat customer. Prefers phone calls for orders.",
    joinDate: "Sep 2023",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
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

const INITIAL_ORDERS = [
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
    total: "₦52,000",
    status: "delivered" as const,
    paymentStatus: "paid" as const,
    orderDate: "2024-01-15",
    notes: "Customer requested express delivery",
  },
  {
    id: 2,
    orderNumber: "ORD-001235",
    customerId: 2,
    customerName: "Mike Johnson",
    customerPhone: "+234 802 345 6789",
    items: [{ productId: 2, productName: "Casual Sneakers", quantity: 1, price: "₦25,000" }],
    total: "₦27,000",
    status: "shipped" as const,
    paymentStatus: "paid" as const,
    orderDate: "2024-01-18",
    notes: "Delivery to office address",
  },
  {
    id: 3,
    orderNumber: "ORD-001236",
    customerId: 3,
    customerName: "Sarah Okafor",
    customerPhone: "+234 803 456 7890",
    items: [{ productId: 3, productName: "Leather Handbag", quantity: 1, price: "₦35,000" }],
    total: "₦37,000",
    status: "pending" as const,
    paymentStatus: "unpaid" as const,
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

const AI_CONVERSATIONS = [
  {
    id: "1",
    content: "Show me my sales analytics for this week",
    sender: "user" as const,
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    topic: "Sales Analytics"
  },
  {
    id: "2", 
    content: "Your sales are looking great this week! You've made ₦45,000 in revenue with 12 orders. The Blue Ankara Dress is your top performer with 5 sales. Would you like me to show you more detailed analytics?",
    sender: "chidi" as const,
    timestamp: new Date(Date.now() - 1000 * 60 * 29), // 29 minutes ago
    topic: "Sales Analytics"
  },
  {
    id: "3",
    content: "Which products are running low on stock?",
    sender: "user" as const,
    timestamp: new Date(Date.now() - 1000 * 60 * 25), // 25 minutes ago
    topic: "Inventory Management"
  },
  {
    id: "4",
    content: "I can see that your Casual Sneakers are running low with only 3 units left. The Leather Handbag also needs restocking with 2 units remaining. Would you like me to help you create a restock order?",
    sender: "chidi" as const,
    timestamp: new Date(Date.now() - 1000 * 60 * 24), // 24 minutes ago
    topic: "Inventory Management"
  },
  {
    id: "5",
    content: "Help me add a new product to my inventory",
    sender: "user" as const,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    topic: "Product Management"
  },
  {
    id: "6",
    content: "I'd be happy to help you add a new product! I can guide you through the process. What product would you like to add? Please provide the name, price, and any other details you have.",
    sender: "chidi" as const,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2 + 1000 * 60), // 2 hours ago + 1 minute
    topic: "Product Management"
  },
  {
    id: "7",
    content: "Show me recent customer messages",
    sender: "user" as const,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
    topic: "Customer Service"
  },
  {
    id: "8",
    content: "I found 3 new customer messages waiting for your response. Jane asked about the blue dress in size L, Mike inquired about your return policy, and Sarah wants to know about delivery to Port Harcourt. Would you like me to help you draft responses?",
    sender: "chidi" as const,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4 + 1000 * 60), // 4 hours ago + 1 minute
    topic: "Customer Service"
  },
  {
    id: "9",
    content: "What's my best selling product this month?",
    sender: "user" as const,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    topic: "Sales Performance"
  },
  {
    id: "10",
    content: "Your best selling product this month is the Blue Ankara Dress with 15 sales totaling ₦225,000 in revenue. It's been very popular with your customers! The Casual Sneakers are second with 12 sales.",
    sender: "chidi" as const,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 + 1000 * 60), // 1 day ago + 1 minute
    topic: "Sales Performance"
  },
  {
    id: 7,
    customer: "Unknown Customer",
    message: "Hello, I saw your products on Instagram. Are they original?",
    reply: "",
    timestamp: "3 hours ago",
    status: "new",
    customerInfo: {
      phone: "+234 808 901 2345",
      orders: 0,
      lastOrder: "Never",
      image: null
    }
  },
  {
    id: 8,
    customer: "David Emeka",
    message: "When will you restock the wireless earbuds?",
    reply: "We're expecting new stock next week. I'll notify you as soon as they arrive!",
    timestamp: "1 week ago",
    status: "replied",
    customerInfo: {
      phone: "+234 804 567 8901",
      orders: 15,
      lastOrder: "3 months ago",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    }
  },
]

export default function ChidiApp() {
  const [isOnboarded, setIsOnboarded] = useState(false)
  const [userProfile, setUserProfile] = useState({
    ownerName: "Chidi Okonkwo",
    email: "chidi@chidi-app.com",
    phone: "+234 901 234 5678",
    businessName: "CHIDI Fashion Store",
    businessType: "Fashion & Accessories",
    location: "Lagos, Nigeria",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  })
  const [activeTab, setActiveTab] = useState("home")
  const [products, setProducts] = useState(INITIAL_PRODUCTS)
  const [customers, setCustomers] = useState(INITIAL_CUSTOMERS)
  const [orders, setOrders] = useState(INITIAL_ORDERS)
  const [selectedCustomer, setSelectedCustomer] = useState(null)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [editingProduct, setEditingProduct] = useState(null)
  const [isOffline] = useState(false)
  const [currentView, setCurrentView] = useState("main")
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [notifications, setNotifications] = useState([])
  const [currentPage, setCurrentPage] = useState("main")

  useEffect(() => {
    const checkStockLevels = () => {
      products.forEach((product) => {
        const existingStockAlert = notifications.find((n) => n.type === "stock" && n.message.includes(product.name))

        if (product.stock === 0 && !existingStockAlert) {
          const newNotification = {
            id: `stock-${product.id}-${Date.now()}`,
            type: "stock" as const,
            title: "Out of Stock",
            message: `${product.name} is completely out of stock`,
            timestamp: "Just now",
            read: false,
            priority: "high" as const,
          }
          setNotifications((prev) => [newNotification, ...prev])
        } else if (product.stock <= 3 && product.stock > 0 && !existingStockAlert) {
          const newNotification = {
            id: `stock-${product.id}-${Date.now()}`,
            type: "stock" as const,
            title: "Low Stock Alert",
            message: `${product.name} is running low (${product.stock} units left)`,
            timestamp: "Just now",
            read: false,
            priority: "high" as const,
          }
          setNotifications((prev) => [newNotification, ...prev])
        }
      })
    }

    checkStockLevels()
  }, [products, notifications])

  const handleEditProduct = (product: any) => {
    setEditingProduct(product)
    setCurrentPage("quick-edit")
  }

  const handleAddProduct = (newProduct: any) => {
    setProducts((prev) => [...prev, newProduct])

    const newNotification = {
      id: Date.now().toString(),
      type: "activity" as const,
      title: "Product Added",
      message: `${newProduct.name} has been added to your inventory with ${newProduct.stock} units`,
      timestamp: "Just now",
      read: false,
      priority: "low" as const,
    }
    setNotifications((prev) => [newNotification, ...prev])
  }

  const handleUpdateProduct = (updatedProduct: any) => {
    setProducts((prev) => prev.map((product) => (product.id === updatedProduct.id ? updatedProduct : product)))

    const originalProduct = products.find((p) => p.id === updatedProduct.id)
    if (originalProduct && updatedProduct.stock > originalProduct.stock) {
      const newNotification = {
        id: Date.now().toString(),
        type: "activity" as const,
        title: "Product Restocked",
        message: `${updatedProduct.name} restocked from ${originalProduct.stock} to ${updatedProduct.stock} units`,
        timestamp: "Just now",
        read: false,
        priority: "medium" as const,
      }
      setNotifications((prev) => [newNotification, ...prev])
    }
  }

  const handleOnboardingComplete = (userData: any) => {
    setUserProfile(userData)
    setIsOnboarded(true)

    const welcomeNotification = {
      id: `welcome-${Date.now()}`,
      type: "system" as const,
      title: "Welcome to CHIDI!",
      message: `Hi ${userData.ownerName}! Your AI business assistant is ready to help you manage ${userData.businessName}.`,
      timestamp: "Just now",
      read: false,
      priority: "low" as const,
    }
    setNotifications((prev) => [welcomeNotification, ...prev])
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
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const handleMarkAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const handleDismissNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const handleUpdateProfile = (updatedProfile: any) => {
    setUserProfile(updatedProfile)

    const profileNotification = {
      id: `profile-${Date.now()}`,
      type: "system" as const,
      title: "Profile Updated",
      message: "Your profile information has been successfully updated",
      timestamp: "Just now",
      read: false,
      priority: "low" as const,
    }
    setNotifications((prev) => [profileNotification, ...prev])
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
    setProducts((prev) => prev.filter((product) => !productIds.includes(product.id)))

    const deleteNotification = {
      id: Date.now().toString(),
      type: "activity" as const,
      title: "Products Deleted",
      message: `${productIds.length} product${productIds.length > 1 ? "s" : ""} deleted from inventory`,
      timestamp: "Just now",
      read: false,
      priority: "medium" as const,
    }
    setNotifications((prev) => [deleteNotification, ...prev])
  }

  const handleSignOut = () => {
    setIsOnboarded(false)
    setUserProfile(null)
    setActiveTab("home")
    setNotifications([])
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
    setCustomers((prev) => [...prev, newCustomer])

    const newNotification = {
      id: Date.now().toString(),
      type: "activity" as const,
      title: "Customer Added",
      message: `${newCustomer.name} has been added to your customer list`,
      timestamp: "Just now",
      read: false,
      priority: "low" as const,
    }
    setNotifications((prev) => [newNotification, ...prev])
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
    setOrders((prev) => [...prev, newOrder])

    // Update product stock
    newOrder.items.forEach((item: any) => {
      setProducts((prev) =>
        prev.map((product) =>
          product.id === item.productId ? { ...product, stock: product.stock - item.quantity } : product,
        ),
      )
    })

    // Update customer stats
    setCustomers((prev) =>
      prev.map((customer) =>
        customer.id === newOrder.customerId
          ? {
              ...customer,
              totalOrders: customer.totalOrders + 1,
              totalSpent: `₦${
                Number.parseInt(customer.totalSpent.replace(/[₦,]/g, "")) +
                Number.parseInt(newOrder.total.replace(/[₦,]/g, ""))
              }`,
              lastOrder: "Just now",
            }
          : customer,
      ),
    )

    const newNotification = {
      id: Date.now().toString(),
      type: "sale" as const,
      title: "New Order Created",
      message: `Order #${newOrder.orderNumber} created for ${newOrder.customerName} - ${newOrder.total}`,
      timestamp: "Just now",
      read: false,
      priority: "medium" as const,
    }
    setNotifications((prev) => [newNotification, ...prev])
  }

  const handleViewOrder = (order: any) => {
    setSelectedOrder(order)
    setCurrentView("order-detail")
  }

  const handleUpdateOrderStatus = (orderId: number, status: string) => {
    setOrders((prev) => prev.map((order) => (order.id === orderId ? { ...order, status } : order)))

    const order = orders.find((o) => o.id === orderId)
    if (order) {
      const newNotification = {
        id: Date.now().toString(),
        type: "activity" as const,
        title: "Order Status Updated",
        message: `Order #${order.orderNumber} status changed to ${status}`,
        timestamp: "Just now",
        read: false,
        priority: "low" as const,
      }
      setNotifications((prev) => [newNotification, ...prev])
    }
  }

  const handleBackToOrders = () => {
    setCurrentView("main")
    setSelectedOrder(null)
  }

  const handleShowCreateOrder = () => {
    setCurrentPage("create-order")
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
    return <ConversationsPage onBack={handleBackToMain} conversations={AI_CONVERSATIONS} />
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
