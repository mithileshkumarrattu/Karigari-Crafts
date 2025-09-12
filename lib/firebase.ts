import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app"
import { getAuth, GoogleAuthProvider, type Auth } from "firebase/auth"
import { getFirestore, type Firestore } from "firebase/firestore"
import { getStorage, type FirebaseStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyDqvc3cQ0EiKS-4UGhHcFeMopTUp-PElnI",
  authDomain: "genai-hack-e7d19.firebaseapp.com",
  projectId: "genai-hack-e7d19",
  storageBucket: "genai-hack-e7d19.firebasestorage.app",
  messagingSenderId: "646595904804",
  appId: "1:646595904804:web:21ebc0da83fdbbfba5dfb1",
  measurementId: "G-QZ2BEK3YMY",
}

// Initialize Firebase app with proper error handling
let app: FirebaseApp

try {
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()
} catch (error) {
  console.error("Firebase initialization error:", error)
  app = initializeApp(firebaseConfig)
}

// Initialize services with lazy loading
let _auth: Auth | null = null
let _db: Firestore | null = null
let _storage: FirebaseStorage | null = null
let _googleProvider: GoogleAuthProvider | null = null
let _analytics: any = null

// Getter functions for lazy initialization
export const getAuthInstance = (): Auth => {
  if (!_auth) {
    _auth = getAuth(app)
  }
  return _auth
}

export const getDbInstance = (): Firestore => {
  if (!_db) {
    _db = getFirestore(app)
  }
  return _db
}

export const getStorageInstance = (): FirebaseStorage => {
  if (!_storage) {
    _storage = getStorage(app)
  }
  return _storage
}

export const getGoogleProvider = (): GoogleAuthProvider => {
  if (!_googleProvider) {
    _googleProvider = new GoogleAuthProvider()
    _googleProvider.setCustomParameters({
      prompt: "select_account",
    })
  }
  return _googleProvider
}

export const getAnalyticsInstance = () => {
  if (typeof window !== "undefined" && !_analytics) {
    try {
      import("firebase/analytics").then(({ getAnalytics }) => {
        _analytics = getAnalytics(app)
      })
    } catch (error) {
      console.warn("Analytics initialization failed:", error)
    }
  }
  return _analytics
}

// Export instances (will be initialized on first access)
export const auth = getAuthInstance()
export const db = getDbInstance()
export const storage = getStorageInstance()
export const googleProvider = getGoogleProvider()
export const analytics = getAnalyticsInstance()

export default app
