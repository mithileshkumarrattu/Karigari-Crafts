import { Navigation } from "@/components/ui/navigation"
import { AuthProvider } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Sparkles, Users, Globe, Heart, Star, ArrowRight, Play } from "lucide-react"

export default function HomePage() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-soft-cream">
        <Navigation />

        {/* Hero Section */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <Badge className="mb-6 bg-heritage-gold/10 text-heritage-gold border-heritage-gold/20">
              AI-Powered Artisan Platform
            </Badge>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-deep-teal mb-6 text-balance">
              Empowering Indian Artisans Through
              <span className="text-heritage-gold"> AI Innovation</span>
            </h1>
            <p className="text-xl text-warm-brown mb-8 max-w-3xl mx-auto text-pretty">
              Discover authentic handcrafted treasures while supporting traditional artisans. Our AI-powered platform
              bridges ancient craftsmanship with modern digital audiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-heritage-gold text-deep-teal hover:bg-heritage-gold/90" asChild>
                <Link href="/marketplace">
                  Explore Crafts
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-deep-teal text-deep-teal hover:bg-deep-teal hover:text-soft-cream bg-transparent"
                asChild
              >
                <Link href="/register?role=artisan">Join as Artisan</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-serif font-bold text-center text-deep-teal mb-12">
              Bridging Tradition with Technology
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="border-warm-brown/20 hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-heritage-gold/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-6 h-6 text-heritage-gold" />
                  </div>
                  <h3 className="font-semibold text-deep-teal mb-2">AI-Powered Stories</h3>
                  <p className="text-warm-brown text-sm">
                    Transform craft narratives with intelligent storytelling and cultural heritage analysis
                  </p>
                </CardContent>
              </Card>

              <Card className="border-warm-brown/20 hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-sunset-orange/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Users className="w-6 h-6 text-sunset-orange" />
                  </div>
                  <h3 className="font-semibold text-deep-teal mb-2">Artisan Community</h3>
                  <p className="text-warm-brown text-sm">
                    Connect with skilled craftspeople and learn about their traditional techniques
                  </p>
                </CardContent>
              </Card>

              <Card className="border-warm-brown/20 hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-soft-blue/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Globe className="w-6 h-6 text-soft-blue" />
                  </div>
                  <h3 className="font-semibold text-deep-teal mb-2">Global Reach</h3>
                  <p className="text-warm-brown text-sm">
                    Expand market access and connect with international buyers worldwide
                  </p>
                </CardContent>
              </Card>

              <Card className="border-warm-brown/20 hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-sage-green/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-6 h-6 text-sage-green" />
                  </div>
                  <h3 className="font-semibold text-deep-teal mb-2">Cultural Preservation</h3>
                  <p className="text-warm-brown text-sm">
                    Preserve and celebrate India's rich artistic heritage for future generations
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Featured Artisans Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-serif font-bold text-deep-teal mb-4">Meet Our Featured Artisans</h2>
              <p className="text-warm-brown max-w-2xl mx-auto">
                Discover the stories behind the crafts and connect with master artisans preserving centuries-old
                traditions
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Featured Artisan Cards */}
              <Card className="border-warm-brown/20 hover:shadow-lg transition-all duration-300 group">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src="/indian-artisan-weaving-traditional-textiles.jpg"
                    alt="Artisan at work"
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-heritage-gold text-deep-teal">Handloom</Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center mb-2">
                    <div className="flex text-heritage-gold">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <span className="text-sm text-warm-brown ml-2">(127 reviews)</span>
                  </div>
                  <h3 className="font-semibold text-deep-teal mb-2">Priya Sharma</h3>
                  <p className="text-warm-brown text-sm mb-4">
                    Master weaver from Varanasi specializing in Banarasi silk sarees with 25+ years of experience
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-heritage-gold text-heritage-gold hover:bg-heritage-gold hover:text-deep-teal bg-transparent"
                  >
                    View Profile
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-warm-brown/20 hover:shadow-lg transition-all duration-300 group">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src="/indian-pottery-artisan-creating-clay-vessels.jpg"
                    alt="Pottery artisan"
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-sunset-orange text-white">Pottery</Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center mb-2">
                    <div className="flex text-heritage-gold">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <span className="text-sm text-warm-brown ml-2">(89 reviews)</span>
                  </div>
                  <h3 className="font-semibold text-deep-teal mb-2">Rajesh Kumar</h3>
                  <p className="text-warm-brown text-sm mb-4">
                    Traditional potter from Khurja creating authentic terracotta and ceramic pieces
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-heritage-gold text-heritage-gold hover:bg-heritage-gold hover:text-deep-teal bg-transparent"
                  >
                    View Profile
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-warm-brown/20 hover:shadow-lg transition-all duration-300 group">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src="/indian-jewelry-artisan-crafting-silver-ornaments.jpg"
                    alt="Jewelry artisan"
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-sage-green text-white">Jewelry</Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center mb-2">
                    <div className="flex text-heritage-gold">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <span className="text-sm text-warm-brown ml-2">(156 reviews)</span>
                  </div>
                  <h3 className="font-semibold text-deep-teal mb-2">Meera Devi</h3>
                  <p className="text-warm-brown text-sm mb-4">
                    Silver jewelry artisan from Jaipur creating intricate traditional Rajasthani designs
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-heritage-gold text-heritage-gold hover:bg-heritage-gold hover:text-deep-teal bg-transparent"
                  >
                    View Profile
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-serif font-bold text-center text-deep-teal mb-12">
              How Karigari Crafts Works
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-heritage-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-deep-teal font-bold text-xl">1</span>
                </div>
                <h3 className="font-semibold text-deep-teal mb-2">Discover & Connect</h3>
                <p className="text-warm-brown">
                  Browse authentic crafts and connect directly with skilled artisans from across India
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-sunset-orange rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">2</span>
                </div>
                <h3 className="font-semibold text-deep-teal mb-2">Learn Their Stories</h3>
                <p className="text-warm-brown">
                  Explore AI-enhanced narratives about traditional techniques and cultural heritage
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-sage-green rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">3</span>
                </div>
                <h3 className="font-semibold text-deep-teal mb-2">Support & Purchase</h3>
                <p className="text-warm-brown">
                  Make secure purchases and directly support artisan communities and their craft traditions
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-deep-teal">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-serif font-bold text-soft-cream mb-6">
              Ready to Transform Your Craft Business?
            </h2>
            <p className="text-xl text-soft-cream/80 mb-8">
              Join thousands of artisans already using AI to tell their stories and grow their reach
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-heritage-gold text-deep-teal hover:bg-heritage-gold/90" asChild>
                <Link href="/register">Get Started Today</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-soft-cream text-soft-cream hover:bg-soft-cream hover:text-deep-teal bg-transparent"
                asChild
              >
                <Link href="/marketplace">
                  <Play className="w-4 h-4 mr-2" />
                  Watch Demo
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-deep-teal/5 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-heritage-gold rounded-lg flex items-center justify-center">
                    <span className="text-deep-teal font-bold text-lg">K</span>
                  </div>
                  <span className="font-serif font-bold text-xl text-deep-teal">Karigari Crafts</span>
                </div>
                <p className="text-warm-brown text-sm">
                  Empowering Indian artisans through AI-powered storytelling and global marketplace access.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-deep-teal mb-4">For Artisans</h4>
                <ul className="space-y-2 text-sm text-warm-brown">
                  <li>
                    <Link href="/register?role=artisan" className="hover:text-heritage-gold">
                      Join as Artisan
                    </Link>
                  </li>
                  <li>
                    <Link href="/dashboard" className="hover:text-heritage-gold">
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link href="/resources" className="hover:text-heritage-gold">
                      Resources
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-deep-teal mb-4">For Buyers</h4>
                <ul className="space-y-2 text-sm text-warm-brown">
                  <li>
                    <Link href="/marketplace" className="hover:text-heritage-gold">
                      Marketplace
                    </Link>
                  </li>
                  <li>
                    <Link href="/artisans" className="hover:text-heritage-gold">
                      Find Artisans
                    </Link>
                  </li>
                  <li>
                    <Link href="/stories" className="hover:text-heritage-gold">
                      Craft Stories
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-deep-teal mb-4">Support</h4>
                <ul className="space-y-2 text-sm text-warm-brown">
                  <li>
                    <Link href="/help" className="hover:text-heritage-gold">
                      Help Center
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="hover:text-heritage-gold">
                      Contact Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/about" className="hover:text-heritage-gold">
                      About
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t border-warm-brown/20 mt-8 pt-8 text-center">
              <p className="text-warm-brown text-sm">
                © 2024 Karigari Crafts. Preserving heritage, empowering artisans.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </AuthProvider>
  )
}
