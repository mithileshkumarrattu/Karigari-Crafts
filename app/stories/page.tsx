"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Clock, Heart, Share2, Search, BookOpen } from "lucide-react"
import Link from "next/link"
import { firestoreService } from "@/lib/firestore-service"

interface Story {
  id: string
  title: string
  excerpt: string
  content: string
  author: {
    name: string
    profile_image: string
    craft_type: string
  }
  featured_image: string
  category: string
  read_time: number
  likes: number
  published_date: string
  tags: string[]
}

export default function StoriesPage() {
  const [stories, setStories] = useState<Story[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  useEffect(() => {
    loadStories()
  }, [])

  const loadStories = async () => {
    try {
      setLoading(true)
      const storiesData = await firestoreService.getCollection("stories")

      if (storiesData.length > 0) {
        setStories(storiesData)
      } else {
        // Fallback to mock data if no stories in database
        setStories(mockStories)
      }
    } catch (error) {
      console.error("Error loading stories:", error)
      setStories(mockStories)
    } finally {
      setLoading(false)
    }
  }

  // Mock data as fallback
  const mockStories: Story[] = [
    {
      id: "1",
      title: "The Ancient Art of Madhubani: Colors That Tell Stories",
      excerpt:
        "Discover how Priya Sharma preserves the 2500-year-old tradition of Madhubani painting, passing down techniques from her grandmother.",
      content: "Full story content here...",
      author: {
        name: "Priya Sharma",
        profile_image: "/indian-artisan-weaving-traditional-textiles.jpg",
        craft_type: "Madhubani Painting",
      },
      featured_image: "/madhubani-painting-traditional-indian-art.jpg",
      category: "Traditional Arts",
      read_time: 5,
      likes: 234,
      published_date: "2024-01-15",
      tags: ["Madhubani", "Traditional Art", "Bihar", "Heritage"],
    },
    {
      id: "2",
      title: "From Clay to Soul: A Potter's Journey Through Generations",
      excerpt:
        "Rajesh Kumar shares how his family's pottery tradition has evolved while maintaining its authentic roots in the heart of Rajasthan.",
      content: "Full story content here...",
      author: {
        name: "Rajesh Kumar",
        profile_image: "/indian-pottery-artisan-creating-clay-vessels.jpg",
        craft_type: "Pottery",
      },
      featured_image: "/indian-pottery-artisan-creating-clay-vessels.jpg",
      category: "Craft Heritage",
      read_time: 7,
      likes: 189,
      published_date: "2024-01-10",
      tags: ["Pottery", "Rajasthan", "Family Tradition", "Terracotta"],
    },
    {
      id: "3",
      title: "Threads of Time: The Kashmiri Pashmina Legacy",
      excerpt:
        "Explore the intricate world of Kashmiri Pashmina weaving, where each thread carries centuries of tradition and unmatched craftsmanship.",
      content: "Full story content here...",
      author: {
        name: "Meera Devi",
        profile_image: "/indian-jewelry-artisan-crafting-silver-ornaments.jpg",
        craft_type: "Textile Weaving",
      },
      featured_image: "/kashmiri-pashmina-shawl-traditional-weaving.jpg",
      category: "Textile Arts",
      read_time: 6,
      likes: 312,
      published_date: "2024-01-08",
      tags: ["Pashmina", "Kashmir", "Weaving", "Luxury Crafts"],
    },
    {
      id: "4",
      title: "The Golden Threads of Banarasi Silk",
      excerpt:
        "Journey into the world of Banarasi silk weaving, where gold and silk intertwine to create India's most treasured textiles.",
      content: "Full story content here...",
      author: {
        name: "Amit Verma",
        profile_image: "/placeholder.svg",
        craft_type: "Silk Weaving",
      },
      featured_image: "/banarasi-silk-saree-close-up.jpg",
      category: "Textile Arts",
      read_time: 8,
      likes: 267,
      published_date: "2024-01-05",
      tags: ["Banarasi Silk", "Varanasi", "Silk Weaving", "Bridal Wear"],
    },
  ]

  const filteredStories = stories.filter((story) => {
    const matchesSearch =
      story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      story.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      story.author.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || story.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const categories = [...new Set(stories.map((s) => s.category))]

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="space-y-6">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="flex gap-6">
                    <div className="w-48 h-32 bg-muted rounded-lg"></div>
                    <div className="flex-1">
                      <div className="h-6 bg-muted rounded mb-3"></div>
                      <div className="h-4 bg-muted rounded mb-2"></div>
                      <div className="h-4 bg-muted rounded mb-4 w-3/4"></div>
                      <div className="flex gap-4">
                        <div className="h-4 bg-muted rounded w-20"></div>
                        <div className="h-4 bg-muted rounded w-16"></div>
                      </div>
                    </div>
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
            Artisan Stories & Heritage
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Discover the rich traditions, personal journeys, and cultural heritage behind every craft. Each story
            preserves centuries of wisdom.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search stories, authors, or crafts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Featured Story */}
        {filteredStories.length > 0 && (
          <Card className="mb-8 overflow-hidden border-border/50">
            <div className="relative h-64 md:h-80">
              <img
                src={filteredStories[0].featured_image || "/placeholder.svg"}
                alt={filteredStories[0].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <Badge className="bg-primary text-primary-foreground mb-3">Featured Story</Badge>
                <h2 className="text-2xl md:text-3xl font-bold mb-2 text-balance">{filteredStories[0].title}</h2>
                <p className="text-lg opacity-90 mb-4 text-pretty">{filteredStories[0].excerpt}</p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={filteredStories[0].author.profile_image || "/placeholder.svg"} />
                      <AvatarFallback>{filteredStories[0].author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{filteredStories[0].author.name}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{filteredStories[0].read_time} min read</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Stories List */}
        <div className="space-y-6">
          {filteredStories.slice(1).map((story) => (
            <Card key={story.id} className="group hover:shadow-lg transition-all duration-300 border-border/50">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-48 h-32 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={story.featured_image || "/placeholder.svg"}
                      alt={story.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-xs">
                        {story.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {new Date(story.published_date).toLocaleDateString()}
                      </span>
                    </div>

                    <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors text-balance">
                      {story.title}
                    </h3>

                    <p className="text-muted-foreground mb-4 text-pretty">{story.excerpt}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <Avatar className="w-6 h-6">
                            <AvatarImage src={story.author.profile_image || "/placeholder.svg"} />
                            <AvatarFallback className="text-xs">{story.author.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-medium text-foreground">{story.author.name}</span>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {story.read_time} min
                          </div>
                          <div className="flex items-center gap-1">
                            <Heart className="w-3 h-3" />
                            {story.likes}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Share2 className="w-4 h-4" />
                        </Button>
                        <Button asChild size="sm" className="bg-primary hover:bg-primary/90">
                          <Link href={`/stories/${story.id}`}>Read Story</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredStories.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No stories found</h3>
            <p className="text-muted-foreground">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  )
}
