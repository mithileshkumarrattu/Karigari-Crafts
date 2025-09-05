import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Crimson_Text } from "next/font/google"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { AuthProvider } from "@/contexts/AuthContext"
import { CartProvider } from "@/contexts/CartContext"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const crimsonText = Crimson_Text({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
  variable: "--font-crimson",
})

export const metadata: Metadata = {
  title: "Karigari Crafts - Empowering Indian Artisans",
  description: "AI-powered platform connecting traditional Indian artisans with global audiences",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${crimsonText.variable} ${GeistMono.variable} font-sans antialiased`}>
        <AuthProvider>
          <CartProvider>
            <Suspense fallback={null}>{children}</Suspense>
          </CartProvider>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
