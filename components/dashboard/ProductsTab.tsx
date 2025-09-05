"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, MoreVertical, Edit, Trash2, Eye, Star, TrendingUp } from "lucide-react"

// Mock product data
const mockProducts = [
  {
    id: "1",
    name: "Handwoven Banarasi Silk Saree",
    category: "Textiles",
    price: 15000,
    stock: 5,
    status: "active",
    image: "/indian-artisan-weaving-traditional-textiles.jpg",
    rating: 4.8,
    orders: 23,
    authenticity_score: 95,
  },
  {
    id: "2",
    name: "Traditional Terracotta Vase",
    category: "Pottery",
    price: 2500,
    stock: 12,
    status: "active",
    image: "/indian-pottery-artisan-creating-clay-vessels.jpg",
    rating: 4.6,
    orders: 18,
    authenticity_score: 92,
  },
  {
    id: "3",
    name: "Silver Jhumka Earrings",
    category: "Jewelry",
    price: 3200,
    stock: 8,
    status: "active",
    image: "/indian-jewelry-artisan-crafting-silver-ornaments.jpg",
    rating: 4.9,
    orders: 31,
    authenticity_score: 98,
  },
]

export function ProductsTab() {
  const [searchTerm, setSearchTerm] = useState("")
  const [products] = useState(mockProducts)

  const filteredProducts = products.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-warm-brown w-4 h-4" />
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 border-warm-brown/30 focus:border-heritage-gold"
          />
        </div>
        <Button className="bg-heritage-gold text-deep-teal hover:bg-heritage-gold/90">Add New Product</Button>
      </div>

      {/* Products Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="border-warm-brown/20 hover:shadow-lg transition-shadow">
            <div className="relative">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="absolute top-3 right-3">
                <Badge
                  className={`${product.status === "active" ? "bg-sage-green text-white" : "bg-warm-brown text-white"}`}
                >
                  {product.status}
                </Badge>
              </div>
              <div className="absolute top-3 left-3">
                <Badge className="bg-heritage-gold text-deep-teal">{product.authenticity_score}% Authentic</Badge>
              </div>
            </div>

            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-deep-teal text-sm line-clamp-2">{product.name}</h3>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-warm-red">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="flex items-center space-x-2 mb-2">
                <Badge variant="outline" className="text-xs border-warm-brown/30">
                  {product.category}
                </Badge>
                <div className="flex items-center">
                  <Star className="w-3 h-3 text-heritage-gold fill-current" />
                  <span className="text-xs text-warm-brown ml-1">{product.rating}</span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-3">
                <span className="text-lg font-bold text-deep-teal">₹{product.price.toLocaleString()}</span>
                <span className="text-sm text-warm-brown">Stock: {product.stock}</span>
              </div>

              <div className="flex items-center justify-between text-xs text-warm-brown">
                <div className="flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  {product.orders} orders
                </div>
                <span>ID: {product.id}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <Card className="border-warm-brown/20">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-warm-brown/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-warm-brown" />
            </div>
            <h3 className="font-semibold text-deep-teal mb-2">No products found</h3>
            <p className="text-warm-brown mb-4">Try adjusting your search terms or add your first product.</p>
            <Button className="bg-heritage-gold text-deep-teal hover:bg-heritage-gold/90">
              Add Your First Product
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
