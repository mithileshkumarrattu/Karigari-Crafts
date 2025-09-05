"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useCart } from "@/contexts/CartContext"
import { ShoppingCart, Plus, Minus, Trash2, ArrowRight } from "lucide-react"

export function CartDrawer() {
  const { state, updateQuantity, removeFromCart } = useCart()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="relative text-deep-teal">
          <ShoppingCart className="w-5 h-5" />
          {state.itemCount > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-heritage-gold text-deep-teal text-xs">
              {state.itemCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="text-deep-teal">Shopping Cart ({state.itemCount} items)</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full">
          {state.items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <ShoppingCart className="w-12 h-12 text-warm-brown mx-auto mb-4" />
                <h3 className="font-medium text-deep-teal mb-2">Your cart is empty</h3>
                <p className="text-warm-brown text-sm mb-4">Discover amazing crafts from talented artisans</p>
                <Button
                  onClick={() => setIsOpen(false)}
                  className="bg-heritage-gold text-deep-teal hover:bg-heritage-gold/90"
                  asChild
                >
                  <Link href="/marketplace">Browse Products</Link>
                </Button>
              </div>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto py-4 space-y-4">
                {state.items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-4 border border-warm-brown/20 rounded-lg">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-deep-teal text-sm line-clamp-2">{item.name}</h4>
                      <p className="text-xs text-warm-brown">{item.artisan.name}</p>
                      <p className="text-sm font-medium text-deep-teal">₹{item.price.toLocaleString()}</p>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="h-6 w-6 p-0"
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="h-6 w-6 p-0"
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromCart(item.id)}
                        className="h-6 w-6 p-0 text-warm-red hover:text-warm-red"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cart Summary */}
              <div className="border-t border-warm-brown/20 pt-4 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-deep-teal">Total:</span>
                  <span className="text-xl font-bold text-deep-teal">₹{state.total.toLocaleString()}</span>
                </div>
                <Button
                  onClick={() => setIsOpen(false)}
                  className="w-full bg-heritage-gold text-deep-teal hover:bg-heritage-gold/90"
                  asChild
                >
                  <Link href="/checkout">
                    Proceed to Checkout
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
