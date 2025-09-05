"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import { Navigation } from "@/components/ui/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { Package, Truck, CheckCircle, Clock, ArrowLeft, Download, MessageCircle, MapPin } from "lucide-react"
import Link from "next/link"

interface OrderDetails {
  id: string
  date: string
  status: "processing" | "shipped" | "delivered" | "cancelled"
  total: number
  subtotal: number
  shipping: number
  tax: number
  items: Array<{
    id: string
    name: string
    artisan: string
    price: number
    quantity: number
    image: string
    category: string
  }>
  trackingNumber?: string
  estimatedDelivery?: string
  shippingAddress: {
    name: string
    address: string
    city: string
    state: string
    pincode: string
    phone: string
  }
  timeline: Array<{
    status: string
    date: string
    description: string
    completed: boolean
  }>
}

export default function OrderDetailsPage() {
  const params = useParams()
  const { user } = useAuth()
  const [order, setOrder] = useState<OrderDetails | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock order details
    const mockOrder: OrderDetails = {
      id: params.id as string,
      date: "2024-01-15",
      status: "shipped",
      subtotal: 18200,
      shipping: 150,
      tax: 0,
      total: 18350,
      trackingNumber: "TRK123456789",
      estimatedDelivery: "Jan 25, 2024",
      items: [
        {
          id: "1",
          name: "Handwoven Banarasi Silk Saree",
          artisan: "Priya Sharma",
          price: 15000,
          quantity: 1,
          image: "/banarasi-silk-saree-close-up.jpg",
          category: "Textiles",
        },
        {
          id: "2",
          name: "Silver Jhumka Earrings",
          artisan: "Meera Devi",
          price: 3200,
          quantity: 1,
          image: "/indian-jewelry-artisan-crafting-silver-ornaments.jpg",
          category: "Jewelry",
        },
      ],
      shippingAddress: {
        name: "John Doe",
        address: "123 Main Street, Apartment 4B",
        city: "Mumbai",
        state: "Maharashtra",
        pincode: "400001",
        phone: "+91 98765 43210",
      },
      timeline: [
        {
          status: "Order Placed",
          date: "2024-01-15",
          description: "Your order has been confirmed and payment received",
          completed: true,
        },
        {
          status: "Processing",
          date: "2024-01-16",
          description: "Artisans are preparing your items with care",
          completed: true,
        },
        {
          status: "Quality Check",
          date: "2024-01-18",
          description: "Items inspected and approved for shipping",
          completed: true,
        },
        {
          status: "Shipped",
          date: "2024-01-20",
          description: "Package dispatched and on its way to you",
          completed: true,
        },
        {
          status: "Out for Delivery",
          date: "2024-01-24",
          description: "Package is out for delivery in your area",
          completed: false,
        },
        {
          status: "Delivered",
          date: "2024-01-25",
          description: "Package delivered successfully",
          completed: false,
        },
      ],
    }

    setOrder(mockOrder)
    setLoading(false)
  }, [params.id])

  const getStatusProgress = (status: string) => {
    switch (status) {
      case "processing":
        return 25
      case "shipped":
        return 60
      case "delivered":
        return 100
      case "cancelled":
        return 0
      default:
        return 0
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-soft-cream flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-heritage-gold mx-auto mb-4"></div>
          <p className="text-warm-brown">Loading order details...</p>
        </div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-soft-cream flex items-center justify-center">
        <Card className="border-warm-brown/20 max-w-md">
          <CardContent className="p-8 text-center">
            <h2 className="text-xl font-serif font-bold text-deep-teal mb-4">Order Not Found</h2>
            <p className="text-warm-brown mb-6">
              The order you're looking for doesn't exist or you don't have access to it.
            </p>
            <Button className="bg-heritage-gold text-deep-teal hover:bg-heritage-gold/90" asChild>
              <Link href="/orders">Back to Orders</Link>
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
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/orders" className="text-warm-brown hover:text-heritage-gold">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Orders
            </Link>
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Header */}
            <Card className="border-warm-brown/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-deep-teal">Order {order.id}</CardTitle>
                    <p className="text-sm text-warm-brown mt-1">
                      Placed on {new Date(order.date).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge
                    className={`${
                      order.status === "delivered"
                        ? "bg-sage-green"
                        : order.status === "shipped"
                          ? "bg-soft-blue"
                          : order.status === "processing"
                            ? "bg-sunset-orange"
                            : "bg-warm-brown"
                    } text-white`}
                  >
                    <span className="capitalize">{order.status}</span>
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-warm-brown">Order Progress</span>
                      <span className="text-sm font-medium text-deep-teal">{getStatusProgress(order.status)}%</span>
                    </div>
                    <Progress value={getStatusProgress(order.status)} className="h-2" />
                  </div>

                  {order.trackingNumber && (
                    <div className="flex items-center justify-between p-3 bg-soft-blue/10 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Truck className="w-4 h-4 text-soft-blue" />
                        <span className="text-sm text-deep-teal">Tracking Number</span>
                      </div>
                      <span className="text-sm font-mono text-deep-teal">{order.trackingNumber}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Order Timeline */}
            <Card className="border-warm-brown/20">
              <CardHeader>
                <CardTitle className="text-deep-teal">Order Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.timeline.map((event, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          event.completed ? "bg-sage-green" : "bg-warm-brown/20"
                        }`}
                      >
                        {event.completed ? (
                          <CheckCircle className="w-4 h-4 text-white" />
                        ) : (
                          <Clock className="w-4 h-4 text-warm-brown" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className={`font-medium ${event.completed ? "text-deep-teal" : "text-warm-brown"}`}>
                            {event.status}
                          </h4>
                          <span className="text-sm text-warm-brown">{event.date}</span>
                        </div>
                        <p className="text-sm text-warm-brown mt-1">{event.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Order Items */}
            <Card className="border-warm-brown/20">
              <CardHeader>
                <CardTitle className="text-deep-teal">Order Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
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
                        <p className="text-sm text-warm-brown">Category: {item.category}</p>
                        <p className="text-sm text-warm-brown">Quantity: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-deep-teal">₹{item.price.toLocaleString()}</p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-2 border-heritage-gold text-heritage-gold hover:bg-heritage-gold hover:text-deep-teal bg-transparent"
                        >
                          <MessageCircle className="w-3 h-3 mr-1" />
                          Review
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Order Summary */}
            <Card className="border-warm-brown/20">
              <CardHeader>
                <CardTitle className="text-deep-teal">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-warm-brown">Subtotal:</span>
                  <span className="text-deep-teal">₹{order.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-warm-brown">Shipping:</span>
                  <span className="text-deep-teal">{order.shipping === 0 ? "Free" : `₹${order.shipping}`}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-warm-brown">Tax:</span>
                  <span className="text-deep-teal">₹{order.tax}</span>
                </div>
                <Separator className="bg-warm-brown/20" />
                <div className="flex justify-between font-semibold">
                  <span className="text-deep-teal">Total:</span>
                  <span className="text-xl text-deep-teal">₹{order.total.toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>

            {/* Shipping Address */}
            <Card className="border-warm-brown/20">
              <CardHeader>
                <CardTitle className="text-deep-teal flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  Shipping Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm space-y-1">
                  <p className="font-medium text-deep-teal">{order.shippingAddress.name}</p>
                  <p className="text-warm-brown">{order.shippingAddress.address}</p>
                  <p className="text-warm-brown">
                    {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
                  </p>
                  <p className="text-warm-brown">{order.shippingAddress.phone}</p>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="space-y-3">
              <Button className="w-full bg-heritage-gold text-deep-teal hover:bg-heritage-gold/90">
                <Download className="w-4 h-4 mr-2" />
                Download Invoice
              </Button>

              <Button
                variant="outline"
                className="w-full border-deep-teal text-deep-teal hover:bg-deep-teal hover:text-soft-cream bg-transparent"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Contact Support
              </Button>

              {order.status === "delivered" && (
                <Button
                  variant="outline"
                  className="w-full border-sage-green text-sage-green hover:bg-sage-green hover:text-white bg-transparent"
                >
                  <Package className="w-4 h-4 mr-2" />
                  Return/Exchange
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
