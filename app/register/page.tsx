"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, ArrowLeft, Palette, ShoppingBag } from "lucide-react"

export default function RegisterPage() {
  const searchParams = useSearchParams()
  const defaultRole = (searchParams.get("role") as "artisan" | "buyer") || "buyer"

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: defaultRole,
    bio: "",
    location: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const { signUp } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      setLoading(false)
      return
    }

    try {
      await signUp(formData.email, formData.password, {
        name: formData.name,
        role: formData.role,
        bio: formData.bio,
        location: formData.location,
      })
      router.push(formData.role === "artisan" ? "/dashboard" : "/marketplace")
    } catch (err: any) {
      setError(err.message || "Failed to create account")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-soft-cream flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back to Home */}
        <Link
          href="/"
          className="inline-flex items-center text-deep-teal hover:text-heritage-gold mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        <Card className="border-warm-brown/20 shadow-lg">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-heritage-gold rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-deep-teal font-bold text-2xl">K</span>
            </div>
            <CardTitle className="text-2xl font-serif text-deep-teal">Join Karigari Crafts</CardTitle>
            <CardDescription className="text-warm-brown">Create your account and start your journey</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert className="border-warm-red/20 bg-warm-red/5">
                  <AlertDescription className="text-warm-red">{error}</AlertDescription>
                </Alert>
              )}

              {/* Role Selection */}
              <div className="space-y-3">
                <Label className="text-deep-teal">I want to join as:</Label>
                <RadioGroup
                  value={formData.role}
                  onValueChange={(value) => setFormData({ ...formData, role: value as "artisan" | "buyer" })}
                  className="grid grid-cols-2 gap-4"
                >
                  <div className="flex items-center space-x-2 border border-warm-brown/30 rounded-lg p-3 hover:bg-heritage-gold/5 transition-colors">
                    <RadioGroupItem value="artisan" id="artisan" />
                    <Label htmlFor="artisan" className="flex items-center cursor-pointer">
                      <Palette className="w-4 h-4 mr-2 text-sunset-orange" />
                      Artisan
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 border border-warm-brown/30 rounded-lg p-3 hover:bg-heritage-gold/5 transition-colors">
                    <RadioGroupItem value="buyer" id="buyer" />
                    <Label htmlFor="buyer" className="flex items-center cursor-pointer">
                      <ShoppingBag className="w-4 h-4 mr-2 text-soft-blue" />
                      Buyer
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name" className="text-deep-teal">
                  Full Name
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="border-warm-brown/30 focus:border-heritage-gold"
                  placeholder="Enter your full name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-deep-teal">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="border-warm-brown/30 focus:border-heritage-gold"
                  placeholder="Enter your email"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location" className="text-deep-teal">
                  Location
                </Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="border-warm-brown/30 focus:border-heritage-gold"
                  placeholder="City, State"
                />
              </div>

              {formData.role === "artisan" && (
                <div className="space-y-2">
                  <Label htmlFor="bio" className="text-deep-teal">
                    Tell us about your craft
                  </Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    className="border-warm-brown/30 focus:border-heritage-gold"
                    placeholder="Describe your traditional craft and heritage..."
                    rows={3}
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="password" className="text-deep-teal">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  className="border-warm-brown/30 focus:border-heritage-gold"
                  placeholder="Create a password"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-deep-teal">
                  Confirm Password
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  required
                  className="border-warm-brown/30 focus:border-heritage-gold"
                  placeholder="Confirm your password"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-heritage-gold text-deep-teal hover:bg-heritage-gold/90"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-warm-brown">
                Already have an account?{" "}
                <Link href="/login" className="text-heritage-gold hover:underline font-medium">
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
