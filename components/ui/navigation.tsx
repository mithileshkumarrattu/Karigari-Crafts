"use client"

import Link from "next/link"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CartDrawer } from "@/components/cart/CartDrawer"
import { User, Heart, LogOut } from "lucide-react"

export function Navigation() {
  const { user, userProfile, logout } = useAuth()

  return (
    <nav className="bg-soft-cream border-b border-warm-brown/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-heritage-gold rounded-lg flex items-center justify-center">
              <span className="text-deep-teal font-bold text-lg">K</span>
            </div>
            <span className="font-serif font-bold text-xl text-deep-teal">Karigari Crafts</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/marketplace" className="text-deep-teal hover:text-heritage-gold transition-colors">
              Marketplace
            </Link>
            <Link href="/artisans" className="text-deep-teal hover:text-heritage-gold transition-colors">
              Artisans
            </Link>
            <Link href="/stories" className="text-deep-teal hover:text-heritage-gold transition-colors">
              Stories
            </Link>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <CartDrawer />
                <Button variant="ghost" size="sm" className="text-deep-teal">
                  <Heart className="w-4 h-4" />
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={userProfile?.profile_image || "/placeholder.svg"} />
                        <AvatarFallback className="bg-heritage-gold text-deep-teal">
                          {userProfile?.name?.charAt(0) || "U"}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end">
                    <DropdownMenuItem asChild>
                      <Link href={userProfile?.role === "artisan" ? "/dashboard" : "/profile"}>
                        <User className="mr-2 h-4 w-4" />
                        {userProfile?.role === "artisan" ? "Dashboard" : "Profile"}
                      </Link>
                    </DropdownMenuItem>
                    {userProfile?.role === "buyer" && (
                      <DropdownMenuItem asChild>
                        <Link href="/orders">
                          <User className="mr-2 h-4 w-4" />
                          My Orders
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem onClick={logout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" asChild className="text-deep-teal">
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button asChild className="bg-heritage-gold text-deep-teal hover:bg-heritage-gold/90">
                  <Link href="/register">Join Us</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
