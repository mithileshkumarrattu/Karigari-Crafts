"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { Navigation } from "@/components/ui/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Package, Truck, CheckCircle, Clock, Search, Filter, Eye } from "lucide-react"
import Link from "next/link"

interface Order {
  id: string
  date: string
  status: "processing" | "shipped" | "delivered" | "cancelled"
  total: number
  items: Array<{
    name: string
    artisan: string
    price: number
    quantity: number
    image: string
  }>
  trackingNumber?: string
  estimatedDelivery?: string
}

export default function OrdersPage() {
  const { user, userProfile } = useAuth()
  const [orders, setOrders] = useState<Order[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Mock orders data
  useEffect(() => {
    const mockOrders: Order[] = [
      {
        id: "ORD-2024-001",
        date: "2024-01-15",
        status: "delivered",
        total: 18350,
        trackingNumber: "TRK123456789",
        items: [
          {
            name: "Handwoven Banarasi Silk Saree",
            artisan: "Priya Sharma",
            price: 15000,
            quantity: 1,
            image: "/banarasi-silk-saree-close-up.jpg",
          },
          {
            name: "Silver Jhumka Earrings",
            artisan: "Meera Devi",
            price: 3200,
            quantity: 1,
            image: "/indian-jewelry-artisan-crafting-silver-ornaments.jpg",
          },
        ],
      },
      {
        id: "ORD-2024-002",
        date: "2024-01-20",
        status: "shipped",
        total: 8500,
        trackingNumber: "TRK987654321",
        estimatedDelivery: "Jan 25, 2024",
        items: [
          {
            name: "Madhubani Painting",
            artisan: "Sunita Kumari",
            price: 8500,
            quantity: 1,
            image: "/madhubani-painting-traditional-indian-art.jpg",
          },
        ],
      },
      {
        id: "ORD-2024-003",
        date: "2024-01-22",
        status: "processing",
        total: 12000,
        estimatedDelivery: "Jan 30, 2024",
        items: [
          {
            name: "Wooden Elephant Sculpture",
            artisan: "Ravi Kumar",
            price: 12000,
            quantity: 1,
            image: "/wooden-elephant-sculpture-indian-handicraft.jpg",
          },
        ],
      },
    ]
    setOrders(mockOrders)
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "processing":
        return <Clock className="w-4 h-4" />
      case "shipped":
        return <Truck className="w-4 h-4" />
      case "delivered":
        return <CheckCircle className="w-4 h-4" />
      default:
        return <Package className="w-4 h-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "processing":
        return "bg-sunset-orange text-white"
      case "shipped":
        return "bg-soft-blue text-white"
      case "delivered":
        return "bg-sage-green text-white"
      case "cancelled":
        return "bg-warm-red text-white"
      default:
        return "bg-warm-brown text-white"
    }
  }

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.items.some(
        (item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.artisan.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  if (!user) {
    return (
      <div className="min-h-screen bg-soft-cream flex items-center justify-center">
        <Card className="border-warm-brown/20 max-w-md">
          <CardContent className="p-8 text-center">
            <h2 className="text-xl font-serif font-bold text-deep-teal mb-4">Please Sign In</h2>
            <p className="text-warm-brown mb-6">You need to be signed in to view your orders.</p>
            <Button className="bg-heritage-gold text-deep-teal hover:bg-heritage-gold/90" asChild>
              <Link href="/login">Sign In</Link>
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
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold text-deep-teal mb-2">My Orders</h1>
          <p className="text-warm-brown">Track and manage your purchases from talented artisans</p>
        </div>

        {/* Search and Filter */}
        <Card className="border-warm-brown/20 mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-warm-brown w-4 h-4" />
                <Input
                  placeholder="Search orders, products, or artisans..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-warm-brown/30 focus:border-heritage-gold"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-warm-brown" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border border-warm-brown/30 rounded-md bg-soft-cream text-deep-teal focus:border-heritage-gold focus:outline-none"
                >
                  <option value="all">All Orders</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Orders List */}
        <div className="space-y-6">
          {filteredOrders.length === 0 ? (
            <Card className="border-warm-brown/20">
              <CardContent className="p-12 text-center">
                <Package className="w-16 h-16 text-warm-brown/40 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-deep-teal mb-2">No Orders Found</h3>
                <p className="text-warm-brown mb-6">
                  {searchTerm || statusFilter !== "all"
                    ? "No orders match your search criteria."
                    : "You haven't placed any orders yet. Start exploring our beautiful crafts!"}
                </p>
                <Button className="bg-heritage-gold text-deep-teal hover:bg-heritage-gold/90" asChild>
                  <Link href="/marketplace">Browse Products</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            filteredOrders.map((order) => (
              <Card key={order.id} className="border-warm-brown/20 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-deep-teal flex items-center space-x-2">
                        <span>Order {order.id}</span>
                        <Badge className={getStatusColor(order.status)}>
                          {getStatusIcon(order.status)}
                          <span className="ml-1 capitalize">{order.status}</span>
                        </Badge>
                      </CardTitle>
                      <p className="text-sm text-warm-brown mt-1">
                        Placed on {new Date(order.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-deep-teal">₹{order.total.toLocaleString()}</p>
                      {order.trackingNumber && (
                        <p className="text-sm text-soft-blue">Tracking: {order.trackingNumber}</p>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Order Items */}
                    <div className="space-y-3">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex items-center space-x-4 p-3 bg-heritage-gold/5 rounded-lg">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="w-12 h-12 object-cover rounded-lg border border-warm-brown/20"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-deep-teal">{item.name}</h4>
                            <p className="text-sm text-warm-brown">by {item.artisan}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-deep-teal">₹{item.price.toLocaleString()}</p>
                            <p className="text-sm text-warm-brown">Qty: {item.quantity}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Order Status Info */}
                    {order.estimatedDelivery && (
                      <div className="flex items-center justify-between p-3 bg-soft-blue/10 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <Truck className="w-4 h-4 text-soft-blue" />
                          <span className="text-sm text-deep-teal">
                            {order.status === "delivered" ? "Delivered" : "Estimated Delivery"}
                          </span>
                        </div>
                        <span className="text-sm font-medium text-deep-teal">{order.estimatedDelivery}</span>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3 pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-deep-teal text-deep-teal hover:bg-deep-teal hover:text-soft-cream bg-transparent"
                        asChild
                      >
                        <Link href={`/orders/${order.id}`}>
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Link>
                      </Button>

                      {order.status === "shipped" && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-soft-blue text-soft-blue hover:bg-soft-blue hover:text-white bg-transparent"
                        >
                          <Truck className="w-4 h-4 mr-2" />
                          Track Package
                        </Button>
                      )}

                      {order.status === "delivered" && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-heritage-gold text-heritage-gold hover:bg-heritage-gold hover:text-deep-teal bg-transparent"
                        >
                          Write Review
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
