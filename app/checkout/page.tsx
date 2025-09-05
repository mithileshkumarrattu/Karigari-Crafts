"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AuthProvider } from "@/contexts/AuthContext"
import { CartProvider, useCart } from "@/contexts/CartContext"
import { Navigation } from "@/components/ui/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CreditCard, Wallet, Building, Shield, Truck, ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"

function CheckoutContent() {
  const { state: cartState, clearCart } = useCart()
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("razorpay")
  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  })

  const shippingCost = cartState.total > 2000 ? 0 : 150
  const finalTotal = cartState.total + shippingCost

  const handleInputChange = (field: string, value: string) => {
    setShippingInfo((prev) => ({ ...prev, [field]: value }))
  }

  const handlePayment = async () => {
    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // Mock Razorpay integration
    const options = {
      key: "rzp_test_1234567890", // Test key
      amount: finalTotal * 100, // Amount in paise
      currency: "INR",
      name: "Karigari Crafts",
      description: "Authentic Indian Handicrafts",
      order_id: `order_${Date.now()}`,
      handler: (response: any) => {
        // Payment successful
        clearCart()
        router.push(`/order-confirmation?payment_id=${response.razorpay_payment_id}`)
      },
      prefill: {
        name: shippingInfo.fullName,
        email: shippingInfo.email,
        contact: shippingInfo.phone,
      },
      theme: {
        color: "#D4AF37", // Heritage gold
      },
    }

    // In a real app, you would load Razorpay script and create order
    // For demo purposes, we'll simulate success
    setTimeout(() => {
      clearCart()
      router.push("/order-confirmation?payment_id=pay_mock_123456")
    }, 1000)

    setIsProcessing(false)
  }

  if (cartState.items.length === 0) {
    return (
      <div className="min-h-screen bg-soft-cream flex items-center justify-center">
        <Card className="border-warm-brown/20 max-w-md">
          <CardContent className="p-8 text-center">
            <h2 className="text-xl font-serif font-bold text-deep-teal mb-4">Your cart is empty</h2>
            <p className="text-warm-brown mb-6">Add some beautiful crafts to your cart before checkout.</p>
            <Button className="bg-heritage-gold text-deep-teal hover:bg-heritage-gold/90" asChild>
              <Link href="/marketplace">Browse Products</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-soft-cream">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-warm-brown mb-6">
          <Link href="/marketplace" className="hover:text-heritage-gold flex items-center">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Continue Shopping
          </Link>
          <span>•</span>
          <span className="text-deep-teal">Checkout</span>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Information */}
            <Card className="border-warm-brown/20">
              <CardHeader>
                <CardTitle className="text-deep-teal flex items-center">
                  <Truck className="w-5 h-5 mr-2" />
                  Shipping Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-deep-teal">
                      Full Name
                    </Label>
                    <Input
                      id="fullName"
                      value={shippingInfo.fullName}
                      onChange={(e) => handleInputChange("fullName", e.target.value)}
                      className="border-warm-brown/30 focus:border-heritage-gold"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-deep-teal">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={shippingInfo.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="border-warm-brown/30 focus:border-heritage-gold"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-deep-teal">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    value={shippingInfo.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="border-warm-brown/30 focus:border-heritage-gold"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address" className="text-deep-teal">
                    Address
                  </Label>
                  <Input
                    id="address"
                    value={shippingInfo.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    className="border-warm-brown/30 focus:border-heritage-gold"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city" className="text-deep-teal">
                      City
                    </Label>
                    <Input
                      id="city"
                      value={shippingInfo.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      className="border-warm-brown/30 focus:border-heritage-gold"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state" className="text-deep-teal">
                      State
                    </Label>
                    <Input
                      id="state"
                      value={shippingInfo.state}
                      onChange={(e) => handleInputChange("state", e.target.value)}
                      className="border-warm-brown/30 focus:border-heritage-gold"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pincode" className="text-deep-teal">
                      Pincode
                    </Label>
                    <Input
                      id="pincode"
                      value={shippingInfo.pincode}
                      onChange={(e) => handleInputChange("pincode", e.target.value)}
                      className="border-warm-brown/30 focus:border-heritage-gold"
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card className="border-warm-brown/20">
              <CardHeader>
                <CardTitle className="text-deep-teal flex items-center">
                  <CreditCard className="w-5 h-5 mr-2" />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                  <div className="flex items-center space-x-3 p-4 border border-warm-brown/20 rounded-lg hover:bg-heritage-gold/5 transition-colors">
                    <RadioGroupItem value="razorpay" id="razorpay" />
                    <Label htmlFor="razorpay" className="flex-1 cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <CreditCard className="w-5 h-5 mr-3 text-soft-blue" />
                          <div>
                            <p className="font-medium text-deep-teal">Razorpay</p>
                            <p className="text-sm text-warm-brown">Credit/Debit Card, UPI, Net Banking</p>
                          </div>
                        </div>
                        <Badge className="bg-sage-green text-white">Recommended</Badge>
                      </div>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-3 p-4 border border-warm-brown/20 rounded-lg hover:bg-heritage-gold/5 transition-colors">
                    <RadioGroupItem value="wallet" id="wallet" />
                    <Label htmlFor="wallet" className="flex-1 cursor-pointer">
                      <div className="flex items-center">
                        <Wallet className="w-5 h-5 mr-3 text-sunset-orange" />
                        <div>
                          <p className="font-medium text-deep-teal">Digital Wallet</p>
                          <p className="text-sm text-warm-brown">Paytm, PhonePe, Google Pay</p>
                        </div>
                      </div>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-3 p-4 border border-warm-brown/20 rounded-lg hover:bg-heritage-gold/5 transition-colors">
                    <RadioGroupItem value="banking" id="banking" />
                    <Label htmlFor="banking" className="flex-1 cursor-pointer">
                      <div className="flex items-center">
                        <Building className="w-5 h-5 mr-3 text-deep-teal" />
                        <div>
                          <p className="font-medium text-deep-teal">Net Banking</p>
                          <p className="text-sm text-warm-brown">All major banks supported</p>
                        </div>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>

                <Alert className="mt-4 border-sage-green/20 bg-sage-green/5">
                  <Shield className="w-4 h-4" />
                  <AlertDescription className="text-sage-green">
                    Your payment information is secure and encrypted. We never store your card details.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card className="border-warm-brown/20 sticky top-8">
              <CardHeader>
                <CardTitle className="text-deep-teal">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Cart Items */}
                <div className="space-y-3">
                  {cartState.items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded-lg border border-warm-brown/20"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-deep-teal line-clamp-2">{item.name}</p>
                        <p className="text-xs text-warm-brown">{item.artisan.name}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-deep-teal">₹{item.price.toLocaleString()}</p>
                        <p className="text-xs text-warm-brown">Qty: {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator className="bg-warm-brown/20" />

                {/* Pricing Breakdown */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-warm-brown">Subtotal:</span>
                    <span className="text-deep-teal">₹{cartState.total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-warm-brown">Shipping:</span>
                    <span className="text-deep-teal">{shippingCost === 0 ? "Free" : `₹${shippingCost}`}</span>
                  </div>
                  {cartState.total > 2000 && (
                    <div className="text-xs text-sage-green">Free shipping on orders over ₹2000</div>
                  )}
                </div>

                <Separator className="bg-warm-brown/20" />

                <div className="flex justify-between font-semibold">
                  <span className="text-deep-teal">Total:</span>
                  <span className="text-xl text-deep-teal">₹{finalTotal.toLocaleString()}</span>
                </div>

                <Button
                  onClick={handlePayment}
                  disabled={isProcessing || !shippingInfo.fullName || !shippingInfo.email}
                  className="w-full bg-heritage-gold text-deep-teal hover:bg-heritage-gold/90"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Processing Payment...
                    </>
                  ) : (
                    `Pay ₹${finalTotal.toLocaleString()}`
                  )}
                </Button>

                <div className="text-xs text-warm-brown text-center">
                  By placing this order, you agree to our Terms of Service and Privacy Policy
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <AuthProvider>
      <CartProvider>
        <CheckoutContent />
      </CartProvider>
    </AuthProvider>
  )
}
