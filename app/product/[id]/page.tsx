"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { AuthProvider } from "@/contexts/AuthContext"
import { Navigation } from "@/components/ui/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Star,
  Heart,
  ShoppingCart,
  MapPin,
  Award,
  Clock,
  Truck,
  Shield,
  ArrowLeft,
  Share2,
  MessageCircle,
} from "lucide-react"
import Link from "next/link"

// Mock product data (in real app, this would come from API)
const mockProduct = {
  id: "1",
  name: "Handwoven Banarasi Silk Saree",
  category: "Textiles",
  price: 15000,
  images: [
    "/indian-artisan-weaving-traditional-textiles.jpg",
    "/banarasi-silk-saree-close-up.jpg",
    "/banarasi-silk-saree-pattern-detail.jpg",
    "/banarasi-silk-saree-gold-zari-work.jpg",
  ],
  artisan: {
    name: "Priya Sharma",
    location: "Varanasi, Uttar Pradesh",
    rating: 4.8,
    image: "/placeholder.svg",
    bio: "Master weaver with 25+ years of experience in traditional Banarasi silk weaving. Third-generation artisan preserving ancient techniques.",
    totalProducts: 47,
    totalSales: 1250,
  },
  story:
    "This exquisite Banarasi saree represents 200 years of family tradition, woven with pure silk and gold zari using ancient pit loom techniques passed down through generations. Each thread tells a story of cultural heritage and artistic mastery.",
  heritage_story:
    "The art of Banarasi weaving dates back to the Mughal era, when Persian motifs were first introduced to Indian silk weaving. This saree features the traditional paisley and floral patterns that have adorned Indian royalty for centuries. The gold zari work is done using real gold and silver threads, making each piece a treasured heirloom.",
  authenticity_score: 95,
  heritage_tags: ["Traditional Weaving", "Silk Craft", "Varanasi Heritage", "Mughal Patterns", "Gold Zari"],
  rating: 4.8,
  reviews: 127,
  isFavorite: false,
  specifications: {
    material: "Pure Silk with Gold Zari",
    dimensions: "6.5 meters length",
    weight: "800 grams",
    care: "Dry clean only",
    origin: "Varanasi, India",
    time_to_make: "3-4 weeks",
  },
  shipping: {
    domestic: "3-5 business days",
    international: "7-14 business days",
    returns: "30-day return policy",
  },
}

const mockReviews = [
  {
    id: "1",
    user: "Anita Desai",
    rating: 5,
    comment:
      "Absolutely stunning saree! The quality is exceptional and the story behind it makes it even more special.",
    date: "2024-01-10",
    verified: true,
  },
  {
    id: "2",
    user: "Kavya Patel",
    rating: 5,
    comment:
      "Beautiful craftsmanship. Priya's work is truly authentic and the AI-enhanced story helped me understand the cultural significance.",
    date: "2024-01-08",
    verified: true,
  },
  {
    id: "3",
    user: "Ritu Singh",
    rating: 4,
    comment: "Gorgeous saree with intricate details. Shipping was fast and packaging was excellent.",
    date: "2024-01-05",
    verified: true,
  },
]

export default function ProductPage() {
  const params = useParams()
  const [selectedImage, setSelectedImage] = useState(0)
  const [isFavorite, setIsFavorite] = useState(mockProduct.isFavorite)
  const [quantity, setQuantity] = useState(1)

  return (
    <AuthProvider>
      <div className="min-h-screen bg-soft-cream">
        <Navigation />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-sm text-warm-brown mb-6">
            <Link href="/marketplace" className="hover:text-heritage-gold flex items-center">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Marketplace
            </Link>
            <span>•</span>
            <span>{mockProduct.category}</span>
            <span>•</span>
            <span className="text-deep-teal">{mockProduct.name}</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="relative">
                <img
                  src={mockProduct.images[selectedImage] || "/placeholder.svg"}
                  alt={mockProduct.name}
                  className="w-full h-96 lg:h-[500px] object-cover rounded-lg border border-warm-brown/20"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-heritage-gold text-deep-teal">{mockProduct.authenticity_score}% Authentic</Badge>
                </div>
              </div>

              {/* Image Thumbnails */}
              <div className="grid grid-cols-4 gap-2">
                {mockProduct.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index ? "border-heritage-gold" : "border-warm-brown/20"
                    }`}
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`${mockProduct.name} ${index + 1}`}
                      className="w-full h-20 object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <div className="flex items-start justify-between mb-2">
                  <h1 className="text-3xl font-serif font-bold text-deep-teal">{mockProduct.name}</h1>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsFavorite(!isFavorite)}
                      className="text-warm-brown hover:text-warm-red"
                    >
                      <Heart className={`w-5 h-5 ${isFavorite ? "fill-warm-red text-warm-red" : ""}`} />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-warm-brown">
                      <Share2 className="w-5 h-5" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-heritage-gold fill-current" />
                    <span className="ml-1 font-medium text-deep-teal">{mockProduct.rating}</span>
                    <span className="ml-1 text-warm-brown">({mockProduct.reviews} reviews)</span>
                  </div>
                  <Badge className="bg-sage-green text-white">In Stock</Badge>
                </div>

                <p className="text-4xl font-bold text-deep-teal mb-6">₹{mockProduct.price.toLocaleString()}</p>
              </div>

              {/* Heritage Tags */}
              <div className="flex flex-wrap gap-2">
                {mockProduct.heritage_tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="border-sunset-orange/30 text-sunset-orange">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Artisan Info */}
              <Card className="border-warm-brown/20">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={mockProduct.artisan.image || "/placeholder.svg"} />
                      <AvatarFallback className="bg-heritage-gold text-deep-teal">
                        {mockProduct.artisan.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold text-deep-teal">{mockProduct.artisan.name}</h3>
                      <div className="flex items-center text-sm text-warm-brown">
                        <MapPin className="w-3 h-3 mr-1" />
                        {mockProduct.artisan.location}
                      </div>
                      <div className="flex items-center space-x-4 text-xs text-warm-brown mt-1">
                        <span>{mockProduct.artisan.totalProducts} products</span>
                        <span>•</span>
                        <span>{mockProduct.artisan.totalSales} sales</span>
                        <span>•</span>
                        <div className="flex items-center">
                          <Star className="w-3 h-3 text-heritage-gold fill-current mr-1" />
                          {mockProduct.artisan.rating}
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-heritage-gold text-heritage-gold hover:bg-heritage-gold hover:text-deep-teal bg-transparent"
                    >
                      <MessageCircle className="w-4 h-4 mr-1" />
                      Contact
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Purchase Section */}
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <label className="text-deep-teal font-medium">Quantity:</label>
                  <select
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="border border-warm-brown/30 rounded-lg px-3 py-2 focus:border-heritage-gold focus:outline-none"
                  >
                    {[1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex space-x-4">
                  <Button className="flex-1 bg-heritage-gold text-deep-teal hover:bg-heritage-gold/90">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                  <Button className="flex-1 bg-deep-teal text-soft-cream hover:bg-deep-teal/90">Buy Now</Button>
                </div>
              </div>

              {/* Shipping Info */}
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-10 h-10 bg-sage-green/10 rounded-lg flex items-center justify-center">
                    <Truck className="w-5 h-5 text-sage-green" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-deep-teal">Free Shipping</p>
                    <p className="text-xs text-warm-brown">Orders over ₹2000</p>
                  </div>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-10 h-10 bg-soft-blue/10 rounded-lg flex items-center justify-center">
                    <Shield className="w-5 h-5 text-soft-blue" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-deep-teal">Authenticity</p>
                    <p className="text-xs text-warm-brown">Guaranteed genuine</p>
                  </div>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-10 h-10 bg-sunset-orange/10 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-sunset-orange" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-deep-teal">Handmade</p>
                    <p className="text-xs text-warm-brown">3-4 weeks to craft</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <div className="mt-16">
            <Tabs defaultValue="story" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4 bg-white border border-warm-brown/20">
                <TabsTrigger
                  value="story"
                  className="data-[state=active]:bg-heritage-gold data-[state=active]:text-deep-teal"
                >
                  Story & Heritage
                </TabsTrigger>
                <TabsTrigger
                  value="specifications"
                  className="data-[state=active]:bg-heritage-gold data-[state=active]:text-deep-teal"
                >
                  Specifications
                </TabsTrigger>
                <TabsTrigger
                  value="reviews"
                  className="data-[state=active]:bg-heritage-gold data-[state=active]:text-deep-teal"
                >
                  Reviews ({mockProduct.reviews})
                </TabsTrigger>
                <TabsTrigger
                  value="shipping"
                  className="data-[state=active]:bg-heritage-gold data-[state=active]:text-deep-teal"
                >
                  Shipping & Returns
                </TabsTrigger>
              </TabsList>

              <TabsContent value="story" className="space-y-6">
                <Card className="border-warm-brown/20">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-serif font-bold text-deep-teal mb-4">Craft Story</h3>
                    <p className="text-warm-brown leading-relaxed mb-6">{mockProduct.story}</p>

                    <h3 className="text-xl font-serif font-bold text-deep-teal mb-4">Cultural Heritage</h3>
                    <p className="text-warm-brown leading-relaxed">{mockProduct.heritage_story}</p>

                    <div className="mt-6 p-4 bg-heritage-gold/5 rounded-lg border border-heritage-gold/20">
                      <div className="flex items-center mb-2">
                        <Award className="w-5 h-5 text-heritage-gold mr-2" />
                        <span className="font-semibold text-deep-teal">AI-Enhanced Authenticity Analysis</span>
                      </div>
                      <p className="text-sm text-warm-brown">
                        This product has been analyzed using advanced AI to verify its cultural authenticity and
                        traditional crafting methods, scoring {mockProduct.authenticity_score}% authentic.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="specifications">
                <Card className="border-warm-brown/20">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-serif font-bold text-deep-teal mb-4">Product Specifications</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {Object.entries(mockProduct.specifications).map(([key, value]) => (
                        <div key={key} className="flex justify-between py-2 border-b border-warm-brown/10">
                          <span className="font-medium text-deep-teal capitalize">{key.replace("_", " ")}:</span>
                          <span className="text-warm-brown">{value}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews">
                <div className="space-y-4">
                  {mockReviews.map((review) => (
                    <Card key={review.id} className="border-warm-brown/20">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="font-medium text-deep-teal">{review.user}</span>
                              {review.verified && (
                                <Badge className="bg-sage-green text-white text-xs">Verified Purchase</Badge>
                              )}
                            </div>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.rating ? "text-heritage-gold fill-current" : "text-warm-brown/30"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <span className="text-sm text-warm-brown">{new Date(review.date).toLocaleDateString()}</span>
                        </div>
                        <p className="text-warm-brown">{review.comment}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="shipping">
                <Card className="border-warm-brown/20">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-serif font-bold text-deep-teal mb-4">Shipping & Returns</h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-deep-teal mb-2">Shipping Times</h4>
                        <div className="space-y-2 text-warm-brown">
                          <p>• Domestic: {mockProduct.shipping.domestic}</p>
                          <p>• International: {mockProduct.shipping.international}</p>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-deep-teal mb-2">Returns Policy</h4>
                        <p className="text-warm-brown">{mockProduct.shipping.returns}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </AuthProvider>
  )
}
