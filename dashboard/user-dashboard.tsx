"use client"

import Link from "next/link"
import { useState } from "react"
import {
  Zap,
  Bell,
  Mail,
  Wallet,
  User,
  ShoppingBag,
  Heart,
  Settings,
  Package,
  Truck,
  ArrowLeft,
  LogOut,
  MessageSquare,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

const sidebarItems = [
  {
    id: "account",
    label: "My Shopella Account",
    icon: User,
    active: true,
  },
  {
    id: "orders",
    label: "My Orders",
    icon: ShoppingBag,
  },
  {
    id: "wallet",
    label: "My Wallet",
    icon: Wallet,
  },
  {
    id: "inbox",
    label: "Inbox",
    icon: MessageSquare,
  },
  {
    id: "wishlist",
    label: "Wishlist",
    icon: Heart,
  },
  {
    id: "management",
    label: "Account Management",
    icon: Settings,
  },
  {
    id: "delivery",
    label: "Track Delivery",
    icon: Truck,
  },
]

export default function UserDashboard() {
  const [activeItem, setActiveItem] = useState("account")

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-slate-800 text-white flex flex-col">
        {/* User Profile Section */}
        <div className="p-6 bg-slate-900">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center font-semibold text-white">
              C
            </div>
            <div>
              <p className="font-medium">Hello Craig!</p>
              <p className="text-sm text-slate-300">Welcome back</p>
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
            Log out
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
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center font-semibold text-white text-sm">
                  C
                </div>
                <span className="text-sm font-medium text-gray-700">Craig</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">
          {activeItem === "account" && (
            <div>
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-gray-900">My Shopella Account</h1>
              </div>

              {/* Account Overview Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <ShoppingBag className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Total Orders</p>
                        <p className="text-2xl font-bold text-gray-900">12</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <Wallet className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Wallet Balance</p>
                        <p className="text-2xl font-bold text-gray-900">₦25,000</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                        <Heart className="w-6 h-6 text-red-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Wishlist Items</p>
                        <p className="text-2xl font-bold text-gray-900">8</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Package className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">Order #SP001234 has been shipped</p>
                        <p className="text-sm text-gray-600">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <Wallet className="w-5 h-5 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">Wallet credited with ₦5,000</p>
                        <p className="text-sm text-gray-600">1 day ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                        <Heart className="w-5 h-5 text-red-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">Added iPhone 15 Pro to wishlist</p>
                        <p className="text-sm text-gray-600">3 days ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeItem === "orders" && (
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-8">My Orders</h1>
              <Card>
                <CardContent className="p-6">
                  <div className="text-center py-12">
                    <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
                    <p className="text-gray-600 mb-4">Start shopping to see your orders here</p>
                    <Link href="/">
                      <Button className="bg-blue-600 hover:bg-blue-700">Start Shopping</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeItem === "wallet" && (
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-8">My Wallet</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Wallet Balance</h3>
                    <div className="text-3xl font-bold text-green-600 mb-4">₦25,000.00</div>
                    <div className="space-y-2">
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">Add Money</Button>
                      <Button variant="outline" className="w-full bg-transparent">
                        Withdraw
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Transactions</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Wallet Credit</span>
                        <span className="text-sm font-medium text-green-600">+₦5,000</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Order Payment</span>
                        <span className="text-sm font-medium text-red-600">-₦15,000</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Refund</span>
                        <span className="text-sm font-medium text-green-600">+₦2,500</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeItem === "wishlist" && (
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-8">My Wishlist</h1>
              <Card>
                <CardContent className="p-6">
                  <div className="text-center py-12">
                    <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Your wishlist is empty</h3>
                    <p className="text-gray-600 mb-4">Save items you love for later</p>
                    <Link href="/">
                      <Button className="bg-blue-600 hover:bg-blue-700">Browse Products</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Add other sections as needed */}
          {activeItem !== "account" &&
            activeItem !== "orders" &&
            activeItem !== "wallet" &&
            activeItem !== "wishlist" && (
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
