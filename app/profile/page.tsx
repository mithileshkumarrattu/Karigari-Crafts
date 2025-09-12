"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { MapPin, Phone, Mail, Edit3, Save, X } from "lucide-react"
import { doc, updateDoc } from "firebase/firestore"
import { getDbInstance } from "@/lib/firebase"

export default function ProfilePage() {
  const { user, userProfile } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    location: "",
    phone: "",
  })

  useEffect(() => {
    if (userProfile) {
      setFormData({
        name: userProfile.name || "",
        bio: userProfile.bio || "",
        location: userProfile.location || "",
        phone: userProfile.contact_info?.phone || "",
      })
    }
  }, [userProfile])

  const handleSave = async () => {
    if (!user || !userProfile) return

    try {
      const db = getDbInstance()
      await updateDoc(doc(db, "users", user.uid), {
        name: formData.name,
        bio: formData.bio,
        location: formData.location,
        contact_info: {
          ...userProfile.contact_info,
          phone: formData.phone,
        },
      })
      setIsEditing(false)
    } catch (error) {
      console.error("Error updating profile:", error)
    }
  }

  if (!user || !userProfile) {
    return (
      <div className="min-h-screen bg-soft-cream flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-serif text-deep-teal mb-4">Please sign in to view your profile</h2>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-soft-cream py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-serif text-deep-teal mb-2">My Profile</h1>
          <p className="text-warm-brown">Manage your account information and preferences</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Profile Card */}
          <Card className="md:col-span-1">
            <CardHeader className="text-center">
              <Avatar className="w-24 h-24 mx-auto mb-4">
                <AvatarImage src={userProfile.profile_image || "/placeholder.svg"} />
                <AvatarFallback className="bg-heritage-gold text-white text-2xl">
                  {userProfile.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <CardTitle className="text-deep-teal">{userProfile.name}</CardTitle>
              <CardDescription className="flex items-center justify-center gap-2">
                <Badge variant={userProfile.role === "artisan" ? "default" : "secondary"}>
                  {userProfile.role === "artisan" ? "Artisan" : "Buyer"}
                </Badge>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-warm-brown">
                <Mail className="w-4 h-4" />
                {userProfile.email}
              </div>
              {userProfile.location && (
                <div className="flex items-center gap-2 text-sm text-warm-brown">
                  <MapPin className="w-4 h-4" />
                  {userProfile.location}
                </div>
              )}
              {userProfile.contact_info?.phone && (
                <div className="flex items-center gap-2 text-sm text-warm-brown">
                  <Phone className="w-4 h-4" />
                  {userProfile.contact_info.phone}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Profile Details */}
          <Card className="md:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-deep-teal">Profile Information</CardTitle>
                <CardDescription>Update your personal information</CardDescription>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => (isEditing ? setIsEditing(false) : setIsEditing(true))}
                className="border-heritage-gold text-heritage-gold hover:bg-heritage-gold hover:text-white"
              >
                {isEditing ? <X className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
                {isEditing ? "Cancel" : "Edit"}
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  {isEditing ? (
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="border-warm-brown/30 focus:border-heritage-gold"
                    />
                  ) : (
                    <p className="text-deep-teal font-medium">{userProfile.name}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  {isEditing ? (
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="border-warm-brown/30 focus:border-heritage-gold"
                      placeholder="City, State"
                    />
                  ) : (
                    <p className="text-deep-teal font-medium">{userProfile.location || "Not specified"}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                {isEditing ? (
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="border-warm-brown/30 focus:border-heritage-gold"
                    placeholder="+91 XXXXX XXXXX"
                  />
                ) : (
                  <p className="text-deep-teal font-medium">{userProfile.contact_info?.phone || "Not specified"}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                {isEditing ? (
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    className="border-warm-brown/30 focus:border-heritage-gold min-h-[100px]"
                    placeholder="Tell us about yourself..."
                  />
                ) : (
                  <p className="text-deep-teal">{userProfile.bio || "No bio added yet."}</p>
                )}
              </div>

              {isEditing && (
                <>
                  <Separator />
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setIsEditing(false)}
                      className="border-warm-brown text-warm-brown hover:bg-warm-brown hover:text-white"
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleSave} className="bg-heritage-gold text-white hover:bg-heritage-gold/90">
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
