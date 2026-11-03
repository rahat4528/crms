"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import TopBar from "@/components/top-bar"
import SiteFooter from "@/components/site-footer"
import CheckoutFlow from "@/components/checkout-flow"
import { formatPrice } from "@/lib/cn"
import type { BagItemData } from "@/components/bag-line"

export default function CheckoutPage() {
  const [items, setItems] = useState<BagItemData[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem("virga_bag") || localStorage.getItem("modo_bag")
      if (stored) {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed)) {
          setItems(parsed)
        }
      }
    } catch {
      // ignore
    } finally {
      setIsLoaded(true)
    }
  }, [])

  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0)
  const shipping = subtotal >= 150 || subtotal === 0 ? 0 : 12
  const tax = Math.round(subtotal * 0.08 * 100) / 100
  const total = subtotal + shipping + tax

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <TopBar />
      <main className="flex-1 container-virga py-8 sm:py-10 space-y-8 max-w-5xl">
        <div className="pb-4 border-b border-border/70 space-y-1">
          <span className="editorial-caps text-primary">Encrypted Checkout</span>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Complete Your Order
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground font-light">
            End-to-end encrypted checkout with complimentary climate-neutral delivery.
          </p>
        </div>

        {isLoaded && items.length === 0 ? (
          <div className="py-20 text-center space-y-4">
            <p className="text-base font-medium">Your shopping bag is empty.</p>
            <Link href="/shop" className="text-sm font-mono uppercase tracking-wider text-primary hover:underline">
              Return to Catalog →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
            {/* Form */}
            <div className="lg:col-span-7">
              <CheckoutFlow items={items} />
            </div>

            {/* Sidebar Summary */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 rounded-xl bg-card border border-border shadow-sm space-y-4">
                <h3 className="font-heading text-base font-bold text-foreground">
                  Order Summary ({items.length} pieces)
                </h3>

                <div className="divide-y divide-border/60 max-h-64 overflow-y-auto pr-1">
                  {items.map((item) => (
                    <div key={item.id} className="py-3 flex items-center gap-3">
                      <div className="relative w-12 h-16 rounded-md overflow-hidden bg-muted flex-shrink-0 border border-border/60">
                        <Image src={item.image || "/placeholder.jpg"} alt={item.title} fill sizes="48px" className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-foreground truncate">{item.title}</p>
                        <p className="text-[11px] text-muted-foreground font-mono">Qty: {item.qty}</p>
                      </div>
                      <span className="text-xs font-semibold tracking-tight">{formatPrice(item.price * item.qty)}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border/80 pt-3 space-y-2 text-xs">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span className="font-medium text-foreground tracking-tight">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Delivery</span>
                    <span className="font-medium text-foreground">{shipping === 0 ? "Complimentary" : formatPrice(shipping)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Estimated Tax (8%)</span>
                    <span className="font-medium text-foreground tracking-tight">{formatPrice(tax)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-sm text-foreground pt-3 border-t border-border/60">
                    <span>Total Due</span>
                    <span className="font-heading text-base">{formatPrice(total)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      <SiteFooter />
    </div>
  )
}
