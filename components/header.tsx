"use client"

import Link from "next/link"
import { useState } from "react"
import { Zap, MapPin, Phone, Heart, User, ShoppingCart, AlignJustify, Search, X, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useCart } from "../contexts/cart-context"

const categories = [
  { name: "Phones and Tablets", icon: "📱" },
  { name: "Computing", icon: "💻" },
  { name: "Electronics", icon: "⚡" },
  { name: "Accessories", icon: "🎧" },
  { name: "Home & Kitchen", icon: "🏠" },
  { name: "Lifestyle", icon: "💄" },
  { name: "Watches", icon: "⌚" },
  { name: "Premium Devices", icon: "⭐" },
]

export default function Header() {
  const { getTotalItems } = useCart()
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <div className="sticky top-0 z-50">
      {/* Top Header - Hidden on mobile */}
      <div className="bg-blue-600 text-white py-2 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-sm">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>Lagos, Nigeria</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>+234-800-SHOPELLA</span>
            </div>
          </div>
          <Badge className="bg-gray-800 text-white hover:bg-gray-700">Official Delivery Partner</Badge>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-blue-600 text-white py-3 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Mobile Layout */}
          <div className="flex md:hidden items-center justify-between">
            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="text-white hover:bg-blue-700 p-2">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 p-0">
                <div className="bg-blue-600 text-white p-4">
                  <div className="flex items-center gap-3 mb-4">
                    <Zap className="w-8 h-8 text-yellow-400" />
                    <div>
                      <h1 className="text-xl font-bold">Shopella</h1>
                      <p className="text-xs text-blue-200">Tech That Powers Life</p>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Categories</h3>
                    {categories.map((category, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
                      >
                        <span className="text-lg">{category.icon}</span>
                        <span className="text-gray-700">{category.name}</span>
                      </div>
                    ))}
                    <div className="border-t pt-4 mt-4">
                      <div className="space-y-3">
                        <div className="text-gray-700 font-medium cursor-pointer hover:text-blue-600">
                          🎁 Today's Deals
                        </div>
                        <div className="text-gray-700 cursor-pointer hover:text-blue-600">New Arrivals</div>
                        <div className="text-gray-700 cursor-pointer hover:text-blue-600">Laptops</div>
                        <div className="text-gray-700 cursor-pointer hover:text-blue-600">Phones</div>
                        <div className="text-gray-700 cursor-pointer hover:text-blue-600">Gaming</div>
                        <div className="text-gray-700 cursor-pointer hover:text-blue-600">Smart Home</div>
                      </div>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <Zap className="w-6 h-6 text-yellow-400" />
              <div>
                <h1 className="text-lg font-bold">Shopella</h1>
              </div>
            </Link>

            {/* Mobile Right Icons */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-blue-700 p-2"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                <Search className="w-5 h-5" />
              </Button>
              <Link href="/cart" className="relative">
                <Button variant="ghost" size="sm" className="text-white hover:bg-blue-700 p-2">
                  <ShoppingCart className="w-5 h-5" />
                  {getTotalItems() > 0 && (
                    <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center p-0">
                      {getTotalItems()}
                    </Badge>
                  )}
                </Button>
              </Link>
              <Link href="/account">
                <Button variant="ghost" size="sm" className="text-white hover:bg-blue-700 p-2">
                  <User className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden md:flex items-center gap-8">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <Zap className="w-8 h-8 text-yellow-400" />
              <div>
                <h1 className="text-2xl font-bold">Shopella</h1>
                <p className="text-xs text-blue-200">Tech That Powers Life</p>
              </div>
            </Link>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl">
              <div className="flex">
                <Input
                  placeholder="What tech are you looking for today?"
                  className="rounded-r-none border-0 bg-white text-gray-900 placeholder:text-gray-500 h-12 text-base"
                />
                <Button className="rounded-l-none bg-orange-500 hover:bg-orange-600 h-12 px-8 text-base font-semibold">
                  Search
                </Button>
              </div>
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-center gap-1 cursor-pointer hover:text-blue-200">
                <Heart className="w-5 h-5" />
                <span className="text-xs">Wishlist</span>
              </div>
              <Link href="/account" className="flex flex-col items-center gap-1 cursor-pointer hover:text-blue-200">
                <User className="w-5 h-5" />
                <span className="text-xs">Account</span>
              </Link>
              <Link
                href="/cart"
                className="flex flex-col items-center gap-1 cursor-pointer hover:text-blue-200 relative"
              >
                <ShoppingCart className="w-5 h-5" />
                <span className="text-xs">Cart</span>
                {getTotalItems() > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center p-0">
                    {getTotalItems()}
                  </Badge>
                )}
              </Link>
              <Button className="bg-white hover:bg-gray-100 text-blue-700 px-4 py-2 text-sm font-semibold rounded-full">
                Sell on Shopella
              </Button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          {isSearchOpen && (
            <div className="md:hidden mt-3 animate-in slide-in-from-top-2 duration-200">
              <div className="flex gap-2">
                <Input
                  placeholder="Search products..."
                  className="flex-1 bg-white text-gray-900 placeholder:text-gray-500 h-10"
                />
                <Button className="bg-orange-500 hover:bg-orange-600 h-10 px-4">
                  <Search className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-blue-700 h-10 px-3"
                  onClick={() => setIsSearchOpen(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Menu - Desktop Only */}
      <div className="text-white py-2 px-4 hidden md:block bg-black">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Categories Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:text-white hover:bg-blue-600 p-2 opacity-80 hover:opacity-100 transition-opacity duration-200"
                >
                  <AlignJustify className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-white ml-6">
                {categories.map((category, index) => (
                  <DropdownMenuItem
                    key={index}
                    className="flex items-center gap-3 cursor-pointer hover:bg-blue-50 py-3"
                  >
                    <span className="text-lg">{category.icon}</span>
                    <span className="text-gray-700">{category.name}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="flex items-center gap-2 cursor-pointer hover:bg-blue-600 px-2 py-1 rounded transition-colors duration-200">
              <span className="text-sm font-medium">🎁 Today's Deals</span>
            </div>
            <span className="text-sm cursor-pointer hover:bg-blue-600 px-2 py-1 rounded transition-colors duration-200">
              New Arrivals
            </span>
            <span className="text-sm cursor-pointer hover:bg-blue-600 px-2 py-1 rounded transition-colors duration-200">
              Laptops
            </span>
            <span className="text-sm cursor-pointer hover:bg-blue-600 px-2 py-1 rounded transition-colors duration-200">
              Phones
            </span>
            <span className="text-sm cursor-pointer hover:bg-blue-600 px-2 py-1 rounded transition-colors duration-200">
              Gaming
            </span>
            <span className="text-sm cursor-pointer hover:bg-blue-600 px-2 py-1 rounded transition-colors duration-200">
              Smart Home
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm cursor-pointer hover:bg-blue-600 px-2 py-1 rounded transition-colors duration-200">
              Need Help?
            </span>
            <span className="text-sm cursor-pointer hover:bg-blue-600 px-2 py-1 rounded transition-colors duration-200">
              Support
            </span>
            <span className="text-sm cursor-pointer hover:bg-blue-600 px-2 py-1 rounded transition-colors duration-200">
              Payment Plans
            </span>
            <span className="text-sm cursor-pointer hover:bg-blue-600 px-2 py-1 rounded transition-colors duration-200">
              Track Order
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
