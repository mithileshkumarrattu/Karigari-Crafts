"use client"

import type React from "react"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Package, Plus, ShoppingCart, DollarSign, LogOut, BarChart3 } from "lucide-react"
import Link from "next/link"

interface DashboardLayoutProps {
  children: React.ReactNode
  activeTab: string
}

export function DashboardLayout({ children, activeTab }: DashboardLayoutProps) {
  const { userProfile, logout } = useAuth()

  return (
    <div className="min-h-screen bg-soft-cream">
      {/* Header */}
      <header className="bg-white border-b border-warm-brown/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-heritage-gold rounded-lg flex items-center justify-center">
                <span className="text-deep-teal font-bold text-lg">K</span>
              </div>
              <span className="font-serif font-bold text-xl text-deep-teal">Karigari Crafts</span>
            </Link>

            {/* User Profile */}
            <div className="flex items-center space-x-4">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-deep-teal">{userProfile?.name}</p>
                <p className="text-xs text-warm-brown capitalize">{userProfile?.role}</p>
              </div>
              <Avatar className="h-10 w-10">
                <AvatarImage src={userProfile?.profile_image || "/placeholder.svg"} />
                <AvatarFallback className="bg-heritage-gold text-deep-teal">
                  {userProfile?.name?.charAt(0) || "A"}
                </AvatarFallback>
              </Avatar>
              <Button variant="ghost" size="sm" onClick={logout} className="text-deep-teal">
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold text-deep-teal mb-2">Welcome back, {userProfile?.name}!</h1>
          <p className="text-warm-brown">Manage your crafts and grow your business with AI-powered tools</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-warm-brown/20">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-heritage-gold/10 rounded-lg flex items-center justify-center">
                  <Package className="w-4 h-4 text-heritage-gold" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-deep-teal">12</p>
                  <p className="text-xs text-warm-brown">Products</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-warm-brown/20">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-sunset-orange/10 rounded-lg flex items-center justify-center">
                  <ShoppingCart className="w-4 h-4 text-sunset-orange" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-deep-teal">28</p>
                  <p className="text-xs text-warm-brown">Orders</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-warm-brown/20">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-sage-green/10 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-4 h-4 text-sage-green" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-deep-teal">₹45,200</p>
                  <p className="text-xs text-warm-brown">Earnings</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-warm-brown/20">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-soft-blue/10 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-4 h-4 text-soft-blue" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-deep-teal">4.8</p>
                  <p className="text-xs text-warm-brown">Rating</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Tabs */}
        <Tabs value={activeTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 bg-white border border-warm-brown/20">
            <TabsTrigger
              value="products"
              className="data-[state=active]:bg-heritage-gold data-[state=active]:text-deep-teal"
            >
              <Package className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">My Products</span>
              <span className="sm:hidden">Products</span>
            </TabsTrigger>
            <TabsTrigger
              value="add-product"
              className="data-[state=active]:bg-heritage-gold data-[state=active]:text-deep-teal"
            >
              <Plus className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Add Product</span>
              <span className="sm:hidden">Add</span>
            </TabsTrigger>
            <TabsTrigger
              value="orders"
              className="data-[state=active]:bg-heritage-gold data-[state=active]:text-deep-teal"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Orders</span>
              <span className="sm:hidden">Orders</span>
            </TabsTrigger>
            <TabsTrigger
              value="earnings"
              className="data-[state=active]:bg-heritage-gold data-[state=active]:text-deep-teal"
            >
              <DollarSign className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Earnings</span>
              <span className="sm:hidden">Earnings</span>
            </TabsTrigger>
          </TabsList>

          {children}
        </Tabs>
      </div>
    </div>
  )
}
