"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Package, Truck, CheckCircle, Clock, Eye } from "lucide-react"

// Mock orders data
const mockOrders = [
  {
    id: "ORD-001",
    customer: "Priya Sharma",
    product: "Handwoven Banarasi Silk Saree",
    amount: 15000,
    status: "pending",
    date: "2024-01-15",
    image: "/indian-artisan-weaving-traditional-textiles.jpg",
  },
  {
    id: "ORD-002",
    customer: "Rajesh Kumar",
    product: "Traditional Terracotta Vase",
    amount: 2500,
    status: "processing",
    date: "2024-01-14",
    image: "/indian-pottery-artisan-creating-clay-vessels.jpg",
  },
  {
    id: "ORD-003",
    customer: "Meera Devi",
    product: "Silver Jhumka Earrings",
    amount: 3200,
    status: "shipped",
    date: "2024-01-13",
    image: "/indian-jewelry-artisan-crafting-silver-ornaments.jpg",
  },
  {
    id: "ORD-004",
    customer: "Amit Singh",
    product: "Handwoven Banarasi Silk Saree",
    amount: 15000,
    status: "delivered",
    date: "2024-01-10",
    image: "/indian-artisan-weaving-traditional-textiles.jpg",
  },
]

const statusConfig = {
  pending: { color: "bg-sunset-orange text-white", icon: Clock },
  processing: { color: "bg-soft-blue text-white", icon: Package },
  shipped: { color: "bg-heritage-gold text-deep-teal", icon: Truck },
  delivered: { color: "bg-sage-green text-white", icon: CheckCircle },
}

export function OrdersTab() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [orders] = useState(mockOrders)

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.product.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || order.status === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-warm-brown w-4 h-4" />
          <Input
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 border-warm-brown/30 focus:border-heritage-gold"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48 border-warm-brown/30 focus:border-heritage-gold">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Orders</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="processing">Processing</SelectItem>
            <SelectItem value="shipped">Shipped</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => {
          const StatusIcon = statusConfig[order.status as keyof typeof statusConfig].icon
          return (
            <Card key={order.id} className="border-warm-brown/20 hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  {/* Product Image */}
                  <img
                    src={order.image || "/placeholder.svg"}
                    alt={order.product}
                    className="w-16 h-16 object-cover rounded-lg border border-warm-brown/20"
                  />

                  {/* Order Details */}
                  <div className="flex-1 space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div>
                        <h3 className="font-semibold text-deep-teal">{order.id}</h3>
                        <p className="text-sm text-warm-brown">{order.customer}</p>
                      </div>
                      <Badge className={statusConfig[order.status as keyof typeof statusConfig].color}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Badge>
                    </div>

                    <p className="text-sm text-deep-teal font-medium">{order.product}</p>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div className="flex items-center gap-4 text-sm text-warm-brown">
                        <span>₹{order.amount.toLocaleString()}</span>
                        <span>•</span>
                        <span>{new Date(order.date).toLocaleDateString()}</span>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-heritage-gold text-heritage-gold hover:bg-heritage-gold hover:text-deep-teal bg-transparent"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                        {order.status === "pending" && (
                          <Button size="sm" className="bg-heritage-gold text-deep-teal hover:bg-heritage-gold/90">
                            Process Order
                          </Button>
                        )}
                        {order.status === "processing" && (
                          <Button size="sm" className="bg-soft-blue text-white hover:bg-soft-blue/90">
                            Mark as Shipped
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filteredOrders.length === 0 && (
        <Card className="border-warm-brown/20">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-warm-brown/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Package className="w-8 h-8 text-warm-brown" />
            </div>
            <h3 className="font-semibold text-deep-teal mb-2">No orders found</h3>
            <p className="text-warm-brown">
              {searchTerm || statusFilter !== "all"
                ? "Try adjusting your search or filter criteria."
                : "You haven't received any orders yet. Keep promoting your products!"}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
