"use client"

import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { ProductsTab } from "@/components/dashboard/ProductsTab"
import { AddProductTab } from "@/components/dashboard/AddProductTab"
import { OrdersTab } from "@/components/dashboard/OrdersTab"
import { EarningsTab } from "@/components/dashboard/EarningsTab"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Loader2 } from "lucide-react"

export default function DashboardPage() {
  const { user, userProfile, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && (!user || userProfile?.role !== "artisan")) {
      router.push("/login")
    }
  }, [user, userProfile, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-soft-cream flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-heritage-gold" />
      </div>
    )
  }

  if (!user || userProfile?.role !== "artisan") {
    return null
  }

  return (
    <DashboardLayout activeTab="products">
      <Tabs>
        <TabsContent value="products">
          <ProductsTab />
        </TabsContent>
        <TabsContent value="add-product">
          <AddProductTab />
        </TabsContent>
        <TabsContent value="orders">
          <OrdersTab />
        </TabsContent>
        <TabsContent value="earnings">
          <EarningsTab />
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  )
}
