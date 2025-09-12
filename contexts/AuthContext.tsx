"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import {
  type User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth"
import { doc, setDoc, getDoc } from "firebase/firestore"
import { getAuthInstance, getDbInstance, getGoogleProvider } from "@/lib/firebase"

interface UserProfile {
  uid: string
  name: string
  email: string
  role: "artisan" | "buyer"
  bio?: string
  profile_image?: string
  location?: string
  contact_info?: {
    phone?: string
    address?: string
  }
  created_at: Date
}

interface AuthContextType {
  user: User | null
  userProfile: UserProfile | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signInWithGoogle: () => Promise<void>
  signUp: (email: string, password: string, userData: Partial<UserProfile>) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (typeof window === "undefined") {
      setLoading(false)
      return
    }

    const auth = getAuthInstance()
    const db = getDbInstance()

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user)
        // Fetch user profile from Firestore
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid))
          if (userDoc.exists()) {
            const userData = userDoc.data() as UserProfile
            setUserProfile(userData)
            localStorage.setItem("userRole", userData.role)
          }
        } catch (error) {
          console.error("Error fetching user profile:", error)
        }
      } else {
        setUser(null)
        setUserProfile(null)
        localStorage.removeItem("userRole")
      }
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const signIn = async (email: string, password: string) => {
    const auth = getAuthInstance()
    const result = await signInWithEmailAndPassword(auth, email, password)

    const db = getDbInstance()
    const userDoc = await getDoc(doc(db, "users", result.user.uid))
    if (userDoc.exists()) {
      const userData = userDoc.data() as UserProfile
      localStorage.setItem("userRole", userData.role)
    }
  }

  const signInWithGoogle = async () => {
    const auth = getAuthInstance()
    const provider = getGoogleProvider()
    const result = await signInWithPopup(auth, provider)

    // Check if user profile exists, if not create one
    const db = getDbInstance()
    const userDoc = await getDoc(doc(db, "users", result.user.uid))
    if (!userDoc.exists()) {
      const userProfile: UserProfile = {
        uid: result.user.uid,
        email: result.user.email!,
        name: result.user.displayName || "",
        role: "buyer",
        profile_image: result.user.photoURL || "",
        created_at: new Date(),
      }
      await setDoc(doc(db, "users", result.user.uid), userProfile)
      localStorage.setItem("userRole", userProfile.role)
    }
  }

  const signUp = async (email: string, password: string, userData: Partial<UserProfile>) => {
    const auth = getAuthInstance()
    const db = getDbInstance()
    const { user } = await createUserWithEmailAndPassword(auth, email, password)

    // Create user profile in Firestore
    const userProfile: UserProfile = {
      uid: user.uid,
      email: user.email!,
      name: userData.name || "",
      role: userData.role || "buyer",
      bio: userData.bio || "",
      location: userData.location || "",
      created_at: new Date(),
    }

    await setDoc(doc(db, "users", user.uid), userProfile)
    setUserProfile(userProfile)

    localStorage.setItem("userRole", userProfile.role)
  }

  const logout = async () => {
    const auth = getAuthInstance()
    await signOut(auth)
    localStorage.removeItem("userRole")
  }

  const value = {
    user,
    userProfile,
    loading,
    signIn,
    signInWithGoogle,
    signUp,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
