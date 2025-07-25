"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Plus, Minus, Trash2, ShoppingBag, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useCart } from "../../contexts/cart-context"

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, getTotalPrice } = useCart()

  const deliveryFee = 2500
  const subtotal = items.reduce((sum, item) => {
    const price = Number.parseFloat(item.price.replace(/[₦,]/g, ""))
    return sum + price * item.quantity
  }, 0)
  const total = subtotal + deliveryFee

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b px-6 py-4">
          <div className="max-w-4xl mx-auto flex items-center gap-4">
            <Link href="/" className="text-gray-600 hover:text-gray-800">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
          </div>
        </div>

        {/* Empty Cart */}
        <div className="max-w-4xl mx-auto px-6 py-12">
          <Card>
            <CardContent className="p-12 text-center">
              <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
              <p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
              <Link href="/">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">Continue Shopping</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center gap-4">
          <Link href="/" className="text-gray-600 hover:text-gray-800">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
          <span className="text-gray-500">({items.length} items)</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-3 sm:gap-4 p-3 sm:p-4 border border-gray-100 rounded-lg hover:border-gray-200 transition-colors"
                    >
                      {/* Product Image */}
                      <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.alt || item.name}
                          fill
                          className="object-cover"
                        />
                        {item.discount && (
                          <div className="absolute top-1 left-1 bg-red-500 text-white text-xs px-1 py-0.5 rounded">
                            {item.discount}
                          </div>
                        )}
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">{item.name}</h3>
                        <div className="flex items-center gap-2 mb-2">
                          <p className="text-lg font-bold text-blue-600">{item.price}</p>
                          {item.originalPrice && (
                            <p className="text-sm text-gray-500 line-through">{item.originalPrice}</p>
                          )}
                        </div>

                        {/* Rating if available */}
                        {item.rating > 0 && (
                          <div className="flex items-center gap-1 mb-2">
                            <div className="flex text-yellow-400 text-sm">
                              {[...Array(5)].map((_, i) => (
                                <span key={i} className={i < Math.floor(item.rating) ? "★" : "☆"}>
                                  ★
                                </span>
                              ))}
                            </div>
                            <span className="text-xs text-gray-500">({item.reviews})</span>
                          </div>
                        )}

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2 sm:gap-4">
                          <div className="flex items-center border border-gray-300 rounded-lg">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 sm:h-10 sm:w-10 p-0 hover:bg-gray-100"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
                            </Button>
                            <span className="w-8 sm:w-12 text-center font-medium text-sm sm:text-base">
                              {item.quantity}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 sm:h-10 sm:w-10 p-0 hover:bg-gray-100"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                            </Button>
                          </div>

                          {/* Delete Button */}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50 p-2"
                            onClick={() => {
                              removeFromCart(item.id)
                              console.log(`Removed ${item.name} from cart`)
                            }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Item Total */}
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">
                          ₦{(Number.parseFloat(item.price.replace(/[₦,]/g, "")) * item.quantity).toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-500">
                          ₦{Number.parseFloat(item.price.replace(/[₦,]/g, "")).toLocaleString()} each
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Continue Shopping */}
            <div className="mt-6">
              <Link href="/">
                <Button variant="outline" className="bg-transparent border-blue-600 text-blue-600 hover:bg-blue-50">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Cart Summary</h2>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal ({items.length} items)</span>
                    <span className="font-semibold">₦{subtotal.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span className="font-semibold">₦{deliveryFee.toLocaleString()}</span>
                  </div>

                  <Separator />

                  <div className="flex justify-between text-lg">
                    <span className="font-bold text-gray-900">Total</span>
                    <span className="font-bold text-gray-900">₦{total.toLocaleString()}</span>
                  </div>
                </div>

                <div className="mt-8 space-y-3">
                  <Link href="/cart/checkout" className="block">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold">
                      <CreditCard className="w-5 h-5 mr-2" />
                      Proceed to Checkout
                    </Button>
                  </Link>

                  <div className="text-center">
                    <p className="text-sm text-gray-500">Free delivery on orders above ₦50,000</p>
                  </div>
                </div>

                {/* Security Badge */}
                <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-2 text-green-700">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium">Secure Checkout</span>
                  </div>
                  <p className="text-xs text-green-600 mt-1">
                    Your payment information is protected with 256-bit SSL encryption
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
