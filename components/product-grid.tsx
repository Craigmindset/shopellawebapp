"use client"

import type React from "react"

import Image from "next/image"
import { Heart, Eye, ShoppingCart, ChevronRight, Facebook, Twitter, Instagram, CreditCard, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { useState } from "react"
import { useCart } from "../contexts/cart-context"

interface Product {
  id: number
  name: string
  price: string
  originalPrice?: string
  image: string
  images: string[]
  alt: string
  discount?: string
  likes: number
  description: string
  features: string[]
  rating: number
  reviews: number
}

const products: Product[] = [
  {
    id: 1,
    name: "Industrial Blender Pro Max",
    price: "₦85,000",
    originalPrice: "₦95,000",
    image: "/placeholder.svg?height=192&width=192&text=Industrial+Blender",
    images: [
      "/placeholder.svg?height=400&width=400&text=Blender+Main",
      "/placeholder.svg?height=400&width=400&text=Blender+Side",
      "/placeholder.svg?height=400&width=400&text=Blender+Top",
      "/placeholder.svg?height=400&width=400&text=Blender+Parts",
    ],
    alt: "Industrial blender",
    likes: 0,
    description:
      "Professional-grade industrial blender perfect for commercial use. Features powerful motor and durable stainless steel blades.",
    features: ["2000W Motor", "Stainless Steel Blades", "2L Capacity", "Variable Speed Control"],
    rating: 4.5,
    reviews: 128,
  },
  {
    id: 2,
    name: "Genesis Premium Motor Oil",
    price: "₦12,500",
    originalPrice: "₦13,500",
    image: "/placeholder.svg?height=192&width=192&text=Motor+Oil",
    images: [
      "/placeholder.svg?height=400&width=400&text=Oil+Main",
      "/placeholder.svg?height=400&width=400&text=Oil+Label",
      "/placeholder.svg?height=400&width=400&text=Oil+Cap",
      "/placeholder.svg?height=400&width=400&text=Oil+Bottle",
    ],
    alt: "Genesis motor oil",
    discount: "-8%",
    likes: 1,
    description:
      "High-performance synthetic motor oil designed for modern engines. Provides superior protection and performance.",
    features: ["Synthetic Formula", "5W-30 Viscosity", "4L Container", "Extended Drain Intervals"],
    rating: 4.8,
    reviews: 89,
  },
  {
    id: 3,
    name: "Smart Electronic Device",
    price: "₦45,000",
    image: "/placeholder.svg?height=192&width=192&text=Electronic+Device",
    images: [
      "/placeholder.svg?height=400&width=400&text=Device+Main",
      "/placeholder.svg?height=400&width=400&text=Device+Back",
      "/placeholder.svg?height=400&width=400&text=Device+Side",
      "/placeholder.svg?height=400&width=400&text=Device+Screen",
    ],
    alt: "Electronic device",
    likes: 0,
    description:
      "Cutting-edge smart electronic device with advanced features and sleek design. Perfect for tech enthusiasts.",
    features: ["Smart Connectivity", "HD Display", "Long Battery Life", "Compact Design"],
    rating: 4.3,
    reviews: 67,
  },
  {
    id: 4,
    name: "Premium Hair Extensions",
    price: "₦25,000",
    image: "/placeholder.svg?height=192&width=192&text=Hair+Extensions",
    images: [
      "/placeholder.svg?height=400&width=400&text=Hair+Main",
      "/placeholder.svg?height=400&width=400&text=Hair+Texture",
      "/placeholder.svg?height=400&width=400&text=Hair+Length",
      "/placeholder.svg?height=400&width=400&text=Hair+Color",
    ],
    alt: "Woman with braids",
    likes: 0,
    description:
      "100% human hair extensions with natural texture and beautiful finish. Available in multiple colors and lengths.",
    features: ["100% Human Hair", "Natural Texture", "Multiple Lengths", "Easy Installation"],
    rating: 4.7,
    reviews: 156,
  },
  {
    id: 5,
    name: "Solar Power Inverter",
    price: "₦150,000",
    image: "/placeholder.svg?height=192&width=192&text=Solar+Inverter",
    images: [
      "/placeholder.svg?height=400&width=400&text=Inverter+Main",
      "/placeholder.svg?height=400&width=400&text=Inverter+Display",
      "/placeholder.svg?height=400&width=400&text=Inverter+Ports",
      "/placeholder.svg?height=400&width=400&text=Inverter+Manual",
    ],
    alt: "Solar inverter",
    likes: 0,
    description:
      "High-efficiency solar power inverter with advanced MPPT technology. Perfect for residential and commercial use.",
    features: ["5KW Capacity", "MPPT Technology", "LCD Display", "Multiple Protection"],
    rating: 4.6,
    reviews: 94,
  },
]

// Mini popup component for success notification
function SuccessPopup({ show, productName }: { show: boolean; productName: string }) {
  if (!show) return null

  return (
    <div className="fixed top-4 right-4 z-[100] animate-in slide-in-from-top-2 duration-300">
      <div className="bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 max-w-sm">
        <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
          <Check className="w-4 h-4 text-green-500" />
        </div>
        <div>
          <p className="font-medium text-sm">Added to cart!</p>
          <p className="text-xs opacity-90 line-clamp-1">{productName}</p>
        </div>
      </div>
    </div>
  )
}

// Add this component after the SuccessPopup component around line 120
function MiniNotification({
  show,
  productName,
  position,
}: { show: boolean; productName: string; position: { x: number; y: number } }) {
  if (!show) return null

  return (
    <div
      className="fixed z-[100] animate-in slide-in-from-bottom-2 duration-300 pointer-events-none"
      style={{
        left: `${position.x}px`,
        top: `${position.y - 60}px`,
        transform: "translateX(-50%)",
      }}
    >
      <div className="bg-green-500 text-white px-3 py-2 rounded-lg shadow-lg flex items-center gap-2 text-sm whitespace-nowrap">
        <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
          <Check className="w-3 h-3 text-green-500" />
        </div>
        <span className="font-medium">Added to cart!</span>
      </div>
    </div>
  )
}

function ProductModal({ product }: { product: Product }) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [showSuccessPopup, setShowSuccessPopup] = useState(false)
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    addToCart(product)
    setShowSuccessPopup(true)
    setTimeout(() => setShowSuccessPopup(false), 3000)
  }

  return (
    <>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto p-0">
        <div className="grid grid-cols-2 gap-8 p-8">
          {/* Left Side - Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative h-96 bg-gray-100 rounded-lg overflow-hidden">
              <Image
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={product.alt}
                fill
                className="object-cover"
              />
            </div>

            {/* Image Gallery */}
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <div
                  key={index}
                  className={`relative h-20 bg-gray-100 rounded cursor-pointer border-2 ${
                    selectedImage === index ? "border-blue-500" : "border-transparent"
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.alt} view ${index + 1}`}
                    fill
                    className="object-cover rounded"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Product Details */}
          <div className="space-y-6">
            {/* Product Name and Rating */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h2>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < Math.floor(product.rating) ? "★" : "☆"}>
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-sm text-gray-600">({product.reviews} reviews)</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-gray-900">{product.price}</span>
              {product.originalPrice && (
                <span className="text-lg text-gray-500 line-through">{product.originalPrice}</span>
              )}
              {product.discount && <Badge className="bg-red-500 text-white">{product.discount}</Badge>}
            </div>

            {/* Description */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Product Description</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Features */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Key Features</h3>
              <ul className="space-y-1">
                {product.features.map((feature, index) => (
                  <li key={index} className="text-gray-600 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Share Product */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Share this product</h3>
              <div className="flex gap-3">
                <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                  <Facebook className="w-4 h-4 text-blue-600" />
                  Facebook
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                  <Twitter className="w-4 h-4 text-blue-400" />
                  Twitter
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                  <Instagram className="w-4 h-4 text-pink-600" />
                  Instagram
                </Button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Add to Cart
            </Button>

            {/* Payment Options */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <CreditCard className="w-5 h-5 text-blue-600" />
                <span className="font-semibold text-gray-900">Flexible Payment</span>
              </div>
              <p className="text-sm text-gray-600 mb-3">Buy Now Pay Later | 12 months installment available</p>
              <Button
                variant="outline"
                size="sm"
                className="text-blue-600 border-blue-600 hover:bg-blue-50 bg-transparent"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
      <SuccessPopup show={showSuccessPopup} productName={product.name} />
    </>
  )
}

export default function ProductGrid() {
  const { addToCart } = useCart()
  const [showSuccessPopup, setShowSuccessPopup] = useState(false)
  const [addedProductName, setAddedProductName] = useState("")
  // Add this after the existing useState declarations around line 100
  const [clickedButtonId, setClickedButtonId] = useState<number | null>(null)
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 })

  // Replace the existing handleAddToCart function around line 280
  const handleAddToCart = (product: Product, event?: React.MouseEvent) => {
    addToCart(product)
    setAddedProductName(product.name)
    setShowSuccessPopup(true)
    setTimeout(() => setShowSuccessPopup(false), 3000)

    // Show mini notification near the clicked button
    if (event) {
      const rect = (event.target as HTMLElement).getBoundingClientRect()
      setButtonPosition({
        x: rect.left + rect.width / 2,
        y: rect.top,
      })
      setClickedButtonId(product.id)
      setTimeout(() => setClickedButtonId(null), 2000)
    }
  }

  return (
    <>
      <div className="bg-white rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Daily Picks</h2>
          <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50 bg-transparent">
            View All
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-4">
          {products.map((product) => (
            <Card
              key={product.id}
              className="relative group cursor-pointer hover:shadow-lg transition-all duration-300"
            >
              <CardContent className="p-0">
                <div className="relative h-32 sm:h-40 md:h-48 overflow-hidden">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.alt}
                    fill
                    className="object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Discount Badge */}
                  {product.discount && (
                    <Badge className="absolute top-2 left-2 bg-red-500 text-white">{product.discount}</Badge>
                  )}

                  {/* Like Button */}
                  <div className="absolute top-2 right-2 flex items-center gap-1 text-white text-sm">
                    <Button variant="ghost" size="sm" className="text-white hover:bg-black/20 p-1 h-auto">
                      <Heart className="w-4 h-4" />
                    </Button>
                    <span>{product.likes}</span>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                    {/* Update the "Add to Cart" button in the hover overlay (around line 350) to include touchable opacity and pass the event: */}
                    <Button
                      size="sm"
                      className="bg-white text-gray-900 hover:bg-gray-100 active:scale-95 transition-all duration-150 shadow-md hover:shadow-lg"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleAddToCart(product, e)
                      }}
                    >
                      <ShoppingCart className="w-4 h-4 mr-1" />
                      Add to Cart
                    </Button>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          className="bg-white/90 text-gray-900 hover:bg-white border-white"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <ProductModal product={product} />
                    </Dialog>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-2 sm:p-3">
                  <h3 className="font-medium text-xs sm:text-sm text-gray-900 mb-1 line-clamp-2">{product.name}</h3>
                  <div className="flex items-center gap-1 sm:gap-2">
                    <span className="font-bold text-blue-600 text-sm sm:text-base">{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-xs text-gray-500 line-through">{product.originalPrice}</span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <SuccessPopup show={showSuccessPopup} productName={addedProductName} />
      <MiniNotification show={clickedButtonId !== null} productName={addedProductName} position={buttonPosition} />
    </>
  )
}
