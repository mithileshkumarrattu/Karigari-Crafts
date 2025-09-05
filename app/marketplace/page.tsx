"use client"

import { useState } from "react"
import { AuthProvider } from "@/contexts/AuthContext"
import { Navigation } from "@/components/ui/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ProductCard } from "@/components/marketplace/ProductCard"
import { Search, Filter } from "lucide-react"

// Mock products data
const mockProducts = [
  {
    id: "1",
    name: "Handwoven Banarasi Silk Saree",
    category: "Textiles",
    price: 15000,
    image: "/indian-artisan-weaving-traditional-textiles.jpg",
    artisan: {
      name: "Priya Sharma",
      location: "Varanasi, UP",
      rating: 4.8,
      image: "/placeholder.svg",
    },
    story:
      "This exquisite Banarasi saree represents 200 years of family tradition, woven with pure silk and gold zari using ancient pit loom techniques.",
    authenticity_score: 95,
    heritage_tags: ["Traditional Weaving", "Silk Craft", "Varanasi Heritage"],
    rating: 4.8,
    reviews: 127,
    isFavorite: false,
  },
  {
    id: "2",
    name: "Traditional Terracotta Vase",
    category: "Pottery",
    price: 2500,
    image: "/indian-pottery-artisan-creating-clay-vessels.jpg",
    artisan: {
      name: "Rajesh Kumar",
      location: "Khurja, UP",
      rating: 4.6,
      image: "/placeholder.svg",
    },
    story:
      "Hand-thrown terracotta vase using clay from the banks of Ganges, fired in traditional kilns passed down through generations.",
    authenticity_score: 92,
    heritage_tags: ["Terracotta Art", "Khurja Pottery", "River Clay"],
    rating: 4.6,
    reviews: 89,
    isFavorite: true,
  },
  {
    id: "3",
    name: "Silver Jhumka Earrings",
    category: "Jewelry",
    price: 3200,
    image: "/indian-jewelry-artisan-crafting-silver-ornaments.jpg",
    artisan: {
      name: "Meera Devi",
      location: "Jaipur, RJ",
      rating: 4.9,
      image: "/placeholder.svg",
    },
    story:
      "Intricate Rajasthani silver jhumkas featuring traditional motifs, crafted using age-old techniques of the royal jewelers.",
    authenticity_score: 98,
    heritage_tags: ["Rajasthani Jewelry", "Silver Craft", "Royal Heritage"],
    rating: 4.9,
    reviews: 156,
    isFavorite: false,
  },
  {
    id: "4",
    name: "Madhubani Painting",
    category: "Art",
    price: 4500,
    image: "/madhubani-painting-traditional-indian-art.jpg",
    artisan: {
      name: "Sunita Jha",
      location: "Madhubani, BR",
      rating: 4.7,
      image: "/placeholder.svg",
    },
    story:
      "Authentic Madhubani painting depicting ancient folklore, created using natural pigments and traditional brush techniques.",
    authenticity_score: 96,
    heritage_tags: ["Madhubani Art", "Folk Painting", "Bihar Heritage"],
    rating: 4.7,
    reviews: 73,
    isFavorite: false,
  },
  {
    id: "5",
    name: "Kashmiri Pashmina Shawl",
    category: "Textiles",
    price: 8500,
    image: "/kashmiri-pashmina-shawl-traditional-weaving.jpg",
    artisan: {
      name: "Abdul Rahman",
      location: "Srinagar, JK",
      rating: 4.8,
      image: "/placeholder.svg",
    },
    story:
      "Pure Pashmina shawl hand-woven from the finest Changthangi goat wool, featuring traditional Kashmiri patterns.",
    authenticity_score: 97,
    heritage_tags: ["Pashmina Craft", "Kashmir Weaving", "Himalayan Heritage"],
    rating: 4.8,
    reviews: 94,
    isFavorite: true,
  },
  {
    id: "6",
    name: "Wooden Elephant Sculpture",
    category: "Woodwork",
    price: 1800,
    image: "/wooden-elephant-sculpture-indian-handicraft.jpg",
    artisan: {
      name: "Ravi Shankar",
      location: "Mysore, KA",
      rating: 4.5,
      image: "/placeholder.svg",
    },
    story:
      "Hand-carved rosewood elephant showcasing the intricate woodworking traditions of Mysore's master craftsmen.",
    authenticity_score: 89,
    heritage_tags: ["Wood Carving", "Mysore Craft", "Rosewood Art"],
    rating: 4.5,
    reviews: 62,
    isFavorite: false,
  },
]

const categories = ["All", "Textiles", "Pottery", "Jewelry", "Art", "Woodwork", "Metalwork"]
const locations = ["All Locations", "Uttar Pradesh", "Rajasthan", "Bihar", "Jammu & Kashmir", "Karnataka"]
const sortOptions = ["Featured", "Price: Low to High", "Price: High to Low", "Newest", "Most Popular"]

export default function MarketplacePage() {
  const [products, setProducts] = useState(mockProducts)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedLocation, setSelectedLocation] = useState("All Locations")
  const [sortBy, setSortBy] = useState("Featured")
  const [showFilters, setShowFilters] = useState(false)

  const toggleFavorite = (productId: string) => {
    setProducts((prev) =>
      prev.map((product) => (product.id === productId ? { ...product, isFavorite: !product.isFavorite } : product)),
    )
  }

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.artisan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.story.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory

    const matchesLocation =
      selectedLocation === "All Locations" || product.artisan.location.includes(selectedLocation.split(" ")[0])

    return matchesSearch && matchesCategory && matchesLocation
  })

  return (
    <AuthProvider>
      <div className="min-h-screen bg-soft-cream">
        <Navigation />

        {/* Hero Section */}
        <section className="bg-deep-teal py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-soft-cream mb-4">
              Discover Authentic Indian Crafts
            </h1>
            <p className="text-xl text-soft-cream/80 mb-8 max-w-2xl mx-auto">
              Explore handcrafted treasures from master artisans across India, each piece telling a unique cultural
              story
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-warm-brown w-5 h-5" />
              <Input
                placeholder="Search for crafts, artisans, or stories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-3 text-lg border-0 bg-white/95 focus:bg-white"
              />
            </div>
          </div>
        </section>

        {/* Filters and Results */}
        <section className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Filter Bar */}
            <div className="flex flex-col lg:flex-row gap-4 mb-8">
              <div className="flex flex-wrap gap-4 flex-1">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-48 border-warm-brown/30 focus:border-heritage-gold">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger className="w-48 border-warm-brown/30 focus:border-heritage-gold">
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((location) => (
                      <SelectItem key={location} value={location}>
                        {location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48 border-warm-brown/30 focus:border-heritage-gold">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="border-heritage-gold text-heritage-gold hover:bg-heritage-gold hover:text-deep-teal bg-transparent lg:hidden"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>

            {/* Results Count */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-warm-brown">
                Showing {filteredProducts.length} of {products.length} products
              </p>
              <div className="flex items-center gap-2">
                <Badge className="bg-heritage-gold/10 text-heritage-gold border-heritage-gold/20">
                  AI-Enhanced Stories
                </Badge>
                <Badge className="bg-sage-green/10 text-sage-green border-sage-green/20">Authentic Crafts</Badge>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} onToggleFavorite={toggleFavorite} />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <Card className="border-warm-brown/20 mt-8">
                <CardContent className="p-12 text-center">
                  <div className="w-16 h-16 bg-warm-brown/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-warm-brown" />
                  </div>
                  <h3 className="font-semibold text-deep-teal mb-2">No products found</h3>
                  <p className="text-warm-brown mb-4">
                    Try adjusting your search terms or filters to discover more amazing crafts.
                  </p>
                  <Button
                    onClick={() => {
                      setSearchTerm("")
                      setSelectedCategory("All")
                      setSelectedLocation("All Locations")
                    }}
                    className="bg-heritage-gold text-deep-teal hover:bg-heritage-gold/90"
                  >
                    Clear Filters
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </section>

        {/* Recommended Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-serif font-bold text-deep-teal mb-8">You Might Also Like</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.slice(0, 4).map((product) => (
                <ProductCard key={`rec-${product.id}`} product={product} onToggleFavorite={toggleFavorite} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </AuthProvider>
  )
}
