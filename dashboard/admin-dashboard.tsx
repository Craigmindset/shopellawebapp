"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import {
  LayoutDashboard,
  Users,
  ShoppingBag,
  Store,
  BarChart3,
  Settings,
  Shield,
  Bell,
  Search,
  Download,
  TrendingUp,
  Eye,
  DollarSign,
  Package,
  ArrowLeft,
  LogOut,
  Menu,
  X,
  Moon,
  Sun,
  Megaphone,
  CreditCard,
  Wallet,
  Receipt,
  PieChart,
  Send,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Role-based access control
type UserRole = "super-admin" | "mid-admin" | "manager"

interface AdminUser {
  id: string
  name: string
  email: string
  role: UserRole
  avatar: string
}

// Mock admin user - in real app, this would come from auth context
const currentUser: AdminUser = {
  id: "1",
  name: "John Admin",
  email: "john@shopella.com",
  role: "super-admin", // Change this to test different roles
  avatar: "JA",
}

// Role permissions
const rolePermissions = {
  "super-admin": {
    canViewAnalytics: true,
    canManageUsers: true,
    canManageStores: true,
    canManageOrders: true,
    canViewReports: true,
    canManageSettings: true,
    canManageRoles: true,
    canBroadcast: true,
    canManageFinances: true,
  },
  "mid-admin": {
    canViewAnalytics: true,
    canManageUsers: true,
    canManageStores: true,
    canManageOrders: true,
    canViewReports: true,
    canManageSettings: false,
    canManageRoles: false,
    canBroadcast: true,
    canManageFinances: false,
  },
  manager: {
    canViewAnalytics: true,
    canManageUsers: false,
    canManageStores: false,
    canManageOrders: true,
    canViewReports: true,
    canManageSettings: false,
    canManageRoles: false,
    canBroadcast: false,
    canManageFinances: false,
  },
}

const sidebarItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    requiredPermission: null,
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: BarChart3,
    requiredPermission: "canViewAnalytics",
  },
  {
    id: "users",
    label: "User Management",
    icon: Users,
    requiredPermission: "canManageUsers",
  },
  {
    id: "stores",
    label: "Store Management",
    icon: Store,
    requiredPermission: "canManageStores",
  },
  {
    id: "orders",
    label: "Order Management",
    icon: ShoppingBag,
    requiredPermission: "canManageOrders",
  },
  {
    id: "finances",
    label: "Financial Management",
    icon: Wallet,
    requiredPermission: "canManageFinances",
  },
  {
    id: "broadcast",
    label: "Broadcast",
    icon: Megaphone,
    requiredPermission: "canBroadcast",
  },
  {
    id: "reports",
    label: "Reports",
    icon: Download,
    requiredPermission: "canViewReports",
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    requiredPermission: "canManageSettings",
  },
]

// Analytics data
const analyticsData = {
  totalUsers: 12547,
  totalOrders: 8934,
  totalRevenue: 2456789,
  totalStores: 1234,
  userGrowth: 12.5,
  orderGrowth: 8.3,
  revenueGrowth: 15.2,
  storeGrowth: 5.7,
}

const recentOrders = [
  {
    id: "ORD-001",
    customer: "Alice Johnson",
    amount: "₦45,000",
    status: "completed",
    date: "2024-01-15",
  },
  {
    id: "ORD-002",
    customer: "Bob Smith",
    amount: "₦32,500",
    status: "pending",
    date: "2024-01-15",
  },
  {
    id: "ORD-003",
    customer: "Carol Davis",
    amount: "₦78,900",
    status: "processing",
    date: "2024-01-14",
  },
  {
    id: "ORD-004",
    customer: "David Wilson",
    amount: "₦156,000",
    status: "completed",
    date: "2024-01-14",
  },
]

const topStores = [
  {
    id: "1",
    name: "TechHub Electronics",
    owner: "Michael Tech",
    revenue: "₦2,345,000",
    orders: 456,
    rating: 4.8,
  },
  {
    id: "2",
    name: "Fashion Forward",
    owner: "Sarah Style",
    revenue: "₦1,890,000",
    orders: 389,
    rating: 4.6,
  },
  {
    id: "3",
    name: "Home Essentials",
    owner: "John Home",
    revenue: "₦1,567,000",
    orders: 234,
    rating: 4.7,
  },
]

// Financial data
const financialData = {
  totalRevenue: "₦24,567,890",
  pendingPayouts: "₦3,456,700",
  processingFees: "₦1,234,500",
  recentTransactions: [
    {
      id: "TRX-001",
      type: "payout",
      amount: "₦345,000",
      recipient: "TechHub Electronics",
      status: "completed",
      date: "2024-01-15",
    },
    {
      id: "TRX-002",
      type: "fee",
      amount: "₦12,500",
      recipient: "Shopella",
      status: "completed",
      date: "2024-01-15",
    },
    {
      id: "TRX-003",
      type: "refund",
      amount: "₦78,900",
      recipient: "Customer: Carol Davis",
      status: "processing",
      date: "2024-01-14",
    },
    {
      id: "TRX-004",
      type: "payout",
      amount: "₦256,000",
      recipient: "Fashion Forward",
      status: "pending",
      date: "2024-01-14",
    },
  ],
}

// Notification data
const notifications = [
  {
    id: "1",
    title: "New User Registration",
    message: "10 new users registered in the last hour",
    time: "10 minutes ago",
    read: false,
    type: "user",
  },
  {
    id: "2",
    title: "Order Alert",
    message: "5 orders require your attention",
    time: "30 minutes ago",
    read: false,
    type: "order",
  },
  {
    id: "3",
    title: "System Update",
    message: "System maintenance scheduled for tonight at 2 AM",
    time: "2 hours ago",
    read: true,
    type: "system",
  },
]

export default function AdminDashboard() {
  const [activeItem, setActiveItem] = useState("dashboard")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [broadcastMessage, setBroadcastMessage] = useState("")
  const [broadcastTarget, setBroadcastTarget] = useState("all")
  const [broadcastTitle, setBroadcastTitle] = useState("")

  const permissions = rolePermissions[currentUser.role]

  // Filter sidebar items based on permissions
  const filteredSidebarItems = sidebarItems.filter((item) => {
    if (!item.requiredPermission) return true
    return permissions[item.requiredPermission as keyof typeof permissions]
  })

  // Apply dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return darkMode ? "bg-green-900 bg-opacity-30 text-green-400" : "bg-green-100 text-green-800"
      case "pending":
        return darkMode ? "bg-yellow-900 bg-opacity-30 text-yellow-400" : "bg-yellow-100 text-yellow-800"
      case "processing":
        return darkMode ? "bg-blue-900 bg-opacity-30 text-blue-400" : "bg-blue-100 text-blue-800"
      default:
        return darkMode ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-800"
    }
  }

  const getTransactionTypeColor = (type: string) => {
    switch (type) {
      case "payout":
        return darkMode ? "bg-red-900 bg-opacity-30 text-red-400" : "bg-red-100 text-red-800"
      case "fee":
        return darkMode ? "bg-purple-900 bg-opacity-30 text-purple-400" : "bg-purple-100 text-purple-800"
      case "refund":
        return darkMode ? "bg-orange-900 bg-opacity-30 text-orange-400" : "bg-orange-100 text-orange-800"
      default:
        return darkMode ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-800"
    }
  }

  const getRoleColor = (role: UserRole) => {
    switch (role) {
      case "super-admin":
        return darkMode ? "bg-red-900 bg-opacity-30 text-red-400" : "bg-red-100 text-red-800"
      case "mid-admin":
        return darkMode ? "bg-blue-900 bg-opacity-30 text-blue-400" : "bg-blue-100 text-blue-800"
      case "manager":
        return darkMode ? "bg-green-900 bg-opacity-30 text-green-400" : "bg-green-100 text-green-800"
      default:
        return darkMode ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-800"
    }
  }

  const handleBroadcastSubmit = () => {
    alert(`Broadcast message "${broadcastTitle}" sent to ${broadcastTarget} users!`)
    setBroadcastMessage("")
    setBroadcastTitle("")
    setBroadcastTarget("all")
  }

  return (
    <div className={`min-h-screen ${darkMode ? "dark bg-gray-900" : "bg-gray-50"} transition-colors duration-200`}>
      {/* Top Header */}
      <header
        className={`${
          darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        } shadow-sm border-b px-4 lg:px-6 py-4`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu className={`w-5 h-5 ${darkMode ? "text-gray-100" : "text-gray-900"}`} />
            </Button>
            <div>
              <h1 className={`text-xl lg:text-2xl font-bold ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
                {filteredSidebarItems.find((item) => item.id === activeItem)?.label || "Dashboard"}
              </h1>
              <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                Welcome back, {currentUser.name}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2">
              <Input
                placeholder="Search..."
                className={`w-64 ${darkMode ? "bg-gray-700 border-gray-600 text-gray-100" : ""}`}
              />
              <Button variant="outline" size="sm" className={darkMode ? "border-gray-600 text-gray-300" : ""}>
                <Search className="w-4 h-4" />
              </Button>
            </div>

            {/* Dark Mode Toggle */}
            <Button
              variant="outline"
              size="sm"
              className={`${darkMode ? "border-gray-600 text-gray-300" : ""}`}
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>

            {/* Notifications */}
            <div className="relative">
              <Button
                variant="outline"
                size="sm"
                className={`relative ${darkMode ? "border-gray-600 text-gray-300" : ""}`}
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell className="w-4 h-4" />
                <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center p-0">
                  {notifications.filter((n) => !n.read).length}
                </Badge>
              </Button>

              {/* Notification Dropdown */}
              {showNotifications && (
                <div
                  className={`absolute right-0 mt-2 w-80 rounded-md shadow-lg z-50 ${
                    darkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"
                  }`}
                >
                  <div className={`p-3 border-b ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
                    <div className="flex items-center justify-between">
                      <h3 className={`font-medium ${darkMode ? "text-gray-100" : "text-gray-900"}`}>Notifications</h3>
                      <Button variant="ghost" size="sm" className="text-xs">
                        Mark all as read
                      </Button>
                    </div>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-3 ${notification.read ? "" : darkMode ? "bg-gray-700" : "bg-blue-50"} ${
                          darkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"
                        } cursor-pointer`}
                      >
                        <div className="flex gap-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              notification.type === "user"
                                ? "bg-blue-100 text-blue-600"
                                : notification.type === "order"
                                  ? "bg-green-100 text-green-600"
                                  : "bg-yellow-100 text-yellow-600"
                            }`}
                          >
                            {notification.type === "user" ? (
                              <Users className="w-4 h-4" />
                            ) : notification.type === "order" ? (
                              <ShoppingBag className="w-4 h-4" />
                            ) : (
                              <Bell className="w-4 h-4" />
                            )}
                          </div>
                          <div>
                            <p className={`font-medium ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
                              {notification.title}
                            </p>
                            <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                              {notification.message}
                            </p>
                            <p className={`text-xs ${darkMode ? "text-gray-500" : "text-gray-400"} mt-1`}>
                              {notification.time}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className={`p-2 border-t ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
                    <Button variant="ghost" size="sm" className="w-full text-center text-sm">
                      View all notifications
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 ${
          darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
        } shadow-lg transform transition-transform duration-300 ease-in-out lg:transform-none ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Sidebar Header */}
        <div
          className={`flex items-center justify-between p-6 border-b ${darkMode ? "border-gray-700" : "border-gray-200"}`}
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className={`font-bold ${darkMode ? "text-gray-100" : "text-gray-900"}`}>Admin Panel</h1>
              <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Shopella</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setIsMobileMenuOpen(false)}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* User Info */}
        <div className={`p-4 border-b ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center font-semibold text-white">
              {currentUser.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <p className={`font-medium ${darkMode ? "text-gray-100" : "text-gray-900"} truncate`}>
                {currentUser.name}
              </p>
              <div className="flex items-center gap-2">
                <Badge className={`text-xs ${getRoleColor(currentUser.role)}`}>
                  {currentUser.role.replace("-", " ").toUpperCase()}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {filteredSidebarItems.map((item) => {
              const Icon = item.icon
              return (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      setActiveItem(item.id)
                      setIsMobileMenuOpen(false)
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeItem === item.id
                        ? darkMode
                          ? "bg-blue-900 bg-opacity-30 text-blue-400 border-r-2 border-blue-400"
                          : "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                        : darkMode
                          ? "text-gray-300 hover:bg-gray-700"
                          : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Bottom Actions */}
        <div className={`p-4 border-t ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
          <Link
            href="/"
            className={`flex items-center gap-3 px-3 py-2 ${
              darkMode ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-50"
            } rounded-lg transition-colors mb-2`}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Site</span>
          </Link>
          <button
            className={`flex items-center gap-3 px-3 py-2 ${
              darkMode ? "text-red-400 hover:bg-red-900 hover:bg-opacity-30" : "text-red-600 hover:bg-red-50"
            } rounded-lg transition-colors w-full text-left`}
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Page Content */}
        <main className={`flex-1 p-4 lg:p-6 overflow-auto ${darkMode ? "bg-gray-900 text-gray-100" : ""}`}>
          {activeItem === "dashboard" && (
            <div className="space-y-6">
              {/* Analytics Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                <Card className={darkMode ? "bg-gray-800 border-gray-700" : ""}>
                  <CardContent className="p-4 lg:p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className={`text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                          Total Users
                        </p>
                        <p className={`text-2xl lg:text-3xl font-bold ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
                          {analyticsData.totalUsers.toLocaleString()}
                        </p>
                      </div>
                      <div
                        className={`w-12 h-12 ${darkMode ? "bg-blue-900 bg-opacity-30" : "bg-blue-100"} rounded-lg flex items-center justify-center`}
                      >
                        <Users className={`w-6 h-6 ${darkMode ? "text-blue-400" : "text-blue-600"}`} />
                      </div>
                    </div>
                    <div className="flex items-center mt-4">
                      <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-sm text-green-600 font-medium">+{analyticsData.userGrowth}%</span>
                      <span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"} ml-2`}>
                        vs last month
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card className={darkMode ? "bg-gray-800 border-gray-700" : ""}>
                  <CardContent className="p-4 lg:p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className={`text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                          Total Orders
                        </p>
                        <p className={`text-2xl lg:text-3xl font-bold ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
                          {analyticsData.totalOrders.toLocaleString()}
                        </p>
                      </div>
                      <div
                        className={`w-12 h-12 ${darkMode ? "bg-green-900 bg-opacity-30" : "bg-green-100"} rounded-lg flex items-center justify-center`}
                      >
                        <ShoppingBag className={`w-6 h-6 ${darkMode ? "text-green-400" : "text-green-600"}`} />
                      </div>
                    </div>
                    <div className="flex items-center mt-4">
                      <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-sm text-green-600 font-medium">+{analyticsData.orderGrowth}%</span>
                      <span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"} ml-2`}>
                        vs last month
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card className={darkMode ? "bg-gray-800 border-gray-700" : ""}>
                  <CardContent className="p-4 lg:p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className={`text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                          Total Revenue
                        </p>
                        <p className={`text-2xl lg:text-3xl font-bold ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
                          ₦{(analyticsData.totalRevenue / 1000000).toFixed(1)}M
                        </p>
                      </div>
                      <div
                        className={`w-12 h-12 ${darkMode ? "bg-yellow-900 bg-opacity-30" : "bg-yellow-100"} rounded-lg flex items-center justify-center`}
                      >
                        <DollarSign className={`w-6 h-6 ${darkMode ? "text-yellow-400" : "text-yellow-600"}`} />
                      </div>
                    </div>
                    <div className="flex items-center mt-4">
                      <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-sm text-green-600 font-medium">+{analyticsData.revenueGrowth}%</span>
                      <span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"} ml-2`}>
                        vs last month
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card className={darkMode ? "bg-gray-800 border-gray-700" : ""}>
                  <CardContent className="p-4 lg:p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className={`text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                          Active Stores
                        </p>
                        <p className={`text-2xl lg:text-3xl font-bold ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
                          {analyticsData.totalStores.toLocaleString()}
                        </p>
                      </div>
                      <div
                        className={`w-12 h-12 ${darkMode ? "bg-purple-900 bg-opacity-30" : "bg-purple-100"} rounded-lg flex items-center justify-center`}
                      >
                        <Store className={`w-6 h-6 ${darkMode ? "text-purple-400" : "text-purple-600"}`} />
                      </div>
                    </div>
                    <div className="flex items-center mt-4">
                      <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-sm text-green-600 font-medium">+{analyticsData.storeGrowth}%</span>
                      <span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"} ml-2`}>
                        vs last month
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Orders & Top Stores */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Orders */}
                <Card className={darkMode ? "bg-gray-800 border-gray-700" : ""}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                    <CardTitle className={`text-lg font-semibold ${darkMode ? "text-gray-100" : ""}`}>
                      Recent Orders
                    </CardTitle>
                    <Button variant="outline" size="sm" className={darkMode ? "border-gray-600 text-gray-300" : ""}>
                      <Eye className="w-4 h-4 mr-2" />
                      View All
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentOrders.map((order) => (
                        <div
                          key={order.id}
                          className={`flex items-center justify-between p-3 ${
                            darkMode ? "bg-gray-700" : "bg-gray-50"
                          } rounded-lg`}
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-3">
                              <div>
                                <p className={`font-medium ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
                                  {order.customer}
                                </p>
                                <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{order.id}</p>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className={`font-semibold ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
                              {order.amount}
                            </p>
                            <Badge className={`text-xs ${getStatusColor(order.status)}`}>{order.status}</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Top Stores */}
                <Card className={darkMode ? "bg-gray-800 border-gray-700" : ""}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                    <CardTitle className={`text-lg font-semibold ${darkMode ? "text-gray-100" : ""}`}>
                      Top Performing Stores
                    </CardTitle>
                    <Button variant="outline" size="sm" className={darkMode ? "border-gray-600 text-gray-300" : ""}>
                      <BarChart3 className="w-4 h-4 mr-2" />
                      Analytics
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {topStores.map((store, index) => (
                        <div
                          key={store.id}
                          className={`flex items-center gap-4 p-3 ${
                            darkMode ? "bg-gray-700" : "bg-gray-50"
                          } rounded-lg`}
                        >
                          <div
                            className={`w-8 h-8 ${
                              darkMode ? "bg-blue-900 bg-opacity-30 text-blue-400" : "bg-blue-100 text-blue-600"
                            } rounded-full flex items-center justify-center font-semibold`}
                          >
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <p className={`font-medium ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
                              {store.name}
                            </p>
                            <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{store.owner}</p>
                          </div>
                          <div className="text-right">
                            <p className={`font-semibold ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
                              {store.revenue}
                            </p>
                            <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                              {store.orders} orders
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Broadcast Section */}
          {activeItem === "broadcast" && (
            <div className="space-y-6">
              <Card className={darkMode ? "bg-gray-800 border-gray-700" : ""}>
                <CardHeader>
                  <CardTitle className={darkMode ? "text-gray-100" : ""}>Send Broadcast Message</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                      Message Title
                    </label>
                    <Input
                      placeholder="Enter broadcast title"
                      value={broadcastTitle}
                      onChange={(e) => setBroadcastTitle(e.target.value)}
                      className={darkMode ? "bg-gray-700 border-gray-600 text-gray-100" : ""}
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                      Target Audience
                    </label>
                    <Select value={broadcastTarget} onValueChange={setBroadcastTarget}>
                      <SelectTrigger className={darkMode ? "bg-gray-700 border-gray-600 text-gray-100" : ""}>
                        <SelectValue placeholder="Select target audience" />
                      </SelectTrigger>
                      <SelectContent className={darkMode ? "bg-gray-800 border-gray-700 text-gray-100" : ""}>
                        <SelectItem value="all">All Users</SelectItem>
                        <SelectItem value="customers">Customers Only</SelectItem>
                        <SelectItem value="merchants">Merchants Only</SelectItem>
                        <SelectItem value="new">New Users (Last 30 days)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                      Message Content
                    </label>
                    <Textarea
                      placeholder="Type your broadcast message here..."
                      rows={6}
                      value={broadcastMessage}
                      onChange={(e) => setBroadcastMessage(e.target.value)}
                      className={darkMode ? "bg-gray-700 border-gray-600 text-gray-100" : ""}
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" className={darkMode ? "border-gray-600 text-gray-300" : ""}>
                    Save as Draft
                  </Button>
                  <Button
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={handleBroadcastSubmit}
                    disabled={!broadcastTitle || !broadcastMessage}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send Broadcast
                  </Button>
                </CardFooter>
              </Card>

              <Card className={darkMode ? "bg-gray-800 border-gray-700" : ""}>
                <CardHeader>
                  <CardTitle className={darkMode ? "text-gray-100" : ""}>Previous Broadcasts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-50"}`}>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className={`font-medium ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
                          New Feature Announcement
                        </h3>
                        <Badge
                          className={
                            darkMode ? "bg-green-900 bg-opacity-30 text-green-400" : "bg-green-100 text-green-800"
                          }
                        >
                          Sent
                        </Badge>
                      </div>
                      <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"} mb-2`}>
                        We're excited to announce our new payment system is now live! You can now process payments
                        faster and more securely.
                      </p>
                      <div className="flex justify-between items-center text-xs">
                        <span className={darkMode ? "text-gray-500" : "text-gray-500"}>Sent to: All Users</span>
                        <span className={darkMode ? "text-gray-500" : "text-gray-500"}>Jan 10, 2024 • 10:30 AM</span>
                      </div>
                    </div>

                    <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-50"}`}>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className={`font-medium ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
                          Holiday Season Discount
                        </h3>
                        <Badge
                          className={
                            darkMode ? "bg-green-900 bg-opacity-30 text-green-400" : "bg-green-100 text-green-800"
                          }
                        >
                          Sent
                        </Badge>
                      </div>
                      <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"} mb-2`}>
                        Enjoy special holiday discounts across all categories. Use code HOLIDAY2024 for an extra 10%
                        off!
                      </p>
                      <div className="flex justify-between items-center text-xs">
                        <span className={darkMode ? "text-gray-500" : "text-gray-500"}>Sent to: Customers Only</span>
                        <span className={darkMode ? "text-gray-500" : "text-gray-500"}>Dec 15, 2023 • 09:00 AM</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Financial Management */}
          {activeItem === "finances" && (
            <div className="space-y-6">
              {/* Financial Overview */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
                <Card className={darkMode ? "bg-gray-800 border-gray-700" : ""}>
                  <CardContent className="p-4 lg:p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className={`text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                          Total Revenue
                        </p>
                        <p className={`text-2xl lg:text-3xl font-bold ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
                          {financialData.totalRevenue}
                        </p>
                      </div>
                      <div
                        className={`w-12 h-12 ${darkMode ? "bg-green-900 bg-opacity-30" : "bg-green-100"} rounded-lg flex items-center justify-center`}
                      >
                        <DollarSign className={`w-6 h-6 ${darkMode ? "text-green-400" : "text-green-600"}`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className={darkMode ? "bg-gray-800 border-gray-700" : ""}>
                  <CardContent className="p-4 lg:p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className={`text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                          Pending Payouts
                        </p>
                        <p className={`text-2xl lg:text-3xl font-bold ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
                          {financialData.pendingPayouts}
                        </p>
                      </div>
                      <div
                        className={`w-12 h-12 ${darkMode ? "bg-yellow-900 bg-opacity-30" : "bg-yellow-100"} rounded-lg flex items-center justify-center`}
                      >
                        <Wallet className={`w-6 h-6 ${darkMode ? "text-yellow-400" : "text-yellow-600"}`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className={darkMode ? "bg-gray-800 border-gray-700" : ""}>
                  <CardContent className="p-4 lg:p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className={`text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                          Processing Fees
                        </p>
                        <p className={`text-2xl lg:text-3xl font-bold ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
                          {financialData.processingFees}
                        </p>
                      </div>
                      <div
                        className={`w-12 h-12 ${darkMode ? "bg-purple-900 bg-opacity-30" : "bg-purple-100"} rounded-lg flex items-center justify-center`}
                      >
                        <Receipt className={`w-6 h-6 ${darkMode ? "text-purple-400" : "text-purple-600"}`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Financial Tabs */}
              <Card className={darkMode ? "bg-gray-800 border-gray-700" : ""}>
                <CardHeader>
                  <CardTitle className={darkMode ? "text-gray-100" : ""}>Financial Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="transactions" className="w-full">
                    <TabsList className="grid grid-cols-3 mb-6">
                      <TabsTrigger value="transactions">Transactions</TabsTrigger>
                      <TabsTrigger value="payouts">Payouts</TabsTrigger>
                      <TabsTrigger value="reports">Reports</TabsTrigger>
                    </TabsList>

                    <TabsContent value="transactions">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <h3 className={`font-medium ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
                            Recent Transactions
                          </h3>
                          <Button
                            variant="outline"
                            size="sm"
                            className={darkMode ? "border-gray-600 text-gray-300" : ""}
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Export
                          </Button>
                        </div>

                        <div className="space-y-3">
                          {financialData.recentTransactions.map((transaction) => (
                            <div
                              key={transaction.id}
                              className={`flex items-center justify-between p-3 ${
                                darkMode ? "bg-gray-700" : "bg-gray-50"
                              } rounded-lg`}
                            >
                              <div className="flex items-center gap-3">
                                <div
                                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                    transaction.type === "payout"
                                      ? darkMode
                                        ? "bg-red-900 bg-opacity-30"
                                        : "bg-red-100"
                                      : transaction.type === "fee"
                                        ? darkMode
                                          ? "bg-purple-900 bg-opacity-30"
                                          : "bg-purple-100"
                                        : darkMode
                                          ? "bg-orange-900 bg-opacity-30"
                                          : "bg-orange-100"
                                  }`}
                                >
                                  {transaction.type === "payout" ? (
                                    <Wallet className={darkMode ? "w-5 h-5 text-red-400" : "w-5 h-5 text-red-600"} />
                                  ) : transaction.type === "fee" ? (
                                    <Receipt
                                      className={darkMode ? "w-5 h-5 text-purple-400" : "w-5 h-5 text-purple-600"}
                                    />
                                  ) : (
                                    <CreditCard
                                      className={darkMode ? "w-5 h-5 text-orange-400" : "w-5 h-5 text-orange-600"}
                                    />
                                  )}
                                </div>
                                <div>
                                  <p className={`font-medium ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
                                    {transaction.recipient}
                                  </p>
                                  <div className="flex items-center gap-2">
                                    <Badge className={`text-xs ${getTransactionTypeColor(transaction.type)}`}>
                                      {transaction.type}
                                    </Badge>
                                    <span className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                      {transaction.id}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className={`font-semibold ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
                                  {transaction.amount}
                                </p>
                                <Badge className={`text-xs ${getStatusColor(transaction.status)}`}>
                                  {transaction.status}
                                </Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="payouts">
                      <div className={`p-12 text-center ${darkMode ? "bg-gray-700" : "bg-gray-50"} rounded-lg`}>
                        <div
                          className={`w-16 h-16 mx-auto mb-4 ${
                            darkMode ? "bg-gray-600" : "bg-gray-200"
                          } rounded-full flex items-center justify-center`}
                        >
                          <Wallet className={`w-8 h-8 ${darkMode ? "text-gray-400" : "text-gray-500"}`} />
                        </div>
                        <h3 className={`text-lg font-medium ${darkMode ? "text-gray-100" : "text-gray-900"} mb-2`}>
                          Payout Management
                        </h3>
                        <p className={`${darkMode ? "text-gray-400" : "text-gray-600"} mb-6`}>
                          This section is under development. You'll be able to manage merchant payouts here.
                        </p>
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white">Schedule Payouts</Button>
                      </div>
                    </TabsContent>

                    <TabsContent value="reports">
                      <div className={`p-12 text-center ${darkMode ? "bg-gray-700" : "bg-gray-50"} rounded-lg`}>
                        <div
                          className={`w-16 h-16 mx-auto mb-4 ${
                            darkMode ? "bg-gray-600" : "bg-gray-200"
                          } rounded-full flex items-center justify-center`}
                        >
                          <PieChart className={`w-8 h-8 ${darkMode ? "text-gray-400" : "text-gray-500"}`} />
                        </div>
                        <h3 className={`text-lg font-medium ${darkMode ? "text-gray-100" : "text-gray-900"} mb-2`}>
                          Financial Reports
                        </h3>
                        <p className={`${darkMode ? "text-gray-400" : "text-gray-600"} mb-6`}>
                          This section is under development. You'll be able to generate and view financial reports here.
                        </p>
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white">Generate Report</Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Other sections would be rendered here based on activeItem */}
          {activeItem !== "dashboard" && activeItem !== "broadcast" && activeItem !== "finances" && (
            <Card className={darkMode ? "bg-gray-800 border-gray-700" : ""}>
              <CardContent className="p-12 text-center">
                <div
                  className={`w-16 h-16 ${
                    darkMode ? "bg-gray-700" : "bg-gray-200"
                  } rounded-full mx-auto mb-4 flex items-center justify-center`}
                >
                  <Package className={`w-8 h-8 ${darkMode ? "text-gray-500" : "text-gray-400"}`} />
                </div>
                <h3 className={`text-lg font-medium ${darkMode ? "text-gray-100" : "text-gray-900"} mb-2`}>
                  {filteredSidebarItems.find((item) => item.id === activeItem)?.label}
                </h3>
                <p className={darkMode ? "text-gray-400" : "text-gray-600"}>This section is under development</p>
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </div>
  )
}
