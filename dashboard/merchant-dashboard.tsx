"use client"

import Link from "next/link"
import { useState } from "react"
import {
  Zap,
  Bell,
  Mail,
  Wallet,
  ShoppingBag,
  Heart,
  Settings,
  Package,
  ArrowLeft,
  LogOut,
  MessageSquare,
  Store,
  Megaphone,
  Users,
  UserPlus,
  Search,
  Phone,
  Tag,
  Plus,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

const sidebarItems = [
  {
    id: "shops",
    label: "Manage Shops",
    icon: Store,
    active: true,
  },
  {
    id: "promotions",
    label: "My Promotions",
    icon: Megaphone,
  },
  {
    id: "products",
    label: "Manage Products",
    icon: Package,
  },
  {
    id: "likes",
    label: "Likes",
    icon: Heart,
  },
  {
    id: "connections",
    label: "Connections",
    icon: Users,
  },
  {
    id: "groups",
    label: "Groups",
    icon: UserPlus,
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: Bell,
  },
  {
    id: "contact",
    label: "Contact",
    icon: Phone,
  },
  {
    id: "inbox",
    label: "Inbox",
    icon: MessageSquare,
  },
  {
    id: "offers",
    label: "Offers",
    icon: Tag,
  },
  {
    id: "orders",
    label: "Orders",
    icon: ShoppingBag,
  },
  {
    id: "search",
    label: "Search Alarms",
    icon: Search,
  },
  {
    id: "callbacks",
    label: "Request Callbacks",
    icon: Phone,
  },
  {
    id: "wallet",
    label: "Wallet",
    icon: Wallet,
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
  },
]

export default function MerchantDashboard() {
  const [activeItem, setActiveItem] = useState("shops")

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-slate-800 text-white flex flex-col">
        {/* User Profile Section */}
        <div className="p-6 bg-slate-900">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center font-semibold text-white">
              K
            </div>
            <div>
              <p className="font-medium">Hello Kingdriveu!</p>
              <p className="text-sm text-slate-300">Merchant Dashboard</p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 py-4">
          <ul className="space-y-1">
            {sidebarItems.map((item) => {
              const Icon = item.icon
              return (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveItem(item.id)}
                    className={`w-full flex items-center gap-3 px-6 py-3 text-left hover:bg-slate-700 transition-colors ${
                      activeItem === item.id ? "bg-slate-700 border-r-2 border-blue-500" : ""
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-sm">{item.label}</span>
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-slate-700">
          <Link
            href="/"
            className="flex items-center gap-3 px-2 py-3 text-sm hover:bg-slate-700 rounded transition-colors mb-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Shopella
          </Link>
          <button className="flex items-center gap-3 px-2 py-3 text-sm hover:bg-slate-700 rounded transition-colors w-full text-left text-red-300">
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation */}
        <header className="bg-white shadow-sm border-b px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <Zap className="w-6 h-6 text-blue-600" />
              <span className="text-xl font-bold text-blue-600">Shopella</span>
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <Mail className="w-6 h-6 text-gray-600 cursor-pointer hover:text-gray-800" />
              </div>
              <div className="relative">
                <Bell className="w-6 h-6 text-gray-600 cursor-pointer hover:text-gray-800" />
                <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center p-0">
                  0
                </Badge>
              </div>
              <div className="relative">
                <Wallet className="w-6 h-6 text-gray-600 cursor-pointer hover:text-gray-800" />
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center font-semibold text-white text-sm">
                  K
                </div>
                <span className="text-sm font-medium text-gray-700">Kingdriveu</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">
          {activeItem === "shops" && (
            <div>
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-gray-900">My Shops - 0</h1>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Create a Shop
                </Button>
              </div>

              {/* Empty State */}
              <Card className="max-w-2xl mx-auto">
                <CardContent className="p-12 text-center">
                  <div className="mb-8">
                    {/* Shop Illustration */}
                    <div className="relative mx-auto w-32 h-24 mb-6">
                      <div className="absolute inset-0 bg-blue-100 rounded-t-3xl"></div>
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-16 bg-white border-2 border-gray-200 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <Store className="w-6 h-6 text-gray-400 mx-auto mb-1" />
                          <div className="text-xs text-gray-500 font-medium">EMPTY</div>
                          <div className="text-xs text-gray-500 font-medium">SHOP</div>
                        </div>
                      </div>
                      {/* Awning stripes */}
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-4">
                        <div className="flex h-full">
                          <div className="flex-1 bg-blue-500"></div>
                          <div className="flex-1 bg-white"></div>
                          <div className="flex-1 bg-blue-500"></div>
                          <div className="flex-1 bg-white"></div>
                          <div className="flex-1 bg-blue-500"></div>
                        </div>
                      </div>
                      {/* Person figure */}
                      <div className="absolute bottom-0 left-4">
                        <div className="w-3 h-6 bg-blue-400 rounded-t-full"></div>
                        <div className="w-2 h-2 bg-blue-600 rounded-full mx-auto -mt-1"></div>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-lg font-medium text-gray-900 mb-2">EMPTY SHOP</h3>
                  <p className="text-gray-600 mb-8 max-w-md mx-auto">
                    Create a collection of your products with Shopella Shop today
                  </p>

                  <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">Create a Shop</Button>
                </CardContent>
              </Card>
            </div>
          )}

          {activeItem === "products" && (
            <div>
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Manage Products</h1>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Product
                </Button>
              </div>

              <Card>
                <CardContent className="p-6">
                  <div className="text-center py-12">
                    <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No products yet</h3>
                    <p className="text-gray-600 mb-4">Start adding products to your shop</p>
                    <Button className="bg-blue-600 hover:bg-blue-700">Add Your First Product</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeItem === "orders" && (
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-8">Orders</h1>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-2">0</div>
                    <div className="text-sm text-gray-600">Pending Orders</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-2xl font-bold text-green-600 mb-2">0</div>
                    <div className="text-sm text-gray-600">Completed Orders</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-2xl font-bold text-orange-600 mb-2">0</div>
                    <div className="text-sm text-gray-600">Processing</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-2xl font-bold text-red-600 mb-2">0</div>
                    <div className="text-sm text-gray-600">Cancelled</div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardContent className="p-6">
                  <div className="text-center py-12">
                    <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
                    <p className="text-gray-600">Orders will appear here once customers start buying</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Add other sections as needed */}
          {activeItem !== "shops" && activeItem !== "products" && activeItem !== "orders" && (
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-8">
                {sidebarItems.find((item) => item.id === activeItem)?.label}
              </h1>
              <Card>
                <CardContent className="p-6">
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Settings className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Coming Soon</h3>
                    <p className="text-gray-600">This section is under development</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
