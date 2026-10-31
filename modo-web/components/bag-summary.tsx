"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { formatPrice } from "@/lib/cn"
import { toast } from "sonner"

interface BagSummaryProps {
  subtotal: number
  onApplyPromo?: (code: string) => void
  promoDiscount?: number
}

export function BagSummary({ subtotal, onApplyPromo, promoDiscount = 0 }: BagSummaryProps) {
  const [promoInput, setPromoInput] = useState("")

  const shipping = subtotal >= 150 || subtotal === 0 ? 0 : 12
  const tax = Math.round(subtotal * 0.08 * 100) / 100
  const total = Math.max(0, subtotal - promoDiscount + shipping + tax)

  function handlePromoSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!promoInput.trim()) return

    if (promoInput.trim().toUpperCase() === "MODO10") {
      onApplyPromo?.("MODO10")
      toast.success("Promo code MODO10 applied (10% off)")
    } else if (promoInput.trim().toUpperCase() === "FREESHIP") {
      onApplyPromo?.("FREESHIP")
      toast.success("Promo code FREESHIP applied (Free shipping)")
    } else {
      toast.error("Invalid or expired promo code")
    }
  }

  return (
    <div className="p-6 rounded-3xl bg-card border border-border/80 space-y-6 shadow-sm">
      <h3 className="font-heading text-lg font-bold tracking-tight text-foreground">
        Order Summary
      </h3>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between text-muted-foreground">
          <span>Subtotal</span>
          <span className="font-medium text-foreground">{formatPrice(subtotal)}</span>
        </div>

        {promoDiscount > 0 && (
          <div className="flex justify-between text-primary">
            <span>Promotional Savings</span>
            <span className="font-medium">-{formatPrice(promoDiscount)}</span>
          </div>
        )}

        <div className="flex justify-between text-muted-foreground">
          <span>Shipping Estimate</span>
          <span>{shipping === 0 ? "Complimentary" : formatPrice(shipping)}</span>
        </div>

        <div className="flex justify-between text-muted-foreground">
          <span>Estimated Sales Tax (8%)</span>
          <span className="font-medium text-foreground">{formatPrice(tax)}</span>
        </div>

        <div className="border-t border-border/80 pt-3 flex justify-between text-base font-semibold text-foreground">
          <span>Estimated Total</span>
          <span>{formatPrice(total)}</span>
        </div>
      </div>

      {/* Promo Code Form */}
      <form onSubmit={handlePromoSubmit} className="flex gap-2">
        <Input
          placeholder="Promo code"
          value={promoInput}
          onChange={(e) => setPromoInput(e.target.value)}
          className="rounded-full text-xs uppercase"
        />
        <Button type="submit" variant="outline" className="rounded-full text-xs px-4">
          Apply
        </Button>
      </form>

      {subtotal > 0 ? (
        <Button asChild size="lg" className="w-full rounded-full font-medium shadow-md">
          <Link href="/checkout">Proceed to Checkout</Link>
        </Button>
      ) : (
        <Button disabled size="lg" className="w-full rounded-full font-medium">
          Shopping Bag Empty
        </Button>
      )}

      <p className="text-[11px] text-center text-muted-foreground leading-normal">
        Complimentary worldwide shipping on orders over $150. Duties and local taxes calculated at checkout.
      </p>
    </div>
  )
}

export default BagSummary

