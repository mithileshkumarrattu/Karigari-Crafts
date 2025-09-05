"use client"

import { useSearchParams } from "next/navigation"
import { AuthProvider } from "@/contexts/AuthContext"
import { Navigation } from "@/components/ui/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Package, Truck, Download, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams()
  const paymentId = searchParams.get("payment_id")

  // Mock order data
  const orderData = {
    id: "ORD-2024-001",
    paymentId: paymentId || "pay_mock_123456",
    total: 18350,
    items: [
      {
        name: "Handwoven Banarasi Silk Saree",
        artisan: "Priya Sharma",
        price: 15000,
        quantity: 1,
        image: "/indian-artisan-weaving-traditional-textiles.jpg",
      },
      {
        name: "Silver Jhumka Earrings",
        artisan: "Meera Devi",
        price: 3200,
        quantity: 1,
        image: "/indian-jewelry-artisan-crafting-silver-ornaments.jpg",
      },
    ],
    shippingAddress: {
      name: "Customer Name",
      address: "123 Main Street, City, State - 123456",
    },
    estimatedDelivery: "7-10 business days",
    status: "confirmed",
  }

  return (
    <AuthProvider>
      <div className="min-h-screen bg-soft-cream">
        <Navigation />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-sage-green rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-serif font-bold text-deep-teal mb-2">Order Confirmed!</h1>
            <p className="text-warm-brown">
              Thank you for supporting traditional Indian artisans. Your order has been successfully placed.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Order Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Order Summary */}
              <Card className="border-warm-brown/20">
                <CardHeader>
                  <CardTitle className="text-deep-teal flex items-center justify-between">
                    <span>Order Details</span>
                    <Badge className="bg-sage-green text-white">Confirmed</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-warm-brown">Order ID:</p>
                      <p className="font-medium text-deep-teal">{orderData.id}</p>
                    </div>
                    <div>
                      <p className="text-warm-brown">Payment ID:</p>
                      <p className="font-medium text-deep-teal">{orderData.paymentId}</p>
                    </div>
                    <div>
                      <p className="text-warm-brown">Order Date:</p>
                      <p className="font-medium text-deep-teal">{new Date().toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-warm-brown">Estimated Delivery:</p>
                      <p className="font-medium text-deep-teal">{orderData.estimatedDelivery}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Ordered Items */}
              <Card className="border-warm-brown/20">
                <CardHeader>
                  <CardTitle className="text-deep-teal">Ordered Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {orderData.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-4 p-4 border border-warm-brown/10 rounded-lg"
                      >
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-deep-teal">{item.name}</h4>
                          <p className="text-sm text-warm-brown">by {item.artisan}</p>
                          <p className="text-sm text-warm-brown">Quantity: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-deep-teal">₹{item.price.toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Shipping Address */}
              <Card className="border-warm-brown/20">
                <CardHeader>
                  <CardTitle className="text-deep-teal flex items-center">
                    <Truck className="w-5 h-5 mr-2" />
                    Shipping Address
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-warm-brown">
                    <p className="font-medium text-deep-teal">{orderData.shippingAddress.name}</p>
                    <p>{orderData.shippingAddress.address}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Actions */}
            <div className="space-y-6">
              {/* Order Total */}
              <Card className="border-warm-brown/20">
                <CardHeader>
                  <CardTitle className="text-deep-teal">Order Total</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-deep-teal">₹{orderData.total.toLocaleString()}</p>
                    <p className="text-sm text-sage-green mt-1">Payment Successful</p>
                  </div>
                </CardContent>
              </Card>

              {/* Next Steps */}
              <Card className="border-warm-brown/20">
                <CardHeader>
                  <CardTitle className="text-deep-teal">What's Next?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-heritage-gold rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-deep-teal text-xs font-bold">1</span>
                    </div>
                    <div>
                      <p className="font-medium text-deep-teal">Order Processing</p>
                      <p className="text-sm text-warm-brown">Artisans are preparing your items</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-warm-brown/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-warm-brown text-xs font-bold">2</span>
                    </div>
                    <div>
                      <p className="font-medium text-deep-teal">Quality Check</p>
                      <p className="text-sm text-warm-brown">Items will be carefully inspected</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-warm-brown/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-warm-brown text-xs font-bold">3</span>
                    </div>
                    <div>
                      <p className="font-medium text-deep-teal">Shipping</p>
                      <p className="text-sm text-warm-brown">Secure packaging and dispatch</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button className="w-full bg-heritage-gold text-deep-teal hover:bg-heritage-gold/90" asChild>
                  <Link href="/orders">
                    <Package className="w-4 h-4 mr-2" />
                    Track Your Order
                  </Link>
                </Button>

                <Button
                  variant="outline"
                  className="w-full border-deep-teal text-deep-teal hover:bg-deep-teal hover:text-soft-cream bg-transparent"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Invoice
                </Button>

                <Button
                  variant="outline"
                  className="w-full border-heritage-gold text-heritage-gold hover:bg-heritage-gold hover:text-deep-teal bg-transparent"
                  asChild
                >
                  <Link href="/marketplace">
                    Continue Shopping
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Support Message */}
          <Card className="border-warm-brown/20 mt-8">
            <CardContent className="p-6 text-center">
              <h3 className="font-semibold text-deep-teal mb-2">Thank You for Supporting Artisans!</h3>
              <p className="text-warm-brown text-sm">
                Your purchase directly supports traditional craftspeople and helps preserve India's rich cultural
                heritage. You'll receive email updates about your order status and tracking information.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AuthProvider>
  )
}
