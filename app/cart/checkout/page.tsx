"use client"

import Link from "next/link"
import { useState } from "react"
import { ArrowLeft, MapPin, User, CreditCard, Clock, Banknote, Shield, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { useCart } from "../../../contexts/cart-context"
import Image from "next/image"

export default function CheckoutPage() {
  const { items, getTotalPrice } = useCart()
  const [paymentMethod, setPaymentMethod] = useState("paystack")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [deliveryInfo, setDeliveryInfo] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
  })

  const deliveryFee = 2500
  const subtotal = items.reduce((sum, item) => {
    const price = Number.parseFloat(item.price.replace(/[₦,]/g, ""))
    return sum + price * item.quantity
  }, 0)
  const total = subtotal + deliveryFee

  const handleInputChange = (field: string, value: string) => {
    setDeliveryInfo((prev) => ({ ...prev, [field]: value }))
  }

  const handlePlaceOrder = () => {
    // Handle order placement logic here
    console.log("Order placed:", { deliveryInfo, paymentMethod, items, total })
    alert("Order placed successfully!")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/cart" className="text-gray-600 hover:text-gray-800">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>
          </div>

          {/* X Icon to go back home */}
          <Link href="/" className="text-gray-600 hover:text-gray-800">
            <X className="w-6 h-6" />
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Address */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  Delivery Address
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {!isLoggedIn ? (
                  <div className="text-center py-8">
                    <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Sign in for faster checkout</h3>
                    <p className="text-gray-600 mb-6">Access your saved addresses and payment methods</p>
                    <div className="flex gap-4 justify-center">
                      <Link href="/account">
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white">Sign In</Button>
                      </Link>
                      <Button
                        variant="outline"
                        onClick={() => setIsLoggedIn(true)}
                        className="bg-transparent border-gray-300"
                      >
                        Continue as Guest
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input
                        id="fullName"
                        placeholder="Enter your full name"
                        value={deliveryInfo.fullName}
                        onChange={(e) => handleInputChange("fullName", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        placeholder="Enter your phone number"
                        value={deliveryInfo.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <Label htmlFor="address">Street Address *</Label>
                      <Textarea
                        id="address"
                        placeholder="Enter your full address"
                        value={deliveryInfo.address}
                        onChange={(e) => handleInputChange("address", e.target.value)}
                        className="mt-1"
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        placeholder="Enter your city"
                        value={deliveryInfo.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State *</Label>
                      <Input
                        id="state"
                        placeholder="Enter your state"
                        value={deliveryInfo.state}
                        onChange={(e) => handleInputChange("state", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Payment Method */}
            {isLoggedIn && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-blue-600" />
                    Payment Method
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                    {/* Paystack */}
                    <div className="flex items-start space-x-2 sm:space-x-3 p-3 sm:p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                      <RadioGroupItem value="paystack" id="paystack" className="mt-1" />
                      <div className="flex-1">
                        <Label htmlFor="paystack" className="flex items-center gap-3 cursor-pointer">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <CreditCard className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">Paystack</div>
                            <div className="text-sm text-gray-600">Credit/Debit Card Payment</div>
                          </div>
                        </Label>
                        <p className="text-xs text-gray-500 mt-2 ml-13">
                          Pay securely with your Visa, Mastercard, or Verve card
                        </p>
                      </div>
                    </div>

                    {/* Credit Direct */}
                    <div className="flex items-start space-x-2 sm:space-x-3 p-3 sm:p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                      <RadioGroupItem value="credit-direct" id="credit-direct" className="mt-1" />
                      <div className="flex-1">
                        <Label htmlFor="credit-direct" className="flex items-center gap-3 cursor-pointer">
                          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                            <Clock className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">Credit Direct</div>
                            <div className="text-sm text-gray-600">Buy Now Pay Later</div>
                          </div>
                        </Label>
                        <p className="text-xs text-gray-500 mt-2 ml-13">
                          Get your items now and pay in flexible installments
                        </p>
                      </div>
                    </div>

                    {/* Purchase Loan */}
                    <div className="flex items-start space-x-2 sm:space-x-3 p-3 sm:p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                      <RadioGroupItem value="purchase-loan" id="purchase-loan" className="mt-1" />
                      <div className="flex-1">
                        <Label htmlFor="purchase-loan" className="flex items-center gap-3 cursor-pointer">
                          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                            <Banknote className="w-5 h-5 text-purple-600" />
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">Purchase Loan</div>
                            <div className="text-sm text-gray-600">Flexible Payment Plan</div>
                          </div>
                        </Label>
                        <p className="text-xs text-gray-500 mt-2 ml-13">
                          Apply for a purchase loan with competitive interest rates
                        </p>
                      </div>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Items */}
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3 text-sm">
                      <div className="relative w-12 h-12 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.alt || item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 line-clamp-2">{item.name}</p>
                        <div className="flex items-center gap-2 text-gray-600">
                          <span>Qty: {item.quantity}</span>
                          {item.discount && (
                            <span className="text-xs bg-red-100 text-red-600 px-1 py-0.5 rounded">{item.discount}</span>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">
                          ₦{(Number.parseFloat(item.price.replace(/[₦,]/g, "")) * item.quantity).toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-500">
                          ₦{Number.parseFloat(item.price.replace(/[₦,]/g, "")).toLocaleString()} each
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Totals */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold">₦{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span className="font-semibold">₦{deliveryFee.toLocaleString()}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>₦{total.toLocaleString()}</span>
                  </div>
                </div>

                {/* Place Order Button */}
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold mt-6"
                  onClick={handlePlaceOrder}
                  disabled={!isLoggedIn}
                >
                  Place Order
                </Button>

                {/* Security Info */}
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 text-gray-700 mb-2">
                    <Shield className="w-4 h-4" />
                    <span className="text-sm font-medium">Secure Payment</span>
                  </div>
                  <p className="text-xs text-gray-600">
                    Your payment information is encrypted and secure. We never store your card details.
                  </p>
                </div>

                {/* Delivery Info */}
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm font-medium text-blue-900 mb-1">Estimated Delivery</p>
                  <p className="text-xs text-blue-700">3-5 business days within Lagos</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
