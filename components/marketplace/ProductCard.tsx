"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/contexts/CartContext"
import { Star, Heart, MapPin, ShoppingCart } from "lucide-react"

interface Product {
  id: string
  name: string
  category: string
  price: number
  image: string
  artisan: {
    name: string
    location: string
    rating: number
    image: string
  }
  story: string
  authenticity_score: number
  heritage_tags: string[]
  rating: number
  reviews: number
  isFavorite: boolean
}

interface ProductCardProps {
  product: Product
  onToggleFavorite: (productId: string) => void
}

export function ProductCard({ product, onToggleFavorite }: ProductCardProps) {
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      artisan: {
        name: product.artisan.name,
        location: product.artisan.location,
      },
      category: product.category,
    })
  }

  return (
    <Card className="border-warm-brown/20 hover:shadow-lg transition-all duration-300 group overflow-hidden">
      <div className="relative">
        <Link href={`/product/${product.id}`}>
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </Link>

        {/* Favorite Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onToggleFavorite(product.id)}
          className="absolute top-3 right-3 h-8 w-8 p-0 bg-white/80 hover:bg-white"
        >
          <Heart className={`w-4 h-4 ${product.isFavorite ? "fill-warm-red text-warm-red" : "text-warm-brown"}`} />
        </Button>

        {/* Authenticity Badge */}
        <div className="absolute top-3 left-3">
          <Badge className="bg-heritage-gold text-deep-teal text-xs">{product.authenticity_score}% Authentic</Badge>
        </div>

        {/* Category Badge */}
        <div className="absolute bottom-3 left-3">
          <Badge className="bg-white/90 text-deep-teal text-xs">{product.category}</Badge>
        </div>
      </div>

      <CardContent className="p-4 space-y-3">
        {/* Product Name */}
        <Link href={`/product/${product.id}`}>
          <h3 className="font-semibold text-deep-teal line-clamp-2 hover:text-heritage-gold transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Artisan Info */}
        <div className="flex items-center space-x-2">
          <img
            src={product.artisan.image || "/placeholder.svg"}
            alt={product.artisan.name}
            className="w-6 h-6 rounded-full object-cover"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm text-deep-teal font-medium truncate">{product.artisan.name}</p>
            <div className="flex items-center text-xs text-warm-brown">
              <MapPin className="w-3 h-3 mr-1" />
              {product.artisan.location}
            </div>
          </div>
        </div>

        {/* Story Preview */}
        <p className="text-sm text-warm-brown line-clamp-2">{product.story}</p>

        {/* Heritage Tags */}
        <div className="flex flex-wrap gap-1">
          {product.heritage_tags.slice(0, 2).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs border-sunset-orange/30 text-sunset-orange">
              {tag}
            </Badge>
          ))}
          {product.heritage_tags.length > 2 && (
            <Badge variant="outline" className="text-xs border-warm-brown/30 text-warm-brown">
              +{product.heritage_tags.length - 2}
            </Badge>
          )}
        </div>

        {/* Rating and Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-heritage-gold fill-current" />
            <span className="text-sm font-medium text-deep-teal">{product.rating}</span>
            <span className="text-xs text-warm-brown">({product.reviews})</span>
          </div>
          <span className="text-lg font-bold text-deep-teal">₹{product.price.toLocaleString()}</span>
        </div>

        {/* Add to Cart Button */}
        <Button onClick={handleAddToCart} className="w-full bg-heritage-gold text-deep-teal hover:bg-heritage-gold/90">
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  )
}
