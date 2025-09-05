"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MapPin, Star, Search, Filter } from "lucide-react"
import Link from "next/link"
import { firestoreService } from "@/lib/firestore-service"

interface Artisan {
  id: string
  name: string
  craft_type: string
  location: string
  bio: string
  profile_image: string
  rating: number
  total_products: number
  years_experience: number
  specialties: string[]
  verified: boolean
}

export default function ArtisansPage() {
  const [artisans, setArtisans] = useState<Artisan[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCraft, setSelectedCraft] = useState("all")
  const [selectedLocation, setSelectedLocation] = useState("all")

  useEffect(() => {
    loadArtisans()
  }, [])

  const loadArtisans = async () => {
    try {
      setLoading(true)
      const artisanProfiles = await firestoreService.getCollection("users", [
        { field: "role", operator: "==", value: "artisan" },
      ])

      // Transform the data to match our interface
      const transformedArtisans = artisanProfiles.map((profile: any) => ({
        id: profile.id,
        name: profile.name || "Unknown Artisan",
        craft_type: profile.craft_type || "Traditional Crafts",
        location: profile.location || "India",
        bio: profile.bio || "Passionate artisan preserving traditional crafts",
        profile_image: profile.profile_image || "/placeholder.svg",
        rating: profile.rating || 4.5,
        total_products: profile.total_products || 0,
        years_experience: profile.years_experience || 5,
        specialties: profile.specialties || [],
        verified: profile.verified || false,
      }))

      setArtisans(transformedArtisans)
    } catch (error) {
      console.error("Error loading artisans:", error)
      // Fallback to mock data if Firebase fails
      setArtisans(mockArtisans)
    } finally {
      setLoading(false)
    }
  }

  // Mock data as fallback
  const mockArtisans: Artisan[] = [
    {
      id: "1",
      name: "Priya Sharma",
      craft_type: "Madhubani Painting",
      location: "Bihar, India",
      bio: "Master artist specializing in traditional Madhubani paintings with 15 years of experience.",
      profile_image: "/indian-artisan-weaving-traditional-textiles.jpg",
      rating: 4.9,
      total_products: 45,
      years_experience: 15,
      specialties: ["Traditional Motifs", "Natural Colors", "Wedding Art"],
      verified: true,
    },
    {
      id: "2",
      name: "Rajesh Kumar",
      craft_type: "Pottery",
      location: "Rajasthan, India",
      bio: "Third-generation potter creating beautiful terracotta and ceramic pieces.",
      profile_image: "/indian-pottery-artisan-creating-clay-vessels.jpg",
      rating: 4.7,
      total_products: 32,
      years_experience: 12,
      specialties: ["Terracotta", "Blue Pottery", "Decorative Vases"],
      verified: true,
    },
    {
      id: "3",
      name: "Meera Devi",
      craft_type: "Jewelry Making",
      location: "Gujarat, India",
      bio: "Skilled jewelry artisan creating intricate silver and brass ornaments.",
      profile_image: "/indian-jewelry-artisan-crafting-silver-ornaments.jpg",
      rating: 4.8,
      total_products: 28,
      years_experience: 10,
      specialties: ["Silver Work", "Traditional Designs", "Bridal Jewelry"],
      verified: false,
    },
  ]

  const filteredArtisans = artisans.filter((artisan) => {
    const matchesSearch =
      artisan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artisan.craft_type.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCraft = selectedCraft === "all" || artisan.craft_type === selectedCraft
    const matchesLocation = selectedLocation === "all" || artisan.location.includes(selectedLocation)

    return matchesSearch && matchesCraft && matchesLocation
  })

  const craftTypes = [...new Set(artisans.map((a) => a.craft_type))]
  const locations = [...new Set(artisans.map((a) => a.location.split(",")[0]))]

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="h-32 bg-muted rounded-lg mb-4"></div>
                  <div className="h-4 bg-muted rounded mb-2"></div>
                  <div className="h-3 bg-muted rounded mb-4"></div>
                  <div className="flex gap-2">
                    <div className="h-6 w-16 bg-muted rounded"></div>
                    <div className="h-6 w-20 bg-muted rounded"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Meet Our Talented Artisans
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Discover the masters behind the crafts. Each artisan brings generations of knowledge and passion to their
            work.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search artisans by name or craft..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={selectedCraft} onValueChange={setSelectedCraft}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="All Crafts" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Crafts</SelectItem>
              {craftTypes.map((craft) => (
                <SelectItem key={craft} value={craft}>
                  {craft}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedLocation} onValueChange={setSelectedLocation}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="All Locations" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              {locations.map((location) => (
                <SelectItem key={location} value={location}>
                  {location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Artisans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArtisans.map((artisan) => (
            <Card key={artisan.id} className="group hover:shadow-lg transition-all duration-300 border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={artisan.profile_image || "/placeholder.svg"} alt={artisan.name} />
                    <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                      {artisan.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-lg text-foreground">{artisan.name}</h3>
                      {artisan.verified && (
                        <Badge variant="secondary" className="bg-sage-green text-white text-xs">
                          Verified
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground font-medium">{artisan.craft_type}</p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      {artisan.location}
                    </div>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{artisan.bio}</p>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-heritage-gold text-heritage-gold" />
                    <span className="text-sm font-medium">{artisan.rating}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">{artisan.total_products} products</div>
                  <div className="text-sm text-muted-foreground">{artisan.years_experience}+ years</div>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {artisan.specialties.slice(0, 2).map((specialty) => (
                    <Badge key={specialty} variant="outline" className="text-xs">
                      {specialty}
                    </Badge>
                  ))}
                  {artisan.specialties.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{artisan.specialties.length - 2} more
                    </Badge>
                  )}
                </div>

                <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Link href={`/artisan/${artisan.id}`}>View Profile</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredArtisans.length === 0 && (
          <div className="text-center py-12">
            <Filter className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No artisans found</h3>
            <p className="text-muted-foreground">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  )
}
